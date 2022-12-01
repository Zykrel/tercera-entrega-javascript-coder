//variable
let carrito

//selectores
const listaCarrito = document.querySelector('#listaCarrito')
const crearTarjeta = document.querySelector('#crearTarjeta')
const botonCancelarCompra = document.querySelector('#botonCancelarCompra')


//ejecuciones
verificarCarrito()
renderizarListasCarrito()


//evento
botonCancelarCompra.addEventListener('click', limpiarTarjeta)