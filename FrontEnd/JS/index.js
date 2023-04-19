$(document).ready(function () {
  movieList();
  
 
  const miVariable = localStorage.getItem("miVariable");
console.log(miVariable);
  
  {/* */}
  

  async function getGenero () {
    await $.ajax({
      url: 'https://localhost:7281/api/Genero/getGenero',
      method: 'GET',
      success: function (genero) {
        genero.forEach(function (sx) {
          $('#gender').append($('<option>').text(sx.nombre).val(sx.generoId));
        });
      }
    });
    
    }

  async function getGeneroBy() {
    try {
      const año = $("#fecha").val();
      const director = $("#direct").val();
      const genero = $("#gender").val();
      const titulo = $("#title").val();
      let url = `https://localhost:7281/api/Pelicula/getPeliculasBy?`;

      
      if(año!==""){
        url+=`año=${año}`;
      }

      if(titulo){
        url+=`titulo=${titulo}`;
        console.log(url)
      }

      if(director!==""){
        url+=`director=${director}`;
      }
      if(genero==="0"){

      }else{
        url+=`genero=${genero}`;
        console.log("Hola")
        
      }
      
      const response = await fetch(url);
     console.log(response)
      const data = await response.json();
      console.log(data);
      const filteredData = data.filter(x => x.usuarioId === parseInt(miVariable));
      filtrodor(filteredData); // display the filtered movie data
      Reset();
    } catch (error) {
      console.error(error);
    }
  }
  
  
  async function getGeneroId(generoId) {
    try {
      const response = await fetch(`https://localhost:7281/api/Genero/getGenero/${generoId}`);
      const data = await response.json();
  
      return data.nombre;
    
    } catch (error) {
      console.error(error);
    }
  }
  

  
  async function getData() {
    try {
      const url = 'https://localhost:7281/api/Pelicula/getPelicula';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener datos');
      }
      const data = await response.json();
      const filteredData = data.filter(x => x.usuarioId === parseInt(miVariable));

      showData(filteredData);
    } catch (error) {
      console.log(error);
    }
  }


  async function filtrodor(data) {
    try {
      var verdata = "";
    
      await Promise.all(data.map(async (element) => { // utilizamos Promise.all para esperar a que todas las promesas se resuelvan
        var fecha = new Date(element.año);
  
        const nombreGenero = await getGeneroId(element.generoId); // utilizamos await para esperar a que se resuelva la promesa de getGeneroId()
  
        verdata += `<div class="col-md-4 mt-5">
          <div class="card bg-success text-light">
      
            <div class="card-body">
      
              <h4 class="card-title">${element.titulo}</h4>
              <img src="/../../imagen/${element.imagen}" class="card-img-top img-responsive" alt="${element.titulo}">
              <h5 class="card-title">Año publicacion: ${fecha.getFullYear()}</h5>
              <h5 class="card-title">Director: ${element.director}</h5>
              <h5 class="card-title" id="nombre">Genero: ${nombreGenero}</h5> <!-- utilizamos la variable 'nombreGenero' aquí -->
              <h5 class="card-title"></h5>
            </div>
      
            
          </div>
        </div> `;
        console.log(element.imagen)
      }));
  
      $("#card").html(verdata);
    } catch (error) {
      console.error(error);
    }
  }
  
  function Reset() {

    const inputs = [
      { id: "gender" },
      {id: "direct"}, 
      {id: "title"},
      {id: "fecha"}
    ];

    inputs.forEach(input => {
      const $input = $("#" + input.id);
    
      if (input.id === "gender") {
        $input.val("0");
      } else {
        $input.val("").removeClass("input-error input-success");
      }
    });
    
  }


  async function showData(data) {
    try {
      var verdata = "";
    
      await Promise.all(data.map(async (element) => { // utilizamos Promise.all para esperar a que todas las promesas se resuelvan
        var fecha = new Date(element.año);
  
        const nombreGenero = await getGeneroId(element.generoId); // utilizamos await para esperar a que se resuelva la promesa de getGeneroId()
  
        verdata += `<div class="col-md-4 mt-5">
          <div class="card bg-success text-light">
      
            <div class="card-body">
      
              <h4 class="card-title">${element.titulo}</h4>
              <img src="/../../imagen/${element.imagen}" class="card-img-top img-responsive" alt="${element.titulo}">
              <h5 class="card-title">Año publicacion: ${fecha.getFullYear()}</h5>
              <h5 class="card-title">Director: ${element.director}</h5>
              <h5 class="card-title" id="nombre">Genero: ${nombreGenero}</h5> <!-- utilizamos la variable 'nombreGenero' aquí -->
              <h5 class="card-title"></h5>
            </div>
      
            
          </div>
        </div> `;
      }));
  
      $("#card").html(verdata);
    } catch (error) {
      console.error(error);
    }
  }
  
  
  
  

  
  
  function movieList(){
  

    const movieLis=`
    <section class="py-5 text-center container">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">Observar Peliculas</h1>
                <p class="lead text-muted">Una aplicacion hecha para crear Peliculas.</p>
            </div>
        </div>


    <div class="col-md-6 offset-3 ">
        <div class="input-group">
            <select class="form-select" id="gender">
                <option  value="0">Seleccione un genero</option>

            </select>
            <button class="btn btn-primary" id="filtrar">Filtrar</button>
        </div>
        <br>

        <div class="input-group">
          <input type="number" class="form-control" id="fecha" placeholder="Fecha" />
            <button class="btn btn-primary" id="fechaFiltrar">Filtrar</button>
        </div>
        <br>

        <div class="input-group">
            <input type="text" class="form-control" id="direct" placeholder="Director" />
            <button for="direct" class="btn btn-primary m" id="direcFiltrar">Filtrar</button>
        </div>
        <br>

        <div class="input-group">
            <input type="text" class="form-control" id="title" placeholder="Titulo" />
            <button for="title" class="btn btn-primary m" id="tituloFiltro">Filtrar</button>
            </div>
    </div>
</section>
    



    <div class="album ">
        <div class="container">
            <div class="row">
                <div class="row" id="card">



                </div>
            </div>
        </div>
    </div>
    `
    $("#inscripcion").html(movieLis);
    getData();
    getGenero();

    $("#filtrar").click(function (event){
      event.preventDefault();
      getGeneroBy();
 
    })

    $("#fechaFiltrar").click(function (event){
      event.preventDefault();
      getGeneroBy();
 
    })
    $("#direcFiltrar").click(function (event){
      event.preventDefault();
      getGeneroBy();
    })

    $("#tituloFiltro").click(function (event){
      event.preventDefault();
      getGeneroBy();
    })
  }

  
  })