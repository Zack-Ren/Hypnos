using System;
using System.Numerics;
using CapstoneBackend.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CapstoneBackend.Services
{
    public class ManagementService {

        private readonly IConfiguration _config;

        private readonly IMongoCollection<Doctor> _doctorCollection;

        private readonly IMongoCollection<Patient> _patientCollection;

        private readonly IMongoCollection<Event> _eventCollection;

        private readonly IMongoCollection<Diagnostics> _diagnosticCollection;

        public ManagementService(IOptions<DatabaseSettings> DatabaseSettings, IConfiguration config)
        {
            _config = config;
            string connectionString = _config["ConnectionString"];

            var mongoClient = new MongoClient(
                connectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                DatabaseSettings.Value.DatabaseName);

            _doctorCollection = mongoDatabase.GetCollection<Doctor>(
                DatabaseSettings.Value.DoctorCollectionName);

            _patientCollection = mongoDatabase.GetCollection<Patient>(
                DatabaseSettings.Value.PatientCollectionName);

            _eventCollection = mongoDatabase.GetCollection<Event>(
                DatabaseSettings.Value.EventCollectionName);

            _diagnosticCollection = mongoDatabase.GetCollection<Diagnostics>(DatabaseSettings.Value.DiagnosticCollectionName);
        }
        // Doctor
        /// <summary>
        /// Retrieves a List of all Doctors
        /// </summary>
        /// <returns></returns>
        public async Task<List<Doctor>> GetDoctorsAsync() =>
            await _doctorCollection.Find(_ => true).ToListAsync();

        /// <summary>
        /// Retrieves a doctor given its id if it is found
        /// </summary>
        /// <param name="id">Represents id of the doctor to retrieve</param>
        /// <returns></returns>
        public async Task<Doctor?> GetDoctorAsync(string id) =>
            await _doctorCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        /// <summary>
        /// Retrieves a doctor that has the specified patient
        /// </summary>
        /// <param name="patientId">Represents the id of the patient</param>
        /// <returns></returns>
        public async Task<Doctor?> GetDoctorByPatient(string patientId) =>
            await _doctorCollection.Find(doctor => doctor.SetOfPatients.Contains(patientId)).FirstOrDefaultAsync();

        /// <summary>
        /// Creates a doctor
        /// </summary>
        /// <param name="newDoctor">Represents the new doctor object to create</param>
        /// <returns></returns>
        public async Task CreateDoctorAsync(Doctor newDoctor)
        {
            await this.ValidateSetOfPatients(newDoctor.SetOfPatients);

            await _doctorCollection.InsertOneAsync(newDoctor);
        }

        /// <summary>
        /// Updates a doctor specified by the id
        /// </summary>
        /// <param name="originalDoctorId">Represents the id of the doctor to update</param>
        /// <param name="updatedDoctor">Represents the doctor with the updated fields</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task UpdateDoctorAsync(string originalDoctorId, Doctor updatedDoctor, bool newPatientCreationScenario = false)
        {
            Doctor originalDoctor = await this.ValidateDoctor(originalDoctorId, "Doctor could not be updated.");

            // If the setOfPatients was updated, validate it
            if (!originalDoctor.SetOfPatients.SetEquals(updatedDoctor.SetOfPatients) && !newPatientCreationScenario)
            {
                await this.ValidateSetOfPatients(updatedDoctor.SetOfPatients);
            }

            await _doctorCollection.ReplaceOneAsync(x => x.Id == updatedDoctor.Id, updatedDoctor);
        }

        /// <summary>
        /// Removes a doctor
        /// </summary>
        /// <param name="doctorToDelete"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task RemoveDoctorAsync(Doctor doctorToDelete)
        {
            // Find all the patients that the doctor manages and set their doctor to null
            foreach (string patientId in doctorToDelete.SetOfPatients)
            {
                Patient patient = await this.ValidatePatient(patientId, "Doctor could not be removed.");

                patient.DoctorId = null;

                // When a doctor is deleted, their patients will no longer have a doctor, so the field must be cleared
                await this.UpdatePatientAsync(patientId, patient);
            }

            List<Event> events = await this.GetEventsAsync();

            // Find events
            List<Event> filteredEvents = events.FindAll(x => doctorToDelete.SetOfPatients.Contains(x.PatientId) && x.DoctorId == doctorToDelete.Id);

            if (filteredEvents != null)
            {
                foreach (Event filteredEvent in filteredEvents)
                {
                    filteredEvent.DoctorId = null;

                    await this.UpdateEventAsync(filteredEvent.Id, filteredEvent);
                }
            }

            await _doctorCollection.DeleteOneAsync(x => x.Id == doctorToDelete.Id);
        }

        /// <summary>
        /// Validates an individual doctor. Determines if it exists and throws an error if it does not.
        /// </summary>
        /// <param name="doctorId">Represents the id of the doctor to validate</param>
        /// <param name="exceptionMessageDetails">Represents a custom error message passed from the caller function</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Doctor> ValidateDoctor(string doctorId, string exceptionMessageDetails)
        {
            var doctor = await this.GetDoctorAsync(doctorId);

            if (doctor == null)
            {
                throw new Exception($"Doctor with id {doctorId} does not exist. {exceptionMessageDetails}");
            }

            return doctor;
        }

        /// <summary>
        /// Retrieves all the patients
        /// </summary>
        /// <returns></returns>
        public async Task<List<Patient>> GetPatientAsync() =>
            await _patientCollection.Find(_ => true).ToListAsync();

        /// <summary>
        /// Retrieves a patient specified by the id
        /// </summary>
        /// <param name="id">Represents the id of the patient</param>
        /// <returns></returns>
        public async Task<Patient?> GetPatientAsync(string id) =>
            await _patientCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        /// <summary>
        /// Retrieves a patient specified by the doctorId
        /// </summary>
        /// <param name="doctorId">Represents the doctorId</param>
        /// <returns></returns>
        public async Task<List<Patient>> GetPatientByDoctor(string doctorId) =>
            await _patientCollection.Find(patient => patient.DoctorId == doctorId).ToListAsync();


        /// <summary>
        /// Creates a patient
        /// </summary>
        /// <param name="newPatient">Represents the newPatient data</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task CreatePatientAsync(Patient newPatient)
        {
            // If a patient is created with a doctorId, we need to verify the doctorId
            if (newPatient.DoctorId != null)
            {
                Doctor doctor = await this.ValidateDoctor(newPatient.DoctorId, "Patient cannot be created.");
                doctor.SetOfPatients.Add(newPatient.Id);
                await this.UpdateDoctorAsync(newPatient.DoctorId, doctor, true);
            }

            await _patientCollection.InsertOneAsync(newPatient);
        }

        /// <summary>
        /// Updates a patient specified by the id
        /// </summary>
        /// <param name="id">Represents the id of the patient to update</param>
        /// <param name="updatedPatient">Represents the updatedPatient data</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task UpdatePatientAsync(string id, Patient updatedPatient)
        {
            Patient patient = await this.ValidatePatient(id, "Patient cannot be updated.");

            // if the updatedPatient has a new doctorId, we need to verify the doctorId
            // if the updatedPatient has a new doctorId of null or remains the same, we don't need to verify it
            if (updatedPatient.DoctorId != null && patient.DoctorId != updatedPatient.DoctorId)
            {
                Doctor doctor = await this.ValidateDoctor(updatedPatient.DoctorId, "Patient cannot be updated.");
            }

            await _patientCollection.ReplaceOneAsync(x => x.Id == id, updatedPatient);
        }

        /// <summary>
        /// Deletes a patient
        /// </summary>
        /// <param name="patientToDelete">Represents the patient object to delete</param>
        /// <returns></returns>
        public async Task RemovePatientAsync(Patient patientToDelete)
        {
            // If we are deleting a patient that is associated with the doctor, we need to verify the doctor exists, then remove the patient from the doctor's setOfPatients
            if (patientToDelete.DoctorId != null)
            {
                Doctor doctor = await this.ValidateDoctor(patientToDelete.DoctorId, "Patient cannot be removed.");

                if (patientToDelete.Id != null)
                {
                    doctor.SetOfPatients.Remove(patientToDelete.Id);

                    await this.UpdateDoctorAsync(patientToDelete.DoctorId, doctor);
                }
            }

            List<Event> events = await this.GetEventsAsync();

            List<Event> filteredEvents = events.FindAll(x => x.PatientId == patientToDelete.Id);

            // We need to delete all the events associated with the patient since we are deleting the patient. All data relevant to the patient must be deleted
            if (filteredEvents != null)
            {
                foreach (Event filteredEvent in filteredEvents)
                {
                    // Since events have all the diagnostics, we need to delete all diagnostic data from the system
                    foreach (string diagnosticId in filteredEvent.SetOfDiagnostics)
                    {
                        await this.RemoveDiagnosticAsync(diagnosticId);
                    }

                    // After deleting diagnostic data, we delete the event itself
                    await this.RemoveEventAsync(filteredEvent.Id);
                }
            }

            // Then, we delete the patient
            await _patientCollection.DeleteOneAsync(x => x.Id == patientToDelete.Id);
        }

        /// <summary>
        /// Validates a setOfPatientIds
        /// </summary>
        /// <param name="setOfPatientIds">Represents the set of patient ids to validate</param>
        /// <returns></returns>
        public async Task ValidateSetOfPatients(HashSet<string> setOfPatientIds)
        {
            foreach (string patientId in setOfPatientIds)
            {
                var patient = await this.ValidatePatient(patientId, "Set of patients could not be validated and is incorrect.");
            }
        }

        /// <summary>
        /// Validates an individual patient. Determines if it exists and throws an error if it does not.
        /// </summary>
        /// <param name="patientId">Represents the id of the patient to validate.</param>
        /// <param name="exceptionMessageDetails">Represents a custom error message passed from the caller function</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private async Task<Patient> ValidatePatient(string patientId, string exceptionMessageDetails)
        {
            var patient = await this.GetPatientAsync(patientId);

            if (patient == null)
            {
                throw new Exception($"Patient with id {patientId} does not exist. {exceptionMessageDetails}");
            }

            return patient;
        }

        // Events
        /// <summary>
        /// Retrieves all the events
        /// </summary>
        /// <returns></returns>
        public async Task<List<Event>> GetEventsAsync() =>
            await _eventCollection.Find(_ => true).ToListAsync();

        /// <summary>
        /// Retrieves an event specified by the id
        /// </summary>
        /// <param name="id">Represents the event id that we want to find</param>
        /// <returns></returns>
        public async Task<Event?> GetEventAsync(string id) =>
            await _eventCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        /// <summary>
        /// Retrieves the event specified by the doctorId and/or patientid
        /// </summary>
        /// <param name="doctorId">Represents the doctorId</param>
        /// <param name="patientId">Represents the patientId</param>
        /// <returns></returns>
        public async Task<Event?> GetEventByDoctorOrPatient(string? doctorId, string? patientId)
        {
            // If both are provided, perform the search for events that have both ids
            if (doctorId != null && patientId != null)
            {
                return await _eventCollection.Find(eventEntity => eventEntity.PatientId == patientId && eventEntity.DoctorId == doctorId).FirstOrDefaultAsync();
            }
            // If only doctorId is provided, perform the search for events with the doctorId
            else if (doctorId != null && patientId == null)
            {
                return await _eventCollection.Find(eventEntity => eventEntity.DoctorId == doctorId).FirstOrDefaultAsync();
            }
            // If only patientId is provided, perform the search for events with the patientId
            else
            {
                return await _eventCollection.Find(eventEntity => eventEntity.PatientId == patientId).FirstOrDefaultAsync();

            }
        }

        /// <summary>
        /// Creates an event
        /// </summary>
        /// <param name="newEvent"></param>
        /// <returns></returns>
        public async Task CreateEventAsync(Event newEvent)
        {
            // Validate PatientId
            Patient patient = await this.ValidatePatient(newEvent.PatientId, "Event cannot be created.");

            // If doctorId is available, validate DoctorId
            if (newEvent.DoctorId != null)
            {
                Doctor doctor = await this.ValidateDoctor(newEvent.DoctorId, "Event cannot be created.");
            }

            // Validate setOfDiagnostics
            await this.ValidateSetOfDiagnostics(newEvent.SetOfDiagnostics);

            await _eventCollection.InsertOneAsync(newEvent);
        }

        /// <summary>
        /// Updates an event.
        /// </summary>
        /// <param name="id">Represents the id of the event to update.</param>
        /// <param name="updatedEvent">Represents the details of the updatedEvent.</param>
        /// <returns></returns>
        public async Task UpdateEventAsync(string id, Event updatedEvent)
        {
            // Validate event
            Event eventEntity = await this.ValidateEvent(id, "Event cannot be updated.");

            // If the updatedEvent has different diagnostics, validate them
            if (!eventEntity.SetOfDiagnostics.SetEquals(updatedEvent.SetOfDiagnostics))
            {
                await this.ValidateSetOfDiagnostics(updatedEvent.SetOfDiagnostics);
            }

            // If the doctorId was changed and the change was a non-null change, validate the doctor
            if (updatedEvent.DoctorId != eventEntity.DoctorId && updatedEvent.DoctorId != null)
            {
                await this.ValidateDoctor(updatedEvent.DoctorId, "Event cannot be updated.");
            }

            await _eventCollection.ReplaceOneAsync(x => x.Id == id, updatedEvent);

        }

        /// <summary>
        /// Removes an event.
        /// </summary>
        /// <param name="id">Represents the id of the event to remove.</param>
        /// <returns></returns>
        public async Task RemoveEventAsync(string id)
        {
            // Validate Event
            Event eventEntity = await this.ValidateEvent(id, "Event cannot be removed.");

            // Remove all diagnostics post validation
            foreach (string diagnosticId in eventEntity.SetOfDiagnostics)
            {
                Diagnostics diagnostic = await this.ValidateDiagnostic(diagnosticId, "The set of diagnosticIds is not valid. Event cannot be removed.");

                await this.RemoveDiagnosticAsync(diagnostic.Id);
            }

            // Delete event
            await _eventCollection.DeleteOneAsync(x => x.Id == id);
        }

        /// <summary>
        /// Validates an individual event. Determines if it exists and throws and error if it does not.
        /// </summary>
        /// <param name="eventId">Represents the id of the event to validate.</param>
        /// <param name="exceptionMessageDetails">Represents a custom error message passed from the caller function</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private async Task<Event> ValidateEvent(string eventId, string exceptionMessageDetails)
        {
            var eventEntity = await this.GetEventAsync(eventId);

            if (eventEntity == null)
            {
                throw new Exception($"Event with id {eventId} does not exist. {exceptionMessageDetails}");
            }

            return eventEntity;
        }

        // Diagnostics
        /// <summary>
        /// Retrieves all Diagnostics
        /// </summary>
        /// <returns></returns>
        public async Task<List<Diagnostics>> GetDiagnosticsAsync() =>
            await _diagnosticCollection.Find(_ => true).ToListAsync();

        /// <summary>
        /// Retrieves all diagnostics via id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Diagnostics?> GetDiagnosticAsync(string id) =>
            await _diagnosticCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        /// <summary>
        /// Creates a diagnostic
        /// </summary>
        /// <param name="newDiagnostic">Represents details of the new diagnostic object to create.</param>
        /// <returns></returns>
        public async Task CreateDiagnosticAsync(Diagnostics newDiagnostic) =>
            await _diagnosticCollection.InsertOneAsync(newDiagnostic);

        /// <summary>
        /// Updates a diagnostic
        /// </summary>
        /// <param name="id">Represents the id of the diagnostic to update.</param>
        /// <param name="updatedDiagnostic">Represents details of the new updated diagnostic object.</param>
        /// <returns></returns>
        public async Task UpdateDiagnosticAsync(string id, Diagnostics updatedDiagnostic) =>
            await _diagnosticCollection.ReplaceOneAsync(x => x.Id == id, updatedDiagnostic);

        /// <summary>
        /// Deletes a diagnostic.
        /// </summary>
        /// <param name="id">Represents the id of the diagnostic to remove.</param>
        /// <returns></returns>
        public async Task RemoveDiagnosticAsync(string id) =>
            await _diagnosticCollection.DeleteOneAsync(x => x.Id == id);

        /// <summary>
        /// Validates a set of DiagnosticIds. Determines if each id exists.
        /// </summary>
        /// <param name="setOfDiagnosticIds">Represents the set of diagnostic ids.</param>
        /// <returns></returns>
        public async Task ValidateSetOfDiagnostics(HashSet<string> setOfDiagnosticIds)
        {
            foreach (string diagnosticId in setOfDiagnosticIds)
            {
                Diagnostics diagnostic = await this.ValidateDiagnostic(diagnosticId, "The set of diagnostics contains non-existient diagnostic ids. The set of diagnosticIds is not valid.");
            }
        }

        /// <summary>
        /// Validates an individual diagnostic. Determines if it exists and throws an error if it does not.
        /// </summary>
        /// <param name="diagnosticId">Represents the id of the diagnostic to validate</param>
        /// <param name="exceptionMessageDetails">Represents a custom error message passed from the caller function</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private async Task<Diagnostics> ValidateDiagnostic(string diagnosticId, string exceptionMessageDetails)
        {
            var diagnostic = await this.GetDiagnosticAsync(diagnosticId);

            if (diagnostic == null)
            {
                throw new Exception($"Diagnostic with id {diagnosticId} does not exist. {exceptionMessageDetails}");
            }

            return diagnostic;
        }
    }
}

