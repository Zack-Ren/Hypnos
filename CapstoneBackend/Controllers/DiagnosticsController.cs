using System;
using CapstoneBackend.Models;
using CapstoneBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneBackend.Controllers
{
    [ApiController]
    [Route("api/Diagnostic")]
    public class DiagnosticController : Controller
    {
        private readonly DiagnosticsService _diagnosticsService;

        public DiagnosticController(DiagnosticsService diagnosticsService) =>
            _diagnosticsService = diagnosticsService;

        [HttpGet]
        public async Task<List<Diagnostics>> Get() =>
            await _diagnosticsService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Diagnostics>> Get(string id)
        {
            var diagnostics = await _diagnosticsService.GetAsync(id);

            if (diagnostics is null)
            {
                return NotFound();
            }

            return diagnostics;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Diagnostics newDiagnostic)
        {
            await _diagnosticsService.CreateAsync(newDiagnostic);

            return CreatedAtAction(nameof(Get), new { id = newDiagnostic.Id }, newDiagnostic);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Diagnostics updatedDiagnostic)
        {
            var diagnostics = await _diagnosticsService.GetAsync(id);

            if (diagnostics is null)
            {
                return NotFound();
            }

            updatedDiagnostic.Id = diagnostics.Id;

            await _diagnosticsService.UpdateAsync(id, updatedDiagnostic);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var diagnostics = await _diagnosticsService.GetAsync(id);

            if (diagnostics is null)
            {
                return NotFound();
            }

            await _diagnosticsService.RemoveAsync(id);

            return NoContent();
        }
    }
}

