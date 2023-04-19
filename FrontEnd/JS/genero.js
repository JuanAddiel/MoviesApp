$(document).ready(function () {
    generoList();

    function cargarDatos(id) {
        getDataById(id);
        editar();
      }

      async function editarGenero(idGenero) {
        const generoId = idGenero;
        const nombre =document.getElementById('nombre').value;

        const datos = {generoId,nombre};
        const url=`https://localhost:7281/api/Genero/updateGenero/${generoId}`;
      
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
            url: `https://localhost:7281/api/Genero/getGenero/${id}`,
            method: "GET"
          });
          $(".btn").attr("class", `btn btn-primary edit ${response.generoId}`).prop("type", "submit").prop("id", "editar");
          $("#nombre").val(response.nombre);
        } catch (error) {
          console.error(error);
        }
      }

    async function eliminarGenero(idGenero) {
        const url = `https://localhost:7281/api/Genero/deleteGenero/${idGenero}`;
      
        try {
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          const data = await response.json();
          console.log(data);
          generoList();
          // Recargar la página después de eliminar la película
        } catch (error) {
          console.error('Error al consumir la API:', error);
        }
      }

    async function showData(data) {
        try {
          var verdata = "";
        
          await $.each(data, function(index, element) {
            verdata += `<div class="col-md-4 mt-5">
            <div class="card bg-success text-light">
      
              <div class="card-body">
                <h4 class="card-title">${element.nombre}</h4>
              </div>
              <hr>
              <div class="form-inline">
              <a href="#" class="editar btn btn-primary m-2 px-3 ${element.generoId}">Editar</a>
              <button type="submit" class="eliminar btn btn-outline-warning m-2 px-3 ${element.generoId}">Eliminar</button>
            </div>
            </div>
      
            </div> `;
          });
        
          $("#card").html(verdata);
              
        
        } catch (error) {
          console.error(error);
        }
      }

      $(document).on("click", ".eliminar", function (e) {

        e.preventDefault();
        if (confirm("Estas seguro que deseas eliminar este genero?")) {
      
          const id = $(this).attr("class").split(" ")[5];
          eliminarGenero(id);
        }
      });

      
$(document).on("click", ".editar", function () {
    const id = $(this).attr("class").split(" ")[5];
    console.log(id)
    cargarDatos(id);
  });

    async function getDataGenero() {
        try {
          const url = 'https://localhost:7281/api/Genero/getGenero';
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

    function generoList(){

        const genero=`
        <section class="py-5 text-center container">
          <div class="row py-lg-5">
              <div class="col-lg-6 col-md-8 mx-auto">
                  <h1 class="fw-light">Crear Generos</h1>
                  <p class="lead text-muted">Una aplicacion hecha para crear Peliculas.</p>
                  <p>
                      <a href="#" id="create" class="btn btn-secondary my-2">Crear un nuevo Genero</a>
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
        $("#inscripcion").html(genero);
        getDataGenero();
        $("#create").click(function () {
        
            Registrar();
      
        });
        
      }



    async function createDataGenero() {
        const nombre =document.getElementById('nombre').value;
        const data = {nombre};
        const url = 'https://localhost:7281/api/Genero/createGenero';
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
          
            const p2 = await res.json();
            console.log(p2);
            generoList();
            
        } catch (error) {
            console.log(error);
        }
        
    }
    

    function validateValues() {
        const fields = [
          { id: "nombre" }
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


      async function editar() {
        const editForm = `
        <main class="container-fluid border-1 bg-opacity-25">
        <div class="container-fluid" id="container">
            <div class="row">
                <div class="border-3 col-sm-10 col-md-8 offset-2">
                    <div class="card">
                        <div class="card-body bg-dark text-light text-center">
                            <h5>Registrar Generos</h5>
                        </div>
                        <div class="d-flex flex-wrap mb-3 justify-content-center ">
                            <br>

                            <div class="col-6 m-3">
                                <input type="text" class="form-control" id="nombre" placeholder="Nombre"
                                    required />

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
          const generoId = $(this).attr("class").split(" ")[3];
          console.log(generoId);
          await editarGenero(generoId);  
          generoList();
        });
      }

    function Registrar() {
        const generoDatos = `
        <main class="container-fluid border-1 bg-opacity-25">
        <div class="container-fluid" id="container">
            <div class="row">
                <div class="border-3 col-sm-10 col-md-8 offset-2">
                    <div class="card">
                        <div class="card-body bg-dark text-light text-center">
                            <h5>Registrar Generos</h5>
                        </div>
                        <div class="d-flex flex-wrap mb-3 justify-content-center ">
                            <br>

                            <div class="col-6 m-3">
                                <input type="text" class="form-control" id="nombre" placeholder="Nombre"
                                    required />

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
    
        $("#inscripcion").html(generoDatos);
        $("#registrar").click(function () {
          validateValues();
          createDataGenero();
        });
        $("#atras").click(function () {
            generoList();
        });
    
      }
});