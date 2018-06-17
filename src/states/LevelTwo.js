import { State } from 'phaser'
import MovingBricks from '../prefabs/MovingBricks'
import Paddle from '../prefabs/Paddle'
import Ball from '../prefabs/Ball'
import BonusCone from '../prefabs/BonusCone'

let xOffset = 60
let yOffset = 50
let rows = 1
let columns = 2

export default class extends State {
  constructor () {
    super()
    this.ballOnPaddle = true
  }

  init () {}

  preload () {
    this.load.audio('ouch', './assets/audio/ouch.mp3')
    this.load.audio('oops', './assets/audio/Oops.mp3')
    this.load.audio('levelUp', './assets/audio/Level-Up-Sound.mp3')
    this.load.audio('bonus', './assets/audio/Bonus-Sound.mp3')
  }

  create () {
    this.game.physics.arcade.checkCollision.down = false
    this.setUpText()
    this.setUpYellowBricks()
    this.setUpPaddle()
    this.setUpBall()
    this.setUpBonusCone()
    this.game.input.onDown.add(this.releaseBall, this)
    this.ouch = this.game.add.audio('ouch')
    this.levelTwoText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Level Two', { font: '65px Arial', fill: '#33cc33', align: 'center' })
    this.levelTwoText.anchor.setTo(0.5, 0.5)
    this.clickAnywhereText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, 'Click anywhere on the screen to play', { font: '25px Arial', fill: '#33cc33', align: 'center' })
    this.clickAnywhereText.anchor.setTo(0.5, 0.5)
    this.game.input.onDown.addOnce(this.removeText, this)
    this.game.add.audio('levelUp').play()
  }
  removeText () {
    this.levelTwoText.destroy()
    this.clickAnywhereText.destroy()
  }

  setUpText () {
    this.createText(0, 20, '😝 Leggo my Lego 😋', '50px Ariel', '#ffff02', 'center')
    this.scoreText = this.createText(20, 50, `Score: ${this.game.global.score}`, '20px Ariel', '#ffffff', 'left')
    this.levelText = this.createText(20, 75, `Level: ${this.game.global.level}`, '20px Ariel', '#ffffff', 'left')
    this.livesText = this.createText(20, 100, `Lives: ${this.game.global.lives}`, '20px Ariel', '#ffffff', 'left')
  }

  setUpYellowBricks () {
    this.yellowBrick = this.game.add.group()
    let bricksGroupWidth = ((xOffset * columns) - (yOffset - this.yellowBrick.width)) / 2
    let centerX = this.game.world.centerX - bricksGroupWidth
    let centerY = this.game.world.centerY - 350
    this.generateYellowBricks(rows, columns, xOffset, yOffset, centerX, centerY)
  }

  setUpBonusCone () {
    this.bonusCone = this.game.add.group()
    let bricksGroupWidth = ((xOffset * columns) - (yOffset - this.bonusCone.width)) / 2
    let centerX = this.game.world.centerX - bricksGroupWidth
    this.generateBonusCone(1, 5, 200, yOffset, centerX, this.yellowBrick.height - 100)
  }

  setUpPaddle () {
    this.paddle = new Paddle(
      this.game,
      this.game.world.centerX,
      this.game.world.height - 50
    )
    this.game.add.existing(this.paddle)
  }

  setUpBall () {
    this.ball = new Ball(this.game)
    this.game.add.existing(this.ball)
    this.ball.events.onOutOfBounds.add(this.ballLost, this)
    this.putBallInPaddle()
  }

  ballLost () {
    this.oops = this.game.add.audio('oops')
    this.oops.play()
    --this.game.global.lives
    if (this.game.global.lives === 0) {
      return this.endGame()
    }
    this.livesText.text = `Lives: ${this.game.global.lives}`
    this.putBallInPaddle()
  }

  endGame () {
    this.game.state.start('GameOver')
  }

  releaseBall () {
    if (!this.ballOnPaddle) {
      return
    }
    this.ballOnPaddle = false
    this.ball.body.velocity.y = -300
    this.ball.body.velocity.x = Math.floor(Math.random() * (200 - 100) + 100)
  }

  putBallInPaddle () {
    this.ballOnPaddle = true
    this.ball.reset(this.paddle.body.x, this.paddle.y - this.paddle.body.height - 25)
  }

  generateYellowBricks (inputRows, inputColumns, inputXOffset, inputYOffset, centerX, centerY) {
    let rows = inputRows
    let columns = inputColumns
    let xOffset = inputXOffset
    let yOffset = inputYOffset
    let yellowBrick
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        yellowBrick = new MovingBricks(
          this.game,
          x * xOffset,
          y * yOffset
        )
        this.yellowBrick.add(yellowBrick)
      }
    }
    this.yellowBrick.position.setTo(
      centerX,
      centerY
    )
  }

  generateBonusCone (inputRows, inputColumns, inputXOffset, inputYOffset, centerX, centerY) {
    let rows = inputRows
    let columns = inputColumns
    let xOffset = inputXOffset
    let yOffset = inputYOffset
    let bonusCone
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        bonusCone = new BonusCone(
          this.game,
          x * xOffset,
          y * yOffset
        )
        this.bonusCone.add(bonusCone)
      }
    }
    this.bonusCone.position.setTo(
      centerX,
      centerY
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

  update () {
    if (this.ballOnPaddle) {
      this.ball.body.x = this.paddle.x - (this.ball.width / 2)
    }

    this.game.physics.arcade.collide(
      this.ball,
      this.paddle,
      this.ballHitPaddle,
      null,
      this
    )

    this.game.physics.arcade.collide(
      this.ball,
      this.yellowBrick,
      this.ballHityellowBrick,
      null,
      this
    )

    this.game.physics.arcade.collide(
      this.ball,
      this.bonusCone,
      this.ballHitBonusCone,
      null,
      this
    )
  }

  ballHitPaddle (ball, paddle) {
    this.ball.body.velocity.x = Math.floor(Math.random() * (200 - 100) + 100)
    this.ouch.stopTime = 2
    this.ouch.play()
    let diff = 0
    if (ball.x < paddle.x) {
      diff = paddle.x - ball.x
      ball.body.velocity.x = (-10 * diff)
      return ball.body.velocity.x
    }
    if (ball.x > paddle.x) {
      diff = ball.x - paddle.x
      ball.body.velocity.x = (25 * diff)
      return ball.body.velocity.x
    }
  }

  ballHityellowBrick (ball, brick) {
    this.ouch.play()
    this.ball.body.velocity.x = Math.floor(Math.random() * (200 - 100) + 100)
    brick.kill()
    this.game.global.score++
    this.scoreText.text = `Score: ${this.game.global.score}`
    if (this.yellowBrick.countLiving() > 0) {
      return this.yellowBrick.countLiving()
    }
    this.game.global.level++

    if (this.game.global.level === 3) {
      return this.levelThree()
    }
  }

  ballHitBonusCone (ball, brick) {
    this.game.add.audio('bonus').play()
    this.ball.body.velocity.x = Math.floor(Math.random() * (200 - 100) + 100)
    brick.kill()
    this.game.global.score += 5
    this.scoreText.text = `Score: ${this.game.global.score}`
    if (this.bonusCone.countLiving() > 0) {
      return this.bonusCone.countLiving()
    }
    this.game.global.level++

    if (this.game.global.level === 3) {
      return this.levelThree()
    }
  }

  levelThree () {
    this.game.state.start('LevelThree')
  }
}
