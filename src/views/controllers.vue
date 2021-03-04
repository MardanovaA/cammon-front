<template>
  <div class="controllers">
    <h1>Светильники:</h1>
    <div class="w-50 ml-2 p-2">
      <b-table striped hover fixed bordered :items="controllers" :fields="columns" head-variant="light" table-variant="secondary">
        <template #cell(button1)="row">
          <b-button size="sm" class="mr-2" @click="blink(row.item.cid)">
            Сигнал
          </b-button>
        </template>
        <template #cell(button2)="row">
          <b-button size="sm" @click="chooseDevive(row.item.cid)" class="mr-2">
            Добавить
          </b-button>
        </template>
      </b-table>
    </div>

  </div>
</template>
<script>
export default {
  name: 'controllers',
  data () {
    return {
      controllers: [],
      columns: [
        {key: 'id', label: 'ID'},
        {key: 'cid', label: 'CID'},
        {key: 'button1', label: 'Подать сигнал'},
        {key: 'button2', label: 'Выбрать'},
      ],
    }
  },
  methods: {
    async blink(id) {
      console.log("blink "+id)
    },
    async chooseDevive(id) {
      alert('choose '+id)
    }
  }
}
</script>