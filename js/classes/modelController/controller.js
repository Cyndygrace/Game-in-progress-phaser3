// a controller is a place to listen to the main events
class Controller {
  constructor() {
    emitter.on(G.SET_SCORE, this.setScore);
    emitter.on(G.UP_POINTS, this.upPoints);
    emitter.on(G.UP_MONEY, this.upMoney);
  }
  setScore(score) {
    model.score = score;
  }
  upPoints(points) {
    var score = model.score;
    score += points;
    model.score = score;
  }
  setMoney() {
    model.money = money;
  }
  upMoney(amount) {
    var money = model.money;
    money += amount;
    model.money = money;
  }
}
