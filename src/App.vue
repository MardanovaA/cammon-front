<template>
  <div id="app">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item><router-link to="/cameras" tag="li">Камеры</router-link></b-nav-item>
          <b-nav-item><router-link to="/simulator" tag="li">Симулятор</router-link></b-nav-item>
          <b-nav-item><router-link to="/plan" tag="li">План склада</router-link></b-nav-item>
        </b-navbar-nav>
      </b-navbar>

<!--      <breadcrumbs />-->

    </div>
    <router-view class="p-2"/>
  </div>
</template>
<script>

import Breadcrumbs from './views/Breadcrumbs'
export default {
  name: 'App',
  components: {
    Breadcrumbs
  }
}
</script>
<style>
#app {

}
</style>