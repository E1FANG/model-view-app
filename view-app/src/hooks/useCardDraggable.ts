import { Card } from "@/entity/card"
import {Ref, ref } from "vue"

const dragZIndex = '999'

export const useCardDraggable = (card:Ref<Card>) =>{

  // 鼠标在当前容器的位置
  const currentX = ref(0)
  const currentY = ref(0)

  card.value.dom.onmousedown = (e)=>{
    card.value.isDrag = true
    currentX.value = e.offsetX
    currentY.value = e.offsetY
  }
  card.value.dom.onmousemove= (e)=>{
    if(card.value.isDrag){
      const moveX = e.clientX - currentX.value
      const moveY = e.clientY - currentY.value

      card.value.dom.style.left = `${moveX}px`
      card.value.dom.style.top = `${moveY}px`
      card.value.dom.style.zIndex = dragZIndex
    }
  }
  card.value.dom.onmouseup = ()=>{
    card.value.isDrag = false
    card.value.dom.style.zIndex = String(card.value.ZIndex)
  }
  card.value.dom.onmouseleave = ()=>{
    card.value.isDrag = false
    card.value.dom.style.zIndex = String(card.value.ZIndex)
  }
}