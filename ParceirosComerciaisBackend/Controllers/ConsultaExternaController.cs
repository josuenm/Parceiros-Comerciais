


using Microsoft.AspNetCore.Mvc;
using ParceirosComerciais.Services;

namespace ParceirosComerciais.Controllers
{

    [ApiController]
    [Route("api/v1/externo")]
    public class ConsultaExternaController : ControllerBase
    {
        private readonly ConsultaExternaService _service;

        public ConsultaExternaController(ConsultaExternaService service)
        {
            _service = service;
        }

        [HttpGet("cep/{cep}")]
        public async Task<IActionResult> GetCEP(string cep)
        {
            if (string.IsNullOrWhiteSpace(cep))
                return BadRequest("CEP inválido");

            return Ok(await _service.GetCEP(cep));
        }

        [HttpGet("cnpj/{cnpj}")]
        public async Task<IActionResult> GetCNPJ(string cnpj)
        {
            if (string.IsNullOrWhiteSpace(cnpj))
                return BadRequest("CNPJ inválido");

            return Ok(await _service.GetCNPJ(cnpj));
        }

    }

}