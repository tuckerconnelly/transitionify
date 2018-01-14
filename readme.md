# transitionify

minimal library to add and remove your component from the dom after a css transition. best when used with [styled-jsx](https://github.com/zeit/styled-jsx).

## usage

```
npm i transitionify
```

```js
import transitionify from 'transitionify'

// transitionify this component: it'll receive an "active"
// prop that lets you add an ".active" class for the css
// transition.

const MyChildComponent = transitionify()(({active}) =>
  <div className={active && 'active'}>
    My active component
    <style jsx>{`
      div {
        opacity: 0;

        transition: opacity 300ms;
      }

      .active {
        opacity: 1;
      }
    `}</style>
  </div>
)

// in render() below, <MyChildComponent /> will be removed
// from the DOM after 300ms (the default duration).

class MyParentComponent extends React.Component {
  state = {childComponentShown: false}

  componentDidMount () {
    setInterval(() => this.setState({childComponentShown: true}), 1000)
  }

  render () {
    return (
      <div>
        <MyChildComponent active={this.state.childComponentShown} />
      </div>
    )
  }
}
```

## api

### transitionify({duration = 300})(YourComponent)

duration - the duration in ms to wait to remove the element from the dom, when active goes from true -> false
