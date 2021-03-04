<template>
  <div id="cameraPage"><b-row class="m-0">
    <b-col cols="8">
      <h2>Камера {{ id }}</h2>
    </b-col>
    <b-col class="float-right">

    <div v-if="chosenArea==-1">
          <div v-if="!isDrawing">
            <b-button v-on:click="isDrawing = 'true'" variant="secondary" class="mx-2">Создать область</b-button>
            <b-button v-if="arr.length" v-on:click="addController(arr)" class="mx-2" variant="secondary">Прикрепить
            </b-button>
          </div>
          <div v-else>
            <b-button v-if="i>2" v-on:click="closeArea" variant="dark" class="mx-2">Замкнуть область</b-button>
            <b-button v-on:click="delDrawingArea" variant="dark" class="mx-2">Отменить</b-button>
          </div>
        </div>
        <div v-else>
          <b-button v-on:click="deleteArea(chosenArea)" variant="dark" class="mx-2">Удалить выбранную область</b-button>
        </div>
    </b-col>
  </b-row>

    <div class="canvases">
<!--      <img class="myCanvas" style="z-index: 10" :src="'/cameras/'+id">-->
      <img class="myCanvas" style="z-index: 10" :src="'/api/camera/'+id+'/capture'">
      <canvas ref="canvas" id='drawing-pad' width='1280' height="640" style="z-index: 100; border: 2px solid black"
              class="myCanvas">
        This is an interactive drawing pad.
      </canvas>
    </div>

  </div>
</template>


<script>
import axios from "axios";

