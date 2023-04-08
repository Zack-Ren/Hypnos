﻿using MongoDB.Bson.Serialization.Attributes;
using System;
namespace CapstoneBackend.Models
{
	public class Patient : Person
	{
        [BsonElement("doctorId")]
        public string? DoctorId { get; set; }

        [BsonElement("setOfEvents")]
        public HashSet<string> SetOfEvents { get; set; }
    }
}

