import { Card } from "@/entity/card"
import { Ref, ref } from "vue"
import { whiteBoard } from "@/entity/white-board";



// 拖拽时，card的层级
const dragZIndex = '999'

let cardPositionUpdateQueue: (() => void)[] = []
const expandResultInitialValue = {
  left: false,
  top: false,
  right: false,
  bottom: false
}
let expandResult = expandResultInitialValue
const expandWhiteBoard = (target: HTMLElement, cardId: number, currentPosition: IPosition) => {
  const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = target
  const expandMethodsMap: [() => boolean, () => void,][] = [
    [
      () => offsetLeft <= 0,
      () => {
        if (expandResult.left) return
        expandResult.left = true
        const leftExpand = () => {
          expandResult.left = false
          whiteBoard.value.width += 300
          whiteBoard.value.dom.scroll({
            left: 300
          })
          whiteBoard.value.cards.forEach((card) => {
            if (card.value.id === cardId) {
              card.value.position.x = currentPosition.x + 300
              card.value.position.y = currentPosition.y
            } else {
              card.value.position.x += 300
            }
          })
        }
        cardPositionUpdateQueue.push(leftExpand)
      },
    ],
    [
      () => offsetLeft + offsetWidth - whiteBoard.value.width >= 0,
      () => {
        if (expandResult.right) return
        expandResult.right = true
        const rightExpand = () => {
          expandResult.right = false
          whiteBoard.value.width += 300
          whiteBoard.value.cards.forEach((card) => {
            if (card.value.id === cardId) {
              card.value.position.x = currentPosition.x
              card.value.position.y = currentPosition.y
            }
          })
        }
        cardPositionUpdateQueue.push(rightExpand)
      },
    ],
    [
      () => offsetTop <= 0,
      () => {
        if (expandResult.top) return
        expandResult.top = true
        const topExpand = () => {
          expandResult.top = false
          whiteBoard.value.height += 300
          whiteBoard.value.cards.forEach((card) => {
            if (card.value.id === cardId) {
              card.value.position.x = currentPosition.x
              card.value.position.y = currentPosition.y + 300
            } else {
              card.value.position.y += 300
            }
          })
        }
        cardPositionUpdateQueue.push(topExpand)
      },
    ],
    [
      () => offsetTop + offsetHeight - whiteBoard.value.height >= 0,
      () => {
        if (expandResult.bottom) return
        expandResult.bottom = true
        const bottomExpand = () => {
          expandResult.bottom = false
          whiteBoard.value.height += 300
          whiteBoard.value.cards.forEach((card) => {
            if (card.value.id === cardId) {
              card.value.position.x = currentPosition.x
              card.value.position.y = currentPosition.y
            }
          })
        }
        cardPositionUpdateQueue.push(bottomExpand)
      },
    ],
  ]
  expandMethodsMap
    .filter(methods => methods[0]())
    .forEach(correctMethods => correctMethods[1]())
}

export const useCardDraggable = (card: Ref<Card>) => {

  // 鼠标在当前容器的位置
  const currentX = ref(0)
  const currentY = ref(0)

  card.value.dom.onmousedown = (e) => {
    card.value.isDrag = true
    currentX.value = e.offsetX
    currentY.value = e.offsetY
  }
  card.value.dom.onmousemove = (e) => {
    if (card.value.isDrag) {

      const scrollTop = document.querySelector('#white-board-container')?.scrollTop || 0
      const scrollLeft = document.querySelector('#white-board-container')?.scrollLeft || 0

      const moveX = e.clientX - currentX.value + scrollLeft
      const moveY = e.clientY - currentY.value + scrollTop
      card.value.dom.style.left = `${moveX}px`
      card.value.dom.style.top = `${moveY}px`
      card.value.dom.style.zIndex = dragZIndex
    }
  }

  const dragEnd = (e: MouseEvent) => {
    card.value.isDrag = false
    card.value.dom.style.zIndex = String(card.value.ZIndex)

    const scrollTop = document.querySelector('#white-board-container')?.scrollTop || 0
    const scrollLeft = document.querySelector('#white-board-container')?.scrollLeft || 0

    const target = e.target as HTMLElement

    const moveX = e.clientX - currentX.value + scrollLeft
    const moveY = e.clientY - currentY.value + scrollTop

    // 判断
    expandWhiteBoard(target, card.value.id, { x: moveX, y: moveY })
    // 执行
    cardPositionUpdateQueue.forEach(method => method())
    // 重置
    cardPositionUpdateQueue = []
    expandResult = expandResultInitialValue
  }
  card.value.dom.onmouseup = (e) => {
    dragEnd(e)
  }
  card.value.dom.onmouseleave = (e) => {

    dragEnd(e)
  }
}

