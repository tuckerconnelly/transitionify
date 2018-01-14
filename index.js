const PropTypes = require('prop-types').default

module.exports = function transition ({ duration = 300 } = {}) {
  return Component =>
    class extends React.Component {
      static propTypes = {
        active: PropTypes.bool
      }

      state = {shown: this.props.active, active: this.props.active}

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
        const {...other} = this.props
        if (!this.state.shown) return <div />
        return <Component {...other} active={this.state.active} />
      }
    }
}
