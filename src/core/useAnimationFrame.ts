import { onMounted, onBeforeUnmount } from 'vue'

/**
 * requestAnimatinFrameの処理を登録します。
 * @param onFire 処理。次のフレームでも継続して呼び出す場合、trueを返してください。
 */
export const useAnimationFrame = (onFire: () => boolean) => {

  let isTerminated = false

  onMounted(() => {
    const tick = () => {
      requestAnimationFrame(() => {
        if (isTerminated) {
          return
        }
        const shouldContinue = onFire()
        if(shouldContinue) {
          tick()
        }
      })
    }
    tick()  
  })
  onBeforeUnmount(() => {
    isTerminated = true
  })

  return {
  }
}
