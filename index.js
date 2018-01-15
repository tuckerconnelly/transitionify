const React = require('react')
const PropTypes = require('prop-types')

module.exports = function transitionify ({ duration = 300, useChildren = false } = {}) {
  const activeProp = useChildren ? 'children' : 'active'

  return Component => {
    class Transitionified extends React.Component {
      constructor (props) {
        super(props)

        this.state = {shown: props[activeProp], active: !!props[activeProp], children: props.children}
      }

      componentWillReceiveProps (nextProps) {
        // If activating
        if (!this.props[activeProp] && nextProps[activeProp]) {
          this.setState({shown: true, children: nextProps.children})
          // Wait for render of {shown: true, active: false}, THEN set active: true,
          // to trigger transition animation
          setTimeout(() => this.setState({active: true}))
        // If DEactivating
        } else if (this.props[activeProp] && !nextProps[activeProp]) {
          this.setState({active: false})
          setTimeout(
            () => this.setState({shown: false, children: nextProps.children}),
            duration
          )
        } else if (this.props.children !== nextProps.children) {
          this.setState({children: nextProps.children})
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
              {active: this.state.active, children: this.state.children}
            )
          )
        )
      }
    }

    Transitionified.propTypes = {
      // eslint-disable-next-line react/no-unused-prop-types
      [activeProp]: PropTypes.bool,
      children: PropTypes.node
    }

    return Transitionified
  }
}
