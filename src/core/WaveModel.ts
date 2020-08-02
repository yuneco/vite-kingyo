import { Point } from './Point'

let instanseCount = 0

export class WaveModel {
  readonly id = instanseCount++
  readonly position: Point

  constructor(p: Point) {
    this.position = p
  }
}
