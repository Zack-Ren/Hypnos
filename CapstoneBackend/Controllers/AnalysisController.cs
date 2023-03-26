using System;
using CapstoneBackend.Models;
using CapstoneBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneBackend.Controllers
{
    [ApiController]
    [Route("api/Analysis")]
    public class AnalysisController : Controller
    {
        private readonly AnalysisService _analysisService;

        public AnalysisController(AnalysisService analysisService) =>
            _analysisService = analysisService;

        [HttpGet("{id}")]
        public async Task<ActionResult<Analysis>> Get(string id)
        {
            var diagnostics = await _analysisService.GetAsync(id);

            if (diagnostics is null)
            {
                return NotFound();
            }

            Analysis analysis = new Analysis(diagnostics);
            analysis.findSleepPositions(analysis.AccelerationX, analysis.AccelerationZ, analysis.SleepPositions, analysis.SleepPositionFractions);
            analysis.findBreathingRates(analysis.AccelerationY, analysis.BreathingRates, analysis.WindowLength);

            return analysis;
        }
    }
}