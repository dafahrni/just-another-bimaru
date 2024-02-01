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

  equals(o) {
    if (this == o) return true;
    if (o == null || this.getClass() != o.getClass()) return false;
    let position = o;
    return equals(this.x, position.x) && equals(this.y, position.y);
  }

  getCopy() {
    return new Position(this.x, this.y);
  }

  asText() {
    return this.x + "|" + this.y;
  }

  changeTo(x, y) {
    this.x = x;
    this.y = y;
  }
}
