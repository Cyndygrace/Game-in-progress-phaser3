// / is fired when the entire page loads, including its content
window.onload = function () {
  //basic game config to setup game canvas
  var config = {
    type: graphics_mode,
    width: game_width,
    height: game_height,
    parent: 'div-tag-name',
    scene: [nameOfScene],
  };
};
