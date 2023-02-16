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

        [BsonElement("dataAcquisitionEndTime")]
        public DateTime DataAcquisitionEndTime { get; set; }

        [BsonElement("accelerationX")]
        public List<double> AccelerationX { get; set; }

        [BsonElement("accelerationY")]
        public List<double> AccelerationY { get; set; }

        [BsonElement("accelerationZ")]
        public List<double> AccelerationZ { get; set; }

        [BsonElement("angularAccelerationX")]
        public List<double> AngularAccelerationX { get; set; }

        [BsonElement("angularAccelerationY")]
        public List<double> AngularAccelerationY { get; set; }

        [BsonElement("angularAccelerationZ")]
        public List<double> AngularAccelerationZ { get; set; }
    }
}

