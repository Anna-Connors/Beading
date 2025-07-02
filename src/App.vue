<script setup lang="ts">
import BeadworkDesigner from './components/BeadworkDesigner.vue'
</script>

<template>
  <header>
    <img alt="Heart logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <BeadworkDesigner />
</template>

<style>
header {
  line-height: 1.5;
  display: flex;
  place-items: center;
  padding: 20px;
}

.logo {
  display: block;
  margin: 0 auto;
}
</style>
