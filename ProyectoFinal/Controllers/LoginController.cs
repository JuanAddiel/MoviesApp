using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoFinal.Contracts;
using ProyectoFinal.Model;
using ProyectoFinal.Services;

namespace ProyectoFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        ILoginServices loginServices;
        ICRUDServices<Usuario> usuario;

        public LoginController(ILoginServices loginServices, PeliculasContext dbContext)
        {
            this.loginServices = loginServices;
            usuario = new CRUDServices<Usuario>(dbContext);
        }

        [HttpGet("getUsuario")]
        public async Task<ActionResult<Usuario>> LeerUsuario()
        {
            var resultado = await usuario.Read();
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] Usuario usuario)
        {
            var resultado = await loginServices.Login(usuario);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromForm] Usuario usuario)
        {
            var resultado = await loginServices.SignUp(usuario);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }   
    }
}
