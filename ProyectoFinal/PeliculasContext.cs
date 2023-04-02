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
                genero.ToTable("Generos");
                genero.HasKey(Genero => Genero.GeneroId);
                genero.Property(Genero => Genero.Nombre).IsRequired().HasMaxLength(100);
                genero.HasData(categoriasInit);

            });


            modelBuilder.Entity<Usuario>(usuario =>
            {

                usuario.ToTable("Usuario");
                usuario.HasKey(Usuario => Usuario.UsuarioId);
                usuario.Property(Usuario => Usuario.Nombre).IsRequired().HasMaxLength(100);
                usuario.Property(Usuario => Usuario.User).IsRequired().HasMaxLength(100);
                usuario.Property(Usuario => Usuario.Email).IsRequired().HasMaxLength(100);
                usuario.Property(Usuario => Usuario.Password).IsRequired().HasMaxLength(100);
            });
        
            modelBuilder.Entity<Pelicula>(peliculas =>
            {
                peliculas.ToTable("Pelicula");
                peliculas.HasKey(Pelicula => Pelicula.Id);
                peliculas.HasOne(p => p.Genero).WithMany(p => p.movies).HasForeignKey(p => p.GeneroId);
                peliculas.HasOne(p => p.Usuario).WithMany(p => p.pelicula).HasForeignKey(p => p.UsuarioId);
                peliculas.Property(Pelicula => Pelicula.Titulo).IsRequired().HasMaxLength(100);
                peliculas.Property(Pelicula => Pelicula.Año).IsRequired();
                peliculas.Property(Pelicula => Pelicula.Director).IsRequired().HasMaxLength(100);
                peliculas.Property(Pelicula => Pelicula.Imagen).IsRequired().HasMaxLength(100);
            });


        }
    }
}
