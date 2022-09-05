//let idd = localStorage.getItem("catID")

PRODUCTS_URL+localStorage.getItem("catID")+EXT_TYPE

let productos = [];

function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.products.length; i++){ 
        let products = array.products[i];
        htmlContentToAppend += `

<div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
<div class="row">
    <div class="col-3">
        <img src="${products.image}" alt="" class="img-thumbnail">
    </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${products.name}  ${products.currency}   ${products.cost} </h4>
            <small class="text-muted">${products.soldCount} vendidos</small>
        </div>
        <p class="mb-1">${products.description}</p>
      </div>
     </div>
  </div>
     `
    document.getElementById("productos").innerHTML= htmlContentToAppend;

   }
}
document.addEventListener("DOMContentLoaded", function() {
    getJSONData(PRODUCTS_URL+localStorage.getItem("catID")+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            productos = resultObj.data;
            showCategoriesList(productos);
        }
        })
    });
//flilrado


document.getElementById("rangeFilterCount").addEventListener("click",()=>{
    function filtrar (){
       let minimo = document.getElementById("rangeFilterCountMin").value;
       let maximo = document.getElementById("rangeFilterCountMax").value;
       let productosFiltrados = arrayProductos.filter(products => products.cost >= minimo && products.cost <= maximo)
     
     mostrar(productosFiltrados)
    }
    filtrar()
   })



// ordenar

