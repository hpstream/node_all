<!-- by your name -->
<template>
  
    <div class="v-dropdown"
        :trigger="trigger"
        :visible="visible"
        :hideOnClick="hideOnClick"
        
    >
        <slot></slot>
    </div>

</template>

<script>
// v-clickoutside="hide"
import Emitter from './emitter'
export default {
  name: 'VDropdown',
  data() {
    return {
      timeout: null,
      visible: false
    }
  },
  mixins: [Emitter],
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.$on('menu-list-click', this.handleMenuListClick)
    this.$on('ce', this.ce)
    this.initEvent()
  },
  methods: {
    ce() {
      console.log('我是测试')
    },
    handleMenuListClick() {
      console.log('menu-list-click')
      this.visible = false
    },
    // 显示
    show() {
      const that = this
      clearTimeout(this.timeout)
      this.timeout = setTimeout(function() {
        that.visible = true
      }, 150)
    },
    // 隐藏
    hide() {
      const that = this
      clearTimeout(this.timeout)
      this.timeout = setTimeout(function() {
        that.visible = false
      }, 150)
    },
    // click事件的处理
    handleClick() {
      this.$emit('ce')
      this.visible = !this.visible
      console.log(this.visible)
    },
    initEvent() {
      const { trigger, show, hide, handleClick } = this
      // 触发事件的elm节点
      const triggerElm = this.$slots.default[0].elm
      console.log(this.$slots)
      // hover事件处理
      if (trigger === 'hover') {
        triggerElm.addEventListener('mouseenter', show)
        triggerElm.addEventListener('mouseleave', hide)
      } else if (trigger === 'click') {
        // click事件处理
        triggerElm.addEventListener('click', handleClick)
      }
    }
  },
  watch: {
    // 向下传递，即VDropdownMenu组件传递visible属性并触发其回调
    visible(val) {
      console.log(val)
      // this.$emit('visible', val)
      this.broadcast('VDropdownMenu', 'visible', val)
    }
  }
}

</script>
<style lang='scss' scoped>

.v-dropdown {
    display: inline-block;
    position: relative;
    color: #48576a;
    font-size: 14px;
}

</style>
