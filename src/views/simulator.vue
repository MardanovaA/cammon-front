<template>
  <div class="simulator">

    <h1>Симуляция светильников</h1>
    <div class="p-2">
      <b-card class="lampCard m-2" v-for="lamp in lamps" :key="lamp.id">
        <div class="view">
          <loading-progress
              :progress="lamp.status"
              shape="semicircle"
              size="64"
          />
          <div class="text-center" style="margin: -73px 0 0">
            <svg enable-background="new 0 0 24 24" height="32" viewBox="0 0 24 24" width="32"
                 xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                    d="m13.5 24h-3c-.7 0-1.5-.6-1.5-1.8v-2.1c0-1-.5-1.9-1.3-2.6-1.8-1.4-2.7-3.4-2.7-5.6.1-3.8 3.2-6.8 6.9-6.9 1.9 0 3.7.7 5 2s2.1 3.1 2.1 5c0 2.1-.9 4.1-2.6 5.4-.9.7-1.4 1.8-1.4 2.8v2.3c0 .8-.7 1.5-1.5 1.5zm-1.5-18c-3.2 0-5.9 2.7-6 5.9 0 1.9.8 3.7 2.3 4.8 1.1.9 1.7 2.1 1.7 3.4v2.1c0 .2 0 .8.5.8h3c.3 0 .5-.2.5-.5v-2.3c0-1.3.7-2.7 1.8-3.6 1.4-1.1 2.2-2.8 2.2-4.6 0-1.6-.6-3.1-1.8-4.3-1.1-1.1-2.6-1.7-4.2-1.7z"/>
              </g>
              <g>
                <path d="m14.5 21h-5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h5c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
              </g>
              <g>
                <path d="m12 3c-.3 0-.5-.2-.5-.5v-2c0-.3.2-.5.5-.5s.5.2.5.5v2c0 .3-.2.5-.5.5z"/>
              </g>
              <g>
                <path
                    d="m18.7 5.8c-.1 0-.3 0-.4-.1-.2-.2-.2-.5 0-.7l1.4-1.4c.2-.2.5-.2.7 0s.2.5 0 .7l-1.4 1.4s-.2.1-.3.1z"/>
              </g>
              <g>
                <path d="m23.5 12.5h-2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
              </g>
              <g>
                <path
                    d="m20.1 20.6c-.1 0-.3 0-.4-.1l-1.4-1.4c-.2-.2-.2-.5 0-.7s.5-.2.7 0l1.4 1.4c.2.2.2.5 0 .7 0 .1-.1.1-.3.1z"/>
              </g>
              <g>
                <path
                    d="m3.9 20.6c-.1 0-.3 0-.4-.1-.2-.2-.2-.5 0-.7l1.4-1.4c.2-.2.5-.2.7 0s.2.5 0 .7l-1.4 1.4c-.1.1-.2.1-.3.1z"/>
              </g>
              <g>
                <path d="m2.5 12.5h-2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
              </g>
              <g>
                <path
                    d="m5.3 5.8c-.1 0-.3 0-.4-.1l-1.4-1.5c-.2-.2-.2-.5 0-.7s.5-.2.7 0l1.4 1.4c.2.2.2.5 0 .7-.1.1-.2.2-.3.2z"/>
              </g>
              <g>
                <path
                    d="m16 12.5c-.3 0-.5-.2-.5-.5 0-1.9-1.6-3.5-3.5-3.5-.3 0-.5-.2-.5-.5s.2-.5.5-.5c2.5 0 4.5 2 4.5 4.5 0 .3-.2.5-.5.5z"/>
              </g>
            </svg>
            <p class="mt-2">{{ lamp.id }}</p>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: 'simulator',
  data() {
    return {
      lamps: [],
      lamps_new: [],
      timer: null
    }
  },
  mounted() {
    this.timer = setInterval(() => this.getFreeDevices(), 1000)
    this.getFreeDevices()

  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    async getFreeDevices() {
      try {
        const response = await axios.get('/api/controllers');
        this.lamps_new = response.data;
        for (var i = 0; i < this.lamps_new.length; i++) {
          this.lamps_new[i].status = Number(this.lamps_new[i].status) / 100;
          console.log(this.lamps_new)
          this.checkLamps(i)
        }
      } catch (error) {
        console.error(error);
      }
      if (this.lamps.length > this.lamps_new.length){
        for (var i=0; i<this.lamps.length; i++){
          if (!this.lamps_new.find(lamp => lamp.id === this.lamps[i].id)) {
            this.lamps.splice(i, 1)
          }
        }
      }
    },
    async delay(ms) {
      return await new Promise(resolve => setTimeout(resolve, ms));
    },
    async checkLamps(i) {
      var lamp
      if (!this.lamps.find(lamp => lamp.id === this.lamps_new[i].id)) {
        lamp = {"id":this.lamps_new[i].id, "uid": this.lamps_new[i].uid, "status": 1}
        this.lamps.push(lamp)
      }
        lamp = this.lamps.find(lamp => lamp.id === this.lamps_new[i].id)
      console.log(lamp)
        // var delay = Math.abs(lamp.status - this.lamps_new[i].status) / 10
        while (lamp.status != this.lamps_new[i].status) {
          await this.delay(100);
          if (lamp.status > this.lamps_new[i].status) {
            lamp.status = Math.round((lamp.status - 0.01) * 100) / 100
          } else {
            lamp.status = Math.round((lamp.status + 0.01) * 100) / 100
          }
        }
    }
  }
}
</script>

<style>
.vue-progress-path path {
  stroke-width: 10;
}

.vue-progress-path .progress {
  stroke: #9400d3;
}

.vue-progress-path .background {
  stroke: #edd;
}

.lampCard {
  display: inline-block;
  border: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>