import { State } from 'phaser'

export default class extends State {
  init () {}

  preload () {
    this.game.load.spritesheet('letGo', './assets/images/lets-go.gif')
    this.load.audio('awesome', './assets/audio/Awesome.mp3')
  }

  create () {
    this.letsGoFig = this.game.add.sprite(this.game.width * 0.5 - 250, 30, 'letGo')
    let startGame = this.add.text(
      this.game.width * 0.5, this.game.height * 0.5,
      `Welcome\n😝 Leggo my Lego 😋`,
      {
        font: '50px Ariel',
        fill: '#ff9900',
        align: 'center'
      })
    startGame.anchor.set(0.5)

    let clickAnywhereText = this.game.add.text(
      this.game.world.centerX, this.game.world.centerY + 150,
      '\n\nClick anywhere on the screen to play\n\nRules:\nYellow Bricks: 1 point\nBlue Cones: 5 points\n\nBy Thanh Lai',
      { font: '25px Arial',
        fill: '#ff9900',
        align: 'center'
      })
    clickAnywhereText.anchor.setTo(0.5, 0.5)
    this.game.add.audio('awesome').play()
    this.input.onDown.add(this.playGame, this)
  }

  playGame () {
    this.game.sound.stopAll()
    this.game.state.start('LevelOne')
  }
}