export default {
  name: 'CameraPage',
  props: ['id'],
  data: () => ({
    points: [],
    area_id: 0,
    i: 0,
    arr: [],
    old_arr: [],
    x: null, y: null,
    canvas: null,
    context: null,
    isDrawing: false,
    chosenArea: -1,
    rect: null,
    choseOldArea: -1,
  }),
  mounted() {
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext("2d"); //ctx
    this.context.lineWidth = 2;
    this.context.font = "20px Georgia";
    this.context.strokeStyle = "rgb(0,70,160)"
    this.context.fillStyle = "rgba(0,255,255,0.4)"
    this.rect = this.canvas.getBoundingClientRect()
    this.canvas.addEventListener('click', this.click)
    this.drawOldAreas()
    // this.drawFromServer()
  },
  methods: {
    closeArea: function () {
      var area = {"id": this.area_id, "dots": this.points}
      console.log(this.points)
      this.area_id++;
      this.arr.push(area)
      // this.writeAreasToFile()
      this.points = []
      this.i = 0
      this.x = null
      this.y = null
      this.context.closePath()
      this.context.fill();
      this.context.stroke();
      this.isDrawing = false;
    },
    choseArea(id) {
      this.context.clearRect(0, 0, this.rect.width, this.rect.height)
      this.drawFromArray(this.arr)
      this.context.strokeStyle = "rgba(0,30,150, 0.6)"
      this.context.fillStyle = "rgba(0,106,255, 0.3)"
      this.drawFromArray(this.old_arr)
      this.context.strokeStyle = "rgb(0,70,160)"
      this.context.fillStyle = "rgba(0,255,255, 0.4)"
      this.chosenArea = id
      if (this.choseOldArea == 1) {
        var points = this.arr[id].dots
      }
      else if (this.choseOldArea == 2){
        var points = this.old_arr[id].dots
      }
      this.context.beginPath();
      this.context.moveTo(points[0][0], points[0][1]);
      for (var i = 0; i < points.length; i++) {
        this.context.lineTo(points[i][0], points[i][1])
      }
      this.context.closePath()
      this.context.strokeStyle = "red"
      this.context.fillStyle = "rgba(255,0,170, 0.4)"
      this.context.fill();
      this.context.stroke();
      this.context.strokeStyle = "rgb(0,70,160)"
      this.context.fillStyle = "rgba(0,255,255,0.4)"
    },
    deleteArea(id) {
      if (this.choseOldArea == 1){
        this.arr.splice(id, 1)
      }
      else {
        var ar_id = this.old_arr[id].id
        // console.log(id)
        axios.delete(`/api/areas/${ar_id}`)
            .then(response => (console.log(response)));
        this.old_arr.splice(id, 1)
      }
      this.context.clearRect(0, 0, this.rect.width, this.rect.height)
      this.drawFromArray(this.arr)
      this.context.strokeStyle = "rgba(0,30,150, 0.6)"
      this.context.fillStyle = "rgba(0,106,255, 0.3)"
      this.drawFromArray(this.old_arr)

      this.context.strokeStyle = "rgb(0,70,160)"
      this.context.fillStyle = "rgba(0,255,255, 0.4)"
      this.chosenArea = -1
      this.choseOldArea = -1
    },
    delDrawingArea() {
      this.points = []
      this.i = 0
      this.x = null
      this.y = null
      this.isDrawing = false

      this.context.clearRect(0, 0, this.rect.width, this.rect.height)
      this.drawFromArray(this.arr)
      this.context.strokeStyle = "rgba(0,30,150, 0.6)"
      this.context.fillStyle = "rgba(0,106,255, 0.3)"
      this.drawFromArray(this.old_arr)

      this.context.strokeStyle = "rgb(0,70,160)"
      this.context.fillStyle = "rgba(0,255,255, 0.4)"
    },
    click(e) {
      var x = e.clientX - this.rect.left
      var y = e.clientY - this.rect.top
      if (!this.isDrawing) {
        if (this.inside([x, y], this.arr) != -1) {
          this.choseOldArea = 1
          this.choseArea(this.inside([x, y], this.arr), this.arr)
        }
        if (this.inside([x, y], this.old_arr) != -1) {
          this.choseOldArea = 2
          this.choseArea(this.inside([x, y], this.old_arr), this.old_arr)
        }
      } else {
        this.points.push([x, y])
        if (this.i == 0) {
          this.context.beginPath();
          this.context.moveTo(x, y);
        }
        if (this.i > 0) {
          this.context.lineTo(x, y);
          this.context.stroke();
          if (Math.abs(x - this.points[0][0]) < 10 && Math.abs(y - this.points[0][1]) < 10 && this.i>=2) {
            // alert('closeArea')
            // this.points.pop()
            this.closeArea()
            return 0
          }
        }
        this.i++
      }
    },
    drawFromArray(arr) {
      var points
      var fillColor = this.context.fillStyle.split(',')
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].status){
          // fillColor[3] = arr[i].status +')'
          // fillColor = fillColor[0]+","+fillColor[1]+","+fillColor[2]+","+fillColor[3]
          // this.context.fillStyle
              this.context.strokeText(arr[i].status, arr[i].x, arr[i].y)
          // this.context.fillStyle = "rgba(0,106,255, 0.3)"
        }
        points = arr[i].dots
        this.context.beginPath()
        this.context.moveTo(points[0][0], points[0][1]);
        for (var j = 1; j < points.length; j++) {
          var x = points[j][0]
          var y = points[j][1]
          this.context.lineTo(x, y);
        }
        this.context.closePath()
        this.context.fill();
        this.context.stroke();
      }
    },
    async addController(arr) {
      this.$router.push({name: 'addController', params: {arr: this.arrPxToProc(arr), id: this.id}})
    },
    pxToProcent(x, y) {
      return [Math.round((x / this.rect.width) * 100), Math.round((y / this.rect.height) * 100)]
    },
    procentToPx(x, y) {
      return [x * this.rect.width / 100,y * this.rect.height / 100]
    },
    inside(point, vs) {
      var x = point[0], y = point[1];
      var inside = false, points = []
      for (var k = 0; k < vs.length; k++) {
        points = vs[k].dots
        for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
          var xi = points[i][0], yi = points[i][1];
          var xj = points[j][0], yj = points[j][1];

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
          dot = this.pxToProcent(points[j][0], points[j][1])
          points2.push(dot)
        }
        arr1.push({'id': i, 'dots': points2})
        points2 = []
      }
      return arr1
    },
    async drawOldAreas(){
      try {
        this.context.strokeStyle = "rgba(0,30,150, 0.6)"
        this.context.fillStyle = "rgba(0,106,255, 0.3)"
        var response = await axios.get('/api/areas');
        response = response.data
        var coord, status;
        for (var i=0; i<response.length; i++) {
          if (this.id == response[i].camera_id) {
            var maxX=0.0, minX=this.rect.width, maxY=0.0, minY=this.rect.height
            coord = response[i].coordinates
            status = ((await axios.get('/api/controllers')).data.find(controller => controller.id === response[i].controllers[0])).status
            for (var j = 0; j < coord.length; j++) {
              coord[j] = (this.procentToPx(coord[j][0], coord[j][1]))
              minX = Math.min(minX, coord[j][0])
              maxX = Math.max(maxX, coord[j][0])
              minY = Math.min(minY, coord[j][1])
              maxY = Math.max(maxY, coord[j][1])
            }
            console.log(i, minX, maxX, minY, maxY)
            // this.context.strokeText(status, (maxX+minX)/2, (maxY+minY)/2)
            coord = {id: response[i].id, dots: coord, status: status, x:((maxX+minX)/2), y:((maxY+minY)/2)}
            this.old_arr.push(coord)
            coord = [coord]
            this.drawFromArray(coord)
            coord = null
          }
        }

        this.context.strokeStyle = "rgb(0,70,160)"
        this.context.fillStyle = "rgba(0,255,255,0.4)"
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

.canvases {
  position: relative;
}

.myCanvas {
  position: absolute;
  width: 1280px;
  height: 640px;
  top: 0px
}
</style>