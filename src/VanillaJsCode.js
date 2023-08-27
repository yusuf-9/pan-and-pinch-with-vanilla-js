import { useEffect, useRef, useState } from "react";
import Image from "./thumb.png";

const VanillJsCode = () => {
    const [imageX, setImageX] = useState(0);
    const [imageY, setImageY] = useState(0);
    const [imageScale, setImageScale] = useState(1);

    const [startStyles, setStartStyles] = useState({ x: 0, y: 0, imgX: 0, imgY: 0, imgScale: 1, diagonal: 0, originOffetX: 0, originOffsetY: 0 });
    const imageRef = useRef();

    const handleTouchStart = (e) => {
        const touches = [...e.targetTouches];
        // pan
        if(touches.length === 1){

            setStartStyles(prev => ({
                ...prev,
                x: touches[0].clientX
                , y: touches[0].clientY, imgX: imageX, imgY: imageY
            }))
        } else if(touches.length === 2) {
            const initialDistance = Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY);
            

            const {x, y, width, height} = e.target.getBoundingClientRect()
            const pinchriginX = ((touches[0].pageX + touches[1].pageX) / 2);
            const pinchriginY = ((touches[0].pageY + touches[1].pageY) / 2);
            const imageCenterX = x + (width / 2);
            const imageCenterY = y + (height / 2);
            const xOriginDiff = pinchriginX - imageCenterX;
            const yOriginDiff = pinchriginY - imageCenterY;


            setStartStyles(prev => ({
                ...prev,
                diagonal: initialDistance,
                imgScale: imageScale,
                originOffetX: xOriginDiff,
                originOffsetY: yOriginDiff
            }));
        }
    }

    const handleTouchMove = (e) => {
        const touches = [...e.targetTouches];

        // pan
        if(touches.length === 1){
            const xOffset = touches[0].clientX - startStyles.x;
            const yOffset = touches[0].clientY - startStyles.y;
            setImageX(startStyles.imgX + xOffset)
            setImageY(startStyles.imgY + yOffset)
        } else if(touches.length === 2) {
            const newDistance = Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY);
            const difference = newDistance - startStyles.diagonal;
            const scale = Math.max(startStyles.imgScale + (difference / 100), 0.5)
            setImageScale(scale)
            // setImageX(startStyles.imgX + (startStyles.originOffetX * (difference / 100)))
            // setImageY(startStyles.imgY + (startStyles.originOffetY * (difference / 100)))
        }

    }


    return (
        <div className="image-container">
            <img
                ref={imageRef}
                style={{
                    height: "100%",
                    width: "auto",
                    position: "relative",
                    maxWidth: 'none',
                    maxHeight: 'none',
                    left: `${imageX}px`,
                    top: `${imageY}px`,
                    transform: `scale(${imageScale})`,
                    touchAction: 'none',
                }}
                src={Image}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            />
        </div>
    );
}

export default VanillJsCode