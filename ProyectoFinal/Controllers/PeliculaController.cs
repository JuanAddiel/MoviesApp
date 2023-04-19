using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Contracts;
using ProyectoFinal.Model;
using ProyectoFinal.Services;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace ProyectoFinal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeliculaController : Controller
    {
        ICRUDServices<Pelicula> _peliculaService;
        PeliculasContext dbCOntext;
        IImagen imagen;
        private readonly IHostingEnvironment hosting;

        public PeliculaController(PeliculasContext dbContext, IHostingEnvironment hosting)
        {
            _peliculaService = new CRUDServices<Pelicula>(dbContext);
            dbCOntext = dbContext;
            this.hosting = hosting;
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


        [HttpPost("createPelicula")]
        public async Task<ActionResult<Pelicula>> CrearPelicula([FromForm] Pelicula pelicula, [FromForm] IFormFile imagen)
        {
            // Comprueba si se ha proporcionado una imagen.
            string rutaImagen = null;
            if (imagen != null)
            {
                // Genera un nombre de archivo único para la imagen.
                string nombreArchivo = Guid.NewGuid().ToString() + Path.GetExtension(imagen.FileName);

                // Obtiene la ruta de la carpeta "imagenes".
                string carpetaImagenes = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "imagen");

                // Crea la carpeta si no existe.
                if (!Directory.Exists(carpetaImagenes))
                {
                    Directory.CreateDirectory(carpetaImagenes);
                }

                // Guarda la imagen en el sistema de archivos.
                rutaImagen = Path.Combine(carpetaImagenes, nombreArchivo);
                using (var stream = new FileStream(rutaImagen, FileMode.Create))
                {
                    await imagen.CopyToAsync(stream);
                }

                // Asigna la ruta de la imagen a la propiedad de imagen de la película.
                pelicula.Imagen = nombreArchivo;
            }
            else
            {
                // Si no se ha proporcionado una imagen, asigna una ruta predeterminada.
                pelicula.Imagen = "rutaPredeterminada.jpg";
            }

            // Llama al método Create en el servicio de películas y devuelve el resultado.
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
        public async Task<ActionResult<Pelicula>> ActualizarPelicula(int id, [FromForm] Pelicula pelicula, [FromForm] IFormFile imagen)
        {
            string rutaImagen = null;
            if (imagen != null)
            {
                // Genera un nombre de archivo único para la imagen.
                string nombreArchivo = Guid.NewGuid().ToString() + Path.GetExtension(imagen.FileName);

                // Obtiene la ruta de la carpeta "imagenes".
                string carpetaImagenes = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "imagen");


                // Crea la carpeta si no existe.
                if (!Directory.Exists(carpetaImagenes))
                {
                    Directory.CreateDirectory(carpetaImagenes);
                }

                // Guarda la imagen en el sistema de archivos.
                rutaImagen = Path.Combine(carpetaImagenes, nombreArchivo);
                using (var stream = new FileStream(rutaImagen, FileMode.Create))
                {
                    await imagen.CopyToAsync(stream);
                }

                // Asigna la ruta de la imagen a la propiedad de imagen de la película.
                pelicula.Imagen = nombreArchivo;
            }
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

        private bool IsImageValid(IFormFile file)
        {
            if (file.ContentType.ToLower() != "image/jpg" &&
                file.ContentType.ToLower() != "image/jpeg" &&
                file.ContentType.ToLower() != "image/pjpeg" &&
                file.ContentType.ToLower() != "image/gif" &&
                file.ContentType.ToLower() != "image/x-png" &&
                file.ContentType.ToLower() != "image/png")
            {
                return false;
            }

            return true;
        }
    }
}
