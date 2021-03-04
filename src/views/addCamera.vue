<template>
  <div class="addCamera">
    <h1>Добавить новую камеру</h1>
    <div class="w-25 p-2">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
            label="Username:"
            label-for="input-1"
        >
          <b-form-input
              id="input-1"
              v-model="form.username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Password:"
            label-for="input-2"
        >
          <b-form-input
              id="input-2"
              v-model="form.password"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Address:"
            label-for="input-3"
        >
          <b-form-input
              id="input-3"
              v-model="form.address"
              required
          ></b-form-input>
        </b-form-group>
        <div class="text-center">
        <b-button type="submit" variant="primary" class="m-2">Создать</b-button>
        <b-button type="reset" variant="danger" class="m-2">Очистить</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {

name: "addCamera",
  data() {
    return {
      form: {
        username: null,
        password: null,
        address: null,
      },
      show: true,
      status: null
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const vm = this;
      axios.post('/api/camera', {
        username: this.form.username,
        password: this.form.password,
        address: this.form.address
      },{
        headers: {"Access-Control-Allow-Origin": "*"}
      })
          .then(function (response) {
            // console.log(response.data.id)
            // this.status = response.data.id
            vm.$router.push({name: 'synchronize', params: {id: response.data.id}})
          })
          .catch(function (error) {
            console.log(error);
          })
    },
    onReset(event) {
      event.preventDefault()
      this.form.username = null
      this.form.password = null
      this.form.address = null
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>

</style>