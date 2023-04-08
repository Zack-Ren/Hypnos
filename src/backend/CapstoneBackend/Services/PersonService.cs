using System;
using CapstoneBackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CapstoneBackend.Services
{
	public class PersonService
	{
        private readonly IConfiguration _config;

        private readonly IMongoCollection<Patient> _patientCollection;

        private readonly IMongoCollection<Doctor> _doctorCollection;

        public PersonService(IOptions<DatabaseSettings> DatabaseSettings, IConfiguration config)
        {
            _config = config;
            string connectionString = "mongodb+srv://CapstoneUsername:CapstonePassword@cluster1.cnvgzja.mongodb.net/?retryWrites=true&w=majority";

            var mongoClient = new MongoClient(
                connectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                DatabaseSettings.Value.DatabaseName);

            _patientCollection = mongoDatabase.GetCollection<Patient>(
                DatabaseSettings.Value.PatientCollectionName);

            _doctorCollection = mongoDatabase.GetCollection<Doctor>(
                DatabaseSettings.Value.DoctorCollectionName);
        }

        public async Task<Person> Authenticate(string username, string password)
        {
            var patientPerson = await _patientCollection.Find(x => x.Username == username).FirstOrDefaultAsync();

            if (patientPerson != null && password == patientPerson.Password)
            {
                return patientPerson;
            }

            var doctorPerson = await _doctorCollection.Find(x => x.Username == username).FirstOrDefaultAsync();

            if (doctorPerson != null && password == doctorPerson.Password)
            {
                return doctorPerson;
            }

            return null;
        }
    }
}

