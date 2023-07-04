import { ref } from "vue";

export interface Card {
  dom:HTMLElement,
  isDrag:boolean,
  ZIndex:number
}
let initialZIndex = 10

export const useCard = (position:IPosition,container:HTMLElement) => {
  const card = ref<Card>({
    dom:{} as HTMLElement,
    isDrag:false,
    ZIndex:0
  })

  const init = ()=>{
    const dom = document.createElement('div')
    dom.setAttribute('style',`
      top:${position.y}px;
      left:${position.x}px;
      z-index:${initialZIndex}
    `)
    dom.setAttribute('class',`
      bg-white absolute h-80 w-60 rounded-lg shadow-lg
    `)
    container.appendChild(dom)
    card.value.dom = dom
    card.value.ZIndex = initialZIndex
    initialZIndex +=1
  }

  init()

  // useDraggable(card)

  return {card}
}

