<script setup lang="ts">
import { ref, computed } from 'vue'
import '../styles/BeadworkDesigner.css'
import { useColorPalette } from '../composables/useColorPalette'
import { useGridManagement } from '../composables/useGridManagement'
import { useSavePatterns } from '../composables/useSavePatterns'

//get colors
const { colors, selectedColor, selectedColorIndex, newColor, addColor, removeColor } =
  useColorPalette()

//get undo
const {
  rows,
  columns,
  totalCells,
  cellColors,
  initializeGrid,
  clearGrid,
  gridHistory,
  currentHistoryIndex,
  saveToHistory,
  undo,
  canUndo,
} = useGridManagement()

const { saveAsJPEG, saveAsSVG } = useSavePatterns(rows, columns, cellColors)

//count total cells filled with each color
//allows user to know quantity of beads needed in pattern repeat
const colorCounts = computed(() => {
  const counts: { [color: string]: number } = {}

  //initialize counts
  colors.value.forEach((color) => {
    counts[color] = 0
  })

  //count colors in grid
  cellColors.value.forEach((cellColor) => {
    if (cellColor !== '#FFFFFF') {
      counts[cellColor]++
    }
  })

  return counts
})

//fill in a cell on click
const paintCell = (index: number) => {
  if (cellColors.value.length === 0) {
    initializeGrid()
  }

  //paint cell
  cellColors.value[index] = selectedColor.value
  console.log(`Painted cell ${index} with ${selectedColor.value}`)

  //save state to history after making changes
  saveToHistory()
}

//GRID SETUP AND INTERACTIONS
</script>

<template>
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

    <!-- Display the colors available/selected -->
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
        >
          <!--add X button to remove colors if more than 1 color present-->
          <button v-if="colors.length > 1" @click.stop="removeColor(index)" class="remove-color">
            x
          </button>
        </div>
      </div>

      <!--add new color section-->
      <div class="add-color">
        <input type="color" v-model="newColor" class="color-picker" />
        <button @click="addColor" class="add-color-btn">Add Color</button>
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

    <!--Color Counter-->
    <div class="color-counter">
      <h3>Color Count:</h3>
      <div v-for="(color, index) in colors" :key="color" class="color-count">
        <div class="color-sample" :style="{ backgroundColor: color }">
          <span>{{ colorCounts[color] || 0 }}</span>
        </div>
      </div>
    </div>

    <!-- Button to clear the grid -->
    <div class="actions">
      <button @click="clearGrid" class="grid-btn">Clear Grid</button>
      <button @click="saveAsJPEG" class="grid-btn">Save as JPEG</button>
      <button @click="saveAsSVG" class="grid-btn">Save as SVG</button>
      <button @click="undo" class="grid-btn">UNDO</button>
    </div>
  </div>
</template>
