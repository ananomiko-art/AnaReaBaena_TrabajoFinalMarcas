const express = require("express");
const app = express();
const port = 1987;

app.use(express.json())

app.listen(port, () => 
console.log("Alohomora.."))

let Hechizos = [
    {id: 1, nombre:'Accio', tipo: 'Utilidad', dificultad: 'Baja', año_aprend:'1º', coste:1, dado:'d6', stat_calc:'Habilidad', descripción:'Atrae el objeto o persona afectado' },

]