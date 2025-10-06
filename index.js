import { getProducts, getAllProducts, getProduct, postProduct, deleteProduct } from "./fakeStoreAPI.js";

const argScript =process.argv.slice(2) // Capturamos en un array los comandos ingresados por la terminal
const [command] = argScript // Usamos Destructuring para obtener el primer elemento (GET, POST o DELETE).

if (command){ // Verifica si se ingreso un comando despues de npm start
    switch (command.toUpperCase()) { // vefifica si se quiere hacer GET, DELETE o POST
        case "GET": {
            const [command, resource, ...extraParams] = argScript // Usamos Destructuring para obtener resource (products o products), y extraParams (parametros extra no validos).
            const muchParams = extraParams.length > 0 // Si hay mas parametros de los permitidos = True
            
            if (resource){ // Verfica si se ingreso algo despues de npm GET           
                if (resource == "products"){ // Comandos para obtener TODOS los productos: npm start GET products
                    if (muchParams){ // Verifica si hay parametros extra no validos
                        console.log(`Demasiados parametros ("${extraParams}") para la consulta de los productos: npm start GET products`); // mas parametros que npm start GET products                      
                    }else{
                        console.log("GET Exitoso: ")
                        getProducts ()                 
                    }    
                }else if (resource.startsWith("products/")){ // Verificamos si se ingreso algo despues de GET y si comienza con "products/"
                    if (muchParams){ // Verifica si hay parametros extra no validos
                        console.log(`Demasiados parámetros ("${extraParams}") para la consulta del producto específico: npm start GET products/ID`);                   
                    }else {
                        const arrayProductId = argScript[1].split ("/") // Separamos del string products/ y el ID y lo guardamos en idProductStrg
                        const idProductStrg = arrayProductId[1]
                        const idProduct = Number(idProductStrg) // Convertimos el ID ingresado a numero
                        if (!idProduct || isNaN(idProduct)){ // Verifica si no se ingreso algo despues de "products/" y si no es un numero
                            console.log(`ID de producto no es correcto ("${idProductStrg}"), se espera número de ID`);   
                            break   // sale si el if es True              
                        }
                        const products = await getAllProducts() // Carga los productos de la API en products 
                        if (idProduct > 0 && idProduct <= products.length) { // verifica que ID ingresado sea mayor a 0 y menor que cantidad de productos de la API
                            console.log("GET Exitoso: ");
                            getProduct(idProduct);
                        }else {
                            console.log(`ID de producto ("${idProduct}") no existe o está fuera de rango...`);
                        }
                    }    
                                                                    
                }else {
                    console.log(`Comando incorrecto ("${resource}") se esperaba: npm start GET products o npm start GET products/ID`);
                }
            }else {
                console.log("Faltan parámetros para la consulta de los productos: npm start GET products");
            }
            break;
        }              

        case "POST": { 
            const [command, resource, titleProduct, priceProduct, categoryProduct, ... extraParams] = argScript // Desestructuramos para capturar los parametros ingresados y usarlos como datos del objeto (product)
            const muchParams = extraParams.length > 5 // Si hay mas parametros de los permitidos = True

            if (resource){ // Verfica si se ingreso algo despues de npm POST
                if (resource == "products"){
                    if (muchParams){
                        console.log(`Demasiados parametros para el comando POST ("${extraParams}"): npm start POST products titulo/Producto precio categoria`); 
                    }
                    if (categoryProduct){ // Verificamos que se haya ingresado todos los datos para crear el objeto product
                        if (!isNaN(priceProduct)){ // Verificamos que se hayan ingresado numeros en el precio (priceProduct)
                            const productPost = { // creamos el producto con los datos ingresados
                                title:titleProduct,
                                price: priceProduct,
                                category: categoryProduct
                            }
                            console.log("POST Exitoso: ")
                            postProduct(productPost)
                        }else {
                            console.log(`Debe poner un numero en precio ("${priceProduct}")...`);
                        }        
                    }else {
                        const paramsX = 5 - argScript.length
                        console.log(`Faltan (${paramsX}) parametros para el comando POST: titulo/Producto precio categoria`);
                    }
                }else { // Verificamos si se ingreso algo en vez de "products"
                    console.log(`Comando incorrecto ("${resource}"), se esperaba: npm start POST products titulo/Producto precio categoria`);
                }
            }else{
                console.log("Faltan parametros para el comando POST: npm start POST products titulo/Producto precio categoria");  
            }  
            break
        } 
        
        case "DELETE": { 
            const [command, resource, ...extraParams] = argScript
            const muchParams = extraParams.length > 0
            
            if (resource){ // Verfica si se ingreso algo despues de npm DELETE 
                if (resource.startsWith("products/")){   // Verificamos si se ingreso algo despues de DELETE y si comienza con "products/"
                    if (muchParams){  // Verificamos si hay mas parametros que npm start DELETE products/ID 
                        console.log(`Demasiados parametros ("${extraParams}") para DELETE de los producto: npm start DELETE products/ID`);                
                    }else{
                        const arrayProductIDDelete = argScript[1].split("/")// separamos del string products/ y el ID y lo guardamos en idDelete
                        const idDeleteStrg = arrayProductIDDelete[1]
                        const idDelete = Number(idDeleteStrg)   // Convertimos el ID ingresado a numero            
                        if (!idDelete || isNaN(idDelete)){
                            console.log(`ID de producto no es correcto ("${idDeleteStrg}"), se espera número de ID`); 
                            break                   
                        }
                        const products = await getAllProducts() // Carga los productos de la API en products 
                        if (idDelete > 0 && idDelete <= products.length) {
                            console.log("DELETE Exitoso: ");
                            deleteProduct(idDelete);
                        } else {
                            console.log(`ID de producto ("${idDelete}") no existe o está fuera de rango...`);
                        }
                    }    

                }else{
                    console.log(`Comando incorrecto ("${resource}") se esperaba: npm start DELETE products/ID`);
                }         
            }else{
                console.log("Faltan parámetros para la eliminacion del producto: npm start DELETE products/ID");
            }    
            break;
        }          

        default:
        console.log(`Comando incorrecto ("${command}...") se esperaba: GET, POST o DELETE`);            
        break;
    }
}else{
    console.log("Comando incorrecto... se esperaba: npm start GET o npm start POST o npm start DELETE");   
}

