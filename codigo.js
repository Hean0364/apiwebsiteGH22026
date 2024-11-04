let productos = [];
let orden = 0; 


function codigoCat(catstr) {
    switch(catstr) {
        case "electronics": return "c1";
        case "jewelery": return "c2";
        case "men's clothing": return "c3";
        case "women's clothing": return "c4";
        default: return "null";
    }
}

function listarProductos(productos) {
    const precioHeader = document.getElementById("price");
    const listado = document.getElementById("listado");
    const tbody = document.getElementById("tbody");

    const c1 = document.getElementById("c1").checked;
    const c2 = document.getElementById("c2").checked;
    const c3 = document.getElementById("c3").checked;
    const c4 = document.getElementById("c4").checked;

    
    let productosFiltrados = productos.filter(producto => {
        const catCode = codigoCat(producto.category);
        switch(catCode) {
            case "c1": return c1;
            case "c2": return c2;
            case "c3": return c3;
            case "c4": return c4;
            default: return false;
        }
    });

    
    if (orden === 1) {
        productosFiltrados.sort((a, b) => a.price - b.price);
        precioHeader.textContent = "Precio ↑";
        precioHeader.style.color = "darkgreen";
    } else if (orden === -1) {
        productosFiltrados.sort((a, b) => b.price - a.price);
        precioHeader.textContent = "Precio ↓";
        precioHeader.style.color = "blue";
    } else {
        precioHeader.textContent = "Precio ⇅";
        precioHeader.style.color = "#333"; 
    }

    
    tbody.innerHTML = "";

    
    productosFiltrados.forEach(producto => {
        const tr = document.createElement("tr");
        tr.className = codigoCat(producto.category);

        tr.innerHTML = `
            <td class="id">${producto.id}</td>
            <td class="foto"><img src="${producto.image}" alt="${producto.title}" /></td>
            <td class="price">$${producto.price.toFixed(2)}</td>
            <td class="title">${producto.title}</td>
            <td class="description">${producto.description}</td>
            <td class="category">${producto.category}</td>
        `;

        tr.querySelector("img").addEventListener("click", () => {
            window.open(producto.image, '_blank');
        });

        tbody.appendChild(tr);
    });

    listado.style.display = "block";
}


function obtenerProductos() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            productos = data;
            listarProductos(productos);
        })
        .catch(error => console.error('Error al obtener los productos:', error));
}


document.addEventListener("DOMContentLoaded", () => {
    const precioHeader = document.getElementById("price");
    precioHeader.addEventListener("click", () => {
        
        orden = (orden === 0) ? 1 : (orden === 1) ? -1 : 0;
        listarProductos(productos);
    });

   
    const filtros = document.querySelectorAll('#filtroprods input[type="checkbox"]');
    filtros.forEach(filtro => {
        filtro.addEventListener("change", () => {
            listarProductos(productos);
        });
    });
});
