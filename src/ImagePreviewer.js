"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const maskStyle = {
    position: 'fixed',
    zIndex: 99,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,.7)'
};
let _animating = false;
const ImagePreviewer = ({ src = '', style = {}, duration = 300, padding = 20, className }) => {
    const [show, setShow] = react_1.default.useState(false);
    const [wrapperStyle, setWrapperStyle] = react_1.default.useState({});
    const [imageStyle, setImageStyle] = react_1.default.useState({});
    const [animationFinished, setAnimationFinished] = react_1.default.useState(false);
    const ref = react_1.default.createRef();
    const hidePreview = (evt) => {
        evt.stopPropagation();
        if (_animating)
            return;
        _animating = true;
        setImageStyle({
            ...imageStyle,
            width: wrapperStyle.width,
            height: wrapperStyle.height,
            transform: 'scale(1) translateX(0) translateY(0)'
        });
        setShow(false);
        setTimeout(() => {
            _animating = false;
            setWrapperStyle({});
            setImageStyle({});
        }, duration);
    };
    const showPreview = (evt) => {
        evt.stopPropagation();
        if (show)
            return hidePreview(evt);
        // 防抖
        if (_animating)
            return;
        _animating = true;
        setTimeout(() => {
            _animating = false;
        }, duration);
        if (!ref.current)
            return;
        const rect = ref.current.getBoundingClientRect();
        setWrapperStyle({
            height: rect.height,
            width: rect.width
        });
        // 先用高度优先计算
        let translateX, translateY, scale, afterSize;
        if (rect.width < rect.height) { // 宽度优先
            scale = window.innerHeight / rect.height;
            afterSize = {
                width: rect.width * scale,
                height: rect.height * scale
            };
            translateX = (rect.left - (window.innerWidth - afterSize.width) / 2) / scale;
            translateY = rect.top / scale;
        }
        else { // 高度优先
            scale = window.innerWidth / rect.width;
            afterSize = {
                width: rect.width * scale,
                height: rect.height * scale
            };
            translateX = rect.left / scale;
            translateY = (rect.top - (window.innerHeight - afterSize.height) / 2) / scale;
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
        });
        setShow(true);
    };
    return react_1.default.createElement("div", { style: wrapperStyle },
        react_1.default.createElement("div", { style: {
                transition: `background ${duration / 1000}s`,
                ...(show ? maskStyle : {})
            }, onClick: hidePreview },
            react_1.default.createElement("img", { src: src, style: {
                    display: 'block',
                    maxWidth: '100%',
                    ...style,
                    ...imageStyle
                }, className: className, ref: ref, onClick: showPreview })));
};
exports.default = ImagePreviewer;