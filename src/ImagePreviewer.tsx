import React from 'react'

type IProps = {
  src: stirng
  className: string | undefined
  style: StyleSheet
  padding: number
  duration: number
}

const maskStyle: StyleSheet = {
  position: 'fixed',
  zIndex: 99,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,.7)'
}

let _animating = false

const ImagePreviewer: React.FC<IProps> = ({
  src = '',
  style = {},
  duration = 300,
  padding = 20,
  className
}) => {
  const [show, setShow] = React.useState<boolean>(false)
  const [wrapperStyle, setWrapperStyle] = React.useState<StyleSheet>({})
  const [imageStyle, setImageStyle] = React.useState<StyleSheet>({})
  const [animationFinished, setAnimationFinished] = React.useState<boolean>(false)
  const ref = React.createRef<HTMLImageElement>()

  const hidePreview = (evt: Event): void => {
    evt.stopPropagation()

    if (_animating) return
    _animating = true

    setImageStyle({
      ...imageStyle,
      width: wrapperStyle.width,
      height: wrapperStyle.height,
      transform: 'scale(1) translateX(0) translateY(0)'
    })
    setShow(false)
    setTimeout(() => {
      _animating = false
      setWrapperStyle({})
      setImageStyle({})
    }, duration)
  }

  const showPreview = (evt: Event): void => {
    evt.stopPropagation()
    if (show) return hidePreview(evt)

    // 防抖
    if (_animating) return
    _animating = true

    setTimeout(() => {
      _animating = false
    }, duration)

    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setWrapperStyle({
      height: rect.height,
      width: rect.width
    })
    // 先用高度优先计算
    let translateX, translateY, scale, afterSize
    if (rect.width < rect.height) { // 宽度优先
      scale = window.innerHeight / rect.height
      afterSize = {
        width: rect.width * scale,
        height: rect.height * scale
      }
      translateX = (rect.left - (window.innerWidth - afterSize.width ) / 2) / scale
      translateY = rect.top / scale
    } else { // 高度优先
      scale = window.innerWidth / rect.width
      afterSize = {
        width: rect.width * scale,
        height: rect.height * scale
      }
      translateX = rect.left / scale
      translateY = (rect.top - (window.innerHeight - afterSize.height ) / 2) / scale
    }
    setImageStyle({
      position: 'absolute',
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      transition: `transform ${duration / 1000}s cubic-bezier(.2,0,.2,1)`,
      transformOrigin: '0 0',
      transform: `scale(${scale}) translateX(${-translateX}px) translateY(${-translateY}px)`
    })
    setShow(true)
  }

  return <div style={wrapperStyle}>
    <div style={{
      transition: `background ${duration / 1000}s`,
      ...(show ? maskStyle : {})
    }} onClick={hidePreview}>
      <img
        src={src}
        style={{
          display: 'block',
          maxWidth: '100%',
          ...style,
          ...imageStyle
        }}
        className={className}
        ref={ref}
        onClick={showPreview}
      />
    </div>
  </div>
}

export default ImagePreviewer
