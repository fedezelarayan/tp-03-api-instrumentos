const fs = require('node:fs/promises');

async function leerArchivo(ruta) {
    try {
        const archivos = await fs.readFile(ruta, 'utf-8');
        return JSON.parse(archivos);
    } catch (error) {
        console.error(`Error al leer el archivo ${ruta}:`, error);
    }
}

module.exports = { leerArchivo };