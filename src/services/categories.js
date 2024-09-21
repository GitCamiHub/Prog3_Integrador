
// CATEGORIA

import { categoriaActiva } from "../../main.js";
import { handleGetProductLocalStorage } from "../persistence/localStorage.js";
import { handleRenderList } from "../views/store.js";

const handleFilterProductByCategory = (categoryIn) => {
    const products = handleGetProductLocalStorage();

    switch (categoryIn) {
        case categoriaActiva:
            handleRenderList(products);
            break;
        case "Todo":
            handleRenderList(products);
            break;
        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            const result = products.filter((el) => el.categories === categoryIn)
            handleRenderList(result);
        default:
            break;
        case "mayorPrecio":
            const resultPrecioMayor = products.sort((a, b) => b.precio - a.precio);
            handleRenderList(resultPrecioMayor);
            break;
        case "menorPrecio":
            const resultPrecioMenor = products.sort((a, b) => a.precio - b.precio);
            handleRenderList(resultPrecioMenor);
            break;
    }
};


// Render de la vista categorías

export const renderCategories = () => {
    // Traemos el elemento ul del html
    const ulList = document.getElementById("listFilter");

    // Le agregamos elementos li
    ulList.innerHTML = `
    <li id="Todo">Todos los productos</li>
    <li id="Hamburguesas">Hamburguesas</li>
    <li id="Papas">Papas</li>
    <li id="Gaseosas">Gaseosas</li>
    <li id="mayorPrecio">Mayor Precio</li>
    <li id="menorPrecio">Menor Precio</li>
    `;

    // Seleccionamos todos esos elementos li y agregamos el evento click
    const liElements = ulList.querySelectorAll("li");

    liElements.forEach((liElement) => {

        liElement.addEventListener("click", () => {
            handleClick(liElement);
        });

    });

    // Verificamos y manejamos el estilo del elemento activo
    const handleClick = (elemento) => {
        handleFilterProductByCategory(elemento.id);
        liElements.forEach((el) => {
            if (el.classList.contains("liActive")) {
                el.classList.remove("liActive");
            } else {
                if (elemento === el) {
                    el.classList.add("liActive");
                }
            }
        });
    };
};