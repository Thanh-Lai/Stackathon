import { Sprite } from 'phaser'

export default class YellowBrick extends Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'yellowBrick')
    this.game.physics.arcade.enableBody(this)
    this.body.immovable = true
  }
}
