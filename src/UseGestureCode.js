import { useEffect, useRef, useState } from "react";
import { useDrag, useGesture } from "@use-gesture/react";
import Image from "./img.jpg";

const UseGestureCode = () => {
    const [imageX, setImageX] = useState(0);
  const [imageY, setImageY] = useState(0);

  const imageRef = useRef()

  useGesture({
    onDrag: ({offset: [dx, dy]}) => {
      setImageX(dx)
      setImageY(dy)
    }
  }, {
    target: imageRef
  })

 

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
            left: imageX,
            top: imageY,
            touchAction: 'none'
          }}
          src={Image}
        />
      </div>
  );
}

export default UseGestureCode