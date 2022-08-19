<template>
  <ul :style="{ height: height, lineHeight: height }">
    <template v-for="(item, index) in topnavItems">
      <li
        v-if="item.callback"
        :key="index"
        :class="index === currentActive ? 'active' : ''"
        :style="{
          color: (index === currentActive || index === currentHover) ? topnavActiveColor : 'inherit'
        }"
        @click="toItem(index)"
        @mouseover="hoverItem(index)"
        @mouseout="hoverItem(currentActive)"
      >
        {{ item.name }}
        <div
          class="avtive-bar"
          :style="{
            background: topnavActiveColor
          }"
        />
      </li>
      <li
        v-else
        :key="index"
        :class="index === currentActive ? 'active' : ''"
        :style="{
          color: (index === currentActive || index === currentHover) ? topnavActiveColor : 'inherit'
        }"
        @mouseover="hoverItem(index)"
        @mouseout="hoverItem(currentActive)"
      >
        <jsk-dropdown
          dropdown-trigger="click"
          class="dropdown"
        >
          <div>
            {{ item.name }}<i class="el-icon-j-caret-down el-icon--right" />
          </div>
          <jsk-dropdown-menu slot="dropdown">
            <jsk-dropdown-item
              v-for="(dropdownItem, dropdownIndex) in item.chidrenItems"
              :key="dropdownIndex"
              @click.native="toDropdownItem(index, dropdownItem)"
            >
              {{ dropdownItem.name }}
            </jsk-dropdown-item>
          </jsk-dropdown-menu>
        </jsk-dropdown>
        <div
          class="avtive-bar"
          :style="{
            background: topnavActiveColor
          }"
        />
      </li>
    </template>
  </ul>
</template>


<script>
import JskDropdown from '../dropdown/Dropdown';
import JskDropdownMenu from '../dropdown-menu/DropdownMenu';
import JskDropdownItem from '../dropdown-item/DropdownItem';
export default {
  name: 'JskTopnav',
  components: {
    JskDropdown,
    JskDropdownMenu,
    JskDropdownItem
  },
  props: {
    topnavHeight: {
      type: [String, Number],
      default: 50
    },
    topnavItems: {
      type: Array,
      default: () => [
        {
          name: '首页',
          callback: () => {}
        }
      ]
    },
    topnavInitActive: {
      type: Number,
      default: 0
    },
    topnavCurrentActive: Number,
    topnavActiveColor: {
      type: String,
      default: '#41B146'
    }
  },
  data: function() {
    return {
      currentActive: -1,
      currentHover: -1
    };
  },
  computed: {
    height: function() {
      if (typeof(this.topnavHeight) === 'string') {
        return this.topnavHeight;
      }
      return this.topnavHeight + 'px';
    }
  },
  watch: {
    currentActive: function() {
      if (this.topnavCurrentActive) {
        this.$emit('update:topnavCurrentActive', this.currentActive);
      }
    },
    topnavCurrentActive: function() {
      this.currentActive = this.topnavCurrentActive;
      this.currentHover = this.topnavCurrentActive;
    }
  },
  mounted: function() {
    if (this.topnavCurrentActive || this.topnavInitActive) {
      this.currentActive = this.topnavCurrentActive || this.topnavInitActive;
      this.currentHover = this.topnavCurrentActive || this.topnavInitActive;
    }
  },
  methods: {
    toItem: function(index) {
      this.currentActive = index;
      this.topnavItems[index].callback();
    },
    hoverItem: function(index) {
      this.currentHover = index;
    },
    toDropdownItem: function(index, dropdownItem) {
      this.currentActive = index;
      dropdownItem.callback();
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #777;
}
ul > li {
  text-align: center;
  padding: 0 16px;
  display: block;
  float: left;
  position: relative;
  cursor: pointer;
}
ul > li .avtive-bar {
  content: " ";
  width: 0;
  height: 2px;
  background: #41B146;
  border-radius: 1px;
  position: absolute;
  bottom: 6px;
  left: 50%;
  transition: 0.3s all cubic-bezier(.46, 1, .23, 1.52);
}
ul > li.active .avtive-bar {
  width: 20%;
  left: 40%;
}
ul > li .dropdown {
  color: inherit;
}
</style>
