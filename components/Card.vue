<template>
    <NuxtLink :to="/pokemon/ + pokemon.id">
        <img :src="pokemon.image" :alt="pokemon.name" class="w-full h-48 object-contain" />
        <!-- Ajouter à l'équipe -->
        <div class="flex justify-evenly items-center">
            <h2 class="text-xl font-bold">{{ pokemon.name }}</h2>
            <AddToTeam/>
            <Icon name="material-symbols:asterisk" color="black" @click="addToTeam" />
        </div>


    </NuxtLink>
</template>

<script setup>
const props = defineProps(['pokemon'])

const team = useState('team', () => [])

function addToTeam(event) {
    
    if (team.value.length < 6) {
        team.value.push(props.pokemon);
    }
}

</script>