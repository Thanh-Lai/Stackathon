import { State } from 'phaser'
import { clone } from 'lodash'
import globals from './globals'

export default class extends State {
  init () {}

  preload () {
    this.load.audio('GameOver', './assets/audio/Game-Over.mp3')
  }

  create () {
    let gameOverText = this.add.text(
      this.game.width * 0.5, this.game.height * 0.5,
      `Game Over`,
      {
        font: '50px Ariel',
        fill: '#ff0000',
        align: 'center'
      }
    )
    gameOverText.anchor.set(0.5)

    let scoreLevelText = this.add.text(
      this.game.width * 0.5, this.game.height * 0.6,
      `Your Score: ${this.game.global.score}\n\nYour Level: ${this.game.global.level}`,
      {
        font: '20px Ariel',
        fill: '#ff0000',
        align: 'center'
      }
    )
    scoreLevelText.anchor.set(0.5)

    this.input.onDown.add(this.restartGame, this)
    this.game.add.audio('GameOver').play()
  }

  restartGame () {
    this.game.state.start('Game')
    this.reSetGlobal()
  }

  reSetGlobal () {
    this.game.global = clone(globals)
  }
}
