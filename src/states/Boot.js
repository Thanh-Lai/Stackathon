import { State } from 'phaser'
import WebFont from 'webfontloader'
import config from '../config'
import globals from './globals'
import { clone } from 'lodash'

export default class extends State {
  init () {
    this.stage.backgroundColor = '#262539'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  create () {
    this.initGlobalVariables()
  }

  initGlobalVariables () {
    this.game.global = clone(globals)
  }

  preload () {
    if (config.webfonts.length) {
      WebFont.load({
        google: {
          families: config.webfonts
        },
        active: this.fontsLoaded
      })
    }

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('yellowBrick', './assets/images/yellow-brick.png')
    this.load.image('paddle', './assets/images/red-paddle.png')
    this.load.image('ball', './assets/images/head-ball.png')
    this.load.image('obstacleBrick', './assets/images/gray-brick.png')
    this.load.image('bonusCone', './assets/images/blue-cone-bonus.png')
  }

  render () {
    if (config.webfonts.length && this.fontsReady) {
      this.state.start('Splash')
    }
    if (!config.webfonts.length) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
