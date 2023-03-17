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
            var analysis = await _analysisService.GetAsync(id);

            if (analysis is null)
            {
                return NotFound();
            }

            return analysis;
        }
    }
}