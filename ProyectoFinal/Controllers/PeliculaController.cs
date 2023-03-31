using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Contracts;
using ProyectoFinal.Model;
using ProyectoFinal.Services;

namespace ProyectoFinal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeliculaController : Controller
    {
        ICRUDServices<Pelicula> _peliculaService;

        public PeliculaController(PeliculasContext dbContext)
        {
            _peliculaService = new CRUDServices<Pelicula>(dbContext);
        }

        [HttpPost("createPelicula")]
        public async Task<ActionResult<Pelicula>> CrearPelicula(Pelicula pelicula)
        {
            var resultado = await _peliculaService.Create(pelicula);
            return Ok(resultado);
        }

        [HttpGet("getPelicula")]
        public async Task<ActionResult<Genero>> LeerPelicula()
        {
            var resultado = await _peliculaService.Read();
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }

        [HttpPut("updatePelicula/{id}")]
        public async Task<ActionResult<Pelicula>> ActualizarPelicula(int id, Pelicula pelicula)
        {
            var resultado = await _peliculaService.Update(pelicula, id);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }

        [HttpDelete("deletePelicula/{id}")]
        public async Task<ActionResult<Genero>> BorrarPelicula(int id)
        {
            var resultado = await _peliculaService.Delete(id);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }
    }
}
