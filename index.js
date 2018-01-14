const React = require('react')
const PropTypes = require('prop-types')

module.exports = function transitionify ({ duration = 300 } = {}) {
  return Component => {
    class Transitionified extends React.Component {
      constructor (props) {
        super(props)

        this.state = {shown: props.active, active: props.active}
      }

      componentWillReceiveProps (nextProps) {
        // If activating
        if (!this.props.active && nextProps.active) {
          this.setState({shown: true})
          // Wait for render of {shown: true, active: false}, THEN set active: true,
          // to trigger transition animation
          setTimeout(() => this.setState({active: true}))
        // If DEactivating
        } else if (this.props.active && !nextProps.active) {
          this.setState({active: false})
          setTimeout(
            () => this.setState({shown: false}),
            duration
          )
        }
      }
      render () {
        if (!this.state.shown) {
          return React.createElement('div')
        }

        return (
          React.createElement(
            Component,
            Object.assign(
              {},
              this.props,
              {active: this.state.active}
            )
          )
        )
      }
    }

    Transitionified.propTypes = {
      active: PropTypes.bool
    }

    return Transitionified
  }
}
