<template>
  <div v-if="product" class="productbg">
    <div class="product">
      <div>
        <img :src="product.image" />
      </div>
      <div>
        <h1>{{product.name}}</h1>
        <span>￥{{product.cost}}</span>
        <span @click='handleaddtocart'>加入购物车</span>
      </div>
    </div>
    <div class="product-detail">
      <h2>产品介绍</h2>
      <img v-for="n in 10" :src="product.image" :key="n">
    </div>
  </div>
</template>

<script>
import product_data from "../../product.js";
import product from "../../product.js";
export default {
  data() {
    return {
      id: parseInt(this.$route.params.id),
      product: null
    };
  },
  methods: {
    getproduct: function() {
      //真是换进ajax获取数据
      setTimeout(() => {
        this.product = product_data.find(item => item.id === this.id);
      }, 500);
    },
    //加入购物车
    handleaddtocart: function() {
      this.$store.commit("addcart", this.id);
    }
  },
  mounted() {
    this.getproduct();
  }
};
</script>

<style scoped>
.productbg {
  background-color: #f8f8f9;
  overflow: hidden;
}
.product {
  width: 90%;
  margin: 30px auto;
  border: 1px solid gray;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}
.product > div:nth-child(1) > img {
  width: 50%;
  margin-right: 15%;
}
.product > div:nth-child(2) {
  width: 50%;
  text-align: center;
  margin: 0 5px;
  display: flex;
  flex-flow: column wrap;
}
.product > div:nth-child(2) > h1:nth-child(1) {
  font: bold 40px/40px "黑体";
  margin-bottom: 10px;
}
.product > div:nth-child(2) > span:nth-child(2) {
  color: red;
  margin-bottom: 10px;
}
.product > div:nth-child(2) > span:nth-child(3) {
  color: white;
  background-color: #2d8cf0;
  border-radius: 5px;
  margin: 0 auto 10px;
  padding: 5px 50px;
  cursor: pointer;
}

.product-detail {
  width: 90%;
  margin: 30px auto;
  border: 1px solid gray;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.product-detail > h2 {
  margin: 20px auto;
}
.product-detail > img {
  width: 50%;
  border-bottom: 1px solid #dddee1;
}
</style>
