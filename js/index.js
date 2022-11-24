//Variables
let carrito = []

//selectores
const mainContainer = document.querySelector('#mainContainer')

//ejecucion
verificarCarrito()
traerProductos().then((res) =>{
    placares = res
    renderizarProductos(res);
})

