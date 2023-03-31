using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Model;
using System.Data.Common;
using System.Threading;

namespace ProyectoFinal
{
    public class PeliculasContext:DbContext
    {
        public DbSet<Pelicula> Pelicula { get; set; }
        public DbSet<Genero> Generos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        public PeliculasContext(DbContextOptions<PeliculasContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            List<Genero> categoriasInit = new List<Genero>();
            categoriasInit.Add(new Genero() { GeneroId = 1, Nombre = "Juan Addiel"});
            categoriasInit.Add(new Genero() { GeneroId = 2, Nombre = "Addiel" });

            modelBuilder.Entity<Genero>(genero =>
            {
                genero.ToTable("Genero");
                genero.HasKey(Genero => Genero.GeneroId);
                genero.Property(Genero => Genero.Nombre).IsRequired().HasMaxLength(100);
                genero.HasData(categoriasInit);

            });

            List<Pelicula> peliculas2 = new List<Pelicula>();
            peliculas2.Add(new Pelicula() { Id = 1, Titulo = "El Padrino", Año = new DateTime(1972, 3, 24), Director = "Francis Ford Coppola", Imagen = "https://www.cinepremiere.com.mx/wp-content/uploads/2019/03/El-Padrino-1.jpg", GeneroId = 1 });
            peliculas2.Add(new Pelicula() { Id = 2, Titulo = "El Padrino 2", Año = new DateTime(1974, 12, 20), Director = "Francis Ford Coppola", Imagen = "https://www.cinepremiere.com.mx/wp-content/uploads/2019/03/El-Padrino-2.jpg", GeneroId = 1 });
            modelBuilder.Entity<Pelicula>(peliculas =>
            {
                peliculas.ToTable("Pelicula");
                peliculas.HasKey(Pelicula => Pelicula.Id);
                peliculas.HasOne(p => p.Genero).WithMany(p => p.movies).HasForeignKey(p => p.GeneroId);
                peliculas.Property(Pelicula => Pelicula.Titulo).IsRequired().HasMaxLength(100);
                peliculas.Property(Pelicula => Pelicula.Año).IsRequired();
                peliculas.Property(Pelicula => Pelicula.Director).IsRequired().HasMaxLength(100);
                peliculas.Property(Pelicula => Pelicula.Imagen).IsRequired().HasMaxLength(100);
                peliculas.HasData(peliculas2);
               
            });

            modelBuilder.Entity<Usuario>(usuario =>
            { 

                usuario.ToTable("Usuario");
                usuario.HasKey(Usuario => Usuario.Id);
                usuario.Property(Usuario => Usuario.Nombre).IsRequired().HasMaxLength(100);
                usuario.Property(Usuario => Usuario.User).IsRequired().HasMaxLength(100);
                usuario.Property(Usuario => Usuario.Email).IsRequired().HasMaxLength(100);
                usuario.Property(Usuario => Usuario.Password).IsRequired().HasMaxLength(100);
            }); 

        }
    }
}
