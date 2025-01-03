import { Application, Graphics, ColorMatrixFilter } from "pixi.js";
import React, { useEffect, useRef } from "react";

interface StyleProps {
  position: "absolute" | "relative";
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  zIndex?: number;
  width: string;
  height: string;
  margin: number;
  padding: number;
  overflow?: string;
  background?: string;
}

interface MousePosition {
  x: number;
  y: number;
}

const DotsBackground: React.FC = () => {
  const gradientStyles: StyleProps = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    background: `
            linear-gradient(to bottom, 
                rgba(0, 0, 0, 0.8) 0%,  
                rgba(0, 0, 0, 0.5) 5%,  
                rgba(0, 0, 0, 0) 10%
            ),
            linear-gradient(to top, 
                rgba(0, 0, 0, 0.8) 0%,  
                rgba(0, 0, 0, 0.5) 5%,  
                rgba(0, 0, 0, 0) 10%
            ),
            linear-gradient(to right, 
                rgba(0, 0, 0, 0.8) 0%,  
                rgba(0, 0, 0, 0.5) 2.5%,  
                rgba(0, 0, 0, 0) 10%
            ),
            linear-gradient(to left, 
                rgba(0, 0, 0, 0.8) 0%,  
                rgba(0, 0, 0, 0.5) 2.5%,  
                rgba(0, 0, 0, 0) 10%
            )
        `,
  };

  const containerStyles: StyleProps = {
    position: "relative",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  };

  const dotsBackgroundAppRef = useRef<Application | null>(null);
  const mousePosition = useRef<MousePosition>({ x: 0, y: 0 });
  const isMouseInsideParentContainer = useRef<boolean>(true);

  useEffect(() => {
    const handleMouseLeave = (): void => {
      isMouseInsideParentContainer.current = false;
    };

    const handleMouseEnter = (): void => {
      isMouseInsideParentContainer.current = true;
    };

    const handleMouseMove = (event: MouseEvent): void => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    async function initializePixi() {
      if (dotsBackgroundAppRef.current) return;

      const dotsBackgroundApp = new Application();
      const parentContainer = document.querySelector(
        ".pixi-container"
      ) as HTMLDivElement;
      if (!parentContainer) return;

      await dotsBackgroundApp.init({
        background: "#000000",
        resizeTo: parentContainer,
        resolution: 4,
        autoDensity: true,
      });

      dotsBackgroundAppRef.current = dotsBackgroundApp;
      parentContainer.appendChild(dotsBackgroundApp.view);

      const dots: Graphics[] = [];
      let currentXCordinate = 0;
      let currentYCordinate = parentContainer.clientHeight;

      while (currentYCordinate > 0) {
        while (currentXCordinate < parentContainer.clientWidth) {
          const dot = new Graphics()
            .beginFill(0x848282)
            .drawCircle(0, 0, 1.2)
            .endFill();

          dot.x = currentXCordinate;
          dot.y = currentYCordinate;

          dotsBackgroundApp.stage.addChild(dot);
          dots.push(dot);

          currentXCordinate += 15;
        }
        currentXCordinate = 0;
        currentYCordinate -= 15;
      }

      const parentContainerForMouseEvents = document.querySelector(
        ".pixi-container-top-level-gradient"
      ) as HTMLDivElement;
      if (!parentContainerForMouseEvents) return;

      parentContainerForMouseEvents.addEventListener(
        "mouseleave",
        handleMouseLeave
      );
      parentContainerForMouseEvents.addEventListener(
        "mouseenter",
        handleMouseEnter
      );
      parentContainerForMouseEvents.addEventListener(
        "mousemove",
        handleMouseMove
      );

      dotsBackgroundApp.ticker.add(() => {
        if (!isMouseInsideParentContainer.current) {
          dots.forEach((dot) => {
            dot.tint = 0x848282;
          });
          return;
        }

        dots.forEach((dot) => {
          const distance = Math.sqrt(
            Math.pow(dot.x - mousePosition.current.x, 2) +
              Math.pow(dot.y - mousePosition.current.y, 2)
          );

          if (distance < 125) {
            dot.tint = 0x00dbb3;
            dot.scale.set(1.4);
          } else if (distance > 125 && distance < 150) {
            dot.tint = 0x09be9e;
            dot.scale.set(1.2);
          } else {
            dot.tint = 0x848282;
            dot.scale.set(1);
          }
        });
      });
    }

    initializePixi();

    return () => {
      const parentContainerForMouseEvents = document.querySelector(
        ".pixi-container-top-level-gradient"
      ) as HTMLDivElement;

      if (parentContainerForMouseEvents) {
        parentContainerForMouseEvents.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
        parentContainerForMouseEvents.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        parentContainerForMouseEvents.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      }

      if (dotsBackgroundAppRef.current) {
        dotsBackgroundAppRef.current.destroy(true);
        dotsBackgroundAppRef.current = null;
      }
    };
  }, []);

  return (
    <div style={containerStyles}>
      <div
        className="pixi-container-top-level-gradient"
        style={gradientStyles}
      ></div>
      <div
        className="pixi-container"
        style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}
      ></div>
    </div>
  );
};

export default DotsBackground;
