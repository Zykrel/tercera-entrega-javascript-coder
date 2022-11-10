//Productos
class Placard {
    constructor(id, nombre, medida, imgSrc ,precio) {
        this.id = id;
        this.nombre = nombre;
        this.medida = medida;
        this.imgSrc = imgSrc;
        this.precio = precio;
    }
}

const placard1 = new Placard(1, 'Placard de ', '270x220x60', 'https://senoresdelplacard.000webhostapp.com/assets/img/placard1.jpg'  , 180000)

const placard2 = new Placard(2, 'Placard de ', '100x220x60', 'https://senoresdelplacard.000webhostapp.com/assets/img/placard2.jpg' , 63000)

const placard3 = new Placard(3, 'Placard de', '180x182x60 Espejo', 'https://senoresdelplacard.000webhostapp.com/assets/img/placard7.jpg' , 80000)

const placard4 = new Placard(4, 'Placard de', '240x220x60 Espejo', 'https://senoresdelplacard.000webhostapp.com/assets/img/placard4.jpg' , 150000)

const placard5 = new Placard(5, 'Placard de', '150x220x60 (color Negro)', 'https://senoresdelplacard.000webhostapp.com/assets/img/placard5.jpg' , 60000)

const placard6 = new Placard(6, 'Placard de', '180x182x45 sin puertas', 'https://senoresdelplacard.000webhostapp.com/assets/img/placard8.jpg' , 35000)

const placard7 = new Placard(7, 'Placard de', '100x200x60', 'https://senoresdelplacard.000webhostapp.com/assets/img/placard9.jpg' , 55000)

const placard8 = new Placard(8, 'Placard de', '280x240x60', 'https://senoresdelplacard.000webhostapp.com/assets/img/placard3.jpg' , 180000)

const placard9 = new Placard(9, 'Placard de', '180x182x60 (color Nature)', 'https://senoresdelplacard.000webhostapp.com/assets/img/placard6.jpg' , 50000)


const placares = [placard1, placard2, placard3, placard4, placard5, placard6, placard7, placard8, placard9]
