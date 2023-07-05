import { ref, Ref, watch } from "vue"
import { useCardDraggable } from "@/hooks/useCardDraggable";
import { useCard } from "./card"
import { Card } from "@/entity/card"

export const whiteBoard = ref<{
  dom: HTMLElement,
  width: number,
  height: number,
  cards: Ref<Card>[]
}>({
  dom: {} as HTMLElement,
  width: 1920,
  height: 1080,
  cards: []
})

export const useWhiteBoard = (dom: HTMLElement) => {
  const init = () => {
    whiteBoard.value.dom = dom
    dom.style.width = whiteBoard.value.width + 'px'
    dom.style.height = whiteBoard.value.height + 'px'
    dom.ondblclick = (e) => {
      addCard({ x: e.offsetX, y: e.offsetY })
    }
  }

  watch(() => whiteBoard.value, () => {
    dom.style.width = whiteBoard.value.width + 'px'
    dom.style.height = whiteBoard.value.height + 'px'
  }, {
    deep: true
  })

  const addCard = (position: IPosition) => {
    const { card } = useCard(position, dom)
    useCardDraggable(card)
    whiteBoard.value.cards.push(card)
  }

  return {
    whiteBoard,
    whiteBoardInit: init,
    addCard
  }
}