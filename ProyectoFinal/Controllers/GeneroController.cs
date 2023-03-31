using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Contracts;
using ProyectoFinal.Model;
using ProyectoFinal.Services;

namespace ProyectoFinal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeneroController : Controller
    {
        ICRUDServices<Genero> _generoService;

        public GeneroController(PeliculasContext dbContext)
        {
            _generoService = new CRUDServices<Genero>(dbContext);
        }

        [HttpPost("createGenero")]
        public async Task<ActionResult<Genero>> CrearGenero( Genero genero)
        {
            var resultado = await _generoService.Create(genero);
            return Ok(resultado);
        }

        [HttpGet("getGenero")]
        public async Task<ActionResult<Genero>> LeerGenero()
        {
            var resultado = await _generoService.Read();
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }

        [HttpPut("updateGenero/{id}")]
        public async Task<ActionResult<Genero>> ActualizarGenero(int id, Genero genero)
        {
            var resultado = await _generoService.Update(genero, id);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }

        [HttpDelete("deleteGenero/{id}")]
        public async Task<ActionResult<Genero>> BorrarGenero(int id)
        {
            var resultado = await _generoService.Delete(id);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }
    }
}
