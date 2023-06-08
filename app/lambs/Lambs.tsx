"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Position {
  fade: boolean;
  x: number;
  y: number;
  scaleX: number;
  image: string;
}

export default function Lambs() {
  const [positions, setPositions] = useState<Position[]>([
    { x: 350, y: 610, scaleX: 1, fade: false, image: "/sheep_1.png" },
  ]);
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    let maxX: number = 1700; // 이미지의 가로 크기
    let minY: number = 600; // 이미지의 최소 세로 크기
    let maxY: number = 850; // 이미지의 최대 세로 크기

    if (window.innerWidth <= 500) {
      maxX = 350;
      minY = 610;
      maxY = 900;
    }

    const generateRandomPosition = () => {
      const randomX: number = Math.floor(Math.random() * maxX);
      const randomY: number =
        Math.floor(Math.random() * (maxY - minY + 1)) + minY;

      const randomScaleX: number = Math.random() < 0.5 ? 1 : -1;
      const randomImage: string =
        Math.random() < 0.5 ? "/sheep_1.png" : "/sheep_2.png";

      setPositions(prevPositions => [
        ...prevPositions,
        {
          x: randomX,
          y: randomY,
          scaleX: randomScaleX,
          fade: false,
          image: randomImage,
        },
      ]);

      setCount(prevCount => prevCount + 1);
    };

    const interval = setInterval(() => {
      generateRandomPosition();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setPositions(prevPositions => {
        const updatedPositions = [...prevPositions];
        updatedPositions[prevPositions.length - 1].fade = true;
        return updatedPositions;
      });
    }, 100);

    if (count > 1) {
      playAudio();
    }

    return () => clearTimeout(fadeTimeout);
  }, [count]);

  const playAudio = () => {
    const audio = new Audio("/sheep.mp3");
    audio.play();
  };

  useEffect(() => {
    simulateClick();
  }, []);

  const simulateClick = (): void => {
    const lambElement: Element | null =
      document.querySelector(".lambs-div-1 > div");
    if (lambElement) {
      (lambElement as HTMLElement).click();
    }
  };

  return (
    <>
      <div className="lambs-div-1" style={{ width: "100vw", height: "100vh" }}>
        <Image
          src="/field.jpg"
          layout="responsive"
          width={1}
          height={1}
          alt="Picture of the field"
        />
        <div className={"lambs-fade-in-box"}>
          {count > 1 ? `There are ${count} lambs` : `There is a lamb`}
        </div>
        {positions.map((position, index) => (
          <div
            className="lambs"
            key={index}
            style={{
              width: "10vw",
              height: "10vh",
              position: "absolute",
              top: position.y,
              left: position.x,
              transition: "opacity 1s ease-in-out",
              transform: `scaleX(${position.scaleX})`,
              opacity: position.fade ? 1 : 0,
              cursor: "pointer",
            }}
            onClick={() => {
              playAudio();
            }}
          >
            <div>
              <Image
                src={position.image}
                width={1}
                height={1}
                layout="responsive"
                alt="Picture of the lamb"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
