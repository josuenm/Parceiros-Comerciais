


using Microsoft.AspNetCore.Mvc;
using ParceirosComerciais.Services;

namespace ParceirosComerciais.Controllers
{

    [ApiController]
    [Route("api/v1/status")]
    public class StatusCOntroller : ControllerBase
    {
        
        [HttpGet]
        public IActionResult Status()
        {
            return Ok(new
            {
                status = "ok",
                timestamp = DateTime.UtcNow
            });
        }

    }

}