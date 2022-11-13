let urlCart = CART_INFO_URL + 25801 + EXT_TYPE; // concatenacion + id
let datoscarrito = []; // moatrar array vacio

// se declaran y ordenan todos los let vacios como recomendacion del #245 de jap

let carritoVenta = document.getElementById("container");
// la direccion
let calle = document.getElementById("calle");
let numeroPuerta = document.getElementById("numero");
let esquina = document.getElementById("esquina"); 

// tipos de envio
let envioPremium = document.getElementById("premium");
let envioExpress = document.getElementById("express");
let envioStandard = document.getElementById("standard");

//donde  van a ir

let subtotalTotal = document.getElementById("subtotal-Gral");
let costoDelEnvio = document.getElementById("costo-envio");
let total = document.getElementById("total");
// datos para que el carrito calcule

let listaCompras = [];
let envioValues = [envioExpress, envioPremium, envioStandard];
let productValues = document.getElementsByName("productValue");// llamados x nombre y no x id para poder calcular
let inputValues = document.getElementsByName("inputCart");
let subtotals = document.getElementsByName("subtotal");

// se expico en clase, no soy fan de los nomres en ingles pero el pofesor siempre tiene la razon.
let tarjCreditoCheck = document.getElementById("tarjetaCreditoValidar");
let numeroTarjeta = document.getElementById("numeroTarjeta");
let codigoSegTarj = document.getElementById("codigoSeg");
let vencimientoTarj = document.getElementById("vencimiento");
let transferenciaBancariaCheck = document.getElementById("transferenciaBancariaValidar");
let numeroCuenta = document.getElementById("numeroCuenta");
let tipoPago = document.getElementById("tipoPago");
// pago//
let valueInputsValid = false;
let pago = false;
let formasPago = [tarjCreditoCheck, transferenciaBancariaCheck];
let deleteList = document.getElementsByName("delete");

// caclulamos el suptotal con for let :)
function subtotal(){
    for (let i = 0; i < inputValues.length; i++) {
           if(inputValues[i].value > 0){
            
            let subtotal = parseFloat(inputValues[i].value) * parseFloat(productValues[i].innerHTML);
            subtotals[i].innerHTML = subtotal; // hay que parcearlos//
  } 

}}


// calculo de total//
function calcularTotal(){
    let subtotal = 0;
    for (let i = 0; i < productValues.length; i++) {        
        if(inputValues[i].value > 0){
      subtotal += parseFloat(productValues[i].innerHTML) * parseFloat(inputValues[i].value);

        }
    }
   subtotalTotal.innerHTML = subtotal;

    //pocicion 0, calcular costos de envios //
    let costoEnvio = 0;
    envioValues.forEach(element => {

        if(envioPremium.checked){
            costoEnvio = parseFloat(subtotalTotal.innerHTML) * 0.15; }
        if(envioExpress.checked){ costoEnvio = parseInt(parseFloat(subtotalTotal.innerHTML) * 0.07); }
        if(envioStandard.checked){costoEnvio = parseFloat(subtotalTotal.innerHTML) * 0.05;} 
    })    

    costoDelEnvio.innerHTML = costoEnvio;

    total.innerHTML = parseFloat(subtotalTotal.innerHTML) + parseFloat(costoDelEnvio.innerHTML);

}


function datosVentasCarrito(){
 // lo que se va a ve en el carrito//
    carritoVenta.innerHTML = `
    <div class="row p-1 mt-3" style="border-bottom: 2px solid black">
        <div class="col fw-bold " ></div>
        <div class="col fw-bold " >Nombre</div>
        <div class="col fw-bold " >Costo</div>
        <div class="col fw-bold " >Cantidad</div>
        <div class="col fw-bold " >Subtotal</div>
    </div>
    `;

    for (let i = 0; i < listaCompras.length; i++) {
        // lo que se va a ve en el carrito//
        carritoVenta.innerHTML += `
        <div id="tableCart" class="row p-1 mt-1">
            <div class="col" ><img src="${listaCompras[i].image}" style="width: 80px" alt=""></div>
            <div class="col" >${listaCompras[i].name}</div>
            <div class="col d-flex" ><div>${listaCompras[i].currency}&nbsp</div><div  name="productValue" id="productValue${i}" >${listaCompras[i].unitCost}</div></div>
            <div class="col" ><input type="number" name="inputCart" id="inputCart${i}" style="width: 60px" value="1" onchange="subtotal()" ></div>
            <div class="col fw-bold d-flex"><div>${listaCompras[i].currency}&nbsp</div><div  name="subtotal" id="subtotal${i}" >${listaCompras[i].unitCost}</div></div>
        </div>
        `;

    }
}
// el vijeo y querido DOM, el unico siempre
document.addEventListener("DOMContentLoaded", () => {

    getJSONData(urlCart).then(function(resultObj){
        if (resultObj.status === "ok"){
            datoscarrito = resultObj.data.articles;
            listaCompras = datoscarrito;
            datosVentasCarrito();     }
        
        // calcular total
        calcularTotal();

        inputValues.forEach(element => {
            element.addEventListener("change", () => {
                calcularTotal();
            })
        })

        envioValues.forEach(element => {
            element.addEventListener("change", () => {
                calcularTotal();
            })
        })


        formasPago.forEach(element => {
// escucha de elemnto//
            element.addEventListener("click", () => {

                if(element === transferenciaBancariaCheck && transferenciaBancariaCheck.checked) {

               numeroCuenta.removeAttribute("disabled");
               numeroTarjeta.setAttribute("disabled", "");
               codigoSegTarj.setAttribute("disabled", "");
               vencimientoTarj.setAttribute("disabled", "");
              tipoPago.innerHTML = "Transferencia bancaria";
                      }
                      //
                
                if(element === tarjCreditoCheck && tarjCreditoCheck.checked){                    
                    numeroTarjeta.removeAttribute("disabled");
                    codigoSegTarj.removeAttribute("disabled");
                    vencimientoTarj.removeAttribute("disabled");
                    numeroCuenta.setAttribute("disabled", "");
                    tipoPago.innerHTML = "Tarjeta de credito";
       // faltaba para que ciere//             
  }})    
 })  
});


})