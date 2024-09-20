import { renderCategories } from "./src/services/categories.js";
import { setInLocalStorage } from "./src/services/persistence/localStorage.js";
import { handleGetProductsToStore } from "./src/services/views/store.js";


//  APLICACION

export let categoriaActiva = null;

export const setCategoriaActiva = (categoriaIn) => {
    categoriaActiva = categoriaIn;
};

export let productoActivo = null;

export const setProductoActivo = (productoIn) => {
    productoActivo = productoIn;
};

handleGetProductsToStore();

renderCategories();

/* product */

const buttonAdd = document.getElementById("buttonAddElement");

buttonAdd.addEventListener('click', () => {
    openModal();
});


/* POP UP */

const cancelButton = document.getElementById("cancelButton");

cancelButton.addEventListener("click", () => {
    handleCancelButton();
});

const handleCancelButton = () => {
    closeModal();
};

// Funciones Abrir/Cerrar modal
export const openModal = () => {
    const modal = document.getElementById("modalPopUp");
    modal.style.display = "flex";

    if (productoActivo) {
        const nombre = document.getElementById("nombre"),
            imagen = document.getElementById("img"),
            precio = document.getElementById("precio"),
            categories = document.getElementById("categoria");
        nombre.value = productoActivo.nombre;
        imagen.value = productoActivo.imagen;
        precio.value = productoActivo.precio;
        categories.value = productoActivo.categories;
    }
};

export const closeModal = () => {
    const modal = document.getElementById("modalPopUp");
    modal.style.display = "none";
    setProductoActivo(null);
    resetModal();
};

const resetModal = () => {
    const nombre = document.getElementById("nombre"),
        imagen = document.getElementById("img"),
        precio = document.getElementById("precio"),
        categories = document.getElementById("categoria");
    nombre.value = "";
    imagen.value = "";
    precio.value = 0;
    categories.value = "Seleccione una categoría";
};

// Guardar o modificar elementos

const acceptButton = document.getElementById("acceptButton");

acceptButton.addEventListener("click", () => {
    handleSaveOrModifyElements();
});

const handleSaveOrModifyElements = () => {
    const nombre = document.getElementById("nombre").value,
        imagen = document.getElementById("img").value,
        precio = document.getElementById("precio").value,
        categories = document.getElementById("categoria").value;

    let object = null;

    if (productoActivo) {
        object = {
            ...productoActivo,
            nombre,
            imagen,
            precio,
            categories
        }
    } else {
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categories
        };
    }



    setInLocalStorage(object);

    handleGetProductsToStore();

    closeModal();
};



