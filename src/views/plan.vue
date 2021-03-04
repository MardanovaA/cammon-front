<template>
  <div class="plan">
    <h2>План помещения:</h2>
    <div class="position-relative">
      <b-img class="myCanvas" src="/plan1.png" height="400" width="800"></b-img>
      <canvas ref="canvas" id='drawing-pad' width='800' height="400" style="z-index: 100; border: 2px solid black"
              class="myCanvas">
        This is an interactive drawing pad.
      </canvas>
    </div>
    <div style="margin-top: 450px">
      <b-button v-on:click="this.drawAreas">Нарисовать области</b-button>
      <p> Areas: {{areas}}</p>
      <p>  Cameras: {{cameras}}</p>
      <p> Controllers: {{controllers}}</p>
      <p>{{controllers[0].id}}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const width = 800
const height = 400

export default {
  name: 'plan',
  data() {
    return {
      // arr: [],
      // i: 0,
      // x: null, y: null,
      canvas: null,
      context: null,
      rect: null,
      areas: [],
      cameras: [],
      controllers: [],
      timer: null``
    }
  },
  mounted() {
    this.timer = setInterval(this.getAllInfo, 10000)
    this.getAllInfo()

    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext("2d"); //ctx
    this.context.lineWidth = 2;
    this.context.strokeStyle = "blue"
    this.context.fillStyle = "rgba(0,255,255,0.0)"
    this.rect = this.canvas.getBoundingClientRect()
    this.context.beginPath();
    this.context.moveTo(130, 20);
    this.context.lineTo(300, 20);
    this.context.lineTo(250, 120);
    this.context.closePath()
    this.context.fill();
    this.context.stroke();
    /*
    this.canvas.addEventListener('click', this.click)
    // this.drawFromServer()
    */
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    async getAreas() {
      axios.get('/api/areas')
          .then(response => (this.areas = response.data));
    },
    async getCameras() {
      axios.get('/api/cameras')
          .then(response => (this.cameras = response.data));
    },
    async getControllers() {
      axios.get('/api/controllers/scan')
          .then(response => (this.controllers = response.data));
    },
    async getAllInfo() {
      this.getAreas()
      this.getCameras()
      this.getControllers()
    },
    async drawAreas(){
      var status, controller, points, str, x, y
      for (var i=0; i<this.areas.length; i++){
        controller = this.areas[i].controller_id
        status = this.controllers.find(contr => contr.id === controller).status
        points = this.areas[i].coordinates
        for (var j=0; j< points.length;  j++){
          str = points[j]
          str = (str.slice(0, 0) + str.slice(1, str.length-1)).split(',')
          str[0] = (Number(str[0])*width/100)
          str[1] = (Number(str[1])*height/100)
          points[j] = [str[0], str[1]]
          console.log(points[j])
          if (j==0) {
            this.context.beginPath();
            this.context.moveTo(str[0], str[1]);
          }
          else {
            this.context.lineTo(str[0], str[1]);
            this.context.stroke();
          }
        }
        this.context.closePath()
        this.context.fill();
        this.context.stroke();

        console.log(points)
        // this.context.fillStyle = `rgba(0,255,255,${status})`
      }
    },
    /*
    closeArea: function () {
      this.context.closePath()
      this.context.fill();
      this.context.stroke();
      alert('closeArea')
    },
    // choseArea(id) {
    //   this.context.clearRect(0, 0, this.rect.width, this.rect.height)
    //   this.drawFromArray(this.arr)
    //   this.chosenArea = id
    //   var points = this.arr[id].dots
    //   this.context.beginPath();
    //   this.context.moveTo(points[0].x, points[0].y);
    //   for (var i = 0; i < points.length; i++) {
    //     this.context.lineTo(points[i].x, points[i].y)
    //   }
    //   this.context.closePath()
    //   this.context.strokeStyle = "red"
    //   this.context.fillStyle = "rgba(255,0,170, 0.4)"
    //   this.context.fill();
    //   this.context.stroke();
    //   this.context.strokeStyle = "blue"
    //   this.context.fillStyle = "rgba(0,255,255,0.4)"
    // },
    // deleteArea(id) {
    //   this.arr.splice(id, 1)
    //   this.context.clearRect(0, 0, this.rect.width, this.rect.height)
    //   this.drawFromArray(this.arr)
    //   this.chosenArea = -1
    // },
    delDrawingArea() {
      this.arr = []
      this.i = 0
      this.x = null
      this.y = null

      this.context.clearRect(0, 0, this.rect.width, this.rect.height)
      this.drawFromArray(this.arr)
    },
    click(e) {
      var x = e.clientX - this.rect.left
      var y = e.clientY - this.rect.top
      // if (!this.isDrawing) {
      //   if (this.inside({x, y}, this.arr) != -1) {
      //     this.choseArea(this.inside({x, y}, this.arr))
      //   }
      // } else {
        this.arr.push({x, y})
        if (this.i == 0) {
          this.context.beginPath();
          this.context.moveTo(x, y);
        }
        if (this.i > 0) {
          this.context.lineTo(x, y);
          this.context.stroke();
          if (Math.abs(x - this.arr[0].x) < 10 && Math.abs(y - this.arr[0].y) < 10) {
            this.closeArea()
          }
        }
        this.i++

    },
    drawFromArray(arr) {
      var points
      for (var i = 0; i < arr.length; i++) {
        points = arr[i].dots
        this.context.beginPath()
        this.context.moveTo(points[0].x, points[0].y);
        for (var j = 1; j < points.length; j++) {
          var x = points[j].x
          var y = points[j].y
          this.context.lineTo(x, y);
        }
        this.context.closePath()
        this.context.fill();
        this.context.stroke();
      }
    },
    pxToProcent(x, y) {
      return {'x': Math.round((x / this.rect.width) * 100), 'y': Math.round((y / this.rect.height) * 100)}
    },
    procentToPx(x, y) {
      return {'x': x * this.rect.width / 100, 'y': y * this.rect.height / 100}
    },
    inside(point, vs) {
      var x = point.x, y = point.y;
      var inside = false, points = []
      for (var k = 0; k < vs.length; k++) {
        points = vs[k].dots
        for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
          var xi = points[i].x, yi = points[i].y;
          var xj = points[j].x, yj = points[j].y;

          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
        }
        if (inside) {
          return k
        }
      }
      return -1
    },
    arrPxToProc(arr) {
      console.log(arr.length)
      var points, arr1 = [], points2 = [], dot
      for (var i = 0; i < arr.length; i++) {
        points = arr[i].dots
        console.log(points, points.length)
        for (var j = 0; j < points.length; j++) {
          dot = this.pxToProcent(points[j].x, points[j].y)
          points2.push(dot)
        }
        arr1.push({'id': i, 'dots': points2})
        points = null
      }
      return arr1
    },*/
  }
}
</script>

<style>

.myCanvas {
  position: absolute;
  top: 0px
}
</style>