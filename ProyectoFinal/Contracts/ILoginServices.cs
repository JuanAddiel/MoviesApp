using ProyectoFinal.Model;

namespace ProyectoFinal.Contracts
{
    public interface ILoginServices
    {
        Task<Usuario>  Login(Usuario usuario);
        Task<Usuario> SignUp(Usuario usuario);

    }
}
