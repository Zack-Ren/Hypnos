using System;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstoneBackend.Models
{
	public class Diagnostics
	{
        [BsonId]
        public string Id { get; set; }

        [BsonElement("patientId")]
        public string PatientId { get; set; }

        [BsonElement("dataAcquisitionStartTime")]
        public DateTime DataAcquisitionStartTime { get; set; }

        [BsonElement("accelerationX")]
        public List<int> AccelerationX { get; set; }

        [BsonElement("accelerationY")]
        public List<int> AccelerationY { get; set; }

        [BsonElement("accelerationZ")]
        public List<int> AccelerationZ { get; set; }

        [BsonElement("angularAccelerationX")]
        public List<int> AngularAccelerationX { get; set; }

        [BsonElement("angularAccelerationY")]
        public List<int> AngularAccelerationY { get; set; }

        [BsonElement("angularAccelerationZ")]
        public List<int> AngularAccelerationZ { get; set; }

        [BsonElement("timeInterval")]
        public List<int> TimeInterval { get; set; }
    }
}

