// container is a group of objects that can be treated as a single container
class Road extends Phaser.GameObjects.Container {
  // constructor is the function that gets called when we call a new road
  // pass it the config information
  constructor(config) {
    // get the scene from the config object and pass it as super keyword
    super(config.scene);
    // call the constructor of the container using the super keyword(config.scene)
    this.scene = config.scene;
    // add road to the scene
    this.back = this.scene.add.image(0, 0, 'road');
    // put road inside the container
    this.add(this.back);
    // add container to scene
    this.scene.add.existing(this);
    // make the road 50% of the size of the screen
    // this.back.displayWidth = game.config.width * 0.5;
    // make the road image size propotional
    // this.back.scaleY = this.back.scaleX;
    // use Align class in align.js file to set the width of the road 50% of the width of the canvas
    Align.scaleToGameWidth(this.back, 0.5);

    // height of road image is set very heigh to accomodate different devices.
    // container height and width is zero
    // set container height and width with width of road image and canvas height
    this.setSize(this.back.displayWidth, game.config.height);
    // get and store lines in a group and add it to the road
    this.lineGroup = this.scene.add.group();
    // get how many times we are moving the lines
    this.count = 0;
    // add car to scene
    // set x value of car to 1/4 of road or container width value which is center of the canvas
    // set y value to 90% (at the bottom os the screen)
    this.car = this.scene.add.sprite(
      this.displayWidth / 4,
      game.config.height * 0.9,
      'cars'
    );
    // makes size of car smaller
    Align.scaleToGameWidth(this.car, 0.1);
    this.add(this.car);

    // set click event on road/back to move car from left to side of the road
    // allows an image o object to accept an input
    this.back.setInteractive();
    // set the mouse down or click event and call the function that defines what should happen
    this.back.on('pointerdown', this.changeLanes, this);
    // add to road by calling function
    this.addBarrier();
  }
  addBarrier() {
    // add all obstacles ("pcar1", pcar2, cone, barrier) randomly to scene
    // store all obstacles in an array of strings
    // increase speed of objects by making each string into an object and adding a speed key and speed value 1/2 0f car speed to make obstacle move faster than car
    // add scale key and value to the object to reduce size of obstacles
    var collissionObjects = [
      { key: 'pcar1', speed: 10, scale: 10 },
      { key: 'pcar2', speed: 10, scale: 10 },
      { key: 'cone', speed: 10, scale: 5 },
      { key: 'barrier', speed: 10, scale: 5 },
    ];
    // get random number from 0-4
    var index = Math.floor(Math.random() * 4);
    // get the string in the array with that particular index
    var key = collissionObjects[index].key;
    // get spped of each object
    var speed = collissionObjects[index].speed;
    // get scale of each object
    var scale = collissionObjects[index].scale / 100;
    // - x to place pcar1 on the left hand side of the road
    this.object = this.scene.add.image(-this.displayWidth / 4, 0, key);
    // add speed to the object
    this.object.speed = speed;
    // add scale property to the object
    this.object.scale = scale;
    // automatically change pcar1 lane from left to right if random number is less than 50
    // randomly select a number from 0 to 100
    var lane = Math.random() * 100;
    // if randomly selected number is less than 50
    if (lane < 50) {
      // change pcar1 to the opposite side of the lane
      this.object.x = this.displayWidth / 4;
    }
    // makes size of pcar1 smaller
    Align.scaleToGameWidth(this.object, scale);
    // add the object into the road by making it a child of the container
    this.add(this.object);
  }
  changeLanes() {
    // if it is on the right hand side of the road
    if (this.car.x > 0) {
      // move it to the left hand side of the road
      this.car.x = -this.displayWidth / 4;
    } else {
      this.car.x = this.displayWidth / 4;
    }
  }

  makeLines() {
    // get one-tenth of the height of the road
    // this.dislayHeight is the height of the road
    this.vSpace = this.displayHeight / 10;
    // make 20 lines to put on the raod whic is double the lines needed to fill the height of the canvas or scene. this helps during movement.
    for (var i = 0; i < 20; i++) {
      // this.x is the x position of the road
      var line = this.scene.add.image(this.x, this.vSpace * i, 'line');
      // get the original value of Y for the line which is zero because i starts counting from zero.
      line.originalYValue = line.y;
      // if each time we loop, a line is added to the line group. in this case 20 times
      this.lineGroup.add(line);
    }
  }
  // move/change the y position of the lineGroup by vSpace/20 * 20(number of childern in the line group) every time the moveLine function is called.
  moveLines() {
    // loop through the children of line group and for each line, change the y position by adding vSpace so that it looks like the lines are moivng.
    // bind this keyword to the function so this it is bind to the scene when the function is called in the scene class or it refers to the road.
    this.lineGroup.children.iterate(
      function (child) {
        // change/increase the next y position by vSpace/20 for each line to seem like the line is moving
        // increase speed by reducing the value that vSpace is divided by
        child.y += this.vSpace / 10;
      }.bind(this)
    );
    // incease count variable
    this.count++;
    // reset y position of line to zero to move all lines back in their original position.
    if (this.count === 20) {
      this.count = 0;
      this.lineGroup.children.iterate(
        function (child) {
          child.y = child.originalYValue;
        }.bind(this)
      );
    }
  }
  moveBarriers() {
    // move at the rate the lines are moving
    // change the y position of the pcar1 by vSpace/20
    // pcar1 moving in a downwards position
    this.object.y += this.vSpace / this.object.speed;
    // if there is a collision, btw car and obstacle
    if (Collission.checkCollide(this.car, this.object) === true) {
      // become transparent
      this.car.alpha = 0.5;
    } else {
      // back to normal
      this.car.alpha = 1;
    }
    // if the y position of the pcar1 becomes higher than the canvas, destroy pcar1 and add a new pcar1
    // object is barrier
    if (this.object.y > game.config.height) {
      // increase points because player successfully aviod car
      emitter.emit(G.UP_POINTS, 1);
      // destroy pcar1
      this.object.destroy();
      // add pcar1
      this.addBarrier();
    }
  }
}
