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

http://localhost:3000/api/instrumentos

Filtrar por familia:

http://localhost:3000/api/instrumentos?familia=cuerda

Buscar instrumento por ID:

http://localhost:3000/api/instrumentos/3

Crear un instrumento:

POST http://localhost:3000/api/instrumentos

La solicitud tiene que ser formato JSON con el cuerpo:

{
  "nombre": "Charango",
  "familia": "Cuerda",
  "origen": "Argentina",
  "descripcion": "Instrumento de cuerda tradicional de los Andes.",
  "disponible": false
}

-- Para recibir correctamente el cuerpo JSON, express utiliza:

app.use(express.json());

express.json() es un middleware que permite interpretar solicitudes que contienen datos en formato JSON y hacerlos disponibles mediante req.body.

-- Los parámetros de ruta, forman parte de la URL y sirven para identificar un recurso específico, por ejemplo:

GET /api/instrumentos/3

En este caso el 3 es un parámetro de ruta y se obtiene con:

req.params.id

-- La consulta ó query es un valor que se agrega después del "?" y sirve para obtener datos y utilizarlos por ejemplo, para filtrar:

GET /api/instrumentos?familia=cuerda

familia=cuerda es una query y en el backend se obtiene con:

req.query.familia


## Códigos de estado

La API utiliza los siguientes códigos de estado:

200 OK: la solicitud se realizó correctamente. Se utiliza para obtener información, para saber si nuestra solicitud se realizó correctamente.

201 Created: el instrumento fue creado correctamente mediante POST.

400 Bad Request: la solicitud de creación no contiene alguno de los campos obligatorios.

404 Not Found: el instrumento solicitado mediante su ID no existe.

## PErsistencia de los datos

Los instrumentos inicialmente se cargan desde el archivo ubicado en "datos/instrumentos.json".

Los nuevos instrumentos creados mediante POST se agregan solo al arreglo que se encuentra en memoria.

Esto explica porqué cuando detenemos el servidor y volvemos a iniciarlo, el programa carga de nuevo los datos originales desde la carpeta "datos" y los archivos creados mediante POST desaparecen.

Al no utilizar una base de datos, la aplicación sólo utiliza persistencia para los datos iniciales del archivo JSON "instrumentos.json". 

