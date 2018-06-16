import { Sprite, Physics } from 'phaser'

export default class MovingBricks extends Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'yellowBrick')
    this.game.physics.arcade.enableBody(this)
    this.body.immovable = true
    this.game.physics.enable(this, Physics.ARCADE)
    this.collideWorldBounds = true
    this.enableBody = true
    this.animations.add('right', [0, 1, 2, 3, 4], 5, false)
    this.animations.add('left', [5, 6, 7, 8, 9], 5, true)
    this.body.bounce.y = 0
    this.body.bounce.x = 1
    this.body.collideWorldBounds = true
    this.body.velocity.x = 50
  }
}
