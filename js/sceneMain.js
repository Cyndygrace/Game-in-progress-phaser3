class SceneMain extends Phaser.Scene {
  // constructor is called once the scene is created
  constructor() {
    // add the name of the scene inside super
    // the scene in the super function must match the class name
    super('SceneMain');
  }
  // preload, loads all our resources(images, sounds, etc) before it is being fired
  preload() {}
  // create defines our object
  create() {
    console.log('Ready!');
  }
  // update, for any action we want to constantly update(eg running loop, collision, etc.)
  update() {}
  customFunction() {}
}
