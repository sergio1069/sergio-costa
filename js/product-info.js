
 let arraycomentarios=[];
let productInfo


    function showProductInfo(productInfo){
        let htmlContentToAppend = "";
            htmlContentToAppend += `
            <h1>${productInfo.name}</h1>
            <h2>precio:${productInfo.cost},${productInfo.currency}</h2>            
            <h3>descripcion:${productInfo.description}</h3> 
            <h4>categoria:"${productInfo.category}"</h4>
            <h5>cantidad vendidos:"${productInfo.soldCount}"</h5>
            <h5>imagenes ilustrativas:</h5> 
            <div class="container text-center">
                <div class="row">                    
                     <div class="col" ><img style="width: 250px" src="${productInfo.images[0]}"></div>
                     <div class="col" ><img style="width: 250px" src="${productInfo.images[1]}"></div>
                     <div class="col" ><img style="width: 250px" src="${productInfo.images[2]}"></div>
                     <div class="col" ><img style="width: 250px" src="${productInfo.images[3]}"></div>              
                </div>                           
                                                   
            </div>          
            `
            document.getElementById("mostrarproducto").innerHTML = htmlContentToAppend;
}
function imagenes(product){
    let htmlContentToAppend = "";
    for(let img of product){
        htmlContentToAppend+=`<div class="col"><img src="${img}"></div>`;

    }

   return htmlContentToAppend; 
}

document.addEventListener("DOMContentLoaded", function(e){
    let infoID = localStorage.getItem("productID")
        getJSONData(PRODUCT_INFO_URL+infoID+EXT_TYPE).then(function(resultObj) {
            if (resultObj.status === "ok") {
                productInfo = resultObj.data;
                console.log(productInfo)
                showProductInfo(productInfo);
                 imagenes(productInfo.images);

                 mostrarRelacionados(productInfo)
            }
        });
        getJSONData(PRODUCT_INFO_COMMENTS_URL+infoID+EXT_TYPE).then(function(resultObj){
                if (resultObj.status==="ok") {
                 arraycomentarios = resultObj.data;
                 comentarios(arraycomentarios);  
                }
    
// cuando le das click en comentar//

   document.getElementById("comentar").addEventListener("click",()=>{
     aniadircomentario();
                    })
        });   

});

//mostrar comentarios 

function comentarios(arraycomentarios){
 let htmlContentToAppend ="";
    for(let i=0; i<arraycomentarios.length;i++){
        htmlContentToAppend+=`<li>${arraycomentarios[i].user}, 
         ${arraycomentarios[i].dateTime},
           ${arraycomentarios[i].description}, 
            ${puntuacion(arraycomentarios[i].score)}</li>`
    }    
    document.getElementById("mostrarcomentarios").innerHTML=htmlContentToAppend;
}

//estrellas selector//

function puntuacion(puntos){
            
    let estrellas='';
    for(let i = 1; i <= 5; i ++) {
        if (i<=puntos){
           
            estrellas += '<i class="fas fa-star checked" ></i>'; 
        }else{
           
             estrellas += '<i class="far fa-star checked"></i>';
        }
    } 
         return estrellas; 
};


//mostrar tiempo fecha hora,  para añadir comentarios.


function aniadircomentario(){
    let dateTime = new Date();
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();
    let hour = dateTime.getHours();
    let minute = dateTime.getMinutes();
    let second = dateTime.getSeconds();

    if(month < 10){
        month = '0' + month;
    }
    if(day < 10){
        day = '0' + day;
    }
    if(hour < 10){
        hour = '0' + hour; 
    }
    if(minute < 10){
        minute = '0' + minute; 
    }
    if(second < 10){
        second = '0' + second; 
    }


    //añadir nuevo comentario


    let nuevoscomentarios = {};

    nuevoscomentarios.user = sessionStorage.getItem('user');
    nuevoscomentarios.description = document.getElementById('comentario').value;
    nuevoscomentarios.dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    nuevoscomentarios.score = document.getElementById('estrellas').value;

    arraycomentarios.push(nuevoscomentarios);

    comentarios(arraycomentarios);

    document.getElementById('comentario').value = "";
    document.getElementById('estrellas').value = "";
}
//decirle quien es productosID y guardarlo//

function setArticulosID(id) {
    localStorage.setItem("productID",id);
    window.location = "product-info.html"

}
//funacionabilidad de los productos relacionados

let productID = localStorage.getItem("productosID");

let productosInfo = PRODUCT_INFO_URL + productID + EXT_TYPE

function mostrarRelacionados (productosInfo){
let htmlContentToAppend = ""

for (let i=0; i<productosInfo.relatedProducts.length; i++){ 
    let relacionados = productosInfo.relatedProducts[i]

htmlContentToAppend+=
`
<div onclick="setArticulosID(${relacionados.id})  class="row" style="width:200px">
<div "class=" list-group-item-action cursor-active">
     <a href="product-info.html?producto= `+ relacionados.image + `"class="cursor-active list-group-item-action">
     <h5 class="text-center">${relacionados.name}</h5>
     <img src=${relacionados.image} class="img-thumbnail">
         
</div>
</div>
`
} 
document.getElementById("relacionados").innerHTML = htmlContentToAppend 
}
