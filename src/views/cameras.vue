<template>
  <div class="cameras">

    <b-row>
      <b-col>
        <h1 class="my-2">Подключенные камеры</h1>
      </b-col>
      <b-col>
          <b-button variant="dark" class="float-right mt-2" to="/addCamera">Добавить камеру</b-button>
      </b-col>
    </b-row>
    <div v-if="cameras.length==0">
      <h3>Не найдено ни одной камеры</h3>
    </div>
    <div class="p-2">
      <b-card class="cameraStream m-2 p-0" v-for="camera in cameras" :key="camera.id">
          <img width="420px" :src="'/api/camera/'+camera.id+'/capture'" v-on:click="goToCam(camera.id)">
          <b-icon class="trash-icon m-0 h5" variant="danger" icon="trash-fill" v-on:click="deleteCam(camera.id)"/>
      </b-card>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'cameras',
  data () {
    return {
      cameras: [],
    }
  },
  mounted() {
    this.getCameras()
  },
  methods: {
    async getCameras(){
      axios.get('/api/cameras')
          .then(response => (this.cameras = response.data));
    },
    async deleteCam(id){
      if (confirm('Вы уверены, что хотите удалить камеру '+ id+'?')){
        alert('Камера '+ id+' удалена.')
        // axios.delete(`/api/cameras/${id}`)
        //     .then(response => (this.cameras = response.data))
        //     .catch(function (error) {
        //           console.log(error);
        //         });
      }
    },
    async goToCam(id){
      this.$router.push({name: 'CameraPage', params: {id: id}})
    }
  }
}
</script>


<style>
.cameraStream{
  display: inline-block;
  border: 0;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  position:relative;
}
.card-body{
  padding: 0.5rem;
}
.trash-icon {
  position:absolute;
  bottom:20px;
  right: 20px;
}
</style>