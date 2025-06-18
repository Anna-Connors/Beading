<script setup lang="ts">
import { ref, computed } from 'vue'

//Grid Dimesions
const rows = ref<number>(6)
const columns = ref<number>(10)
//calculate total area of the grid created
const totalCells = computed<number>(() => rows.value * columns.value)

//color system to fill in the cells
//seed the array for reference on launch
const colors = ref<string[]>(['#FF6B6B', '#45B7D1', '#96CEB4'])
const selectedColorIndex = ref<number>(0)
const selectedColor = computed<string>(() => colors.value[selectedColorIndex.value])

//Store color of each cell as user interacts with grid
const cellColors = ref<string[]>([])

//initialize grid with white cells
const initializeGrid = () => {
  cellColors.value = new Array(totalCells.value).fill('#FFFFFF')
}

//fill in a cell on click
const paintCell = (index: number) => {
  if (cellColors.value.length === 0) {
    initializeGrid()
  }
  cellColors.value[index] = selectedColor.value
  console.log(`Painted cell ${index} with ${selectedColor.value}`)
}

//initialize grid when page loads
initializeGrid()
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

    <div class="color-palette">
      <h3>Colors:</h3>
      <div class="color-options">
        <div
          v-for="(color, index) in colors"
          :key="index"
          class="color-swatch"
          :class="{ active: selectedColorIndex === index }"
          :style="{ backgroundColor: color }"
          @click="selectedColorIndex = index"
        ></div>
      </div>
      <p>Selected: {{ selectedColor }}</p>
    </div>

    <!-- Display the actual Grid -->
    <div class="grid-container">
      <div
        class="grid"
        :style="{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }"
      >
        <div
          v-for="cellIndex in totalCells"
          :key="cellIndex"
          class="cell"
          :style="{ backgroundColor: cellColors[cellIndex - 1] || '#FFFFFF' }"
          @click="() => paintCell(cellIndex - 1)"
        ></div>
      </div>
    </div>
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

.grid-container {
  margin: 20px 0;
}

.grid {
  display: grid;
  width: fit-content;
  border: 2px solid #333;
}

.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 10px;
}

.cell:hover {
  background: #f0f0f0;
}

.color-palette {
  margin: 20px 0;
}

.color-options {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.color-swatch {
  width: 40px;
  height: 40px;
  border: 3px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.color-swatch:hover {
  transform: scale(1.1);
}

.color-swatch.active {
  border-color: #333;
  border-width: 4px;
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
