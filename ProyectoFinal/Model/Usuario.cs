using System.Text.Json.Serialization;

namespace ProyectoFinal.Model
{
    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string Nombre { get; set; }
        public string User { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }


        [JsonIgnore]
        public List<Pelicula> pelicula { get; set; }
    }
}
