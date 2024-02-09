export class Position {
  
  constructor(x, y) {
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

  isSameAs(o) {
    if (this == o) return true;
    if (o == null || !(o instanceof Position)) return false;
    let position = o;
    return this.x == position.x && this.y == position.y;
  }

  getCopy() {
    return new Position(this.x, this.y);
  }

  asText() {
    return this.x + "|" + this.y;
  }

  toString() {
    return this.asText();
  }

  changeTo(x, y) {
    this.x = x;
    this.y = y;
  }
}
