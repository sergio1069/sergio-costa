
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
   // document.getElementById("mostrarproducto").innerHTML+=htmlContentToAppend;
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
            }
        });
        getJSONData(PRODUCT_INFO_COMMENTS_URL+infoID+EXT_TYPE).then(function(resultObj){
                if (resultObj.status==="ok") {
                 arraycomentarios = resultObj.data;
                 comentarios(arraycomentarios);  
                }
    

   document.getElementById("comentar").addEventListener("click",()=>{
     aniadircomentario();
                    })
        });         
      
});

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