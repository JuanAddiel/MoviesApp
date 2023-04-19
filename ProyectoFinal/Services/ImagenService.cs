using ProyectoFinal.Contracts;
using ProyectoFinal.Model;

namespace ProyectoFinal.Services
{
    public class ImagenService:IImagen
    {
        public ImagenService() { }

        public string SubirImagen(IFormFile file) 
        {
            string ruta = @"C:\Imagenes";
            string nombre = Guid.NewGuid().ToString()+file.FileName;
            if (!Directory.Exists(ruta))
            {
                Directory.CreateDirectory(ruta);
            }

            var archivo = Path.Combine(ruta, nombre);

            using(var stream = File.Create(archivo))
            {
                file.CopyTo(stream);
            }

            return "Archivo subido con exito";
        }
    }
}
