using CapstoneBackend.Models;
using Microsoft.Extensions.Options;
using System;
using MongoDB.Driver;

namespace CapstoneBackend.Services
{
	public class DiagnosticsService
	{
        private readonly IMongoCollection<Diagnostics> _diagnosticCollection;

        private readonly IConfiguration _config;

        public DiagnosticsService(
            IOptions<DatabaseSettings> DatabaseSettings, IConfiguration config)
        {
            _config = config;
            string connectionString = _config["ConnectionString"];

            var mongoClient = new MongoClient(
                connectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                DatabaseSettings.Value.DatabaseName);

            _diagnosticCollection = mongoDatabase.GetCollection<Diagnostics>(
                DatabaseSettings.Value.DiagnosticCollectionName);
        }

        public async Task<List<Diagnostics>> GetAsync() =>
            await _diagnosticCollection.Find(_ => true).ToListAsync();

        public async Task<Diagnostics?> GetAsync(string id) =>
            await _diagnosticCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Diagnostics newDiagnostic) =>
            await _diagnosticCollection.InsertOneAsync(newDiagnostic);

        public async Task UpdateAsync(string id, Diagnostics updatedDiagnostic) =>
            await _diagnosticCollection.ReplaceOneAsync(x => x.Id == id, updatedDiagnostic);

        public async Task RemoveAsync(string id) =>
            await _diagnosticCollection.DeleteOneAsync(x => x.Id == id);
    }
}

