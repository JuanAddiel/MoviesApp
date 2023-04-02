using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal;
using ProyectoFinal.Contracts;
using ProyectoFinal.Controllers;
using ProyectoFinal.Model;
using ProyectoFinal.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSqlServer<PeliculasContext>(builder.Configuration.GetConnectionString("MoviesPlayer"));
builder.Services.AddDbContext<PeliculasContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MoviesPlayer")));
builder.Services.AddScoped<ICRUDServices<Genero>, CRUDServices<Genero>>();
builder.Services.AddScoped<ICRUDServices<Pelicula>, CRUDServices<Pelicula>>();
builder.Services.AddControllers(
options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Configure the HTTP request pipeline.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<PeliculasContext>();
    context.Database.EnsureCreated();
}


// Configure the HTTP request pipeline.

app.UseCors(a => a.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
