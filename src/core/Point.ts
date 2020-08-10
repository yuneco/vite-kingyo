export class Point {
  readonly x: number;
  readonly y: number;
  constructor(x = 0, y = 0, a = 0) {
    this.x = x;
    this.y = y;
  }

  get length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  get angle(): number {
    const rad2angle = (r: number): number => (r / Math.PI) * 180;
    return rad2angle(Math.atan2(this.y, this.x));
  }

  add(p: Point): Point {
    return new Point(this.x + p.x, this.y + p.y);
  }

  sub(p: Point): Point {
    return new Point(this.x - p.x, this.y - p.y);
  }

  times(n: number): Point {
    return new Point(this.x * n, this.y * n);
  }

  unit(unitLength = 1): Point {
    const len = this.length;
    return new Point((this.x / len) * unitLength, (this.y / len) * unitLength);
  }

  limit(maxLength = 1): Point {
    return this.length <= maxLength ? this : this.unit(maxLength);
  }

  rotate(deg: number): Point {
    const angle2rad = (a: number): number => (a * Math.PI) / 180;
    const rad = angle2rad(this.angle + deg);
    const l = this.length;
    return new Point(Math.cos(rad) * l, Math.sin(rad) * l);
  }
}
