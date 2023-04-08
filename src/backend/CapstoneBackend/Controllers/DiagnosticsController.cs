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
        private readonly ManagementService _managementService;

        public DiagnosticController(ManagementService managementService) =>
            _managementService = managementService;

        [HttpGet]
        public async Task<List<Diagnostics>> Get() =>
            await _managementService.GetDiagnosticsAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Diagnostics>> Get(string id)
        {
            var diagnostics = await _managementService.GetDiagnosticAsync(id);

            if (diagnostics is null)
            {
                return NotFound();
            }

            return diagnostics;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Diagnostics newDiagnostic)
        {
            await _managementService.CreateDiagnosticAsync(newDiagnostic);

            return CreatedAtAction(nameof(Get), new { id = newDiagnostic.Id }, newDiagnostic);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Diagnostics updatedDiagnostic)
        {
            var diagnostics = await _managementService.GetDiagnosticAsync(id);

            if (diagnostics is null)
            {
                return NotFound();
            }

            updatedDiagnostic.Id = diagnostics.Id;

            await _managementService.UpdateDiagnosticAsync(id, updatedDiagnostic);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var diagnostics = await _managementService.GetDiagnosticAsync(id);

            if (diagnostics is null)
            {
                return NotFound();
            }

            await _managementService.RemoveDiagnosticAsync(id);

            return NoContent();
        }
    }
}

