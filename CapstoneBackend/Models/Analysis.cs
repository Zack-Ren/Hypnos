using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstoneBackend.Models
{
    public class Analysis : Diagnostics
    {
        [BsonElement("windowLength")]
        public int WindowLength {get;}

        [BsonElement("sleepPositions")]
        public List<string> SleepPositions {get;}

        [BsonElement("breathingRates")]
        public List<double> BreathingRates {get;}
    }

    // Create new Analysis object from Diagnostic object
    public Analysis(Diagnostics _diagnostics)
    {
        this.Id = _diagnostics.Id;
        this.PatientId = _diagnostics.PatientId;
        this.DataAcquisitionStartTime = _diagnostics.DataAcquisitionStartTime;
        this.DataAcquisitionEndTime = _diagnostics.DataAcquisitionEndTime;
        this.AccelerationX = _diagnostics.AccelerationX;
        this.AccelerationY = _diagnostics.AccelerationY;
        this.AccelerationZ = _diagnostics.AccelerationY;
        this.AngularAccelerationX = _diagnostics.AngularAccelerationX;
        this.AngularAccelerationY = _diagnostics.AngularAccelerationY;
        this.AngularAccelerationZ = _diagnostics.AngularAccelerationZ;
        this.WindowLength = 60;
        this.SleepPositions = new List<string>();
        this.BreathingRates = new List<double>();
    }
}