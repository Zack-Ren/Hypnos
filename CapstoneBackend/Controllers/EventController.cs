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
    [Route("api/Event")]
    public class EventController : Controller
    {
        private readonly ManagementService _managementService;

        public EventController(ManagementService managementService) =>
            _managementService = managementService;

        [HttpGet]
        public async Task<List<Event>> Get() =>
            await _managementService.GetEventsAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> Get(string id)
        {
            var eventEntity = await _managementService.GetEventAsync(id);

            if (eventEntity is null)
            {
                return NotFound();
            }

            return eventEntity;
        }

        [HttpGet("Filter")]
        public async Task<ActionResult<Event>> Get(string ?doctorId, string ?patientId)
        {
            if (doctorId == null && patientId == null)
            {
                throw new Exception($"{nameof(doctorId)} and {nameof(patientId)} cannot both be null.");
            } else
            {
                var eventEntity = await _managementService.GetEventByDoctorOrPatient(doctorId, patientId);

                if (eventEntity is null)
                {
                    return NotFound();
                }

                return eventEntity;
            } 
        }

        [HttpPost]
        public async Task<IActionResult> Post(Event newEvent)
        {
            await _managementService.CreateEventAsync(newEvent);

            return CreatedAtAction(nameof(Get), new { id = newEvent.Id }, newEvent);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Event updatedEvent)
        {
            var eventEntity = await _managementService.GetEventAsync(id);

            if (eventEntity is null)
            {
                return NotFound();
            }

            updatedEvent.Id = eventEntity.Id;

            await _managementService.UpdateEventAsync(id, updatedEvent);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var eventEntity = await _managementService.GetEventAsync(id);

            if (eventEntity is null)
            {
                return NotFound();
            }

            await _managementService.RemoveEventAsync(id);

            return NoContent();
        }
    }
}

