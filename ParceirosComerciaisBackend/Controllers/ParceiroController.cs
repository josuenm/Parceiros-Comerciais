

using Microsoft.AspNetCore.Mvc;
using ParceirosComerciais.Dtos;
using ParceirosComerciais.Models;
using ParceirosComerciais.Services;


namespace ParceirosComerciais.Controllers 
{

    [ApiController]
    [Route("api/v1/parceiros")]
    public class ParceiroController : ControllerBase
    {
        private readonly ParceiroService _service;

        public ParceiroController(ParceiroService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<List<Parceiro>> FindAll([FromQuery] string? search) 
        {
            return await _service.FindAll(search);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CriarParceiroDto body)
        {
            await _service.Create(body);
            return StatusCode(201);
        }

    }

}