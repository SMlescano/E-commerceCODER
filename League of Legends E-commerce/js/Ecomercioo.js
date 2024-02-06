const categoriasValidas = [
    { nombre: "LEGENDARIA", precio: 1820 },
    { nombre: "DEFINITIVA", precio: 3250 },
    { nombre: "EPICA", precio: 1350 },
    { nombre: "COMUN", precio: 975 },
    { nombre: "MITICA", precio: 4750 }
];

let rpDisponibles = 10000;
let carrito = obtenerCarritoDesdeLocalStorage();
let historialCompras = [];

class Skin {
    constructor(categoria) {
        this.categoria = categoria;
        this.precio = categoriasValidas.find(item => item.nombre === categoria).precio;
    }

    agregarAlCarrito() {
        carrito.push({ categoria: this.categoria, precio: this.precio });
        actualizarSolapaCarrito();
        actualizarLocalStorage();
        mostrarCarrito();
        actualizarRPDisponibles();
    }
}

function calcularValorTotal() {
    let valorTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        valorTotal += carrito[i].precio;
    }

    return valorTotal;
}

let cardsMostradas = false;

function mostrarCards() {
    const container = document.getElementById("container");

    if (!cardsMostradas) {
        const categoriasFiltradas = categoriasValidas.filter(categoria => ["MITICA", "LEGENDARIA", "COMUN", "DEFINITIVA", "EPICA"].includes(categoria.nombre));

        categoriasFiltradas.forEach(categoria => {
            const card = document.createElement("div");
            card.className = "card";

            const title = document.createElement("h3");
            title.textContent = categoria.nombre;

            const price = document.createElement("p");
            price.textContent = `Precio: ${categoria.precio} RP`;

            const addButton = document.createElement("button");
            addButton.textContent = "Añadir al carrito";
            addButton.addEventListener("click", function () {
                const skinElegida = new Skin(categoria.nombre);
                skinElegida.agregarAlCarrito();
            });

            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(addButton);

            container.appendChild(card);
        });

        const finalizarCompraCard = document.createElement("div");
        finalizarCompraCard.className = "card";

        const finalizarCompraButton = document.createElement("button");
        finalizarCompraButton.textContent = "Finalizar Compra";
        finalizarCompraButton.addEventListener("click", function () {
            confirmarCompra();
        });

        finalizarCompraCard.appendChild(finalizarCompraButton);
        container.appendChild(finalizarCompraCard);

        cardsMostradas = true;
    }
}

function mostrarCarrito() {
    const cart = document.getElementById("cart");
    cart.classList.remove("hidden");

    actualizarSolapaCarrito();
    actualizarRPDisponibles();
}

function confirmarCompra() {
    const valorTotal = calcularValorTotal();

    if (rpDisponibles >= valorTotal) {
        Swal.fire({
            title: `¿Deseas confirmar la compra por un valor total de ${valorTotal} RP?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Compra realizada con éxito!");
                rpDisponibles -= valorTotal;

                historialCompras.push([...carrito]);

                carrito = [];
                mostrarCards();
                actualizarLocalStorage();
                actualizarSolapaCarrito();
                actualizarRPDisponibles();
            } else {
                Swal.fire("Compra cancelada.");
            }
        });
    } else {
        Swal.fire("No dispones de fondos suficientes para realizar esta compra.");
    }
}

function eliminarSkinDelCarrito(index) {
    const carritoLength = carrito.length;

    if (carritoLength > 0 && index >= 0 && index < carritoLength) {
        const skinEliminada = carrito[index].categoria;

        carrito.splice(index, 1);
        actualizarSolapaCarrito();
        actualizarLocalStorage();
        mostrarCarrito();
        Swal.fire(`La skin ${skinEliminada} ha sido eliminada del carrito.`);
        actualizarRPDisponibles();
    } else {
        Swal.fire("No se pudo eliminar la skin del carrito.");
    }
}

function actualizarSolapaCarrito() {
    const cartItemsElement = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const resumenCompraElement = document.getElementById("resumen-compra");

    cartItemsElement.innerHTML = "";

    carrito.forEach((item, index) => {
        const li = document.createElement("li");

        li.textContent = `${item.categoria}: ${item.precio} RP `;
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", function () {
            eliminarSkinDelCarrito(index);
        });

        li.appendChild(deleteButton);
        cartItemsElement.appendChild(li);
    });
    const valorTotal = calcularValorTotal();
    totalPriceElement.textContent = `Total: ${valorTotal} RP`;

    const resumenCompra = historialCompras.map((compra, idx) => {
        return `<strong>Compra ${idx + 1}:</strong> ${compra.map(item => `${item.categoria}: ${item.precio} RP`).join(', ')}<br>`;
    }).join('');

    resumenCompraElement.innerHTML = resumenCompra;
}

function actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function obtenerCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        return JSON.parse(carritoGuardado);
    } else {
        return [];
    }
}

function actualizarRPDisponibles() {
    const rpRestantesElement = document.getElementById("rp-valor");

    if (rpRestantesElement) {
        rpRestantesElement.textContent = rpDisponibles;
    } else {
        console.error("Elemento 'rp-valor' no encontrado");
    }
}

mostrarCarrito();
mostrarCards();
