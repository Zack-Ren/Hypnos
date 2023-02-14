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
        private readonly DoctorService _doctorService;

        public DoctorController(DoctorService doctorService) =>
            _doctorService = doctorService;

        [HttpGet]
        public async Task<List<Doctor>> Get() =>
            await _doctorService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> Get(string id)
        {
            var doctor = await _doctorService.GetAsync(id);

            if (doctor is null)
            {
                return NotFound();
            }

            return doctor;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Doctor newDoctor)
        {
            await _doctorService.CreateAsync(newDoctor);

            return CreatedAtAction(nameof(Get), new { id = newDoctor.Id }, newDoctor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Doctor updatedDoctor)
        {
            var doctor = await _doctorService.GetAsync(id);

            if (doctor is null)
            {
                return NotFound();
            }

            updatedDoctor.Id = doctor.Id;

            await _doctorService.UpdateAsync(id, updatedDoctor);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var doctor = await _doctorService.GetAsync(id);

            if (doctor is null)
            {
                return NotFound();
            }

            await _doctorService.RemoveAsync(id);

            return NoContent();
        }
    }
}

