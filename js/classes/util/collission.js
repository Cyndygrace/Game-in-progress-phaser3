class Collission {
  static checkCollide(obj1, obj2) {
    // maths.abs removes negative sign from a number
    var distX = Math.abs(obj1.x - obj2.x);
    var distY = Math.abs(obj1.y - obj2.y);
    // if obj1 and obj2 are on the same side of the lane.
    if (distX < obj1.width / 2) {
      if (distY < obj1.height / 2) {
        return true;
      }
    }
    return false;
  }
}
