import { State } from 'phaser'
import { clone } from 'lodash'
import globals from './globals'

export default class extends State {
  init () {}

  preload () {
    this.load.audio('youWin', './assets/audio/You-Win.mp3')
  }

  create () {
    let youWinText = this.add.text(
      this.game.width * 0.5, this.game.height * 0.5,
      `¡You win!`,
      {
        font: '50px Ariel',
        fill: '#ff3399',
        align: 'center'
      }
    )
    youWinText.anchor.set(0.5)

    let playAgainText = this.add.text(
      this.game.width * 0.5, this.game.height * 0.6,
      `\n\nYour Score: ${this.game.global.score}\n\nYour Level: ${this.game.global.level - 1}\n\nClick anywhere on the screen to play again!`,
      {
        font: '20px Ariel',
        fill: '#ff3399',
        align: 'center'
      }
    )
    playAgainText.anchor.set(0.5)

    this.input.onDown.add(this.restartGame, this)
    this.game.add.audio('youWin').play()
  }

  restartGame () {
    this.game.state.start('Game')
    this.reSetGlobal()
  }

  reSetGlobal () {
    this.game.global = clone(globals)
  }
}
