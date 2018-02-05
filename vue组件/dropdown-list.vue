<!-- by your name -->
<template>
  <li class="v-dropdown-menu_list"
    @click="handleClick"
    :command="command"
    >
        <slot></slot>
    </li>
</template>

<script>
import Emitter from './emitter'
export default {
  name: 'VDropdownList',
  mixins: [Emitter],
  data() {
    return {
    }
  },
  props: ['command'],
  components: {},
  computed: {},
  methods: {
    handleClick() {
      console.log(false)
      this.dispatch('VDropdown', 'menu-list-click', false)
    }
  }
}

</script>
<style lang='scss' scoped>
ul, li {
    list-style: none;
}
.v-dropdown-menu_list {
    cursor: pointer;
}
</style>