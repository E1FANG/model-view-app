import { ref } from "vue";

export interface Card {
  dom:HTMLElement,
  isDrag:boolean
}
export const useCard = (position:IPosition,container:HTMLElement) => {
  const card = ref<Card>({
    dom:{} as HTMLElement,
    isDrag:false
  })

  const init = ()=>{
    const dom = document.createElement('div')
    dom.setAttribute('style',`
      top:${position.y}px;
      left:${position.x}px;
    `)
    dom.setAttribute('class',`
      bg-white absolute h-80 w-60 rounded-lg shadow-lg
    `)
    container.appendChild(dom)
    card.value.dom = dom
  }

  init()

  // useDraggable(card)

  return {card}
}

