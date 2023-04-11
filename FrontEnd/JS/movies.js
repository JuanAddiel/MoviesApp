$(document).ready(function () {
movieList();

btnRegistrar();
// $(".nav-item a").click(function() {
//   $(".nav-item").removeClass("active");
//   $(this).parent().addClass("active");
// });


// $("#create").click(function () {
//   $(function () {
// $.ajax({
//   url: 'https://localhost:7281/api/Genero/getGenero',
//   method: 'GET',
//   success: function (genero) {
//     genero.forEach(function (sx) {
//       $('#generoId').append($('<option>').text(sx.nombre).val(sx.generoId));
//     });
//   }
// });

// });
//   inscribir();

// });


{/* */}

async function eliminarPelicula(idPelicula) {
  const url = `https://localhost:7281/api/Pelicula/deletePelicula/${idPelicula}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    movieList();
    // Recargar la página después de eliminar la película
  } catch (error) {
    console.error('Error al consumir la API:', error);
  }
}


async function editarPelicula(idPelicula) {
  const id = idPelicula;
  const generoId =document.getElementById('generoId').value;
  const usuarioId = document.getElementById('usuarioId').value;
  const titulo = document.getElementById('titulo').value;
  const año = document.getElementById('año').value;
  const director = document.getElementById('director').value;
  const imagen = document.getElementById('imagen').value;
  const datos = { id,generoId, usuarioId, titulo, año, director, imagen};
  const url=`https://localhost:7281/api/Pelicula/updatePelicula/${id}`;

  try {
    console.log(JSON.stringify(datos));
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    const data = await response.json();
    console.log(data);
    
  } catch (error) {
    console.error('Error al consumir la API:', error);
  }
}




async function getDataById(id) {
  try {
    // Realiza la petición AJAX para obtener los datos del elemento por su id
    const response = await $.ajax({
      url: `https://localhost:7281/api/Pelicula/getPelicula/${id}`,
      method: "GET"
    });

    const fecha = new Date(response.año);
    const fechaFormatoInput = fecha.toISOString().split("T")[0];
    // Actualiza el formulario con los datos obtenidos
    $(".btn").attr("class", `btn btn-primary edit ${response.id}`).prop("type", "submit").prop("id", "editar");
    $("#titulo").val(response.titulo);
    $("#año").val(fechaFormatoInput);
    $("#director").val(response.director);
    $("#generoId").val(response.generoId).prop('required', true);
    $("#usuarioId").val(response.usuarioId);
    $("#imagen").val(response.imagen);

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
    showData(data);
  } catch (error) {
    console.log(error);
  }
}

async function cargarGeneros() {
  try {
    const response = await fetch('https://localhost:7281/api/Genero/getGenero');
    const genero = await response.json();
    genero.forEach(function (sx) {
      $('#generoId').append($('<option>').text(sx.nombre).val(sx.generoId));
    });
  } catch (error) {
    console.error(error);
  }
}

function cargarDatos(id) {
  cargarGeneros();
  getDataById(id);
  editar();
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
            <img src="${element.imagen}"class="card-img-top img-responsive" alt="${element.titulo}">
            <h5 class="card-title">Año publicacion: ${fecha.getFullYear()}</h5>
            <h5 class="card-title">Director: ${element.director}</h5>
            <h5 class="card-title" id="nombre">Genero: ${nombreGenero}</h5> <!-- utilizamos la variable 'nombreGenero' aquí -->
            <h5 class="card-title"></h5>
          </div>
    
          <hr>
          <div class="form-inline">
            <a href="#" class="editar btn btn-primary m-2 px-3 ${element.id}">Editar</a>
            <button type="submit" class="eliminar btn btn-outline-warning m-2 px-3 ${element.id}">Eliminar</button>
          </div>
        </div>
      </div> `;
    }));

    $("#card").html(verdata);
  } catch (error) {
    console.error(error);
  }
}




$(document).on("click", ".eliminar", function (e) {

  e.preventDefault();
  if (confirm("Estas seguro que deseas eliminar esta pelicula?")) {

    const id = $(this).attr("class").split(" ")[5];
    console.log(id)
    eliminarPelicula(id);

  }

  
});

$(document).on("click", ".editar", function () {
  const id = $(this).attr("class").split(" ")[5];
  console.log(id)
  cargarDatos(id);
});

async function createData() {
  const generoId = document.getElementById('generoId').value;
  const usuarioId = document.getElementById('usuarioId').value;
  const titulo = document.getElementById('titulo').value;
  const año = document.getElementById('año').value;
  const director = document.getElementById('director').value;
  const imagen = document.getElementById('imagen').files[0];
  
  const data = new FormData();
  data.append('generoId', generoId);
  data.append('usuarioId', usuarioId);
  data.append('titulo', titulo);
  data.append('año', año);
  data.append('director', director);
  data.append('imagen', imagen);
  
  const url = 'https://localhost:7281/api/Pelicula/createPelicula';
  try {
      const res = await fetch(url, {
          method: 'POST',
          body: data
      });
    
      const pelicula = await res.json();
      console.log(pelicula);
      // movieList();
      
  } catch (error) {
      console.log(error);
  }
}


  function btnRegistrar() {
    $("#registrar").click(function () {
      validateValues();
      createData();

    });

  }

  function Reset() {

    const inputs = [
      { id: "generoId" },
      { id: "usuarioId" },
      { id: "titulo" },
      { id: "año" },
      {id: "imagen"},
      {id: "director"}
    ];

    inputs.forEach(input => {
      $("#" + input.id)
        .val("")
        .removeClass("input-error")
        .removeClass("input-success");
    });
  }


  function validateValues() {
    const fields = [
      { id: "generoId" },
      { id: "usuarioId" },
      { id: "titulo" },
      { id: "año" },
      {id: "imagen"},
      {id: "director"}
    ];

    let isValid = true;

    fields.forEach(field => {
      const value = $("#" + field.id).val();
      if (!value) {
        isValid = false;
        $("#" + field.id).addClass("input-error");
        $("#" + field.id).removeClass("input-success");
      }

      else {
        $("#" + field.id).removeClass("input-error");
        $("#" + field.id).addClass("input-success");
      }

    });
  }

function movieList(){


  const movieLis=`
  <section class="py-5 text-center container">
	<div class="row py-lg-5">
		<div class="col-lg-6 col-md-8 mx-auto">
			<h1 class="fw-light">Crear Peliculas</h1>
			<p class="lead text-muted">Una aplicacion hecha para crear Peliculas.</p>
			<p>
				<a href="#" id="create" class="btn btn-secondary my-2">Crear nueva Pelicula</a>
			</p>
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
  $("#create").click(function () {
    $(function () {
  $.ajax({
    url: 'https://localhost:7281/api/Genero/getGenero',
    method: 'GET',
    success: function (genero) {
      genero.forEach(function (sx) {
        $('#generoId').append($('<option>').text(sx.nombre).val(sx.generoId));
      });
    }
  });
  
});
    inscribir();

  });
  
}


async function editar() {
  const editForm = `
  <main class="container-fluid border-1 bg-opacity-25">
  <div class="container-fluid" id="container">
      <div class="row">
          <div class="border-3 col-sm-10 col-md-8 offset-2">
              <div class="card">
      <div class="card-body bg-dark text-light text-center">
      <h5>Inscripcion de estudiantes</h5>
    </div>
    <div class="d-flex flex-wrap mb-3 justify-content-center ">
      <br>

      <div class="col-6 m-3">
      <label for="generoId" class="form-label text-white">Genero: </label>
      <select class="form-select" id="generoId" >
        <option>Seleccione un genero</option>

      </select>
    
</div>
<div class="col-6 m-3">
  <input type="number" class="form-control" id="usuarioId" placeholder="Usuario" required />

</div>
<div class="col-6 m-3">
  <input type="text" class="form-control" id="titulo" placeholder="titulo"   required />
  </div>
  <div class="col-6 m-3">
  <input type="date" class="form-control" id="año" placeholder="Fecha"   required />
</div>
<div class="col-6 m-3">
  <input type="text" class="form-control" id="director" placeholder="Director"   required />
  </div>
  <div class="col-6 m-3">
  <input type="text" class="form-control" id="imagen" placeholder="Imagen"   required />
  </div>

  <div class="col-6 m-3">
  <div class="d-flex gap-4 d-md-flex justify-content-md-end m-3">
  <button class="btn btn-primary edit" type="submit" id="editar">Editar</button>
  <button class="btn btn-primary" type="button" id="atras">Atras</button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
    `;

  $("#inscripcion").html(editForm);

  $(document).on("click", ".edit", async function () {
    const id = $(this).attr("class").split(" ")[3];
    console.log(id);
    await editarPelicula(id);  
    movieList();
  });
}


  function inscribir() {
    const datosPersonales = `
    <main class="container-fluid border-1 bg-opacity-25">
    <div class="container-fluid" id="container">
        <div class="row">
            <div class="border-3 col-sm-10 col-md-8 offset-2">
                <div class="card">
        <div class="card-body bg-dark text-light text-center">
        <h5>Inscripcion de estudiantes</h5>
      </div>
      <div class="d-flex flex-wrap mb-3 justify-content-center ">
        <br>

        <div class="col-6 m-3">
        <label for="generoId" class="form-label text-white">Genero: </label>
        <select class="form-select" id="generoId" >
          <option>Seleccione un genero</option>

        </select>
      
  </div>
  <div class="col-6 m-3">
    <input type="number" class="form-control" id="usuarioId" placeholder="Usuario" required />

</div>
<div class="col-6 m-3">
    <input type="text" class="form-control" id="titulo" placeholder="titulo"   required />
    </div>
    <div class="col-6 m-3">
    <input type="date" class="form-control" id="año" placeholder="Fecha"   required />
</div>
<div class="col-6 m-3">
    <input type="text" class="form-control" id="director" placeholder="Director"   required />
    </div>
    <div class="col-6 m-3">
    <input type="file" class="form-control" id="imagen" placeholder="Imagen"   required />
    </div>

    <div class="col-6 m-3">
    <div class="d-flex gap-4 d-md-flex justify-content-md-end m-3">
    <button class="btn btn-primary" type="submit" id="registrar">Registrar</button>
    <button class="btn btn-primary" type="button" id="atras">Atras</button>
  </div>
  </div>
</div>
</div>
</div>
</div>
</div>
</main>
      `;

    $("#inscripcion").html(datosPersonales);
    $("#registrar").click(function () {
      validateValues();
      createData();
    });
    $("#atras").click(function () {
      movieList();
    });

  }
})