import React from 'react'
import { hot } from 'react-hot-loader/root'

import './index.less'

function Child () {
  const [num, setNum] = React.useState(0)
  return <div>
    {num}
    <button onClick={() => setNum(num + 1)}>+1</button>
  </div>
}

class App extends React.Component {
  render () {
    return <div>
      hello world!
      <Child />
    </div>
  }
}

export default hot(App)