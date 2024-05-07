<template>
    <div class="container max-w-screen-xl mx-auto">
        <main>
            <h1 class="text-3xl font-bold text-center my-8">Team</h1>
            <div class="flex w-full justify-end">
                <!-- Team lenght /6 -->
                <p class="text-right
                text-2xl">{{ team.length }}/6</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Card v-for="pokemon in team" :key="pokemon.id" :pokemon="pokemon" />
            </div>
        </main>
    </div>
</template>

<script setup>
const team = useState('team');



</script>