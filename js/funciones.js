let placares = []

//funciones
const verificarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    } else {
        carrito = []
    }
}

//Obtiene el precio total de forma dinamica
const obtenerPrecioTotal = (carrito) => {
    let total = 0;
    carrito.forEach((producto) => {
        total = total + producto.precio * producto.cantidad
    })
    return total;
}

//Actualiza constantemente al carrito
const actualizarCarrito = () => {
    const cantidadProducto = document.querySelector('#cantidadProducto')
    let contador = 0;
    carrito.forEach((elemento) => {
        contador = contador + elemento.cantidad
    })
    cantidadProducto.innerHTML = contador
    cantidadProducto.classList.remove("d-none")
}

//Agrega Productos en el carrito
const agregarProductoAlCarrito = (e) => {
    const idProductoElegido = e.target.getAttribute('data-id')
    const productoElegido = placares.find((producto) => producto.id == idProductoElegido)
    if (carrito.find((producto) => producto.id == idProductoElegido) == undefined) {
        productoElegido.cantidad = 1
        carrito.push(productoElegido)
    } else {
        carrito.map((producto) => {
            if (producto.id == productoElegido.id) {
                producto.cantidad++
            }
        })
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    verificarCarrito()
    mostrarToast('Producto añadido al carrito')
}

//Renderiza los productos en el Index
const renderizarProductos = (productos) => {
    let contador = 0;
    let row;
    let divAux = document.createElement('div')
    productos.forEach((producto) => {
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

//Renderiza la lista de productos
const renderizarListasCarrito = () => {
    if (carrito.length == 0) {
        const cartelDeCarrito = document.createElement('div')
        cartelDeCarrito.className = "row"
        cartelDeCarrito.innerHTML = `
        <div class="col-12">
        <h1 class="text-center mt-3">
        Tu carrito esta vacio!
        </h1>
        </div>`
        listaCarrito.append(cartelDeCarrito)
    } else {
        carrito.forEach((producto) => {
            const nuevaCard = document.createElement('div')
            nuevaCard.className = "row d-flex"
            nuevaCard.id = `productoId-${producto.id}`
            nuevaCard.innerHTML = `
        <div class="col-2 p-3">
        <img class="imgA" src="${producto.imgSrc}">
    </div>
    <div class="col-4 align-self-center">
        <h5>${producto.nombre} ${producto.medida}</h5>
    </div>
    <div class="col-3 align-self-center">
        <div class="btn-group" role="group" aria-label="Basic button group">
            <button type="button" id="restarCarrito-${producto.id}" class="btn btn-primary">-</button>
            <button type="button" id="cantidadProducto-${producto.id}" class="btn btn-primary">${producto.cantidad}</button>
            <button type="button"id="sumarCarrito-${producto.id}" class="btn btn-primary">+</button>
        </div>
    </div>
    <div class="col-2 align-self-center">
        <h5 id="precioProducto-${producto.id}">$${producto.precio * producto.cantidad}</h5>
    </div>
        `
            listaCarrito.append(nuevaCard)
            const restarCarrito = document.querySelector(`#restarCarrito-${producto.id}`)
            restarCarrito.addEventListener('click', () => restarProducto(producto.id))
            const sumarCarrito = document.querySelector(`#sumarCarrito-${producto.id}`)
            sumarCarrito.addEventListener('click', () => sumarProducto(producto.id))
        })
        const divTotal = document.createElement('div')
        divTotal.className = "row d-flex"
        divTotal.innerHTML = `
    <hr>
    <div class="offset-7 col-2 align-self-center">
    <h4>Total</h4>
    </div>
    <div class="col-2 align-self-center">
    <h4 id="totalProducto">$${obtenerPrecioTotal(carrito)}</h4>
    </div>
    `
        const divCompra = document.createElement('div')
        divCompra.className = "row d-flex"
        divCompra.innerHTML = `
        <div class="col-3 mt-2">
        <button type="button" class="btn btn-outline-danger mx-1" id="eliminarCarritoCompra">Eliminar Carrito</button>
        </div>
    <div class="col-4 offset-5 align-self-center mb-5 mt-2">
        <button type="button" id="botonCompra" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#confirmacionCompra">Finalizar Compra</button>
    </div>
    `
        listaCarrito.append(divTotal)
        listaCarrito.append(divCompra)
        //eventos en el modal
        const botonEliminarCompra = document.querySelector('#eliminarCarritoCompra')
        botonEliminarCompra.addEventListener('click', eliminarCarrito)
        const botonCompra = document.querySelector('#botonFinalizarCompra')
        botonCompra.addEventListener('click', finalizarCompra)
        const inputTarjeta = document.querySelector('#inputTarjeta')
        inputTarjeta.addEventListener('keyup', (e) => mostrarDatosEnTarjeta(e, '#numeroImagen'))
        const inputNombre = document.querySelector('#inputNombre')
        inputNombre.addEventListener('keyup', (e) => mostrarDatosEnTarjeta(e, '#nombreImagen'))
        const inputVencimiento = document.querySelector('#inputVencimiento')
        inputVencimiento.addEventListener('keyup', (e) => mostrarDatosEnTarjeta(e, '#expiracionDesdeImagen'))
        const formulario = document.querySelector('#formulario')
        formulario.addEventListener('submit', (e) => validarFormulario(e))
    }
}

//Alerta al agregar un producto al carrito
const mostrarToast = (texto) => {
    Toastify({
        text: texto,
        duration: 1000,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#eee",
            color: "#bb2d3b"
        },
        onClick: function () { }
    }).showToast();
}

//Alerta al finalizar la compra
const finalizarCompra = (e) => {
    if (validarFormulario(e)) {
        let timerInterval
        Swal.fire({
            title: 'Compra en curso...',
            html: 'Realizando compra, espere por favor',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                }, 2000)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            Swal.fire({
                title: 'Compra realizada',
                text: 'Gracias por confiar!',
                icon: 'success',
                confirmButtonText: '<span class="text-danger">Ok</span>',
                confirmButtonColor: "#fff"
            }).then(() => {
            eliminarCarrito();
            })
        }
        )
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se colocaron datos incorrectos!',
        })
    }
}

