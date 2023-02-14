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
        private readonly EventService _eventEntityService;

        public EventController(EventService eventEntityService) =>
            _eventEntityService = eventEntityService;

        [HttpGet]
        public async Task<List<Event>> Get() =>
            await _eventEntityService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> Get(string id)
        {
            var eventEntity = await _eventEntityService.GetAsync(id);

            if (eventEntity is null)
            {
                return NotFound();
            }

            return eventEntity;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Event newEvent)
        {
            await _eventEntityService.CreateAsync(newEvent);

            return CreatedAtAction(nameof(Get), new { id = newEvent.Id }, newEvent);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Event updatedEvent)
        {
            var eventEntity = await _eventEntityService.GetAsync(id);

            if (eventEntity is null)
            {
                return NotFound();
            }

            updatedEvent.Id = eventEntity.Id;

            await _eventEntityService.UpdateAsync(id, updatedEvent);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var eventEntity = await _eventEntityService.GetAsync(id);

            if (eventEntity is null)
            {
                return NotFound();
            }

            await _eventEntityService.RemoveAsync(id);

            return NoContent();
        }
    }
}

