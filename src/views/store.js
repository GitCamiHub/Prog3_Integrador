/* STORE */

import { setProductoActivo } from "../../main.js";
import { handleGetProductLocalStorage } from "../persistence/localStorage.js";
import { openModal } from "./modal.js";



// Funcion que se encarga de traer elementos y llamar al render
export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    console.log("Productos obtenidos del localStorage:", products);
    handleRenderList(products);
};

// Se encarga de filtrar y de renderizar la seccion con todos sus respectivos elementos

export const handleRenderList = (productosIn) => {

    if (!productosIn || productosIn.length === 0) {
        console.log("No hay productos para renderizar.");
        return;
    }

    // Filtrado de arrays por categoria
    const burgers = productosIn.filter((el) => el.categories === "Hamburguesas");
    const papas = productosIn.filter((el) => el.categories === "Papas");
    const gaseosas = productosIn.filter((el) => el.categories === "Gaseosas");

    // Renderiza los elementos de la seccion
    const renderProductGroup = (productos, title) => {
        console.log(productos);

        if (productos.length > 0) {

            const productosHTML = productos.map((producto, index) => {
                return `<div class='containerTargetItem' id='product-${producto.categories}-${index}'>
        <div>
        <img src='${producto.imagen}'/>
        <div>
        <h2>${producto.nombre}</h2>
        </div>
        <div class='targetProps'>
        <p><b>Precio:</b>$ ${producto.precio}</p>
        </div>
        </div>
         </div>`;
            });
// Retornar la seccion con todos los elementos dentro
            return `
    <section class='sectionStore'>
    <div class='containerTitleSection'>
    <h3>${title}</h3>
    </div>
     <div class='containerProductStore'>
        ${productosHTML.join("")}
        </div>
    </section>`;

        } else {

            return "";

        };

    };

    // Renderizar cada uno de los productos dentro de su categoría

    const appContainer = document.getElementById("storeContainer");

    appContainer.innerHTML = `
        ${renderProductGroup(burgers, "Hamburguesas")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosas")}
        `;

        // Añade los eventos de manera dinamica
    const addEvents = (productsIn) => {
        if(productsIn){
        productsIn.forEach((element, index) => {
            const productContainer = document.getElementById(
                `product-${element.categories}-${index}`
            );
            productContainer.addEventListener("click", () => {
                setProductoActivo(element);
                openModal();
            });
        });
    }

    };

    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);

};

