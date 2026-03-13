<script setup>
import { fetchData } from "@/services/api";
import { onMounted, ref } from "vue";

//variables pour la recherche par catégorie et par nom
const inputSearch = ref("");
const selectSearch = ref("");
const limit = ref(40);
const page = ref(1);
const products = ref([]);

//fonction pour la recherche
async function search() {
  const url = `http://localhost:7000/api/products?name=${inputSearch.value}&category=${selectSearch.value}&limit=${limit.value}&page=${page.value}`;
  const meth = "GET";
  const data = await fetchData(url, meth);
  products.value = data.data;
  console.log(products.value);
}
onMounted(search);

//variables pour l'ajout des produits
const name = ref("");
const price = ref("");
const category = ref("");

//fonction pour l'ajout des produits
async function addProduct() {
  const url = `http://localhost:7000/api/products`;
  const meth = "POST";
  const body = {
    name: name.value,
    price: price.value,
    category: category.value,
  };
  await fetchData(url, meth, body);
  search();
}

//variable pour la modification ou la suppression

//fonction pour la suppression
async function deleteProduct(id) {
  const url = `http://localhost:7000/api/products/:id=${id}`;
  const meth = "DELETE";
  await fetchData(url, meth);
  search();
}

//function pour la modification
function updateProduct() {}
</script>

<template>
  <div id="app-container">
    <div class="section-filter">
      <form id="filter-form" @submit.prevent="search">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          name="search"
          v-model="inputSearch"
        />
        <select name="category-filter" v-model="selectSearch">
          <option value="">Sélectionnez une catégorie</option>
          <option value="electronics">Électronique</option>
          <option value="furniture">Mobilier</option>
          <option value="accessories">Accessoires</option>
        </select>
        <button type="submit">Rechercher</button>
      </form>
    </div>

    <div class="section-add">
      <button type="button" id="btn-new-product">Nouveau produit</button>
      <form id="add-product-form" @submit.prevent="addProduct">
        <input
          type="text"
          placeholder="Nom du produit"
          name="name"
          required
          v-model="name"
        />
        <input
          type="number"
          placeholder="Prix"
          name="price"
          required
          v-model="price"
        />
        <select name="category-add" required v-model="category">
          <option value="">Sélectionnez une catégorie</option>
          <option value="electronics">Électronique</option>
          <option value="furniture">Mobilier</option>
          <option value="accessories">Accessoires</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <div class="section-list">
      <h2>Liste Produits</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prix (FCFA)</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody v-for="(product, i) in products" :key="product.id">
          <tr>
            <td>{{ i + 1 }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>
              <span class="badge">{{ product.category }}</span>
            </td>
            <td>
              <button class="btn-edit">Modifier</button>
              <button class="btn-delete" @click="deleteProduct(product._id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-pagination">
      <div class="pagination-controls">
        <label for="page-input">Page</label>
        <input type="number" id="page-input" value="" v-model="page" />

        <label for="limit-input">Limite</label>
        <input type="number" id="limit-input" value="limit" v-model="limit" />

        <span class="total-info">{{ limit }}/ 30</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --primary: #0f172a; /* Bleu Nuit */
  --accent: #3b82f6; /* Bleu Électrique */
  --bg: #f8fafc;
  --text: #1e293b;
  --success: #10b981;
}

body {
  font-family: "Inter", sans-serif;
  background: var(--bg);
  color: var(--text);
  padding: 40px;
}
#app-container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 8px;
  border-top: 6px solid var(--primary);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.section-filter {
  background: #f1f5f9;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}
input,
select {
  border: 1px solid #cbd5e1;
  padding: 8px 12px;
  border-radius: 4px;
}

button[type="submit"] {
  background: var(--accent);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}
#btn-new-product {
  background: var(--primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th {
  text-align: left;
  background: #f8fafc;
  padding: 12px;
  border-bottom: 2px solid #e2e8f0;
  color: #64748b;
  font-size: 0.8rem;
  text-transform: uppercase;
}
td {
  padding: 12px;
  border-bottom: 1px solid #f1f5f9;
}
.badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
}
</style>
