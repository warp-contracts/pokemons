<script setup>
import { useContractStore } from '../stores/contract';
const store = useContractStore();
</script>

<template>
  <header>
    <h1 class="app-title">Who's that pokemon ?</h1>
    <h2 class="contract-id">
      
      <a
        target="_blank"
        :href="`https://sonar.warp.cc/#/app/contract/${store.contractId}`"
      >
      <p>Score: {{store.correctCount}} / {{store.questionCount}}</p>
      
      </a>
    </h2>
  </header>
</template>

<style scoped lang="scss">
@import '../style/_colors';
header {
  width: 100%;
  height: 6rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 5rem;
  background-color: $background;

  .app-title {
    margin-top: 3rem;
    font-family: 'Pokemon';
    font-size: 5rem;
    color: #ffcc00;
    -webkit-text-stroke: 3px #375da9;
  }
  .contract-id {
    display: flex;
    flex-direction: row;

    margin-top: 1rem;
    color: $white;
    p {
      font-size: 2.5rem;
      text-decoration: none;
    }
    a {
      font-size: 1.2rem;
      margin-left: 1rem;
      color: $white;
    }
    a:link { text-decoration: none; } 
    a:visited { text-decoration: none; }
    a:hover { text-decoration: underline; }
    a:active { text-decoration: none; }
  }
}
</style>
