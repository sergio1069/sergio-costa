function login () {

let usuario = document.getElementById("usuario").value;
let password = document.getElementById("password").value;

if (usuario ==="" || password ==="") {
    alert ("Favor completar datos");
} else{
    location.href="index.html";
    sessionStorage.name = usuario
    window.location.href = "index.html"
}
}
 document.addEventListener ("DOMContentLoaded",()=>{
    document.getElementById("inicio").addEventListener("click",()=>{
    login();
    })
 })