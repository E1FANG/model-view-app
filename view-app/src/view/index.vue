<script setup lang="ts">
import { useWhiteBoard } from '@/entity/white-board';
import { onMounted, ref } from 'vue';

const WhiteBoardDom = ref(null)

onMounted(()=>{
  const { whiteBoardInit} = useWhiteBoard(
    document.querySelector('.white-board')!
  )
  whiteBoardInit()
})
</script>

<template>
<div class="h-screen w-screen absolute overflow-scroll" id="white-board-container">
  <div class="white-board bg-gray-100" ref="WhiteBoardDom" />
</div>
</template>

<style  scoped>
.white-board {
  /* width: 3000px;
  height: 3000px; */
  transition: all 0.5s;
}
</style>