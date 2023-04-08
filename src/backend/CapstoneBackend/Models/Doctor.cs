using System;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstoneBackend.Models
{
	public class Doctor : Person
	{
        [BsonElement("clinicAddress")]
        public string ClinicAddress { get; set; }

        [BsonElement("setOfPatients")]
        public HashSet<string> SetOfPatients { get; set; }
	}
}

