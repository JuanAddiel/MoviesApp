using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProyectoFinal.Contracts;
using ProyectoFinal.Model;
using System.Security.Authentication;
using System.Text;

namespace ProyectoFinal.Services
{
  
    public class LoginServices:ILoginServices
    {
        private readonly IConfiguration _config;
        private readonly PeliculasContext context;
        public LoginServices(PeliculasContext context, IConfiguration config) 
        {
            this.context = context;
            _config = config;
        }

        public async Task<Usuario> Login(Usuario usuario)
        {
            var usuarioExistente = await context.Usuarios.FirstOrDefaultAsync(u => u.NombreUser == usuario.NombreUser && u.Password == usuario.Password);

                if (usuarioExistente != null)
                {
                    // Si se encuentra el usuario, devuelve el objeto de usuario completo
                    return usuarioExistente;
                }
                else
                {
                    // Si el usuario no existe o la contraseña es incorrecta, devuelve nulo
                    return null;
                }
            
        }

        public async Task<Usuario> SignUp(Usuario usuario)
        {
            if (await context.Usuarios.AnyAsync(u => u.NombreUser == usuario.NombreUser))
            {
                throw new Exception("Ya existe un usuario con este nombre de usuario.");
            }
            await context.Set<Usuario>().AddAsync(usuario);
            await context.SaveChangesAsync();
            return usuario;
        }

    }
}
