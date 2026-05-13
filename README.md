# AnaReaBaena_TrabajoFinalMarcas
Trabajo final de la asignatura Lenguaje de marcas donde se crea una api con nodos

# Tematica

El tema de la api es sobre un rol que estoy haciendo en base al universo de harry potter por lo que he añadido
tanto hechizos como los personajes de los jugadores.

---

La API permite:

- Consultar personajes y hechizos
- Buscar personajes o hechizos por ID o nombre
- Añadir nuevos personajes y hechizos
- Modificar información existente
- Eliminar registros
- Consultar estadísticas
- Relacionar personajes con sus hechizos principales
- Filtrar personajes por casa y huecos

---

La API funciona en el puerto: 1987

---

# Grupos principales

## Personajes

Compuesto de:

-nombre
-casa
-año
-huecos
-hechizo principal

## Hechizos

Compuesto de:

-nombre
-tipo
-dificultad
-año de aprendizaje
-coste
-dado
-estadística usada
-descripción

---
# Ejemplos de uso

## Mostrar todos los personajes

GET http://localhost:1987/personajes

## Añadir personaje

{
  "nombre": "Luna Shadow",
  "casa": "Slytherin",
  "año": "2º",
  "huecos": 5,
  "IdHechizoPrincipal": 1
}

## Elminiar personaje

DELETE http://localhost:1987/personajes/1

---
