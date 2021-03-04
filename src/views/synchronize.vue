<template>
  <div class="synchronize">
    <b-row class="m-0">
      <b-col cols="4">
        <h2>{{message}} {{id}}</h2>
      </b-col>
      <b-col class="float-right">
          <div v-if="!isDrawing1">
            <b-button v-on:click="deleteArea" variant="secondary" class="mx-2">Заново</b-button>
            <b-button v-on:click="toSynch" variant="secondary" class="mx-2" v-if="!isSynch">Синхронизировать с планом</b-button>
            <b-button v-on:click="save(recs[0], points)" variant="dark" class="mx-2">Сохранить</b-button>
            <b-button v-on:click="recs=[]; isDrawing=true" variant="dark" class="mx-2" v-if="rect!=null">Отменить</b-button>
          </div>
          <div v-else>
            <b-button v-if="i>3" v-on:click="closeArea" variant="dark" class="mx-2">Замкнуть область</b-button>
            <b-button v-on:click="delDrawingArea" variant="dark" class="mx-2">Отменить</b-button>
          </div>
      </b-col>
    </b-row>

    <div class="canvases">
      <img class="myCanvas" style="z-index: 10" :src="'http://192.168.1.105:5000/api/cameras/'+id">
      <canvas ref="canvas" id='drawing-pad' width='640' height="320" style="z-index: 100; border: 2px solid black"
              class="myCanvas">
        This is an interactive drawing pad.
      </canvas>
    </div>

    <div class="canvases">
      <b-img v-if="isSynch" class="plan" src="/plan1.png" height="350" width="750"></b-img>
<!--      <canvas ref="canvas2" id='drawing-pad2' width='750' height="350" style="z-index: 100"-->
<!--              class="plan">-->
<!--        This is an interactive drawing pad.-->
<!--      </canvas>-->
      <v-stage
          class="plan" style="z-index: 100"
          ref="stage"
          :config="stageSize"
          @mousemove="handleMouseMove"
          @mouseDown="handleMouseDown"
          @mouseUp="handleMouseUp"
      >
        <v-layer ref="layer">
          <v-rect
              v-for="(rec, index) in recs"
              :key="index"
              :config="{
          x: Math.min(rec.startPointX, rec.startPointX + rec.width),
          y: Math.min(rec.startPointY, rec.startPointY + rec.height),
          width: Math.abs(rec.width),
          height: Math.abs(rec.height),
          fill: 'rgb(255,0,0,0.4)',
          stroke: 'black',
            draggable: true,
          strokeWidth: 3,
        }"
          />
        </v-layer>
      </v-stage>
    </div>

<!--    <div style="margin-top: 400px">-->
<!--    </div>-->
  </div>
</template>

<script>
import axios from "axios";
const width = 750;
const height = 350;

export default {
  name: "synchronize.vue",
  props: ['id'],
  data: () => ({
    message: 'Выберите рабочую область',
    points: [],
    i: 0,
    x: null, y: null,
    ax: null, ay: null,
    canvas: null,
    context: null,
    isDrawing1: true,
    rect: null,
    isSynch: false,
    stageSize: {
      width: width,
      height: height,
    },
    lines: [],
    isDrawing: false,
    recs: [],
  }),
  mounted() {
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext("2d"); //ctx
    this.context.lineWidth = 2;
    this.context.strokeStyle = "blue"
    this.context.fillStyle = "rgba(0,255,255,0.4)"
    this.rect = this.canvas.getBoundingClientRect()
    this.canvas.addEventListener('click', this.click)
  },
  methods: {
    handleMouseDown(event) {
      const pos = this.$refs.stage.getNode().getPointerPosition();
      this.recs = [
        ...this.recs,
        { startPointX: pos.x, startPointY: pos.y, width: 0, height: 0 },
      ];
    },
    handleMouseUp() {
      this.isDrawing = false;
      if (this.recs.length>0){
        console.log(this.rect)
      }
    },
    handleMouseMove(event) {
      // no drawing - skipping
      if (!this.isDrawing) {
        return;
      }
      const point = this.$refs.stage.getNode().getPointerPosition();
      // handle  rectangle part
      let curRec = this.recs[this.recs.length - 1];
      curRec.width = point.x - curRec.startPointX;
      curRec.height = point.y - curRec.startPointY;
    },

    save(recs, points){
      var id = this.id
      if(this.isSynch){
        console.log('Synchronizated')
        points = this.arrPxToProc(points)
        recs = this.recsToProcent(recs)
        this.$router.push({name: 'home'}, this.sendConfig(recs, points, id))
        // this.$router.push({name: 'postSynch', props: {id: this.id, points: points, recs: recs}})
      }
      else {
        console.log('Not synchronizated')
        console.log(this.arrPxToProc(points))
      }
    },
    sendConfig(recs, points, id){

      console.log(recs)
      console.log(points)
      console.log(id)

      axios.put(`/api/cameras/${id}`, {
        numeric_dataset: {
          cy: recs.startPointY,
          cx: recs.startPointX,
          ah: recs.height,
          aw: recs.width
        },
        isomeric_dataset: {
          a1: points[0],
          b1: points[1],
          c1: points[2],
          d1: points[3]
        }
      })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          })
    },
    toSynch(){
      this.isDrawing = true;
      this.isSynch = true
      this.message = "Синхронизация с планом"
    },
    closeArea: function () {
      this.i = 0
      this.x = null
      this.y = null
      this.context.closePath()
      this.context.fill();
      this.context.stroke();
      this.isDrawing1=false
    },
    deleteArea() {
        this.delDrawingArea()
      this.isDrawing1 = true
        this.isSynch = false
      this.isDrawing = false
      this.recs=[]
    },
    delDrawingRect(){
      this.recs=[]
    },
    delDrawingArea() {
      this.points = []
      this.i = 0
      this.x = null
      this.y = null

      this.context.clearRect(0, 0, this.rect.width, this.rect.height)
    },
    click(e) {
      var x = e.clientX - this.rect.left
      var y = e.clientY - this.rect.top
      if (this.isDrawing1) {
        this.points.push([x, y])
        if (this.i == 0) {
          this.context.beginPath();
          this.context.moveTo(x, y);
        }
        if (this.i > 0) {
          this.context.lineTo(x, y);
          this.context.stroke();
          if (Math.abs(x - this.points[0][0]) < 10 && Math.abs(y - this.points[0][1]) < 10) {
            this.closeArea()
            return 0
          }
        }
        this.i++
        if (this.i===4){
          this.closeArea()
        }
      }
    },
    pxToProcent(x, y) {
      return [Math.round((x / this.rect.width) * 100), Math.round((y / this.rect.height) * 100)]
    },
    recsToProcent(rect){
      var rect1={}
      rect1.startPointX = Math.round((rect.startPointX / width) * 100)
      rect1.startPointY = Math.round((rect.startPointY / height) * 100)
      rect1.width = Math.round((rect.width / width) * 100)
      rect1.height = Math.round((rect.height / height) * 100)
      // console.log(rect)
      return rect1
    },
    arrPxToProc(arr) {
      var arr1 = [], dot
      for (var i = 0; i < arr.length; i++) {
          dot = this.pxToProcent(arr[i][0], arr[i][1])
          arr1.push([dot])
        }
      return arr1
    },
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
  width: 640px;
  height: 320px;
  top: 0px
}
.plan {
  position: absolute;
  top: 0px;
  left: 700px
}
</style>