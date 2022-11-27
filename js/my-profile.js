let pNombre = document.getElementById("pNombre");
let sNombre = document.getElementById("sNombre");
let pNombreError = document.getElementById("pNombreError");
let pApellido = document.getElementById("pApellido");
let sApellido = document.getElementById("sApellido");
let pApellidoError = document.getElementById("pApellidoError");
let mail = document.getElementById("mail");
let telefonoContacto = document.getElementById("telefonoContacto");
let telefonoContactoError = document.getElementById("telefonoContactoError");
let guardarCambios = document.getElementById("guardarCambios");


document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("user").innerHTML = localStorage.usuario;
    
    if(sessionStorage.pNombre){
        pNombre.value = sessionStorage.pNombre; 
    }
    if(sessionStorage.sNombre){
        sNombre.value = sessionStorage.sNombre;
    }
    if(sessionStorage.pApellido){
        pApellido.value = sessionStorage.pApellido;
    }
    if(sessionStorage.sApellido){
        sApellido.value = sessionStorage.sApellido;
    }
    if(sessionStorage.usuario){
        mail.value = sessionStorage.usuario;
    }
    if(sessionStorage.telefonoContacto){
        telefonoContacto.value = sessionStorage.telefonoContacto;
    }

    guardarCambios.addEventListener("click", () => {

        if(pNombre.value === ""){
            pNombreError.hidden = false;
        } else {
            pNombreError.hidden = true;
        }

        if(pApellido.value === ""){
            pApellidoError.hidden = false;
        } else {
            pApellidoError.hidden = true;
        }

        if(telefonoContacto.value === ""){
            telefonoContactoError.hidden = false;
        } else {
            telefonoContactoError.hidden = true;
        }

        if(pNombre.value !== "" && pApellido.value !== "" && telefonoContacto.value !== ""){
            
            sessionStorage.setItem("pNombre", pNombre.value);
            sessionStorage.setItem("sNombre", sNombre.value);
            sessionStorage.setItem("pApellido", pApellido.value);
            sessionStorage.setItem("sApellido", sApellido.value);
            sessionStorage.setItem("telefonoContacto", telefonoContacto.value);

        }

    })

});