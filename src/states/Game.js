import Phaser from 'phaser'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.setUpText()
  }

  setUpText () {
    this.createText(0, 20, 'Welcome', '50px Ariel', '#ffffff', 'center')
    this.createText(20, 50, `Score: ${this.game.global.score}`, '20px Ariel', '#ffffff', 'left')
    this.createText(20, 75, `Level: ${this.game.global.level}`, '20px Ariel', '#ffffff', 'left')
    this.createText(20, 100, `Lives: ${this.game.global.lives}`, '20px Ariel', '#ffffff', 'left')
  }

  createText (xOffset, yOffset, text, font, color, align) {
    return this.game.add.text(
      xOffset,
      yOffset,
      text,
      {
        font: font,
        fill: color,
        boundsAlignH: align}
    ).setTextBounds(0, 0, this.game.world.width, 0)
  }

  render () {

  }
}
