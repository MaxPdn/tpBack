<script setup>
import { ref } from "vue";
const props = defineProps({
  items: { type: Array, require: true, default: () => [] },
});
</script>

<template>
  <ul style="list-style: none">
    <li v-for="product of items" :key="product.id">
      <p>{{ product.id }}</p>
      <p>{{ product.name }}</p>
      <p>{{ product.price }}€</p>
      <button>Modifier</button>
      <button>Supprimer</button>
    </li>
  </ul>
</template>

<style scoped>
li{
    display: flex;
}
</style>
