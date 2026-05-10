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

/*==============operaciones basicas de personajes=====================*/

//seleccionar solo los personajes

app.get("/personajes", (req, res)=>{ /*Si es barra personajes solo salen los personajes*/
    return res.json(Personajes)
})

//buscar x id

app.get("/personajes/:id", (req, res)=>{ //Esto es para poder especificar la id que buscas del personje
    return res.json(Personajes[req.params.id - 1])
})

//buscar x nombre

app.get("/personaje", (req, res) => {//Busca el personaje por nombre
    let nombre = req.query.nombre
    let resultado = Personajes.find(p => p.nombre == nombre)
    return res.json(resultado)
})

//Eliminar

app.delete("/personajes/:id", (req, res) => { //Busco el registro por la id
    let i = req.params.id - 1 //guardo la id
    let eliminado = Personajes.splice(i, 1) //y hago una variable que indique que elimine el registro con id de i
    return res.json(eliminado) //y responde a la api que lo ha eliminado
})

/*==================================================================*/

/*==============operaciones basicas de hechizos=====================*/

//seleccionar solo los hechizos

app.get("/hechizos", (req, res)=>{ /*Igual que personajes pero con hechizos*/
    return res.json(Hechizos)
})

//buscar x id

app.get("/hechizos/:id", (req, res)=>{ //Y esto para la id del hechizo
    return res.json(Hechizos[req.params.id - 1])
})

//Buscar x nombre

app.get("/hechizo", (req, res) => {//Busca el hechizo por nombre
    let nombre = req.query.nombre
    let resultado = Hechizos.find(h => h.nombre == nombre)
    return res.json(resultado)
})

//Eliminar

app.delete("/hechizos/:id", (req, res) => { //Busco el registro por la id
    let i = req.params.id - 1 //guardo la id
    let eliminado = Hechizos.splice(i, 1) //y hago una variable que indique que elimine el registro con id de i
    return res.json(eliminado) //y responde a la api que lo ha eliminado
})

/*==================================================================*/

app.get("/", (req, res) => { /*Si simplemente pones barra sale todo*/

    res.json({
        hechizos: Hechizos,
        personajes: Personajes
    })

})

/*======================Añadir hechizo=======================*/

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

    personajes.push(nuevoHechizo); //Esto indica que añada el hehcizo
    return res.status(201).json(nuevoHechizo)
})

/*=====================================================================*/

/*======================Añadir personaje=======================*/

app.post("/añadir-personajes", (req, res) => { //Aquí está para añadir personajes

    if(!req.body.nombre || !req.body.casa){ //Verifica los campos
        return res.status(400).json({mensaje: "Faltan datos"}) //Muestra el mensaje si falta algo
    }

    let nuevoPersonaje = { //indico los parametros
        id: Personajes.length + 1,
        nombre: req.body.nombre,
        casa: req.body.casa,
        año: req.body.año,
        huecos: req.body.huecos,
        IdHechizoPrincipal: req.body.IdHechizoPrincipal
    }

    Personajes.push(nuevoPersonaje) //pusheo el personaje
    res.status(201).json(nuevoPersonaje)
})

/*=====================================================================*/

/*======================Modificar hechizo=======================*/

app.put("/hechizos/:id", (req, res) => { //Esto modifica un registro que ya existe

    let i = req.params.id - 1 //guardo el id del que quieras modificar

    Hechizos[i].nombre = req.body.nombre //pide los parametros del parametro que indique i
    Hechizos[i].tipo = req.body.tipo
    Hechizos[i].dificultad = req.body.dificultad

    return res.json(Hechizos[i]) //y los devuelve como respuesta a la api
})

/*=====================================================================*/

/*======================Modificar personajes=======================*/

app.put("/personajes/:id", (req, res) => { //Esto modifica un registro que ya existe

    let i = req.params.id - 1 //guardo el id del que quieras modificar

    Personajes[i].nombre = req.body.nombre //pide los parametros del parametro que indique i
    Personajes[i].tipo = req.body.tipo
    Personajes[i].dificultad = req.body.dificultad

    return res.json(Personajes[i]) //y los devuelve como respuesta a la api
})

/*=====================================================================*/

/*==============Obtener los hechizos de un personaje en concreto=====================*/

app.get("/personajes/:id/hechizos", (req, res) => {

   let id = int(req.params.id) 

    let personaje = Personajes.find(p => p.id === id) //Uso .find para buscar el perosnaje, es más util que lo que estaba usando(busca en un array)

    if(!personaje){
        return res.status(404).json({mensaje: "Personaje no encontrado"})//si no encuentra nada envio el mensaje, o sea error 404
    }

    let hechizo = Hechizos.find(h => h.id === personaje.IdHechizoPrincipal) //Busco la id del hechizo que sea igual al del hechizo principal del personaje

    res.json(hechizo) //respuesta

})

/*=====================================================================*/

/*==============FILTROS=====================*/

//por texto

app.get("/personajes", (req, res) => { //Buscamos par la ruta de personajes

    let resultado = Personajes //Guardamos aquí todos los personajes

    if(req.query.casa){//comprueba si el buscar personajes, buscas las casas
        resultado = resultado.filter(//Filtra los personajes
            p => p.casa.toLowerCase() === req.query.casa.toLowerCase() //compara la casa con personajes
        )
    }

    //por numero

    if(req.query.huecosMin){//mira si hay huecos en la url
        resultado = resultado.filter(//Filtra los personajes
            p => p.huecos >= parseInt(req.query.huecosMin)//da solo los personajes filtrados por el stat de huecos
        )
    }

    //Ordenar

    if(req.query.orden){ //mira si has indicado de ordenar

        if(req.query.orden === "huecos"){ //comprueba para ordenar ascendente
            resultado.sort((a,b) => a.huecos - b.huecos)
        }

        if(req.query.orden === "-huecos"){ //comprueba para ordenar de mayor a menor
            resultado.sort((a,b) => b.huecos - a.huecos)
        }
    }

    res.json(resultado)//y da los resultados
})


//Top de personajes

app.get("/estadisticas/top-personajes", (req, res) => {

    let n = parseInt(req.query.n) || 1

    let top = [...Personajes] //esto indica ruta relativa
        .sort((a,b) => b.huecos - a.huecos)
        .slice(0, n)

    res.json(top)
})


//total de cada registro

app.get("/estadisticas/totales", (req, res) => { // si es barra total

    res.json({//te duevelve el total
        personajes: Personajes.length,
        hechizos: Hechizos.length
    })
})


//Agrupar por casas

app.get("/estadisticas/casas", (req, res) => { //cuando la url dice que es /casas

    let resultado = {} //creo un array vacío para guardar

    Personajes.forEach(p => { //y hago que por cada personaje

        if(resultado[p.casa]){//comprueba si la casa está
            resultado[p.casa]++ //y añade al contador de personajes de esa casa
        } else {
            resultado[p.casa] = 1
        }

    })

    res.json(resultado)
})

/*=====================================================================*/