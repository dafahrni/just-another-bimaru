export class Position {
  
  private x: number;
  private y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  goLeft() {
    this.x--;
  }

  goRight() {
    this.x++;
  }

  goUp() {
    this.y--;
  }

  goDown() {
    this.y++;
  }

  isSameAs(o: Position) {
    if (this == o) return true;
    if (o == null || !(o instanceof Position)) return false;
    let position = o;
    return this.x == position.x && this.y == position.y;
  }

  getCopy(): Position {
    return new Position(this.x, this.y);
  }

  asText(): string {
    return this.x + "|" + this.y;
  }

  toString(): string {
    return this.asText();
  }

  changeTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
