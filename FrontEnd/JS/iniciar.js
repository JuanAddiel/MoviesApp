$(document).ready(function () {
    inicio();
    // definir constante con valor
    var miVariable;

    // guardar constante en el almacenamiento local



    $("#Iniciar").click(function () {
        signup();
    });


    async function loginData() {
        const nombreUser = document.getElementById('nombreUser').value;
        const password = document.getElementById('password').value;

        if (nombreUser === '' || password === '') {
            alert('Complete los inputs');
        } else {
            const data = new FormData();
            data.append('nombreUser', nombreUser);
            data.append('password', password);

            const url = 'https://localhost:7281/api/Login/login';
            try {
                const res = await fetch(url, {
                    method: 'POST',
                    body: data,
                });

                const pelicula = await res.json();
                miVariable = pelicula.usuarioId;
                console.log(pelicula);
                localStorage.setItem("miVariable", miVariable);
                window.location.href = '/FrontEnd/index.html';

            } catch (error) {
                console.log(error);
            }
        }
    }

    async function createData() {
        const nombre = document.getElementById('nombre').value;
        const nombreUser = document.getElementById('nombreUser').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (nombre === '' || nombreUser === '' || email === '' || password === '') {
            alert('Complete los inputs');
        } else {
            const data = new FormData();
            data.append('nombre', nombre);
            data.append('nombreUser', nombreUser);
            data.append('email', email);
            data.append('password', password);

            const url = 'https://localhost:7281/api/Login/signup';
            try {
                const res = await fetch(url, {
                    method: 'POST',
                    body: data,
                });

                const pelicula = await res.json();
                console.log(pelicula);
                login();
                inicio();
            } catch (error) {
                console.log(error);
            }
        }
    }



    function validateValues() {
        const fields = [
            { id: "nombre" },
            { id: "nombreUser" },
            { id: "email" },
            { id: "password" },
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

    function login() {
        const ingresar = `
    <main class="container-fluid border-1 bg-opacity-25">
    <div class="container-fluid" id="container">
        <div class="row">
            <div class="border-3 col-sm-10 col-md-8 offset-2">
                <div class="card">
        <div class="card-body bg-dark text-light text-center">
        <h5>Registrarse</h5>
      </div>
      <div class="d-flex flex-wrap mb-3 justify-content-center ">
        <br>

        <div class="col-6 m-3">
        <input type="text" class="form-control" id="nombreUser" placeholder="Nombre de Usuario"   required />
        </div>
        
        <div class="col-6 m-3">
        <input type="password" class="form-control" id="password" placeholder="Contraseña" required />
    
    </div>
    <div class="col-6 m-3">
    <div class="d-flex gap-4 d-md-flex justify-content-md-end m-3">
    <button class="btn btn-primary" type="button" id="registrar">Iniciar Seccion</button>
    <button class="btn btn-danger" type="button" id="atras">Atras</button>
  </div>
  </div>


   
  </div>
</div>
</div>
</div>
</div>
</div>
</main>
      `;

        $("#inscripcion").html(ingresar);
        $("#registrar").click(function () {
            validateValues();
            loginData();


        });
        $("#atras").click(function () {
            inicio();
        });

    }


    function inicio() {


        const inicio = `
  <section class="py-5 text-center container">
	<div class="row py-lg-5">
		<div class="col-lg-6 col-md-8 mx-auto">
			<h1 class="fw-light">Peliculas</h1>
			<p class="lead text-muted">Bienvenido esta es una aplicacion hecha para registrar Peliculas.</p>
           <p class="lead text-muted"> <b>Por favor Loguearse</b></p>
            <button class="btn btn-danger" type="submit" id="iniciar">Iniciar Seccion</button>
            <button class="btn btn-success" type="submit" id="registrarse">Registrar</button>
		</div>

	</div>
</section>

  `
        $("#inscripcion").html(inicio);
        $("#registrarse").click(function () {
            signup();
        });
        $("#iniciar").click(function () {
            login();
        });

    }

    function signup() {
        const ingresar = `
    <main class="container-fluid border-1 bg-opacity-25">
    <div class="container-fluid" id="container">
        <div class="row">
            <div class="border-3 col-sm-10 col-md-8 offset-2">
                <div class="card">
        <div class="card-body bg-dark text-light text-center">
        <h5>Registrarse</h5>
      </div>
      <div class="d-flex flex-wrap mb-3 justify-content-center ">
        <br>
        <div class="col-6 m-3">
        <input type="text" class="form-control" id="nombre" placeholder="Nombre" required />
    
    </div>
    <div class="col-6 m-3">
        <input type="text" class="form-control" id="nombreUser" placeholder="Nombre de Usuario"   required />
        </div>
        <div class="col-6 m-3">
        <input type="text" class="form-control" id="email" placeholder="Correo Electronico"   required />
    </div>
    <div class="col-6 m-3">
        <input type="password" class="form-control" id="password" placeholder="Contraseña"   required />
        </div>
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

        $("#inscripcion").html(ingresar);
        $("#registrar").click(function () {
            validateValues();
            createData();
        });
        $("#atras").click(function () {
            inicio();
        });

    }
})