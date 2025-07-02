import { ref, computed } from 'vue'

export function useColorPalette() {
  //color system to fill in the cells
  //seed the array for reference on launch
  const colors = ref<string[]>(['#FF6B6B', '#45B7D1', '#96CEB4'])
  const selectedColorIndex = ref<number>(0)
  const selectedColor = computed<string>(() => colors.value[selectedColorIndex.value])

  //select a new color from a palette, add or remove custom color from array
  const newColor = ref<string>('#000000')

  const addColor = () => {
    colors.value.push(newColor.value)
    console.log('Added color: ', newColor.value)
  }

  const removeColor = (index: number) => {
    if (colors.value.length > 1) {
      colors.value.splice(index, 1)
      //adjust selected index if needed
      if (selectedColorIndex.value >= colors.value.length) {
        selectedColorIndex.value = colors.value.length - 1
      }
    }

    console.log('Removed color: ', selectedColor.value)
  }

  return {
    colors,
    selectedColorIndex,
    selectedColor,
    newColor,
    addColor,
    removeColor,
  }
}
