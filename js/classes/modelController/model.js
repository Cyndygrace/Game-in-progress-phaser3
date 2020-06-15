class Model {
  constructor() {
    this._score = 0;
    this._money = 0;
  }
  // use setter and getter to know when a score is updated
  set score(val) {
    this._score = val;
    console.log('score updated');
    emitter.emit(G.SCORE_UPDATED);
  }
  get score() {
    return this._score;
  }

  set money(val) {
    this._money = val;
    console.log('money updated');
    emitter.emit(G.MONEY_UPDATED);
  }
  get money() {
    return this._money;
  }
}
