// three types of graphic_mode,
//  **Phaser.Canvas(this is a simple HTML 5 canvas)
//  **Phaser.WebGL (web graphic library)
//  **Phaser.AUTO (Allows phaser decide which mode to use when available)
// is fired when the entire page loads, including its content
window.onload = function () {
  //basic game config to setup game
  let config = {
    // choose graphic mode type
    type: Phaser.Auto,
    width: 480,
    height: 640,
    // id of the div in the html where the game will be displayed
    parent: 'phaser-game',
    // different game scenes like game over and start game, etc. in an array
    scene: [SceneMain],
  };
  // crete the game itself which is the game object (game starter snippet)
  game = new Phaser.Game(config);
};
