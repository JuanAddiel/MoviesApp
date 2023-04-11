using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Threading;

namespace ProyectoFinal.Model
{
    public class Pelicula
    {
        public int Id { get; set; }
        public int GeneroId { get; set; }
        public int UsuarioId { get; set; }
        public string Titulo { get; set; }
        public DateTime Año { get ; set; }
        public string Director { get; set; }

        public string Imagen { get; set; }

        [NotMapped]
        public IFormFile Archivo { get; set; }

   
        [JsonIgnore]
        public Usuario Usuario { get; set; }
        [JsonIgnore]
        public Genero ?Genero { get; set; }


       

    }
}
