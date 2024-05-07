<template>
    <header class="bg-gray-800 text-white">
        <div class="container max-w-screen-xl mx-auto p-4">
            <div class="flex justify-between items-center">
                <NuxtLink to="/" class="text-2xl font-bold">Pokedex</NuxtLink>
                <nav>
                    <ul class="flex gap-4">
                        <li v-for="item in menu" :key="item.name">
                            <NuxtLink :to="item.path" class="hover:underline">{{ item.name }}</NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<script setup>
const menu =  [
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/team' },

]
</script>