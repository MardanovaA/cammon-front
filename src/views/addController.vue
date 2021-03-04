<template>
  <div class="addController">
    <div>
      <b-row class="p-2">
        <b-col>
            <h5>Доступные устройства ({{ controllers.length }})</h5>
            <div class="p-2">
              <b-table responsive fixed :items="controllers" :fields="columns" table-variant="secondary">
                <template #cell(button1)="row">
                  <b-button size="sm" class="mr-2" @click="blink(row.item.id)">
                    Сигнал
                  </b-button>
                </template>
                <template #cell(button2)="row">
                  <b-button size="sm" @click="chooseDevive(row.index)" class="mr-2">
                    Добавить
                  </b-button>
                </template>
              </b-table>
            </div>
        </b-col>
        <b-col>
          <div>
            <h5>Выбранные устройства ({{ selectedDevices.length }})</h5>
            <div class="p-2">
              <b-table responsive :items="selectedDevices" :fields="columns" table-variant="secondary">
                <template #cell(button1)="row">
                  <b-button size="sm" class="mr-2" @click="blink(row.item.id)">
                    Сигнал
                  </b-button>
                </template>
                <template #cell(button2)="row">
                  <b-button size="sm" @click="deleteDevive(row.index, row.item.id)" class="mr-2">
                    Удалить
                  </b-button>
                </template>
              </b-table>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>


    <div class="my-3">
      <b-card class="bg-sec">
        <div class="text-center mt-2">
          <b-button variant="dark" @click="addController(arr, selectedDevices)">Прикрепить к {{arr.length}} областям</b-button>
        </div>
      </b-card>
<!--      <div v-if="groupAlert" class="fixed-top w-100 h-100" style="z-index: 5; background-color: rgba(0,0,0,0.7)" />-->
<!--      <b-alert-->
<!--          dismissible-->
<!--          v-model="groupAlert"-->
<!--          variant="dark"-->
<!--          class="position-fixed"-->
<!--          style="top: 10vh; left: 10vw; width: 80vw; height: 80vh; z-index: 10; padding: 5%;"-->
<!--      >-->
<!--        <div class="my-3">-->
<!--          <h3>Создание группы</h3>-->
<!--          <div class="px-2">-->
<!--            <h5>Выбранные устройства: </h5>-->
<!--            <div class="text-center mt-4">-->
<!--              <b-button variant="dark" @click="createGroup()">Создать группу</b-button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </b-alert>-->
    </div>
  </div>
</template>

<script>
import controllers from "@/views/controllers";
import axios from "axios";
export default {
name: "addController.vue",
  props: ['arr', 'id'],
  components: {
    controllers
  },
  data() {
    return {
      controllers: [],
      selectedDevices: [],
      columns: [
        {key: 'id', label: 'ID'},
        {key: 'button1', label: 'Подать сигнал'},
        {key: 'button2', label: 'Выбрать'},
      ],
      groupAlert: false,
    }
  },
  mounted() {
    this.getFreeDevices()
  },
  methods: {
    getFreeDevices() {
      axios.get('/api/controllers')
          .then(response => (this.controllers = response.data));
    },
    async chooseDevive(id) {
      // console.log('choosing ' + id);
      this.selectedDevices.push(this.controllers[id])
      this.controllers.splice(id, 1)
    },
    async deleteDevive(id, cid) {
      // console.log('deleting ' + id);
      this.controllers.push(this.selectedDevices[id])
      this.removeByAttr(this.selectedDevices, 'cid', cid)
    },
    async removeByAttr(arr, attr, value){
      var i = arr.length;
      while(i--){
        if( arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value ) ){
          arr.splice(i,1);
        }
      }
      return arr;
    },
    blink(id) {
      console.log('blink ' + id)
      let data = {
        id: id
      }
      fetch(`/blink`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'id': id,
            }
          }
      )
    },
    async addController(arr, devices){
      const vm=this
      var contrs = []
      for (var i=0; i<devices.length; i++){
        contrs.push(devices[i].id)
      }
      for(var j=0; j<arr.length; j++){
        axios.post('/api/area', {
              controllers: contrs,
              camera_id: this.id,
              coordinates: arr[j].dots
            })
      }
      vm.$router.push('/cameras')
        // for (var j=0; j<arr.length; j++){
        //   for (var k=0;k<arr[j].dots.length; k++){
        //     area.push([arr[j].dots[k][0],arr[j].dots[k][1]])
        //   }
        //   console.log(area)
        //   axios.post('http://192.168.1.105:5000/api/areas', {
        //     controllers: [devices[i].id],
        //     camera_id: this.id,
        //     coordinates: area
        //   })
        //       .then(function (response) {
        //         console.log(response);
        //       })
        //       .catch(function (error) {
        //         console.log(error);
        //       });
        //   area = []
      // }
    },
  }
}
</script>