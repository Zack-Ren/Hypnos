using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstoneBackend.Models
{
	public class Event
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("patientId")]
        public string PatientId { get; set; }

        [BsonElement("doctorId")]
        public string? DoctorId { get; set; }

        [BsonElement("eventTime")]
        public DateTime EventTime { get; set; }

        [BsonElement("doctorNotes")]
        public string DoctorNotes { get; set; }

        [BsonElement("patientNotes")]
        public string PatientNotes { get; set; }

        [BsonElement("setOfDiagnostics")]
        public HashSet<string> SetOfDiagnostics { get; set; }

	}
}

