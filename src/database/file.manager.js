const fs = require("fs");

function write(file, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, JSON.stringify(content, null, "\t"), "utf8", (error) => {
            if (error) reject(new Error("No se pudo escribir el archivo"));

            resolve(true);
        });
    });
}

function read(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", (error, results) => {
            if (error) reject(new Error("No se pudo leer el archivo"));

            resolve(JSON.parse(results));
        });
    });
}

module.exports = { read, write };