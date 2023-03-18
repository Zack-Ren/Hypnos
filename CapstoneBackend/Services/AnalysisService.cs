using CapstoneBackend.Models;
using Microsoft.Extensions.Options;
using System;
using MongoDB.Driver;

namespace CapstoneBackend.Services
{
    public class AnalysisService : DiagnosticsService
    {
        // Inherit constructor from DiagnosticsService
        public AnalysisService(
            IOptions<DatabaseSettings> DatabaseSettings, IConfiguration config
        ) : base(DatabaseSettings, config)
        {
        }
    }
}