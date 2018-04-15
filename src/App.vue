<template>
  <div id="app">
    <div class="header">
      <router-link to='/list' class="navlist">
        list
      </router-link>
      <router-link to='/cart' class="navcart">
        cart
       <span v-if="cartlist.length">{{ cartlist.length }}</span>
      </router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    cartlist() {
      return this.$store.state.cartlist;
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header {
  width: 100%;
  height: 50px;
  background: -webkit-linear-gradient(top, black, gray);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
}
.navlist {
  margin-left: 5%;
  color: white;
}
.navcart {
  margin-right: 5%;
  color: white;
}
.navcart > span {
  display: inline-block;
  background-color: red;
width: 35px;
  border-radius: 100%;
}
</style>
