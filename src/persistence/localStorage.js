
/* LOCAL STORAGE */

// Recibir un producto

export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products) {
        return products;
    } else {
        return [];
    }
};


// Guardar en local storage

// Recibir un producto
export const setInLocalStorage = (productIn) => {

    if(productIn){
    // Traer elementos
    let productsInLocal = handleGetProductLocalStorage();
    console.log(productIn);
    
    const existingIndex = productsInLocal.findIndex(
        (productsLocal) => productsLocal.id === productIn.id
    );
    

    // Verificar si el elemento existe, si existe reemplazarse, si no existe, agregarse

    if (existingIndex !== -1) {
        productsInLocal[existingIndex] = productIn;

    } else {
        productsInLocal.push(productIn);

    }

    // Setear un nuevo array
    localStorage.setItem("products", JSON.stringify(productsInLocal));

    }
};