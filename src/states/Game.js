import { State } from 'phaser'
import YellowBrick from '../prefabs/YellowBrick'

export default class extends State {
  init () { }
  preload () { }

  create () {
    this.setUpText()
    this.setUpYellowBricks(this.ye)
  }

  setUpText () {
    this.createText(0, 20, 'Welcome', '50px Ariel', '#ffffff', 'center')
    this.createText(20, 50, `Score: ${this.game.global.score}`, '20px Ariel', '#ffffff', 'left')
    this.createText(20, 75, `Level: ${this.game.global.level}`, '20px Ariel', '#ffffff', 'left')
    this.createText(20, 100, `Lives: ${this.game.global.lives}`, '20px Ariel', '#ffffff', 'left')
  }

  setUpYellowBricks () {
    this.yellowBrick = this.game.add.group()
    this.generateYellowBricks(5, 15, 60, 50)
  }

  generateYellowBricks (inputRows, inputColumns, inputXOffset, inputYOffset) {
    let rows = inputRows
    let columns = inputColumns
    let xOffset = inputXOffset
    let yOffset = inputYOffset
    let yellowBrick

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        yellowBrick = new YellowBrick(
          this.game,
          x * xOffset,
          y * yOffset
        )
        this.yellowBrick.add(yellowBrick)
      }
    }
    let bricksGroupWidth = ((xOffset * columns) - (yOffset - yellowBrick.width)) / 2
    this.yellowBrick.position.setTo(
      this.game.world.centerX - bricksGroupWidth,
      this.game.world.centerY - 300
    )
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
