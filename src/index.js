const express = require('express');
const path = require('node:path');
const { leerArchivo } = require('./archivos');

const PORT = 3000;
const rutaInstrumentos = path.join(__dirname, '../', 'datos', 'instrumentos.json');

async function main() {
    try {
        const instrumentos = await leerArchivo(rutaInstrumentos);
        const app = express();
        app.use(express.json());

        app.get('/api/instrumentos', async (req, res) => {
            const familia = req.query.familia;

            if (!familia) {
                return res.json(instrumentos);
            }

            const instrumentosFiltrados = instrumentos.filter(instrumento =>
                instrumento.familia.toLowerCase() === familia.toLowerCase()
            );

            res.json(instrumentosFiltrados);
        });

        app.get('/', (req, res) => {
            res.json({ message: 'Bienvenido a la API de instrumentos musicales' });
        })

        app.get('/api/instrumentos/:id', (req, res) => {
            const id = parseInt(req.params.id);
            leerArchivo(rutaInstrumentos)
                .then(instrumentos => {
                    const instrumento = instrumentos.find(i => i.id === id);
                    if (instrumento) {
                        res.json(instrumento);
                    } else {
                        res.status(404).json({
                            error: 'Instrumento no encontrado'
                        });
                    }
                });
        })

        app.post('/api/instrumentos', (req, res) => {
            const {
                nombre,
                familia,
                origen,
                descripcion,
                disponible
            } = req.body;

            if (
                nombre === undefined ||
                familia === undefined ||
                origen === undefined ||
                descripcion === undefined ||
                disponible === undefined
            ) {
                return res.status(400).json({
                    error: 'Faltan campos obligatorios'
                });
            }

            const ultimoInstrumento =
                instrumentos[instrumentos.length - 1];

            const nuevoId = ultimoInstrumento.id + 1;

            const nuevoInstrumento = {
                id: nuevoId,
                nombre,
                familia,
                origen,
                descripcion,
                disponible
            };

            instrumentos.push(nuevoInstrumento);

            res.status(201).json(nuevoInstrumento);
        });

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error en la aplicación:', error);
    }
}


main();
