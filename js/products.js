//let idd = localStorage.getItem("catID")


PRODUCTS_URL+localStorage.getItem("catID")+EXT_TYPE

let productos = [];
let htmlContentToAppend = "";
let minimo= undefined;
let maximo= undefined;

function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.products.length; i++){ 
        let products = array.products[i];

        if (((minimo == undefined) || (minimo != undefined && parseInt(products.cost) >= minimo)) &&
            ((maximo == undefined) || (maximo != undefined && parseInt(products.cost) <=maximo))){
        

 htmlContentToAppend+= `



<div onclick="infoproduct(${products.id})" class="list-group-item list-group-item-action cursor-active">
<a href="product-info.html?producto=` + products.name + `" class="list-group-item list-group-item-action">
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
    }
    document.getElementById("productos").innerHTML= htmlContentToAppend;
    }


}
function infoproduct(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

// llamamos al filtro, hola filtro//


function filtrar (){
   
 productosFiltrados =productos.filter(products => products.cost >= minimo && products.cost <= maximo);
    
 }  

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(PRODUCTS_URL+localStorage.getItem("catID")+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            productos = resultObj.data;
            showCategoriesList(productos);
        }
        })

// filtado//


        document.getElementById("rangeFilterCount").addEventListener("click",()=>{ 
         minimo = document.getElementById("rangeFilterCountMin").value;
         maximo = document.getElementById("rangeFilterCountMax").value;
         
        if ((minimo != undefined) && (minimo != "") && (parseInt(minimo)) >= 0){
            minimo = parseInt(minimo);
        }
        else{
            minimo = undefined;
        }

        if ((maximo != undefined) && (maximo != "") && (parseInt(maximo)) >= 0){
           maximo = parseInt(maximo);
        }
        else{
           maximo = undefined;
        }

         
        showCategoriesList (productos);
         
        });

        
    });


// ordenar

//la tube que eliminar xq romio la debo todavia lo se
