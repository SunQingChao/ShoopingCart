<template>
  <div class="main">
    <div class="seach">
      <div>
        <span class="seachtitle">分类:</span>
        <span v-for="(item,index) in brands" @click="handlefilterbrand(item)" :key="index" :class="{on:item==filterbrand}">{{item}}</span>
      </div>
      <div>
        <span class="seachtitle">颜色:</span>
        <span v-for="(item,index) in colors" @click="handlefiltercolor(item)" :key="index" :class="{on:item==filtercolor}">{{item}}</span>
      </div>
      <div>
        <span class="seachtitle">排序:</span>
        <span @click="handleorderdefault" :class="{on:order==''}">默认</span>
        <span @click="handleordersales" :class="{on:order=='sales'}">销量
          <template v-if="order==='sales'" >↓</template>
        </span>
        <span @click="handleordercost" :class="{on:order.indexOf('cost')>-1}">价格
          <template v-if="order==='cost-desc'">↓</template>
          <template v-if="order==='cost-asc'" >↑</template>
        </span>
      </div>
    </div>
    <div class="product">
    <Product v-for="item in filteredandorderedlist" :key="item.id" :info='item'></Product>
    </div>
    <div v-show="!filteredandorderedlist.length">暂无相关产品</div>
  </div>
</template>

<script>
import Product from "../components/product.vue";
export default {
  components: {
    Product
  },
  computed: {
    list() {
      //console.log(this.$store.state.productlist);
      return this.$store.state.productlist;
    },
    brands() {
      //console.log(this.$store.getters.brands);
      return this.$store.getters.brands;
    },
    colors() {
      return this.$store.getters.colors;
    },
    filteredandorderedlist() {
      let list = [...this.list];

      //按品牌筛选
      if (this.filterbrand != "") {
        list = list.filter(item => item.brand == this.filterbrand);
      }
      //按颜色筛选
      if (this.filtercolor != "") {
        list = list.filter(item => item.color == this.filtercolor);
      }
      //按销量排序
      if (this.order != "") {
        if (this.order == "sales") {
          list = list.sort((a, b) => b.sales - a.sales);
        } else if (this.order == "cost-asc") {
          list = list.sort((a, b) => a.cost - b.cost);
        } else {
          list = list.sort((a, b) => b.cost - a.cost);
        }
      }
      return list;
    }
  },
  data() {
    return {
      //按照品牌筛选
      filterbrand: "",
      //排序
      order: "",
      //按照颜色筛选
      filtercolor: ""
    };
  },
  methods: {
    handlefilterbrand(brand) {
      if (this.filterbrand == brand) {
        this.filterbrand = "";
      } else {
        this.filterbrand = brand;
      }
    },
    handlefiltercolor(color) {
      if (this.filtercolor == color) {
        this.filtercolor = "";
      } else {
        this.filtercolor = color;
      }
    },
    handleorderdefault() {
      this.order = "";
    },
    handleordersales() {
      this.order = "sales";
    },
    handleordercost() {
      if (this.order === "cost-desc") {
        this.order = "cost-asc";
      } else {
        this.order = "cost-desc";
      }
    }
  },
  mounted() {
    this.$store.dispatch("getproductlist");
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}

.seach {
  width: 95%;
  border: 2px solid gray;
  border-radius: 5px;
  margin: 20px auto;
}

.seach > div {
  margin: 15px 0;
  margin-left: 10px;
  text-align: left;
}

.seach > div > span:nth-child(1) {
  font: bold 15px/20px "黑体";
}

.seach div > span:not([class="seachtitle"]) {
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0px 10px;
  margin: 0 5px;
  cursor: pointer;
  font: 100 15px/20px "黑体";
}

.seach > div > .on {
  color: white;
  background: red;
}

.product {
  width: 97%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto;
}
</style>
