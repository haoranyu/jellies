<template>
  <a class="card" :href="cardLink" target="_blank">
    <el-card :body-style="{ background: '#F2F4F7' }">
      <div slot="header">
        <h3>{{ cardTitle }}</h3>
        <div class="subtitle">{{ cardSubtitle }}</div>
        <ul class="instructors">
          <li v-for="(instructor, index) in cardInstructors" v-bind:key="index">
            <jsk-avatar :avatar-src="instructor.avatar" :avatar-size="60"></jsk-avatar>
            <div class="name">{{ instructor.name }}</div>
          </li>
        </ul>
      </div>
      <el-row>
        <el-col :span="8" class="detail">
          <span class="first-line">{{ cardDetail.first }}</span>
          <span class="second-line">{{ cardDetail.second }}</span>
        </el-col>
        <el-col :span="16" class="addon">
          <jsk-price
            :price-original="cardPrice.originalNumber"
            :price-current="cardPrice.number"
            :has-unit="cardPrice.hasUnit"
            :price-unit="cardPrice.unit"
          >
          </jsk-price>
        </el-col>
      </el-row>
    </el-card>
  </a>
</template>


<script>
import {
  Card,
  Col,
  Row
} from 'element-ui';
import JskPrice from '../price/Price';
import JskAvatar from '../avatar/Avatar';
export default {
  name: 'JskCard',
  components: {
    JskAvatar,
    JskPrice,
    'ElCard': Card,
    'ElCol': Col,
    'ElRow': Row
  },
  props: {
    cardLink: {
      type: String,
      default: '#'
    },
    cardTitle: {
      type: String,
      default: '这是标题'
    },
    cardSubtitle: {
      type: String,
      default: '这是副标题'
    },
    cardInstructors: {
      type: Array,
      default: () => []
    },
    cardDetail: {
      type: Object,
      default: () => {
        return {
          first: '',
          second: ''
        };
      }
    },
    cardPrice: {
      type: Object,
      default: () => {
        return {
          originalNumber: '',
          number: '',
          showUnit: false,
          unit: '课时'
        };
      }
    },
  }
}
</script>

<style scoped>
.card {
  display: block;
  margin-bottom: 24px;
}
.card:hover > div {
  box-shadow: 0 0 8px 0 rgba(139, 154, 174, 0.5);
}
h3 {
  font-weight: 500;
  font-size: 20px;
  height: 48px;
  overflow: hidden;
  margin-bottom: 0;
  color: #333;
  line-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.subtitle {
  color: #777;
  line-height: 22px;
  margin-bottom: 24px;
}
.instructors {
  padding: 0;
  margin: 0;
  height: 86px;
  list-style: none;
}
.instructors > li {
  width: 60px;
  height: 86px;
  margin-right: 20px;
  float: left;
}
.instructors > li > .name {
  color: #555;
  margin-top: 6px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
}
.detail {
  line-height: 20px;
  font-size: 12px;
  color: #777;
}
.detail > span {
  display: block;
}
.addon {
  text-align: right;
}
</style>
