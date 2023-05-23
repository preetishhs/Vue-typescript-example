<template>
  <div class="container">
    <div class="image-container">
      <canvas
        ref="canvas"
        :width="imageWidth"
        :height="imageHeight"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @wheel="zoomdezoom"
      ></canvas>
      <canvas
        ref="canvas2"
        :width="imageWidth"
        :height="imageHeight"
        @mousedown="handleMouseDown2"
        @mousemove="handleMouseMove2"
        @mouseup="handleMouseUp"
      ></canvas>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(point, index) in points" :key="index">
            <td>
              <span
                class="color-dot"
                :style="{ backgroundColor: point.color }"
              ></span>
            </td>
            <td>
              <span
                class="material-icons hover-green"
                @click="resetMove(point.color)"
                >undo</span
              >
              <span
                class="material-icons hover-red"
                @click="deletePoint(point.color)"
                >delete</span
              >
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="submitNewPoint" class="submit-button">
        <span class="text">Submit</span>
        <span class="material-icons">send</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import pointsData from '@/assets/points.json'

@Component
export default class DrawPoint extends Vue {
  @Ref('canvas') canvas!: HTMLCanvasElement
  @Ref('canvas2') canvas2!: HTMLCanvasElement
  imageWidth = 0
  imageHeight = 0
  selectedPoint: any = null
  selectedPoint2: any = null
  offsetX = 0
  offsetY = 0
  newPoints: any[] = []
  points: any[] = []
  zoomFactor = 1
  zoomIncrement = 0.1

  private context!: CanvasRenderingContext2D
  private image!: HTMLImageElement

  private context2!: CanvasRenderingContext2D
  private image2!: HTMLImageElement

  mounted() {
    this.points = pointsData.slice(0, 5).map((point: any) => ({
      color: point.color,
      initialX: point.x1,
      initialY: point.y1,
      x1: point.x1,
      y1: point.y1,

      initialX2: point.x2,
      initialY2: point.y2,
      x2: point.x2,
      y2: point.y2,
    }))

    this.context = this.canvas.getContext('2d')!
    this.image = new Image()
    this.image.src = require('@/assets/right.jpg')
    this.image.onload = () => {
      this.canvas.width = this.image.width
      this.canvas.height = this.image.height
      this.context.drawImage(this.image, 0, 0)
      this.imageWidth = this.image.width
      this.imageHeight = this.image.height
      this.drawPoints()
    }

    this.context2 = this.canvas2.getContext('2d')!
    this.image2 = new Image()
    this.image2.src = require('@/assets/left.jpg')
    this.image2.onload = () => {
      this.canvas2.width = this.image2.width
      this.canvas2.height = this.image2.height
      this.context2.drawImage(this.image2, 0, 0)
      this.drawPoints()
    }
  }

  drawCanvas(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    context: CanvasRenderingContext2D
  ) {
    canvas.width = image.width
    canvas.height = image.height
    context.drawImage(image, 0, 0)
    this.drawPoints()
  }

  drawPoints() {
    this.clearCanvas(this.canvas, this.context)
    this.context.drawImage(this.image, 0, 0)
    this.clearCanvas(this.canvas2, this.context2)
    this.context2.drawImage(this.image2, 0, 0)

    // Draw the points
    this.points.forEach((point: any) => {
      this.context.fillStyle = point.color
      this.context.beginPath()
      this.context.arc(point.x1, point.y1, 5, 0, 2 * Math.PI)
      this.context.fill()

      this.context2.fillStyle = point.color
      this.context2.beginPath()
      this.context2.arc(point.x2, point.y2, 5, 0, 2 * Math.PI)
      this.context2.fill()
    })
  }

  clearCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  handleMouseDown(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i]
      const distance = Math.sqrt(
        (mouseX - point.x1) ** 2 + (mouseY - point.y1) ** 2
      )
      if (distance <= 5) {
        this.selectedPoint = point
        this.offsetX = mouseX - point.x1
        this.offsetY = mouseY - point.y1
        return
      }
    }
  }

  handleMouseDown2(event: MouseEvent) {
    const rect = this.canvas2.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i]
      const distance = Math.sqrt(
        (mouseX - point.x2) ** 2 + (mouseY - point.y2) ** 2
      )
      if (distance <= 5) {
        this.selectedPoint2 = point
        this.offsetX = mouseX - point.x2
        this.offsetY = mouseY - point.y2
        return
      }
    }
  }

  handleMouseMove(event: MouseEvent) {
    if (this.selectedPoint) {
      const rect = this.canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      this.selectedPoint.x1 = mouseX - this.offsetX
      this.selectedPoint.y1 = mouseY - this.offsetY

      this.selectedPoint.y2 = mouseY - this.offsetY
      this.drawPoints()
    }
  }

  handleMouseMove2(event: MouseEvent) {
    if (this.selectedPoint2) {
      const rect = this.canvas2.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      this.selectedPoint2.x2 = mouseX - this.offsetX
      // this.selectedPoint2.y2 = mouseY - this.offsetY
      this.drawPoints()
    }
  }

  handleMouseUp() {
    this.selectedPoint = null
    this.selectedPoint2 = null
  }

  resetMove(color: string) {
    // Filter the points with the specified color code and update their coordinates
    this.points.forEach((point: any) => {
      if (point.color === color) {
        point.x1 = point.initialX
        point.y1 = point.initialY
        point.x2 = point.initialX2
        point.y2 = point.initialY2
      }
    })

    // Redraw the points
    this.drawPoints()
  }

  deletePoint(color: string) {
    // Find the index of the point to delete
    const index = this.points.findIndex((point: any) => point.color === color)

    // Check if the point was found
    if (index !== -1) {
      // Remove the point from the list
      this.points.splice(index, 1)
    }

    // Redraw the points
    this.drawPoints()
  }

  submitNewPoint() {
    this.newPoints = this.points.map((point: any) => {
      return {
        color: point.color,
        x1: point.x1,
        y1: point.y1,
        x2: point.x2,
        y2: point.y2,
      }
    })
    console.log(JSON.stringify(this.newPoints, null, '  '))
  }

  zoomdezoom(event: WheelEvent) {
    event.preventDefault()
    const delta = event.deltaY || event.detail || (event as any).wheelDelta

    const mouseX = event.clientX - this.canvas.getBoundingClientRect().left
    const mouseY = event.clientY - this.canvas.getBoundingClientRect().top

    const zoomRatioX = mouseX / this.canvas.width
    const zoomRatioY = mouseY / this.canvas.height

    if (delta < 0) {
      this.zoomFactor += this.zoomIncrement
    } else {
      this.zoomFactor -= this.zoomIncrement
    }

    this.zoomFactor = Math.max(1, this.zoomFactor)
    this.zoomFactor = Math.min(30, this.zoomFactor)

    const zoomedWidth = this.image.width * this.zoomFactor
    const zoomedHeight = this.image.height * this.zoomFactor

    const offsetX = mouseX - zoomRatioX * zoomedWidth
    const offsetY = mouseY - zoomRatioY * zoomedHeight

    this.clearCanvas(this.canvas, this.context)
    this.context.translate(offsetX, offsetY)
    this.context.drawImage(this.image, 0, 0, zoomedWidth, zoomedHeight)
    this.points.forEach((point: any) => {
      this.context.fillStyle = point.color
      this.context.beginPath()
      this.context.arc(
        point.x1 * this.zoomFactor,
        point.y1 * this.zoomFactor,
        5,
        0,
        2 * Math.PI
      )
      this.context.fill()
    })
    this.context.translate(-offsetX, -offsetY)

    this.clearCanvas(this.canvas2, this.context2)
    this.context2.translate(offsetX, offsetY)
    this.context2.drawImage(this.image2, 0, 0, zoomedWidth, zoomedHeight)
    this.points.forEach((point: any) => {
      this.context2.fillStyle = point.color
      this.context2.beginPath()
      this.context2.arc(
        point.x2 * this.zoomFactor,
        point.y2 * this.zoomFactor,
        5,
        0,
        2 * Math.PI
      )
      this.context2.fill()
    })
    this.context2.translate(-offsetX, -offsetY)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* Centrer horizontalement */
}

.image-container {
  display: flex;
  align-items: center; /* Centrer verticalement */
  margin-right: 20px;
}

canvas {
  border: 1px solid #000;
  margin-bottom: 10px;
}

table {
  border-collapse: collapse;
  margin-bottom: 10px;
}

th,
td {
  padding: 8px;
  text-align: left;
}

.color-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.submit-button {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.text {
  margin-right: 8px;
}

.material-icons {
  font-size: 16px;
}

.hover-green:hover {
  color: green;
}

.hover-red:hover {
  color: red;
}
</style>
