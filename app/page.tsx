'use client'

import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import Image from 'next/image';

const ShirtDesign = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(0.5);
  const [position1, setPosition1] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [position2, setPosition2] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [position3, setPosition3] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUserImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(event.target.value));
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value));
  };

  const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(Number(event.target.value));
  };

  const handleRotationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRotation(Number(event.target.value));
  };

  const handleDragStop1 = (event: any, data: any) => {
    setPosition1({ x: data.x, y: data.y });
  };

  const handleDragStop2 = (event: any, data: any) => {
    setPosition2({ x: data.x, y: data.y });
  };

  const handleDragStop3 = (event: any, data: any) => {
    setPosition3({ x: data.x, y: data.y });
  };

  const handleClickSetImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSaveImage = () => {
    if (divRef.current) {
      html2canvas(divRef.current, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: 'transparent',
      }).then(canvas => {
        const base64 = canvas.toDataURL('image/png');
        console.log('base64:', base64);
        const link = document.createElement('a');
        link.href = base64;
        link.download = 'design.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col gap-4">
        <button
          onClick={handleClickSetImage}
          className='bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md'
        >
          Select Image
        </button>

        <label>
          Width:
          <input
            type="range"
            min="50"
            max="200"
            step="1"
            value={width}
            onChange={handleWidthChange}
          />
          {width}px
        </label>
        <label>
          Height:
          <input
            type="range"
            min="50"
            max="200"
            step="1"
            value={height}
            onChange={handleHeightChange}
          />
          {height}px
        </label>
        <label>
          Opacity:
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={handleOpacityChange}
          />
          {opacity}px
        </label>
        <label>
          Rotation:
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={rotation}
            onChange={handleRotationChange}
          />
          {rotation}°
        </label>

        <button
          onClick={handleSaveImage}
          className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
        >
          Save Image
        </button>
      </div>


      <span className='w-full h-px mt-8 bg-white rounded-full' />


      <div ref={divRef} className="relative">
        <img
          src="/images/shirt2.png"
          alt="T-Shirt"
          className="w-full h-auto"
        />
        {userImage && (
          <Draggable onStop={handleDragStop1} position={position1}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image
                src={userImage}
                alt="User Image"
                width={width}
                height={height}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  opacity: opacity,
                  width: width,
                  height: height,
                }}
              />
            </div>
          </Draggable>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept=".png,.jpg,.jpeg"
        onChange={handleUserImageChange}
        style={{ display: "none" }}
      />


      <span className='w-full h-px bg-white rounded-full' />


      <div className="relative w-full mx-auto flex">
        <div className="w-full h-full" style={{
          WebkitMaskImage: `url(/images/shirt2.png)`,
          maskImage: `url(/images/shirt2.png)`,
          maskRepeat: "no-repeat",
          maskSize: 'contain',
          background: 'url(/images/shirt2.png) no-repeat',
          backgroundSize: 'contain',
        }}>
          <Draggable
            position={position2}
            onStop={handleDragStop2}
          >
            <img
              src={`${userImage}`}
              alt='a'
              className='w-full h-auto'
              style={{
                transform: `translate(${position2.x}px, ${position2.y}px)`,
                opacity: opacity,
              }}
            />
          </Draggable>
        </div>
      </div>


      <span className='w-full h-px bg-white rounded-full' />


      <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center">
        <div ref={divRef} className="relative">
          <img
            src="/images/shirt2.png"
            alt="T-Shirt"
            className="w-full h-auto object-cover"
          />
          {userImage && (
            <Draggable onStop={handleDragStop3} position={position3}>
              <div className="absolute w-full h-full top-0 left-0 -translate-x-1/2 -translate-y-1/2"
                style={{
                  clipPath: `url(${userImage})`,
                  WebkitMaskImage: `url(/images/shirt2.png)`,
                  maskImage: `url(/images/shirt2.png)`,
                  maskRepeat: "no-repeat",
                  maskSize: 'contain', //cover
                  WebkitMaskComposite: "intersect",
                  maskComposite: "intersect",
                }}
              >
                <img
                  src={userImage}
                  alt="User Image"
                  className="w-full h-full object-cover"
                  style={{
                    opacity: opacity,
                  }}
                />
              </div>
            </Draggable>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept=".png,.jpg,.jpeg"
          onChange={handleUserImageChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  )
};

export default ShirtDesign;