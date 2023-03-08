using CapstoneBackend.Models;
using Microsoft.Extensions.Options;
using System;
using MongoDB.Driver;

namespace CapstoneBackend.Services
{
	public class PatientService
	{
        private readonly IMongoCollection<Patient> _patientCollection;

        private readonly IConfiguration _config;

        //private readonly DoctorService _doctorService;

        //private readonly EventService _eventService;

        //private readonly DiagnosticsService _diagnosticsService;

        public PatientService(
            IOptions<DatabaseSettings> DatabaseSettings, IConfiguration config)
        {
            _config = config;
            string connectionString = "mongodb+srv://CapstoneUsername:CapstonePassword@cluster1.cnvgzja.mongodb.net/?retryWrites=true&w=majority";

            var mongoClient = new MongoClient(
                connectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                DatabaseSettings.Value.DatabaseName);

            _patientCollection = mongoDatabase.GetCollection<Patient>(
                DatabaseSettings.Value.PatientCollectionName);

            //_doctorService = doctorService;

            //_eventService = eventService;

            //_diagnosticsService = diagnosticsService;
        }

        public async Task<List<Patient>> GetAsync() =>
            await _patientCollection.Find(_ => true).ToListAsync();

        public async Task<Patient?> GetAsync(string id) =>
            await _patientCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Patient newPatient)
        {
            //if (newPatient.DoctorId != null)
            //{
            //    var doctor = _doctorService.GetAsync(newPatient.DoctorId);

            //    if (doctor == null)
            //    {
            //        throw new Exception($"Patient contains a doctorId: {newPatient.DoctorId} that does not exist.");
            //    }
            //}
            await _patientCollection.InsertOneAsync(newPatient);
        }

        public async Task UpdateAsync(string id, Patient updatedPatient)
        {
            //if (updatedPatient.DoctorId != null)
            //{
            //    var doctor = _doctorService.GetAsync(updatedPatient.DoctorId);

            //    if (doctor == null)
            //    {
            //        throw new Exception($"Patient contains a doctorId: {updatedPatient.DoctorId} that does not exist.");
            //    }
            //}

            await _patientCollection.ReplaceOneAsync(x => x.Id == id, updatedPatient);
        }

        public async Task RemoveAsync(Patient patientToDelete)
        {
            //if (patientToDelete.DoctorId != null)
            //{
            //    var doctor = await _doctorService.GetAsync(patientToDelete.DoctorId);

            //    if (doctor != null && patientToDelete.Id != null)
            //    {
            //        doctor.SetOfPatients.Remove(patientToDelete.Id);
            //    }
            //}

            //List<Event> events = await _eventService.GetAsync();

            //List<Event> filteredEvents = events.FindAll(x => x.PatientId == patientToDelete.Id);

            //if (filteredEvents != null)
            //{
            //    foreach (Event filteredEvent in filteredEvents)
            //    {
            //        List<Diagnostics> diagnostics = await _diagnosticsService.GetAsync();
            //        List<Diagnostics> filteredDiagnostics = diagnostics.FindAll(x => x.PatientId == patientToDelete.Id);
            //        if (filteredDiagnostics != null)
            //        {
            //            foreach (Diagnostics filteredDiagnostic in filteredDiagnostics)
            //            {
            //                await _diagnosticsService.RemoveAsync(filteredDiagnostic.Id);
            //            }
            //        }
            //        await _eventService.RemoveAsync(filteredEvent.Id);
            //    }
            //}


            await _patientCollection.DeleteOneAsync(x => x.Id == patientToDelete.Id);
        }
            
    }
}

