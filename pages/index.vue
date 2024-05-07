<template>
    <div class="container max-w-screen-xl mx-auto">
        <NuxtLink to="/team" class="block text-center my-8">
            <button class="text-white uppercase font-semi bg-red-600 rounded-full py-1">Voir l'équipe</button>
        </NuxtLink>
        <h1 class="text-3xl font-bold text-center my-8">Pokemons</h1>
        <div v-if="!loading">
            <div class="flex gap-8 mb-5">
                <div v-for="type in types" :key="type.id" @click="filterByType(type.name)">
                    <h3 class="cursor-pointer">{{ type.name }}</h3>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Card v-for="pokemon in filteredPokemons" :key="pokemon.id" :pokemon="pokemon" />
            </div>
        </div>

        <div v-else class="flex justify-center w-full">
            <Icon name="svg-spinners:tadpole" color="black h-28 w-28" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const { getPokemons, getTypes } = usePokeAPI();
const pokemons = ref([]);
const types = ref([]);
const loading = ref(true);
const selectedType = ref(null);

onMounted(async () => {
    try {
        pokemons.value = await getPokemons();
        types.value = await getTypes();
        loading.value = false;
    } catch (error) {
        console.error('Une erreur s\'est produite lors du chargement des données:', error);
        loading.value = false;
    }
});

const filteredPokemons = computed(() => {
    if (!selectedType.value) return pokemons.value;
    return pokemons.value.filter(pokemon => pokemon.apiTypes.some(apiType => apiType.name === selectedType.value));
});

function filterByType(type) {
    selectedType.value = type === selectedType.value ? null : type;
}
</script>
