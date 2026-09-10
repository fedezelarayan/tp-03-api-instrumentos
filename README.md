# Trabajo práctico 03

## Descripción

Este proyecto consiste en el desarrollo de unaa API REST utilizando node.js y Express para gestionar un listado de instrumentos musicales.

Los instrumentos se cargan inicialmente desde el archivo "datos/instrumentos.json", la API permite listar todos los instrumentos, filtrarlos por familia, buscar por su ID y crear un instrumento nuevo.

Utilicé carga asíncrona de archivos mediante "node:fs/promises" y procesamiento de datos JSON.

## Instalación

Para instalar las dependencias del proyecto, es necesario terner node.js instalado.

Ubicándonos en la carpeta raíz del proyecto ejecutamos:

npm install ó npm i

Para instalar las dependencias declaradas en package.json

## Ejecución

PAra iniciar el servidor, ejecutar:

npm start

y el servidor inciará en:

http://localhost:3000

para detener la ejecución ejecutar:

Ctrl + c

## Endpoints

GET http://localhost:3000/
└──Devuelve un mensaje en formato JSON, de bienvenida y para indicar que la API está disponible.


GET http://localhost:3000/api/instrumentos
└──Devuelve un listado con todos los instrumentos registrados.


GET http://localhost:3000/api/instrumentos?familia=cuerda
└──Permite filtrar por familia mediante una consulta, no distingue entre mayúsculas o minúsculas.


GET http://localhost:3000/api/instrumentos/1
└──Permite la búsqueda mediante ID.


POST http://localhost:3000/api/instrumentos
└──Permite crear un nuevo instrumento en memoria, el cuerpo de la solicitud debe estar en formato JSON e incluir los siguientes campos:


{
  "nombre": "Charango",
  "familia": "Cuerda",
  "origen": "Argentina",
  "descripcion": "Instrumento de cuerda tradicional de los Andes.",
  "disponible": false
}

El ID de genera automáticamente después del último registro.

## Ejemplos de solicitudes.

Obtener todos los instrumentos:
