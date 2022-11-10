//Variables
let carrito



//selectores
const mainContainer = document.querySelector('#mainContainer')




//Funciones
const verificarCarrito = () =>{
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    } else {
        carrito = []
    }
    
    console.log('carrito:', carrito);
}


const actualizarCarrito = () => {
    const cantidadProducto = document.querySelector('#cantidadProducto')
    cantidadProducto.innerHTML = carrito.length
}

const agregarProductoAlCarrito = (e) => {
    const idProductoElegido = e.target.getAttribute('data-id')
    const productoElegido = placares.find((producto) => producto.id == idProductoElegido)
    carrito.push(productoElegido)
    console.log(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito()
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

//eventListener



//ejecucion
verificarCarrito()
renderizarProductos()
