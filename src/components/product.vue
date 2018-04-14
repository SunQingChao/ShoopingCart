<template>
  <div class="product">
      <router-link :to="'/product/'+info.id">
      <img :src="info.image" />
      <h4>{{info.name}}</h4>
      <div :style="{background:colors[info.color]}"> </div>
      <div>￥{{info.cost}}</div>
      <!-- prevent不刷新页面 -->
      <div @click.prevent="handlecart" class="addcart">加入购物车</div>
    </router-link>
   </div>
</template>

<script>
export default {
  props: {
    info: Object
  },
  data() {
    return {
      colors: {
        白色: "#ffffff",
        金色: "#dac272",
        蓝色: "#233472",
        红色: "#f2352e",
        黑色: "#000000"
      }
    };
  },
  methods: {
    handlecart: function() {
      this.$store.commit("addcart", this.info.id);
    }
  }
};
</script>

<style scoped>
.product {
  position: relative;
  width: 25%;
  border: 1px solid gray;
  border-radius: 7px;
  overflow: hidden;
  display: block;
}

.product img {
  width: 100%;
}

.product h4 {
  color: black;
  font-size: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.product a > div:nth-child(3) {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin: 10px auto;
  border: 1px solid gray;
}

.product a > div:nth-child(4) {
  font-size: 20px;
  color: red;
  margin: 0 auto 10px;
}

.product a:hover h4 {
  color: aqua;
}

.product a > div:last-child {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgb(0, 200, 255);
  color: white;
  font-size: 10px;
  border-radius: 3px;
  padding: 5px 10px;
  display: none;
}
.product > a:hover .addcart {
  display: block;
}
.product:hover {
  cursor: pointer;
}
</style>
