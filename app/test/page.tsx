'use client'

import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

const ShirtDesign = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(0.5);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
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

  const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(Number(event.target.value));
  };

  const handleDragStop = (_: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
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
      });
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center">
      <div className="flex flex-col gap-4">
        <button
          onClick={handleClickSetImage}
          className='bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md'
        >
          Select Image
        </button>

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


        <button
          onClick={handleSaveImage}
          className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
        >
          Save Image
        </button>
      </div>

      <div ref={divRef} className="relative">
        <img
          src="/images/shirt2.png"
          alt="T-Shirt"
          className="w-full h-auto object-cover"
        />
        {userImage && (
          <Draggable onStop={handleDragStop} position={position}>
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
  )
};

export default ShirtDesign;