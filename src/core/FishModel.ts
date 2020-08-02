import { Point } from './Point'

let instanseCount = 0

const randomPoint = (): Point => {
  return new Point(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
}

const randomFishColor = (): string => {
  const isRed = Math.random() < 0.8
  return isRed ? `hsl(${0 + Math.random() * 20}, 80%, 60%)` : `hsl(${240 + Math.random() * 20}, 30%, 40%)`
}

const randomScale = (): number => {
  return Math.random() * 0.5 + 0.6
}

export class FishModel {
  readonly id = instanseCount++
  position = randomPoint()
  angle = Math.random() * 360
  vector = new Point()
  color = randomFishColor()
  scale = randomScale()
  refrection = 0

  update(destPoint: Point) {
    const MAX_SPEED = 3
    if (this.refrection <= 0) {
      const distVec = destPoint.sub(this.position)
      const dist = distVec.length
      const aVec = distVec.unit(dist / 400)
      this.vector = this.vector.add(aVec).limit(MAX_SPEED)
      if (dist < 20) {
        this.vector = this.vector.rotate(Math.random() * 180)
        this.refrection = 20 + Math.random() * 10
      }
    } else {
      this.refrection--
    }
    this.angle = this.vector.angle + 180
    this.position = this.position.add(this.vector)
  }
}
