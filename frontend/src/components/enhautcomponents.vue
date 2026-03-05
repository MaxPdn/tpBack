<script setup>
import { ref } from "vue";

const search = ref("");
const filtre = ref("");

const filterSearch = async () => {
  try {
    let url = `http://localhost:3000/api/products`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Erreur serveur");
    }
    products.value = await res.json();
    // console.log(products.value);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="filterSearch">
      <!-- <label for="nom">Rechercher :</label> -->
      <input type="text" id="search" placeholder="Recherche" v-model="search" />

      <!-- <label for="pays">Categorie</label> -->
      <select id="category" name="category" v-model="filtre">
        <option value="">Selectionner une catégorie</option>
        <option value="electronics">Electronique</option>
        <option value="fourniture">Fourniture</option>
        <option value="accessories">Accessoire</option>
      </select>
    </form>
  </div>
</template>

<style scoped></style>
