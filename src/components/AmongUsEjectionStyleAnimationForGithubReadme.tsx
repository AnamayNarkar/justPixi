import React, { useEffect, useRef, useState } from "react";
import { Application, Assets, Graphics, Sprite, Text } from "pixi.js";
import Red from "../assets/amongUsAssets/amongus_red.png";

const AmongUsEjectionStyleAnimationForGithubReadme: React.FC = () => {
  const myImage = Red;
  const AmongUsEjectionStyleAnimationForGithubReadmeAppRef =
    useRef<Application | null>(null);
  const handleResizeRef = useRef<(() => void) | null>(null);

  const phrases: string[] = ["Developer", "Tech Enthusiast"];
  const [currentPhrase, setCurrentPhrase] = useState<string>(phrases[0]);

  useEffect(() => {
    let ejectionText: Text;
    let Rectangle: Graphics;

    const handleResize = () => {
      const parentContainer = document.querySelector(
        ".pixi-container"
      ) as HTMLElement;
      if (
        !AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current ||
        !ejectionText ||
        !Rectangle
      )
        return;

      const newWidth = parentContainer.clientWidth;
      const newHeight = parentContainer.clientHeight;

      AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current.renderer.resize(
        newWidth,
        newHeight
      );

      ejectionText.x = newWidth / 2;
      ejectionText.y = newHeight / 2;

      Rectangle.width = newWidth;
      Rectangle.height = newHeight / 5;
      Rectangle.y = newHeight / 2;
    };

    handleResizeRef.current = handleResize;

    const initializePixi = async () => {
      if (AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current) return;

      const AmongUsEjectionStyleAnimationForGithubReadmeApp = new Application();
      const parentContainer = document.querySelector(
        ".pixi-container"
      ) as HTMLElement;
      await AmongUsEjectionStyleAnimationForGithubReadmeApp.init({
        background: "#000000",
        resizeTo: parentContainer,
        resolution: 3,
      });
      AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current =
        AmongUsEjectionStyleAnimationForGithubReadmeApp;

      parentContainer.appendChild(
        AmongUsEjectionStyleAnimationForGithubReadmeApp.canvas
      );

      const stars: Graphics[] = [];
      const starCount = 25;

      for (let i = 0; i < starCount; i++) {
        const star = new Graphics();
        star.beginFill(0xffffff);
        star.drawCircle(0, 0, 3);
        star.endFill();

        star.x = Math.random() * parentContainer.clientWidth;
        star.y = Math.random() * parentContainer.clientHeight;

        AmongUsEjectionStyleAnimationForGithubReadmeApp.stage.addChild(star);
        stars.push(star);
      }

      AmongUsEjectionStyleAnimationForGithubReadmeApp.ticker.add(() => {
        stars.forEach((star) => {
          star.x += 2;
          if (star.x > parentContainer.clientWidth) {
            star.x = 0;
          }
        });
      });

      await document.fonts.ready;

      ejectionText = new Text({
        text: `Anamay Narkar\n${currentPhrase}`,
        style: {
          fontFamily: "Protest Strike, serif",
          fontSize: 50,
          fill: "white",
          align: "center",
        },
      });

      ejectionText.anchor.set(0.5);
      ejectionText.x = parentContainer.clientWidth / 2;
      ejectionText.y = parentContainer.clientHeight / 2;

      AmongUsEjectionStyleAnimationForGithubReadmeApp.stage.addChild(
        ejectionText
      );

      Rectangle = new Graphics();
      Rectangle.beginFill(0xff0000);
      Rectangle.drawRect(
        0,
        0,
        parentContainer.clientWidth,
        parentContainer.clientHeight / 5
      );
      Rectangle.endFill();

      Rectangle.pivot.set(Rectangle.width, Rectangle.height / 2);
      Rectangle.x = -150;
      Rectangle.y = parentContainer.clientHeight / 2;

      ejectionText.mask = Rectangle;

      AmongUsEjectionStyleAnimationForGithubReadmeApp.stage.addChild(Rectangle);

      const LoadedTexture = await Assets.load({
        src: myImage,
        loader: "loadTexture",
      });

      const sprite = new Sprite(LoadedTexture);
      let mySprite = sprite;

      mySprite.anchor.set(0.5);
      mySprite.height = 170;
      mySprite.width = 140;
      mySprite.x = -150;
      mySprite.y = parentContainer.clientHeight / 2;

      AmongUsEjectionStyleAnimationForGithubReadmeApp.stage.addChild(mySprite);

      let hasRectangleReachedCenter = false;
      let hasSpriteReachedEnd = false;

      AmongUsEjectionStyleAnimationForGithubReadmeApp.ticker.add(() => {
        if (!hasSpriteReachedEnd) {
          mySprite.x += 5;
          mySprite.rotation += 0.035;
        }

        if (!hasRectangleReachedCenter) {
          Rectangle.x += 5;
        }

        if (mySprite.x > parentContainer.clientWidth + 150) {
          hasSpriteReachedEnd = true;
          AmongUsEjectionStyleAnimationForGithubReadmeApp.stage.removeChild(
            mySprite
          );
        }

        if (Rectangle.x > parentContainer.clientWidth) {
          hasRectangleReachedCenter = true;
        }
      });

      window.addEventListener("resize", handleResize);
      handleResize();
    };

    initializePixi();

    return () => {
      if (AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current) {
        AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current.destroy(
          true,
          {
            children: true,
            texture: true,
          }
        );
        AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current = null;
      }

      if (handleResizeRef.current) {
        window.removeEventListener("resize", handleResizeRef.current);
      }
    };
  }, [currentPhrase]);

  return (
    <div
      className="pixi-container"
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
      }}
    ></div>
  );
};

export default AmongUsEjectionStyleAnimationForGithubReadme;
