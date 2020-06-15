class MoneyBox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    // make reference to the scene
    this.scene = config.scene;
    // add text box to hold the score
    this.text2 = this.scene.add.text(0, 50, 'money:0');
    // set origin to start from center of text
    this.text2.setOrigin(0.5, 0.5);
    // add text box to score box
    this.add(this.text2);
    // with containers, to add to scene
    this.scene.add.existing(this);
    //listen for an event from the model to be updated and then called the function scoreUpdated
    emitter.on(G.MONEY_UPDATED, this.moneyUpdated, this);
  }
  moneyUpdated() {
    this.text2.setText('MONEY:' + model.money);
  }
}
