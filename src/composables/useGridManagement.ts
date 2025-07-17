import { ref, computed } from 'vue'

//UNDO - creates the ability to backtrack
export function useGridManagement() {
  //Grid Dimensions
  const rows = ref<number>(6)
  const columns = ref<number>(10)
  const totalCells = computed<number>(() => rows.value * columns.value)
  const cellColors = ref<string[]>([])

  //undo setup
  //set up history array to store grid values as they change
  //commenting out in favor of a cleaner erase ability but keeping code for future ideas
  //const gridHistory = ref<string[][]>([])
  //const currentHistoryIndex = ref<number>(-1)

  //grid operations
  //initialize grid with white cells
  const initializeGrid = () => {
    cellColors.value = new Array(totalCells.value).fill('#FFFFFF')

    //DEBUG
    console.log('Grid initilized, cellColors length: ', cellColors.value.length)
    console.log('cellColors content:', cellColors.value.slice(0, 5))
  }

  //Clear or reset the grid
  const clearGrid = () => {
    initializeGrid()

    //clear history
    //gridHistory.value = []
    //currentHistoryIndex.value = -1

    console.log('grid has been cleared')
  }

  /*
  const saveToHistory = () => {
    //remove future history
    if (currentHistoryIndex.value < gridHistory.value.length - 1) {
      gridHistory.value = gridHistory.value.slice(0, currentHistoryIndex.value + 1)
    }

    //add current state to history
    gridHistory.value.push([...cellColors.value])
    currentHistoryIndex.value = gridHistory.value.length - 1

    //DEBUG
    console.log(
      'Saved to history - Index: ',
      currentHistoryIndex.value,
      'Colored Cells: ',
      cellColors.value.filter((c: string) => c !== '#FFFFFF').length,
    )

    //limit history to last 20 interactions
    if (gridHistory.value.length > 20) {
      gridHistory.value.shift()
    }
  } */

  //undo function
  /*
  const undo = () => {
    //confirm there is a grid history
    if (currentHistoryIndex.value > 0) {
      currentHistoryIndex.value--
      cellColors.value = [...gridHistory.value[currentHistoryIndex.value]]
      console.log('Undid action, history index: ', currentHistoryIndex.value)
    } else {
      console.log('Nothing to undo')
    }
  }
    */

  //check if undo is avialable
  //const canUndo = computed(() => currentHistoryIndex.value > 0)

  //initialize grid when page loads
  initializeGrid()
  //initialize empty history array when page loads
  //gridHistory.value = []
  //currentHistoryIndex.value = -1

  return {
    //Grid
    rows,
    columns,
    totalCells,
    cellColors,
    initializeGrid,
    clearGrid,
    //history/undo
    //gridHistory,
    //currentHistoryIndex,
    //saveToHistory,
    //undo,
    //canUndo,
  }
}
