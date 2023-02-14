using System;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstoneBackend.Models
{
	public class Event
	{
        [BsonId]
        public string Id { get; set; }

        [BsonElement("patientId")]
        public string PatientId { get; set; }

        [BsonElement("doctorId")]
        public string DoctorId { get; set; }

        [BsonElement("doctorNotes")]
        public string DoctorNotes { get; set; }

        [BsonElement("patientNotes")]
        public string PatientNotes { get; set; }

        [BsonElement("listOfDiagnostics")]
        public List<string> ListOfDiagnostics { get; set; }

	}
}

