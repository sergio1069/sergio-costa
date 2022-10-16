
let carritodatos = [];
let urlUser = CART_INFO_URL + 25801 + EXT_TYPE;

let articulosComprados = document.getElementById("container");


function DatosCarrito(carritodatos){

    articulosComprados.innerHTML += `
    <div class="row p-1 mt-3" style="border-bottom: 2px solid black">
        <div class="col fw-bold " ></div>
        <div class="col fw-bold " >Nombre</div>
        <div class="col fw-bold " >Costo</div>
        <div class="col fw-bold " >Cantidad</div>
        <div class="col fw-bold " >Subtotal</div>
    </div>
    `;

    articulosComprados.innerHTML += `
    <div id="tableCart" class="row p-1 mt-1">
        <div class="col" ><img src="${carritodatos.articles[0].image}" style="width: 80px" alt=""></div>
        <div class="col" >${carritodatos.articles[0].name}</div>
        <div class="col" >${carritodatos.articles[0].currency} ${carritodatos.articles[0].unitCost}</div>
        <div class="col" ><input type="number" id="inputCart0" style="width: 60px"></div>
        <div class="col fw-bold" id="subtotal0" >${carritodatos.articles[0].currency} ${carritodatos.articles[0].unitCost}</div>
    </div>
    `;
}



document.addEventListener("DOMContentLoaded", () => {

    getJSONData(urlUser).then(function(resultObj){
        if (resultObj.status === "ok"){
            carritodatos = resultObj.data;
            DatosCarrito(carritodatos);
            console.log(carritodatos);
        }

        let inputCart0 = document.getElementById("inputCart0");
        let subtotal0 = document.getElementById("subtotal0");

        inputCart0.addEventListener("change", () => {
            if (inputCart0.value > 0){
                subtotal0.innerHTML = `${carritodatos.articles[0].currency} ${inputCart0.value * carritodatos.articles[0].unitCost}`;
            } 
        })

    });


})