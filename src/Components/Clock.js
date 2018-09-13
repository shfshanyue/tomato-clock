import React, { Component } from 'react'
import { compose, mapProps, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

function ClockTheme ({ countdown }) {
  const minute = parseInt(countdown / 60, 10)
  const second = countdown % 60
  return (
    <div>
      { minute } : { second }
    </div>
  )
}

class Clock extends Component {
  constructor (props) {
    super(props) 
    this.state = {
      countdown: props.countdownConfig[props.status]
    }
    this.interval = -1
  }

  componentDidUpdate (prevProps) {
    if (prevProps.status !== this.props.status) {
      this.reset()
      if (this.props.status !== 'CLEAR') {
        clearInterval(this.interval)
        this.interval = setInterval(() => {
          this.decrement() 
        }, 1000)
      } else {
        clearInterval(this.interval) 
      }
    }
  }

  decrement () {
    const { onEnd, onChange } = this.props
    const { countdown } = this.state
    onChange(countdown)
    if (countdown === 0) {
      onEnd()
      clearInterval(this.interval)
    }
    this.setState({
      countdown: countdown > 0 ? countdown - 1 : 0 
    })
  }

  reset () {
    const { countdownConfig, status } = this.props
    this.setState({
      countdown: countdownConfig[status] 
    })
  }

  render () {
    return <ClockTheme countdown={this.state.countdown} />
  }
}

export default compose(
  setPropTypes({
    status: PropTypes.oneOf(['SHORT_BREAK', 'LONG_BREAK', 'FOCUS', 'CLEAR']).isRequired,
    countdownConfig: PropTypes.shape({
      SHORT_BREAK: PropTypes.number,
      LONG_BREAK: PropTypes.number,
      FOCUS: PropTypes.number
    }),
    onEnd: PropTypes.func,
    onChange: PropTypes.func
  }),
  mapProps(({ countdownConfig  = {}, ...props }) => {
    return {
      countdownConfig: Object.assign({}, countdownConfig, {
        CLEAR: countdownConfig.FOCUS || 60 * 25,
        FOCUS: 60 * 25,
        SHORT_BREAK: 60 * 5,
        LONG_BREAK: 60 * 15
      }),
      onChange () {},
      onEnd () {},
      ...props
    } 
  })
)(Clock)

