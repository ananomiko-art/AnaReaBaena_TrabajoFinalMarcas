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


app.get("/personajes", (req, res)=>{ /*Si es barra personajes solo salen los personajes*/
    return res.json(Personajes)
})

app.get("/hechizos", (req, res)=>{ /*Igual que personajes pero con hechizos*/
    return res.json(Hechizos)
})

app.get("/", (req, res) => { /*Si simplemente pones barra sale todo*/

    res.json({
        hechizos: Hechizos,
        personajes: Personajes
    })

})

app.get("/personajes/:id", (req, res)=>{ //Esto es para poder especificar la id que buscas del personje
    return res.json(Personajes[req.params.id - 1])
})

app.get("/hechizos/:id", (req, res)=>{ //Y esto para la id del hechizo
    return res.json(Hechizos[req.params.id - 1])
})

app.get("/hechizo", (req, res) => {//Busca el hechizo por nombre
    let nombre = req.query.nombre
    let resultado = Hechizos.find(h => h.nombre == nombre)
    return res.json(resultado)
})

app.get("/personaje", (req, res) => {//Busca el hechizo por nombre
    let nombre = req.query.nombre
    let resultado = Personajes.find(p => p.nombre == nombre)
    return res.json(resultado)
})

app.post("/añadir-hechizo", (req, res)=>{ //Para añadir hechizos

    if(!req.body.nombre || !req.body.tipo){ //Esto verifica si estan todos los datos necesarios
        return res.status(400).json({mensaje: "Te faltan datos"})
    }

    let nuevoHechizo = { //Aquí especifico los campos que tiene un hechizo
        id: Hechizos.length + 1,
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        dificultad: req.body.dificultad,
        año_aprend: req.body.año_aprend,
        coste: req.body.coste,
        dado: req.body.dado,
        stat_calc: req.body.stat_calc,
        descripción: req.body.descripción
    }

    personajes.push(HechizoNuevo); //Esto indica que añada el hehcizo
    return res.status.json(HechizoNuevo)
})

app.put("/hechizos/:id", (req, res) => { //Esto modifica un registro que ya existe

    let i = req.params.id - 1 //guardo el id del que quieras modificar

    Hechizos[i].nombre = req.body.nombre //pide los parametros del parametro que indique i
    Hechizos[i].tipo = req.body.tipo
    Hechizos[i].dificultad = req.body.dificultad

    return res.json(Hechizos[i]) //y los devuelve como respuesta a la api
})

app.delete("/hechizos/:id", (req, res) => { //Busco el registro por la id
    let i = req.params.id - 1 //guardo la id
    let eliminado = Hechizos.splice(i, 1) //y hago una variable que indique que elimine el registro con id de i
    return res.json(eliminado) //y responde a la api que lo ha eliminado
})