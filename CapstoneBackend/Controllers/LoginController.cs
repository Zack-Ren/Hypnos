using System;
using CapstoneBackend.Models;
using CapstoneBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneBackend.Controllers
{
    [ApiController]
    [Route("api/Login")]
    public class LoginController : Controller
    {
        private readonly PersonService _personService;

        public LoginController(PersonService personService) =>
            _personService = personService;


        [HttpPost]
        public async Task<IActionResult> Post(Login newLogin)
        {
            var person = await _personService.Authenticate(newLogin.username, newLogin.password);

            if (person == null)
            {
                return BadRequest(new { message = "Username or Password is incorrect." });
            }

            return Ok(new { message = "Person has successfully been authenticated." });
        }
    }
}
