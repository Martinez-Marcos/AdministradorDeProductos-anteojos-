const path = require("path");

const { read, write } = require("./file.manager.js");

const FILE = path.join(__dirname, "data.json");

function formatProduct({ id, brand, material, opacity, lensPower, price }) {
    const correctFormat = {
        id: Number(id),
        brand,
        material,
        opacity: Number(opacity),
        lensPower: Number(lensPower),
        price: Number(price),
    };

    return correctFormat;
}

function idGenerator(products) {
    let biggerId = 0;

    products.forEach((product) => {
        if (Number(product.id) > biggerId) {
            biggerId = product.id;
        }
    });
    return biggerId + 1;
}

async function findAll() {
    const products = await read(FILE);
    return products;
}

async function findById(id) {
    if (!id) throw new Error("Error. Debe especificar un ID");

    const products = await read(FILE);
    const product = products.find((P) => P.id === Number(id));

    if (!product) throw new Error("Error. El id no corresponde a un producto disponible");

    return product;
}

async function create({ brand, material, opacity, lensPower, price }) {
    const newProduct = {
        brand,
        material,
        opacity,
        lensPower,
        price,
    };
    //Verificar si esta completo
    const Incomplete = Object.values(newProduct).some((value) => !(value ?? false));
    if (Incomplete) throw new Error("Error. Faltan datos");

    let products = await read(FILE);

    let productWithId = {
        id: idGenerator(products),
        ...newProduct
    };

    productWithId = formatProduct(productWithId);

    //comprueba el formato correcto
    const incorrectFormat = Object.values(productWithId).some((value) => !(value ?? false));
    if (incorrectFormat) throw new Error("Error en el formato del producto");

    products.push(productWithId);

    await write(FILE, products);

    return productWithId;
}

async function update(updateProduct) {

    const { id, brand, material, opacity, lensPower, price } = updateProduct;

    //Revisar si tienen id y algun cambio
    if (!id || (id && !(brand || material || opacity || lensPower || price))) throw new Error("Error. Se necesita un ID o algún cambio.");

    let products = await read(FILE);
    const index = products.findIndex((p) => p.id === Number(id));

    if (index <= 0) throw new Error("Error. El id es erroneo o el producto no se encuentra disponible.");

    products[index] = {
        ...products[index],
        ...updateProduct
    };

    products[index] = formatProduct(products[index]);

    //comprueba el formato correcto
    const incorrectFormat = Object.values(products[index]).some((value) => !(value ?? false));
    if (incorrectFormat) throw new Error("Error en el formato del producto");

    await write(FILE, products);

    return products[index];
}

async function destroy(id) {
    if (!id) throw new Error("Error. El Id no está definido.");

    let products = await read(FILE);
    const index = products.findIndex((product) => product.id === Number(id));

    if (index < 0) throw new Error("Error. El id es erroneo o el producto no se encuentra disponible.");

    products.splice(index, 1);
    await write(FILE, products);

    return products;
}

module.exports = { findById, findAll, create, update, destroy, idGenerator };