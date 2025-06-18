<script setup lang="ts">
import { ref, computed } from 'vue'

//Reactive variables
const rows = ref<number>(6)
const columns = ref<number>(10)

//computed area; mainly for geekery
const totalCells = computed<number>(() => rows.value * columns.value)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <div class="app">
    <h1>Beadwork Designer</h1>

    <!-- Grid Controls -->
    <!-- Create the grid by accepting user input for rows & columns -->
    <div class="controls">
      <label>
        Rows:
        <input type="number" v-model.number="rows" min="1" max="50" />
      </label>

      <label>
        Columns:
        <input type="number" v-model.number="columns" min="1" max="50" />
      </label>
    </div>

    <!-- Display Current Values -->
    <p>Grid size: {{ rows }} x {{ columns }} = {{ totalCells }} cells</p>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.app {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.controls {
  margin: 20px 0;
}

.controls label {
  margin-right: 20px;
}

input {
  margin-left: 5px;
  width: 60px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

@media (max-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }
}
</style>
