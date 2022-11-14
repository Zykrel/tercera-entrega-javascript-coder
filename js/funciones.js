//funciones
const verificarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    } else {
        carrito = []
    }
}

const obtenerPrecioTotal = (carrito) => {
    let total = 0;
    carrito.forEach((producto) => {
        total = total + producto.precio * producto.cantidad
    })
    return total;
}


const actualizarCarrito = () => {
    const cantidadProducto = document.querySelector('#cantidadProducto')
    let contador = 0;
    carrito.forEach((elemento) => {
        contador = contador + elemento.cantidad
    })
    cantidadProducto.innerHTML = contador
    cantidadProducto.classList.remove("d-none")
}
const agregarProductoAlCarrito = (e) => {
    const idProductoElegido = e.target.getAttribute('data-id')
    const productoElegido = placares.find((producto) => producto.id == idProductoElegido)
    if (carrito.find((producto) => producto.id == idProductoElegido) == undefined) {
        console.log('entro al if')
        productoElegido.cantidad = 1
        carrito.push(productoElegido)
    } else {
        console.log('entro al else')

        carrito.map((producto) => {
            if (producto.id == productoElegido.id) {
                producto.cantidad++
            }
        })
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    verificarCarrito()
}
const renderizarProductos = () => {
    let contador = 0;
    let row;
    let divAux = document.createElement('div')
    placares.forEach((producto) => {
        if (contador == 0 || contador % 3 == 0) {
            const rowAux = document.createElement('div')
            rowAux.className = 'row my-3'
            row = rowAux;
        }
        const nuevaCard = document.createElement('div')
        nuevaCard.className = "col-lg-4 col-12"
        nuevaCard.innerHTML = `
        <div class="card cards">
        <img src="${producto.imgSrc}" class="card-img-top" alt="card-img-top">
        <div class="card-body">
            <h5 class="card-title txt-center">${producto.nombre} ${producto.medida}</h5>
            <p class="card-text txt-center">$ ${producto.precio}</p>
            <div class="d-grid gap-2 col-6 mx-auto">
            <button class="buttonCTA btn btn-outline-danger" data-id="${producto.id}"> Agregar al Carrito </button>
            </div>
        </div>
        </div>
        `
        row.append(nuevaCard)
        divAux.append(row)
        contador++
    })
    mainContainer.append(divAux)
    const buttonsCTA = document.querySelectorAll('.buttonCTA')
    buttonsCTA.forEach((button) => {
        button.addEventListener('click', agregarProductoAlCarrito)
    })
}


const renderizarListasCarrito = () => {
    carrito.forEach((producto) => {
        const nuevaCard = document.createElement('div')
        nuevaCard.className = "row d-flex"
        nuevaCard.innerHTML = `
        <div class="col-2 p-3">
        <img class="imgA" src="${producto.imgSrc}">
    </div>
    <div class="col-4 align-self-center">
        <h5>${producto.nombre} ${producto.medida}</h5>
    </div>
    <div class="col-3 align-self-center">
        <div class="btn-group" role="group" aria-label="Basic button group">
            <button type="button" class="btn btn-primary">-</button>
            <button type="button" class="btn btn-primary">${producto.cantidad}</button>
            <button type="button" class="btn btn-primary">+</button>
        </div>
    </div>
    <div class="col-2 align-self-center">
        <h5>$${producto.precio * producto.cantidad}</h5>
    </div>
        `
        listaCarrito.append(nuevaCard)
    })
    const divTotal = document.createElement('div')
    divTotal.className = "row d-flex"
    divTotal.innerHTML = `
    <hr>
    <div class="offset-7 col-2 align-self-center">
    <h4>Total</h4>
    </div>
    <div class="col-2 align-self-center">
    <h4>$${obtenerPrecioTotal(carrito)}</h4>
    </div>
    `
    listaCarrito.append(divTotal)
}
