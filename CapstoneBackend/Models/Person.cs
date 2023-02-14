using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstoneBackend.Models
{
	public class Person
	{
        [BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("phoneNumber")]
        public int PhoneNumber { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }
    }
}

