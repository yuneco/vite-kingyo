import { h } from 'vue'

type Props = {
  x: number;
  y: number;
  angle: number;
  color: string;
  scale: number;
}

export const Fish = (props: Props) => {
  const scale = props.scale || 1
  const style = `color: ${props.color};transform: translate(${props.x}px, ${props.y}px) rotate(${props.angle}deg) scale(${scale}, ${scale * 0.8}) rotate(${-45}deg);`
  return h('div', { class: 'FishRoot', style })
}
