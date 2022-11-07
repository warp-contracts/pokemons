<template>
    <div class="pokemon-container">
      <img
      v-bind:src='"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+store.pokemonId+".png"'
      />
      <!-- <div style="font-size: 36px; color: white">
      PokemonId: {{store.pokemonId}}
      {{store.pokemons[store.pokemonId]}}
        </div> -->
      <form>
        <!-- {{store.answers}} -->
        <span v-for="(answer, index) in store.answers" :key="index">
            <button class="send-btn" @click.prevent="submitAnswer(answer)">{{answer}}</button>
        </span>
      <!-- <button class="send-btn" @click.prevent="next">Next</button>
      <button class="send-btn" @click.prevent="addInteraction">Next</button> -->
    </form>
    </div>  
    
  
</template>

<script setup>
import { useContractStore } from '../stores/contract';
const store = useContractStore();


const submitAnswer = async (selected) => {
    console.log("Selected: " + selected);
    await store.postAnswer(selected);
}

</script>

<style scoped lang="scss">
@import '../style/_colors';
    .pokemon-container {
        margin-top: 4rem;
        text-align: center;
        height: 800px;
    }

    img {
        margin-top: 2rem;
        height: 300px;
    }

    .send-btn {
        width: 15rem;
        height: 5rem;
        margin-top: 2rem;
        margin-left:3rem;
        margin-right:3rem;
        cursor: pointer;
        background-color: $contrast;
        color: $white;
        border: none;
        font-size: 2rem;

        &:hover {
        background-color: $contrastHover;
        }
  }

</style>