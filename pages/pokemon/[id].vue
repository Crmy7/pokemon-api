<template>
    <div v-if="pokemon" class="flex pt-36">
        <div class="w-full md:w-1/2">
            <img :src="pokemon.image" alt="Pokemon Image" />
            <div class="mt-4">
                <h2 class="text-lg font-semibold">Resistances:</h2>
                <ul class="list-disc pl-4 grid grid-cols-2">
                    <li v-for="(resistance, index) in pokemon.apiResistances" :key="index"
                        class="list-none grid grid-cols-2">
                        <p class="mr-5">{{ resistance.name }}</p>
                        <div class="flex items-center">
                            <div class="w-24 bg-gray-300 mr-2">
                                <div :class="calculateResistanceColor(resistance.damage_multiplier)" class=" h-2"
                                    :style="{ width: calculateResistanceWidth(resistance.damage_multiplier) }"></div>
                            </div>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-full md:w-1/2 flex flex-col pb-20">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold">{{ pokemon.name }}</h1>
                <Icon name="material-symbols:asterisk" color="black" @click="addToTeam" width="50" height="50" class=" cursor-pointer " />
            </div>

            <div class="mt-4">
                <p v-if="pokemon.apiEvolutions.length === 0">This Pokémon does not evolve.</p>
                <div v-else>
                    <p v-for="(evolution, index) in pokemon.apiEvolutions" :key="index">
                        Evolution : {{ evolution.name }}
                    </p>
                </div>
            </div>
            <div class="mt-4">
                <h2 class="text-lg font-semibold">Types:</h2>
                <div class="flex">
                    <div v-for="(type, index) in pokemon.apiTypes" :key="index" class="mr-2 w-24 h-24"
                        :style="{ 'background-image': 'url(' + type.image + '); background-size: contain' }">
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <h2 class="text-lg font-semibold">Stats:</h2>
                <ul class="pl-4 list-none grid grid-cols-2 gap-y-7">
                    <li v-for="(value, key) in pokemon.stats" :key="key"
                        class="list-none flex flex-col items-center justify-center">
                        <p class="text-center mb-7">{{ key }}</p>
                        <div role="progressbar" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100"
                            :style="{ '--value': value }"></div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const { params, query } = useRoute();
const { getPokeDetails } = usePokeAPI();
const pokemon = ref(null);

pokemon.value = await getPokeDetails(params.id);

const props = defineProps(['pokemon'])

const team = useState('team', () => [])

function addToTeam(event) {
    
    if (team.value.length < 6) {
        team.value.push(props.pokemon);
    }
}


const calculateResistanceWidth = (multiplier) => {
    return `${multiplier * 50}%`;
};

const calculateResistanceColor = (multiplier) => {

    if (multiplier < 1) {
        return 'bg-green-500';
    } else if (multiplier === 1) {
        return 'bg-orange-500'
    } else {
        return 'bg-red-500';
    }
};

</script>

<style scoped>
@keyframes growProgressBar {

    0%,
    33% {
        --pgPercentage: 0;
    }

    100% {
        --pgPercentage: var(--value);
    }
}

@property --pgPercentage {
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
}

div[role="progressbar"] {
    animation: growProgressBar 3s 1 forwards;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background:
        radial-gradient(closest-side, white 80%, transparent 0 99.9%, white 0),
        conic-gradient(#1f2937 calc(var(--pgPercentage) * 1%), #ffff 0);
}

div[role="progressbar"]::before {
    counter-reset: percentage var(--value);
    content: counter(percentage) '%';
}
</style>