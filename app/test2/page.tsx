"use client"

import React, { useState } from 'react'
import Draggable from 'react-draggable'

const ShirtDesign = () => {
    const [position, setPosition] = useState({ x: 100, y: 10 })

    const handleDragStop = (event: any, data: any) => {
        setPosition({ x: data.x, y: data.y });
    }

    return (
        <div className="relative w-full mx-auto">
            <div className="w-full h-full" style={{
                WebkitMaskImage: `url(/images/shirt2.png)`,
                maskImage: `url(/images/shirt2.png)`,
                maskRepeat: "no-repeat",
                maskSize: 'contain',
                background: 'url(/images/shirt2.png) no-repeat',
                backgroundSize: 'contain',
            }}>
                <Draggable
                    position={position}
                    onStop={handleDragStop}
                >
                    <img
                        src='https://arashaltafi.ir/arash.jpg'
                        alt='a'
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px)`
                        }}
                    />
                </Draggable>
            </div>
        </div>
    )
}

export default ShirtDesign