const express = require("express");
const app = express();
const port = 1987; /*Puerto de la api*/

app.use(express.json())

app.listen(port, () => 
console.log("Alohomora..")) /*Mesnaje de apertura*/

let Hechizos = [
    {id: 1, nombre:'Accio', tipo: 'Utilidad', dificultad: 'Baja', año_aprend:'1º', coste:1, dado:'d6', stat_calc:'Habilidad', descripción:'Atrae el objeto o persona afectado' },
    {id: 2, nombre:'Levioso', tipo: 'Utilidad', dificultad: 'Baja', año_aprend:'1º', coste:1, dado:'d6', stat_calc:'Habilidad', descripción:'La persona u objeto es levantada en el aire'},
]

let Personajes = [
    {id: 1, nombre: 'Natasha Dreamoor', casa: 'Hufflepuff', año: '1º', huecos: 3, IdHechizoPrincipal: 1},
    {id: 2, nombre: 'Henry Runewood', casa: 'Ravenclaw', año: '1º', huecos: 4, IdHechizoPrincipal: 2}
]