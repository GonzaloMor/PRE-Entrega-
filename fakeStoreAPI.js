const configGet ={
    method:"GET",
    headers: {
        "Content-Type": "application/json"
    }
}

const configPost ={
    method:"POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: {},    
}

const configDelete ={
    method:"DELETE",
    headers: {
        "Content-Type": "application/json"
    }       
}

export async function getProducts() {
   try{
        const response = await fetch ("https://fakestoreapi.com/products",configGet)
        const data = await response.json()
        console.log("Los Productos son:");        
        data.map((product)=> console.log(product))        
   } catch (error){
        console.log(error);     
   }      
}

export async function getAllProducts() {
   try{
        const response = await fetch ("https://fakestoreapi.com/products",configGet)
        return await response.json()        
        
   } catch (error){
        console.log(error);     
   }      
}

export async function getProduct(id) {
   try{
        const response = await fetch (`https://fakestoreapi.com/products/${id}`,configGet)
        const data = await response.json()        
        console.log(`El Producto con el ID ${id} es:`);  
        console.log(data);
        
   } catch (error){
        console.log(error);     
   }      
}

export async function postProduct(product) {
    try{
        configPost.body = JSON.stringify(product)
        const response = await fetch ("https://fakestoreapi.com/products", configPost)
        const data = await response.json()
        console.log("El producto es:");        
        console.log(data);
    }  catch (error) {
        console.log(error);       
    }      
}

export async function deleteProduct(id) {
    try{
        const response = await fetch (`https://fakestoreapi.com/products/${id}`, configDelete)
        const data = await response.json()
        console.log(`Se elimino el producto con el ID ${id}...`);
        
        console.log(data);
    }  catch (error) {
        console.log(error);       
    }      
}



