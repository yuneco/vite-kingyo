import { Point } from "./Point";

const DEFAULT_FORCE = 0.25;
const FORCE_DECREMENT_RATE = 0.03;
let instanseCount = 0;

const random = (min: number, max: number) => min + (max - min) * Math.random();

const randomPoint = (): Point => {
  return new Point(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight
  );
};

const randomFishColor = (): string => {
  const isRed = Math.random() < 0.8;
  return isRed
    ? `hsl(${random(0, 20)}, 80%, 60%)`
    : `hsl(${random(240, 260)}, 30%, 40%)`;
};

const randomScale = (): number => {
  return Math.random() * 0.5 + 0.6;
};

export class FishModel {
  readonly id = instanseCount++;
  position = randomPoint();
  angle = Math.random() * 360;
  vector = new Point();
  force = DEFAULT_FORCE;
  color = randomFishColor();
  scale = randomScale();
  insensitiveTerms = 0;

  update(destPoint: Point) {
    const MAX_SPEED = 3;
    this.force = this.force * (1 - FORCE_DECREMENT_RATE) + DEFAULT_FORCE * FORCE_DECREMENT_RATE
    if (this.insensitiveTerms <= 0) {
      const distVec = destPoint.sub(this.position);
      const dist = distVec.length;
      const aVec = distVec.unit((dist * this.force) / 100);
      this.vector = this.vector.add(aVec).limit(MAX_SPEED);
      if (dist < 20) {
        this.vector = this.vector.rotate(random(-70, 70));
        this.insensitiveTerms = random(20, 30);
      }
    } else {
      this.insensitiveTerms--;
    }
    this.angle = this.vector.angle + 180;
    this.position = this.position.add(this.vector);
  }

  setForce(value: number) {
    this.force = value;
  }
}
