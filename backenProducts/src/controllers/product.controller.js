import products from "../data/products.js";

//recherche filrage pagination
const getProducts = (req, res) => {
  let { page, limit, search, category } = req.query;

  if (category && search) {
    let tab_categorie = products.filter((x) =>
      x.category.toLowerCase().includes(category.trim().toLowerCase()),
    );

    let produits_search = tab_categorie.filter((x) =>
      x.name
        .split(" ")
        .join("")
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
    );

    if (!limit) {
      return produits_search;
    } else {
      let debut = limit * (page - 1);
      let result = produits_search.slice(debut, limit * page);
      res.json({ filtre: result });
      return result;
    }
  }
  res.json({ products: products });
  return products;
};

//add
const createProduct = (req, res) => {
  const { name, price, category } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
  };

  products.push(newProduct);
  res.status(201).json({ newProduct: newProduct });
};

export const productsController = {
  createProduct,
  getProducts,
};
