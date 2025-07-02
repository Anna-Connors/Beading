import { ref } from 'vue'

export function useSavePatterns(rows: any, columns: any, cellColors: any) {
  //SAVE AS JPEG OPTION
  const saveAsJPEG = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cellSize = 20
    canvas.width = columns.value * cellSize
    canvas.height = rows.value * cellSize

    //draw grid
    for (let row = 0; row < rows.value; row++) {
      for (let col = 0; col < columns.value; col++) {
        const cellIndex = row * columns.value + col
        const color = cellColors.value[cellIndex] || '#FFFFFF'

        ctx.fillStyle = color
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)

        //draw border
        ctx.strokeStyle = '#CCCCCC'
        ctx.lineWidth = 1
        ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize)
      }
    }

    //convert and download
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.download = `beadwork-pattern-${rows.value}x${columns.value}.jpg`
          link.href = url
          link.click()
          URL.revokeObjectURL(url)
        }
      },
      'image/jpeg',
      0.9,
    )
  } //end JPEG

  //SAVE AS SVG
  const saveAsSVG = () => {
    const cellSize = 20
    const width = columns.value * cellSize
    const height = rows.value * cellSize

    let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">\n`

    //add each cell as rectangle
    for (let row = 0; row < rows.value; row++) {
      for (let col = 0; col < columns.value; col++) {
        const cellIndex = row * columns.value + col
        const color = cellColors.value[cellIndex] || '#FFFFFF'
        const x = col * cellSize
        const y = row * cellSize

        svgContent += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}" stroke="#CCCCCC" stroke-width="1"/>\n`
      }
    }

    svgContent += '</svg>'

    //Create and download the SVG file
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `beadwork-pattern-${rows.value}x${columns.value}.svg`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  } //end SVG

  return {
    saveAsJPEG,
    saveAsSVG,
  }
}
