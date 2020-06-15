// three types of graphic_mode,
//  **Phaser.Canvas(this is a simple HTML 5 canvas)
//  **Phaser.WebGL (web graphic library)
//  **Phaser.AUTO (Allows phaser decide which mode to use when available)
// set game variable to global scope
var game;
// globally set model variable
var model;
// emmitter a way for different parts of our game to talk and listen to each other.
var emitter;
var G;
var controller;
// is fired when the entire page loads, including its content
window.onload = function () {
  // check if we are on a mobile device by console.log(window.navigator.userAgent), if u find word mobile or tablet from response, then it is a mobile device
  var isMobile = navigator.userAgent.indexOf('Mobile');
  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf('Tablet');
  }
  //basic game config to setup game
  if (isMobile == -1) {
    var config = {
      // choose graphic mode type
      type: Phaser.Auto,
      width: 480,
      height: 640,
      // id of the div in the html where the game will be displayed
      parent: 'phaser-game',
      // different game scenes like game over and start game, etc. in an array
      scene: [SceneMain],
    };
  } else {
    var config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: 'phaser-game',
      scene: [SceneMain],
    };
  }
  G = new Constants();
  // create new instance of model class in mc folder
  model = new Model();
  // crete the game itself which is the game object (game starter snippet)
  game = new Phaser.Game(config);
};
