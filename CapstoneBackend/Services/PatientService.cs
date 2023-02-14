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

        public PatientService(
            IOptions<DatabaseSettings> DatabaseSettings, IConfiguration config)
        {
            _config = config;
            string connectionString = _config["ConnectionString"];

            var mongoClient = new MongoClient(
                connectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                DatabaseSettings.Value.DatabaseName);

            _patientCollection = mongoDatabase.GetCollection<Patient>(
                DatabaseSettings.Value.PatientCollectionName);
        }

        public async Task<List<Patient>> GetAsync() =>
            await _patientCollection.Find(_ => true).ToListAsync();

        public async Task<Patient?> GetAsync(string id) =>
            await _patientCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Patient newPatient) =>
            await _patientCollection.InsertOneAsync(newPatient);

        public async Task UpdateAsync(string id, Patient updatedPatient) =>
            await _patientCollection.ReplaceOneAsync(x => x.Id == id, updatedPatient);

        public async Task RemoveAsync(string id) =>
            await _patientCollection.DeleteOneAsync(x => x.Id == id);
    }
}

