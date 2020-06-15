class AlignGrid {
  constructor(config) {
    this.config = config;
    if (!config.scene) {
      console.log('missing scene');
      return;
    }
    if (!config.rows) {
      config.rows = 5;
    }
    if (!config.cols) {
      config.cols = 5;
    }
    // assign width and height to surface we are going to draw on
    if (!config.height) {
      config.height = game.config.height;
    }
    if (!config.width) {
      config.width = game.config.width;
    }
    this.scene = config.scene;
    // define cell width and cell height
    this.cellWidth = config.width / config.cols;
    this.cellHeight = config.height / config.rows;
  }

  // to show grid so that we can know hwere it is and see it
  showGrid() {
    this.graphics = this.scene.add.graphics();
    // get an object to draw on, give it a line style with 2mm thick and color red
    this.graphics.lineStyle(2, 0xff0000);
    // divide scene into 5 equal colums
    for (var i = 0; i < this.config.width; i += this.cellWidth) {
      // draw a line from the top of the screen to the bottom of the screen
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.config.height);
    }

    // divide scene into 5 equal rows
    for (var i = 0; i < this.config.height; i += this.cellHeight) {
      // draw a line from the left of the screen to the right of the screen
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.config.width, i);
    }
    // to draw the lines
    this.graphics.strokePath();
  }
  // calculate where u want to place an object with respect to the grid
  placeAt(xx, yy, obj) {
    // calc position based on the cellwidth and cellheight
    var x2 = this.cellWidth * xx + this.cellWidth / 2;
    var y2 = this.cellHeight * yy + this.cellHeight / 2;

    obj.x = x2;
    obj.y = y2;
  }

  placeAtIndex(index, obj) {
    var yy = Math.floor(index / this.config.cols);
    var xx = index - yy * this.config.cols;

    this.placeAt(xx, yy, obj);
  }

  // show cell numbers
  showCellNumbers() {
    var count = 0;
    for (var i = 0; i < this.config.rows; i++) {
      for (var j = 0; j < this.config.cols; j++) {
        var numText = this.scene.add.text(0, 0, count, { color: '#ff0000' });
        numText.setOrigin(0.5, 0.5);
        this.placeAtIndex(count, numText);
        count++;
      }
    }
  }
}
