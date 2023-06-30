<script setup lang="ts">

 fetch('/api/cats').then(async res=>{
  console.log(111,await res.json())
 })

</script>

<template>
  <h1>msg</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
