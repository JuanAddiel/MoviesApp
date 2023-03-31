using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Threading;

namespace ProyectoFinal.Model
{
    public class Genero
    {
        public int GeneroId { get; set; }
        public string Nombre { get; set; }

        [JsonIgnore]
        public virtual List<Pelicula> ?movies{ get; set; }
    }
}
