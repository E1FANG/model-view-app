import { ref, watch } from "vue";

export interface Card {
  id: number,
  dom: HTMLElement,
  isDrag: boolean,
  ZIndex: number,
  position: IPosition
}

let initialID = 1
let initialZIndex = 10

export const useCard = (position: IPosition, container: HTMLElement) => {
  const card = ref<Card>({
    id: initialID,
    dom: {} as HTMLElement,
    isDrag: false,
    ZIndex: 0,
    position
  })

  const init = () => {
    const dom = document.createElement('div')
    dom.setAttribute('style', `
      top:${position.y}px;
      left:${position.x}px;
      z-index:${initialZIndex};
    `)
    dom.setAttribute('class', `
      bg-white absolute h-80 w-60 rounded-lg shadow-lg
    `)
    container.appendChild(dom)
    card.value.dom = dom
    card.value.ZIndex = initialZIndex
    initialZIndex += 1
    initialID += 1
  }

  init()

  watch(() => card.value.position, () => {
    console.log('card', card.value.position)
    card.value.dom.style.left = `${card.value.position.x}px`
    card.value.dom.style.top = `${card.value.position.y}px`
  }, {
    deep: true
  })

  // useDraggable(card)

  return { card }
}

