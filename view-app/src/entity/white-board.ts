import { ref,Ref } from "vue"
import {  useCardDraggable } from "@/hooks/useCardDraggable";
import { useCard } from "./card"
import { Card } from "@/entity/card"


export const useWhiteBoard = (dom: HTMLElement) => {
  const whiteBoard = ref<{
    dom: HTMLElement,
    card:Ref<Card>[]
  }>({
    dom,
    card:[]
  })


  const  init = ()=>{
    dom.ondblclick = (e)=>{
      addCard({x:e.offsetX,y:e.offsetY})
    }
  }

  const addCard = (position:IPosition)=>{
    const {card} = useCard(position,dom)
    useCardDraggable(card)
    whiteBoard.value.card.push(card)
  }

  return {
    whiteBoard,
    whiteBoardInit:init,
    addCard
  }
}