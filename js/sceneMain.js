class SceneMain extends Phaser.Scene {
  constructor() {
    // add the name of the scene inside super
    // the scene in the super function must match the class name
    super('SceneMain');
  }
  preload() {}
  create() {
    console.log('Ready!');
  }
  update() {}
}
