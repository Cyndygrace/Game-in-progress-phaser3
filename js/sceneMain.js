class SceneMain extends Phaser.Scene {
  // constructor is called once the scene is created
  constructor() {
    // add the name of the scene inside super
    // the scene in the super function must match the class name
    super('SceneMain');
  }
  // preload, loads all our resources(images, sounds, etc) before it is being fired
  preload() {
    // load road image to library
    this.load.image('road', 'images/road.jpg');
    // load cars sprite to library
    this.load.spritesheet('cars', 'images/cars.png', {
      frameWidth: 60,
      frameHeight: 126,
    });
    // load line image to library
    this.load.image('line', 'images/line.png');
    // load different barrier images
    this.load.image('pcar1', 'images/pcar1.png');
    this.load.image('pcar2', 'images/pcar2.png');
    this.load.image('cone', 'images/cone.png');
    this.load.image('barrier', 'images/barrier.png');
    this.load.image('button1', 'images/ui/buttons/1/1.png');
    this.load.image('button5', 'images/ui/buttons/2/5.png');
  }
  // create defines our object
  create() {
    // this should be the first line in the create function so that we can globally access it in othr parts of the game
    emitter = new Phaser.Events.EventEmitter();
    // the instace of the emmitter has to exist before we use the controller because we use that instance inside the controller
    controller = new Controller();
    // activate scorebox on the scene
    this.sb = new ScoreBox({ scene: this });
    // get the poistion x of score box
    // set score box beside of the road on the right
    this.sb.x = game.config.width - 50;
    // get y position of where score box will apear on the screen
    // 50 pixels down from the top
    this.sb.y = 50;
    model.score = 0;
    // activate money box on the screen
    this.mb = new MoneyBox({ scene: this });
    this.mb.x = game.config.width - 50;
    this.mb.y = 100;
    model.money = 50;
    // creates a new instance of road and adds it to the scene
    this.road = new Road({ scene: this });
    // put road in the center of the canvas or scene
    this.road.x = game.config.width / 2;

    // activate line image to road but not as a child of the container by using add linke  in back(road)
    this.road.makeLines();
    // to get mobile screen size
    // define default grid rows and cols
    this.alignGrid = new AlignGrid({ scene: this, row: 5, cols: 5 });
    // to draw the grid lines with numbers in each cell
    this.alignGrid.showCellNumbers();
    // draw grid lines
    this.alignGrid.showGrid();
    // allows you to place objects in a speccfic cell using the cell number
    this.alignGrid.placeAtIndex(3.9, this.sb);
    // make button
    this.flatButton = new FlatButton({
      scene: this,
      key: 'button1',
      textA: 'pressME!',
      textB: 'HELLO!',
      x: 200,
      y: 100,
      event: 'button_pressed',
    });
    this.flatButton2 = new FlatButton({
      scene: this,
      key: 'button5',
      textA: 'pressME!',
      textB: 'Dear!',
      x: 200,
      y: 200,
      event: 'button_pressed',
    });
    emitter.on('button_pressed', this.buttonPressed, this);
  }

  buttonPressed() {
    console.log('buttonPressed');
  }
  // update, for any action we want to constantly update(eg running loop, collision, etc.)
  update() {
    this.road.moveLines();
    this.road.moveBarriers();
  }
  customFunction() {}
}
