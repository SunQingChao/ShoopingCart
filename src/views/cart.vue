<template>
    <div class="cart">
        <div class="cart-header">
            <div class="cart-header-title">购物清单</div>
            <div class="cart-header-main">
                <div class="cart-info">商品信息</div>
                <div class="cart-price">单价</div>
                <div class="cart-count">数量</div>
                <div class="cart-cost">小计</div>
                <div class="cart-delete">删除</div>
            </div>
        </div>
        <div class="cart-content">
            <div class="cart-content-main" v-for="(item, index) in cartlist" :key="index">
                <div class="cart-info">
                    <img :src="productdictlist[item.id].image">
                    <span>{{ productdictlist[item.id].name }}</span>
                </div>
                <div class="cart-price">¥ {{ productdictlist[item.id].cost }}</div>
                <div class="cart-count">
                    <span class="cart-control-minus" @click="handlecount(index, -1)">-</span>
                    {{ item.count }}
                    <span class="cart-control-add" @click="handlecount(index, 1)">+</span>
                </div>
                <div class="cart-cost">¥ {{ productdictlist[item.id].cost * item.count }}</div>
                <div class="cart-delete">
                    <span class="cart-control-delete" @click="handledelete(index)">删除</span>
                </div>
            </div>
            <div class="cart-empty" v-if="!cartlist.length">购物车为空</div>
        </div>
        <div class="cart-promotion" v-show="cartlist.length">
            <span>使用优惠码：</span>
            <input type="text" v-model="promotioncode">
            <span class="cart-control-promotion" @click="handlecheckcode">验证</span>
        </div>
        <div class="cart-footer" v-show="cartlist.length">
            <div class="cart-footer-desc">
                共计 <span>{{ countall }}</span> 件商品
            </div>
            <div class="cart-footer-desc">
                应付总额 <span>¥ {{ costall - promotion }}</span>
                <br>
                <template v-if="promotion">
                    （优惠 <span>¥ {{ promotion }}</span>）
                </template>
            </div>
            <div class="cart-footer-desc">
                <div class="cart-control-order" @click="handleorder">现在结算</div>
            </div>
        </div>
    </div>
</template>

<script>
import product_data from "../../product.js";
export default {
  data() {
    return {
      productlist: product_data,
      promotioncode: "",
      promotion: 0
    };
  },
  computed: {
    cartlist: function() {
      return this.$store.state.cartlist;
    },
    productdictlist() {
      const dict = {};
      this.productlist.forEach(item => {
        dict[item.id] = item;
      });
      return dict;
    },
    countall: function() {
      let count = 0;
      this.cartlist.forEach(item => {
        count += item.count;
      });
      console.log("count:" + count);
      return count;
    },
    costall: function() {
      let cost = 0;
      this.cartlist.forEach(item => {
        this.productdictlist[item.id].cost * item.count;
      });
      return cost;
    }
  },
  methods: {
    handlecount: function(index, count) {
      if (count < 0 && this.cartlist[index].count === 1) return;
      this.$store.commit("editcartcount", {
        id: this.cartlist[index].id,
        count: count
      });
    },
    handledelete: function(index) {
      this.$store.commit("deletecart", this.cartlist[index].id);
    },
    handlecheckcode: function() {
      if (this.promotioncode == "") {
        window.alert("请输入优惠卷");
        return;
      }
      if (this.promotioncode != "vue.js") {
        window.alert("优惠券验证失败");
      } else {
        this.promotion = 500;
      }
    },
    handleorder: function() {
      this.$store.dispatch("buy").then(() => {
        window.alert("购买成功");
      });
    }
  }
};
</script>

<style scoped>
.cart {
  margin: 32px;
  background: white;
  border-radius: 10px;
  border: 1px solid #eaebee;
  overflow: hidden;
}

.cart-header-title {
  text-align: left;
  padding: 10px 30px;
  background: #f8f8f9;
}
.cart-header-main {
  display: flex;
  flex-flow: row wa;
  justify-content: space-around;
  background-color: #eeeeee;
}
.cart-info {
  margin-right: 30%;
}
.cart-empty {
  padding: 20px 0;
}

.cart-content {
  padding: 10px 0;
}
.cart-content-main {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.cart-content-main > .cart-info {
  text-align: left;
  vertical-align:baseline;
  margin-right: 29%;
}

.cart-info > img {
  width: 20px;
  height: 20px;
}
.cart-info > span {
}
</style>
