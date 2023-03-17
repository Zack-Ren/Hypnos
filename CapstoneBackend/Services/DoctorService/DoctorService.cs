﻿using CapstoneBackend.Models;
using Microsoft.Extensions.Options;
using System;
using MongoDB.Driver;

namespace CapstoneBackend.Services
{
	public class DoctorService
	{
        private readonly IMongoCollection<Doctor> _doctorCollection;

        private readonly IConfiguration _config;

        private readonly PatientService _patientService;

        private readonly EventService _eventService;

        private readonly ManagementService _managementService;

        public DoctorService(
            IOptions<DatabaseSettings> DatabaseSettings, IConfiguration config, PatientService patientService, EventService eventService, ManagementService managementService)
        {
            _config = config;
            string connectionString = _config["ConnectionString"];

            var mongoClient = new MongoClient(
                connectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                DatabaseSettings.Value.DatabaseName);

            _doctorCollection = mongoDatabase.GetCollection<Doctor>(
                DatabaseSettings.Value.DoctorCollectionName);

            _patientService = patientService;

            _eventService = eventService;

            _managementService = managementService;
        }

        public async Task<List<Doctor>> GetAsync() =>
            await _doctorCollection.Find(_ => true).ToListAsync();

        public async Task<Doctor?> GetAsync(string id) =>
            await _doctorCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Doctor?> GetDoctorOfAPatient(string patientId) =>
            await _doctorCollection.Find(doctor => doctor.SetOfPatients.Contains(patientId)).FirstOrDefaultAsync();

        public async Task CreateAsync(Doctor newDoctor)
        {
            await this.ValidateSetOfPatients(newDoctor.SetOfPatients);

            await _doctorCollection.InsertOneAsync(newDoctor);
        }

        public async Task UpdateAsync(string originalDoctorId, Doctor updatedDoctor)
        {
            await _managementService.UpdateDoctorAsync(originalDoctorId, updatedDoctor);
        }

        public async Task RemoveDoctorAsync(Doctor doctorToDelete)
        {

            foreach (string patientId in doctorToDelete.SetOfPatients)
            {
                var patient = await _patientService.GetAsync(patientId);

                if (patient == null)
                {
                    throw new Exception($"Patient with {patientId} was not found. The list of patients for the doctor is incorrect.");
                }

                patient.DoctorId = null;

                // When a doctor is deleted, their patients will no longer have a doctor, so the field must be cleared
                await _patientService.UpdateAsync(patientId, patient);
            }

            List<Event> events = await _eventService.GetAsync();

            List<Event> filteredEvents = events.FindAll(x => doctorToDelete.SetOfPatients.Contains(x.PatientId) && x.DoctorId == doctorToDelete.Id);

            if (filteredEvents != null)
            {
                foreach (Event filteredEvent in filteredEvents)
                {
                    filteredEvent.DoctorId = null;

                    await _eventService.UpdateAsync(filteredEvent.Id, filteredEvent);
                }
            }

            await _doctorCollection.DeleteOneAsync(x => x.Id == doctorToDelete.Id);
        }
            

        private async Task ValidateSetOfPatients(HashSet<string> listOfPatientIds)
        {
            foreach (string patientId in listOfPatientIds)
            {
                var patient = await _patientService.GetAsync(patientId);

                if (patient == null)
                {
                    throw new Exception($"Patient with {patientId} was not found. The list of patients for the doctor is incorrect.");
                }
            }
        }

    }
}

