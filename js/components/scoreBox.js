class ScoreBox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    // make reference to the scene
    this.scene = config.scene;
    // add text box to hold the score
    this.text1 = this.scene.add.text(0, 0, 'score:0');
    // set origin to start from center of text
    this.text1.setOrigin(0.5, 0.5);
    // add text box to score box
    this.add(this.text1);
    // with containers, to add to scene
    this.scene.add.existing(this);
    //listen for an event from the model to be updated and then called the function scoreUpdated
    emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
  }
  scoreUpdated() {
    this.text1.setText('SCORE:' + model.score);
  }
}
