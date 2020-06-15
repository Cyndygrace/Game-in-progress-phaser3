class questionContainer {
  constructor(config) {
    this.config = config;
    if (!config.scene) {
      console.log('missing scene');
      return;
    }

    this.scene = config.scene;
  }
}
