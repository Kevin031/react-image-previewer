import React from 'react'
import { hot } from 'react-hot-loader/root'
// import ImagePreviewer from './ImagePreviewer.js'
import ImagePreviewer from './ImagePreviewer.tsx'

import './index.less'

class App extends React.Component {
  render () {
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      {
        Array(9).fill({
          url: 'https://www.bing.com/th?id=OHR.AdlerPlanetarium_ZH-CN3108653374_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        }).map((item, idx) => (
          <div
            style={{
              width: '33.3%',
              padding: 15
            }}
            key={idx}
          >
            <ImagePreviewer src={item.url} />
          </div>
        ))
      }
    </div>
  }
}

export default hot(App)