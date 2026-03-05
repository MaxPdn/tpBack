<script setup>
    import Enhautcomponents from "@/components/enhautcomponents.vue";
    import M from "@/components/m.vue";
    import Bas from "@/components/bas.vue";
    import { ref, onMounted, watch } from "vue";

    //variables réactives
    const products = ref([]);
    const search = ref("laptop");
    const limit = ref(5);
    const category = ref("elec");
    const page = ref(1);

    //le fetch pour récupérer les produits
    const fetchProducts = async () => {
        try {
            let url = `http://localhost:3000/api/products`;
            const res = await fetch(url);
            if (!res.ok) { throw new Error("Erreur serveur") }
            const data=await res.json()
            products.value = data.products
            console.log(products.value);
            
        } 
        catch (error) { console.error(error) }
    };
    onMounted(fetchProducts);


</script>

<template>
  <div>
    <h1>Mes produits</h1>
    <div>
      <Enhautcomponents />
    </div>
    <div>
      <M :items="products"/>
    </div>
    <div>
      <Bas />
    </div>
  </div>
</template>

<style scoped></style>
