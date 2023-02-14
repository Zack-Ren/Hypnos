using CapstoneBackend.Models;
using Microsoft.Extensions.Options;
using System;
using MongoDB.Driver;

namespace CapstoneBackend.Services
{
	public class DoctorService
	{
        private readonly IMongoCollection<Doctor> _doctorCollection;

        private readonly IConfiguration _config;

        public DoctorService(
            IOptions<DatabaseSettings> DatabaseSettings, IConfiguration config)
        {
            _config = config;
            string connectionString = _config["ConnectionString"];

            var mongoClient = new MongoClient(
                connectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                DatabaseSettings.Value.DatabaseName);

            _doctorCollection = mongoDatabase.GetCollection<Doctor>(
                DatabaseSettings.Value.DoctorCollectionName);
        }

        public async Task<List<Doctor>> GetAsync() =>
            await _doctorCollection.Find(_ => true).ToListAsync();

        public async Task<Doctor?> GetAsync(string id) =>
            await _doctorCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Doctor newDoctor) =>
            await _doctorCollection.InsertOneAsync(newDoctor);

        public async Task UpdateAsync(string id, Doctor updatedDoctor) =>
            await _doctorCollection.ReplaceOneAsync(x => x.Id == id, updatedDoctor);

        public async Task RemoveAsync(string id) =>
            await _doctorCollection.DeleteOneAsync(x => x.Id == id);
    }
}

