# 一个带动画的React图片预览器

![](https://img.shields.io/badge/react-17.0.2-yellow)

## 功能

- 图片预览
- 图片放大

## 例子

```javascript
import ImagePreviewer from 'react-image-animated-previewer'

export default function Layout () {
  return <div>
    <ImagePreviewer
      src="https://www.bing.com/th?id=OHR.AdlerPlanetarium_ZH-CN3108653374_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"
      style={{ width: 100, height: 100 }}
    />
  </div>
}
```

## Props

- `src` 图片url地址
- `style` 图片样式
- `duration` 动画持续时间，默认`300ms`
- `padding` 图片放大后的边距，默认`20`
- `className` 容器的`class`
