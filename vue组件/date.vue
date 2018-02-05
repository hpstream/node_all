<!-- by your name -->
<template>
  <div class = 'app-container'>
    <div class="bg-white p2" :style='{"min-height":store.state.app.height +"px"}'>
      <fd-month v-model='val' @getVal="getVal">
      </fd-month>
      
      <fd-table>
         <fd-table-column
          prop="id"
          label="ID"
          width="180">
        </fd-table-column>
         <fd-table-column
          prop="id"
          label="IretD"
          width="180">
        </fd-table-column>
      </fd-table>
    </div>

    
  <v-dropdown trigger='click' @command='commandHandle' :hide-on-click='false'>
    <span class="drop-down-list">下拉菜单</span>
    <v-dropdown-menu>
      <v-dropdown-list command='a'>下来菜单1</v-dropdown-list>
      <v-dropdown-list command='b'>下来菜单2</v-dropdown-list>
      <v-dropdown-list command='c'>下来菜单3</v-dropdown-list>
    </v-dropdown-menu>
  </v-dropdown>


     
  </div>
</template>

<script>
import store from '@/store'
import FdMonth from 'fd/date'
import FdTable from 'fd/table/src/fdTable'
import FdTableColumn from 'fd/table/src/fdTableColumn'
// 引入自定义下拉菜单的插件
import VDropdown from './dropdown'
import VDropdownMenu from './dropdown-menu'
import VDropdownList from './dropdown-list'
export default {
  data() {
    return {
      store,
      val: ''
    }
  },
  components: { FdMonth, FdTable, FdTableColumn, VDropdown, VDropdownMenu, VDropdownList },
  computed: {},
  methods: {
    getVal(val) {
      // this.val = val
    },
    commandHandle() {

    }
  },
  mounted() {

  },
  watch: {
    val(old, val) {
      console.log('我被控制了')
      console.log(old, val)
    }
  }
}

</script>
<style lang='scss' scoped>
.aminate{
  transition:  all 1s;
  animation:mymove 0.2s 1;
  height:0px;
  display: none;
  overflow: hidden;
}

@keyframes mymove
{
  from {height:0px;}
  to {height:156px;}
}
.date .pointer:hover{
   color: #1b95e7;
   cursor:pointer;
}
</style>