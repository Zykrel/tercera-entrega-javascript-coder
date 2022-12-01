//Variables
let carrito = []

//selectores
const mainContainer = document.querySelector('#mainContainer')

//ejecucion
verificarCarrito()
traerProductos().then((res) =>{
    placares = res // Lista de todos los productos
    placaresFiltro = res  // Lista de los productos filtrados
    renderizarProductos(placaresFiltro);
})

const botonBusquedaPrecio = document.querySelector('#botonBusquedaPrecio')
botonBusquedaPrecio.addEventListener('click', filtrarProductosPorPrecio )


const botonLimpiarFiltroDePrecio = document.querySelector('#botonLimpiarFiltroDePrecio')
botonLimpiarFiltroDePrecio.addEventListener('click', limpiarFiltroDePrecio )