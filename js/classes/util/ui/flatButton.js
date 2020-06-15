class FlatButton extends Phaser.GameObjects.Container {
  constructor(config) {
    // if (!config.scene) {
    //   console.log('missing scene');
    //   return;
    // }
    // check if background key is not available
    // if (!config.key) {
    //   console.log('missing key');
    //   return;
    // }
    super(config.scene);
    this.config = config;
    this.scene = config.scene;
    this.back = this.scene.add.image(0, 0, config.key);
    this.add(this.back);
    if (config.textA || config.textB) {
      this.text1 = this.scene.add.text(0, 0, config.textA);
      this.text2 = this.scene.add.text(0, 10, config.textB);
      // this.text1.setOrigin(0.5, 0.5);
      this.add(this.text1);
      this.add(this.text2);
    }
    if (config.x) {
      this.x = config.x;
    }
    if (config.y) {
      this.y = config.y;
    }
    // add button to the scene

    this.scene.add.existing(this);
    if (config.event) {
      this.back.setInteractive();
      this.back.on('pointerdown', this.pressed, this);
    }
  }
  pressed() {
    emitter.emit(this.config.event);
  }
}
