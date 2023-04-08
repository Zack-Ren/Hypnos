using System;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstoneBackend.Models
{
    public class Login
    {
        [BsonElement("username")]
        public string username { get; set; }

        [BsonElement("password")]
        public string password { get; set; }
    }
}