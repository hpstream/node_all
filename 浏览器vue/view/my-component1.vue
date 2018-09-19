<template>
<div>
       <div class="hello">Hello {{who}}</div>
       <router-view></router-view>
</div>
   
  
</template>

<script>
module.exports = {
    name:'ddd',
    data: function() {
        return {
            who: 'world1'
        }
    }
}
</script>

<style>
.hello {
    background-color: #ffe;
}
</style>