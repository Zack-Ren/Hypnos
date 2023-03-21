using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CapstoneBackend.Services;
using CapstoneBackend.Models;
using Microsoft.AspNetCore.Cors;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CapstoneBackend.Controllers
{
    [ApiController]
    [Route("/api/Patient")]
    public class PatientController : Controller
    {
        private readonly ManagementService _managementService;

        public PatientController(ManagementService managementService) =>
            _managementService = managementService;

        [HttpGet]
        [EnableCors]
        public async Task<List<Patient>> Get() =>
            await _managementService.GetPatientAsync();

        [HttpGet("{id}")]
        [EnableCors]
        public async Task<ActionResult<Patient>> Get(string id)
        {
            var patient = await _managementService.GetPatientAsync(id);

            if (patient is null)
            {
                return NotFound();
            }

            return patient;
        }

        [HttpGet("Doctor")]
        public async Task<ActionResult<Patient>> GetPatientWithTheDoctor(string id)
        {
            var patient = await _managementService.GetPatientByDoctor(id);

            if (patient is null)
            {
                return NotFound();
            }

            return patient;
        }

        [HttpPost]
        [EnableCors]
        public async Task<IActionResult> Post(Patient newPatient)
        {
            await _managementService.CreatePatientAsync(newPatient);

            return CreatedAtAction(nameof(Get), new { id = newPatient.Id }, newPatient);
        }

        [HttpPut("{id}")]
        [EnableCors]
        public async Task<IActionResult> Update(string id, Patient updatedPatient)
        {
            var patient = await _managementService.GetPatientAsync(id);

            if (patient is null)
            {
                return NotFound();
            }

            await _managementService.UpdatePatientAsync(id, updatedPatient);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [EnableCors]
        public async Task<IActionResult> Delete(string id)
        {
            var patient = await _managementService.GetPatientAsync(id);

            if (patient is null)
            {
                return NotFound();
            }

            await _managementService.RemovePatientAsync(patient);

            return NoContent();
        }
    }
}