//elimina productos del carrito
const eliminarCarrito = () => {
    carrito = []
    localStorage.removeItem('carrito')
    location.href = '../index.html'
}

//suma la cantidad de productos
const sumarProducto = (id) => {
    carrito = carrito.map((producto) => {
        if (producto.id == id) {
            producto.cantidad++
            document.querySelector(`#cantidadProducto-${producto.id}`).innerHTML = producto.cantidad
            document.querySelector(`#precioProducto-${producto.id}`).innerHTML = `$${producto.precio * producto.cantidad}`
        }
        return producto
    })
    localStorage.setItem('carrito', JSON.stringify(carrito))
    verificarCarrito()
    document.querySelector(`#totalProducto`).innerHTML = `$${obtenerPrecioTotal(carrito)}`

}

//resta la cantidad de productos
const restarProducto = (id) => {
    carrito = carrito.map((producto) => {
        if (producto.id == id) {
            producto.cantidad--
            document.querySelector(`#cantidadProducto-${producto.id}`).innerHTML = producto.cantidad
            document.querySelector(`#precioProducto-${producto.id}`).innerHTML = `$${producto.precio * producto.cantidad}`
        }
        if (producto.cantidad == 0) {
            document.querySelector(`#productoId-${producto.id}`).remove()
        }
        return producto
    })
    carrito = carrito.filter(producto => producto.cantidad > 0)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    verificarCarrito()
    document.querySelector(`#totalProducto`).innerHTML = `$${obtenerPrecioTotal(carrito)}`

}

// Trae los productos desde un json
const traerProductos = async () => {
    const res = await fetch('json/data.json')
    const data = await res.json()
    return data
}


//Funciones de la tarjeta
const mostrarDatosEnTarjeta = (e, id) => {
    document.querySelector(id).innerHTML = `${e.target.value}`
}

//Funcion de formulario
const validarFormulario = (e) => {
    e.preventDefault();
    const regNumerosTarjeta = new RegExp('([0-9]{16})')
    const regVencimiento = new RegExp('([0-1]{1}[0-9]{1}\/[0-9]{2})')
    const regCodigo = new RegExp('([0-9]{3})')
    const inputTarjeta = document.querySelector('#inputTarjeta')
    const inputNombre = document.querySelector('#inputNombre')
    const inputVencimiento = document.querySelector('#inputVencimiento')
    const inputCodigo = document.querySelector('#inputCodigo')
    return (
        regNumerosTarjeta.test(inputTarjeta.value) && (inputNombre.value.length > 4 && inputNombre.value.length < 26) && regVencimiento.test(inputVencimiento.value) && regCodigo.test(inputCodigo.value)
        )
}
