import Phaser from 'phaser'
import { clone } from 'lodash'
import globals from './globals'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.load.audio('GameOver', './assets/audio/Game-Over.mp3')
  }

  create () {
    let text = this.add.text(
      this.game.width * 0.5, this.game.height * 0.5,
      `Game Over\n\nYour Score: ${this.game.global.score}\n\nYour Level: ${this.game.global.level}`,
      {
        font: '24px Ariel',
        fill: '#ff0000',
        align: 'center'
      }
    )
    text.anchor.set(0.5)
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
