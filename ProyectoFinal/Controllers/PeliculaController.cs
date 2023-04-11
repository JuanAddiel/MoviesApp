using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
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
        PeliculasContext dbCOntext;


        public PeliculaController(PeliculasContext dbContext)
        {
            _peliculaService = new CRUDServices<Pelicula>(dbContext);
            dbCOntext = dbContext;
        }

        [HttpGet("getPeliculasBy")]
        public async Task<IActionResult> getPeliculasBy(int? año = null, string director = null, int genero = 0, string titulo=null)
        {
                var query = dbCOntext.Pelicula.AsQueryable();

                if (!string.IsNullOrEmpty(titulo))
                {
                    query = query.Where(p => p.Titulo == titulo);
                }
                if (año != null)
                {
                query = query.Where(p => p.Año.Year == año);
                }

                if (!string.IsNullOrEmpty(director))
                {
                    query = query.Where(p => p.Director == director);
                }

                if (genero != 0)
                {
                    query = query.Where(p => p.GeneroId == genero);
                }

                var peliculas = await query.ToListAsync();

                return Ok(peliculas);
            }

        



        [HttpGet("getPelicula/{id}")]
        public async Task<ActionResult<Pelicula>> LeerPelicula(int id)
        {
            var resultado = await _peliculaService.GetById(id);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }


        private  string Upload(IFormFile file, int id)
        {
            string basePath = $"/Movies/{id}";
            string path = Path.Combine(Directory.GetCurrentDirectory(), $"Imagen{basePath}");
            if(!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            Guid guid = Guid.NewGuid();
            FileInfo fileinfo = new(file.FileName);
            string fileName = guid+fileinfo.Extension;
            string filenNameWithPath = Path.Combine(path, fileName);
            using (var stream = new FileStream(filenNameWithPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return Path.Combine(basePath,fileName);
        }


        [HttpPost("createPelicula")]
        public async Task<ActionResult<Pelicula>> CrearPelicula([FromForm] Pelicula pelicula)
        {
       

            var resultado = await _peliculaService.Create(pelicula);


            var imagePath = Upload(pelicula.Archivo, resultado.Id);
            pelicula.Imagen = imagePath;

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
