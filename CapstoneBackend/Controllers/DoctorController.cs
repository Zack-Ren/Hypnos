using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CapstoneBackend.Services;
using CapstoneBackend.Models;

namespace CapstoneBackend.Controllers
{
    [ApiController]
    [Route("api/Doctor")]
    public class DoctorController : Controller
    {
        private readonly ManagementService _managementService;

        public DoctorController(ManagementService managementService)
        {
            _managementService = managementService;
        }

        [HttpGet]
        public async Task<List<Doctor>> Get() =>
            await _managementService.GetDoctorsAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> Get(string id)
        {
            var doctor = await _managementService.GetDoctorAsync(id);

            if (doctor is null)
            {
                return NotFound();
            }

            return doctor;
        }

        [HttpGet("Patient")]
        public async Task<ActionResult<Doctor>> GetDoctorOfAPatient(string id)
        {
            var doctor = await _managementService.GetDoctorByPatient(id);

            if (doctor is null)
            {
                return NotFound();
            }

            return doctor;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Doctor newDoctor)
        {
            await _managementService.CreateDoctorAsync(newDoctor);

            return CreatedAtAction(nameof(Get), new { id = newDoctor.Id }, newDoctor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Doctor updatedDoctor)
        {
            var doctor = await _managementService.GetDoctorAsync(id);

            if (doctor is null)
            {
                return NotFound();
            }

            updatedDoctor.Id = doctor.Id;

            await _managementService.UpdateDoctorAsync(id, updatedDoctor);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var doctor = await _managementService.GetDoctorAsync(id);

            if (doctor is null)
            {
                return NotFound();
            }

            await _managementService.RemoveDoctorAsync(doctor);

            return NoContent();
        }
    }
}

