import { State } from 'phaser'
import YellowBrick from '../prefabs/YellowBrick'
import Paddle from '../prefabs/Paddle'
import Ball from '../prefabs/Ball'

export default class extends State {
  constructor () {
    super()
    this.ballOnPaddle = true
  }
  init () { }
  preload () { }

  create () {
    this.game.physics.arcade.checkCollision.down = false
    this.setUpText()
    this.setUpYellowBricks()
    this.setUpPaddle()
    this.setUpBall()
    this.game.input.onDown.add(this.releaseBall, this)
  }

  setUpText () {
    this.createText(0, 20, '😝 Leggo my Lego 😋', '50px Ariel', '#ffff02', 'center')
    this.scoreText = this.createText(20, 50, `Score: ${this.game.global.score}`, '20px Ariel', '#ffffff', 'left')
    this.levelText = this.createText(20, 75, `Level: ${this.game.global.level}`, '20px Ariel', '#ffffff', 'left')
    this.livesText = this.createText(20, 100, `Lives: ${this.game.global.lives}`, '20px Ariel', '#ffffff', 'left')
  }

  setUpYellowBricks () {
    this.yellowBrick = this.game.add.group()
    this.generateYellowBricks(1, 1, 60, 50)
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
      this.game.world.centerY - 350
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
  }

  ballHitPaddle (ball, paddle) {
    this.ball.body.velocity.x = Math.floor(Math.random() * (200 - 100) + 100)
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
    this.ball.body.velocity.x = Math.floor(Math.random() * (200 - 100) + 100)
    brick.kill()
    this.game.global.score++
    this.scoreText.text = `Score: ${this.game.global.score}`

    if (this.yellowBrick.countLiving() > 0) {
      return this.yellowBrick.countLiving()
    }
    this.game.global.level++
    this.levelText.text = `Level: ${this.game.global.level}`
    this.putBallInPaddle()
    this.generateYellowBricks(1, 1, 60, 50)
  }

  render () {

  }
}
