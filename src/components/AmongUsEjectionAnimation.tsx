import React, { useEffect, useRef } from "react";
import { Application, Assets, Graphics, Sprite, Texture } from "pixi.js";
import amongUsBlue from "../assets/amongUsAssets/amongus_blue.png";
import amongUsCyan from "../assets/amongUsAssets/amongus_cyan.png";
import amongUsGreen from "../assets/amongUsAssets/amongus_green.png";
import amongUsLime from "../assets/amongUsAssets/amongus_lime.png";
import amongUsOrange from "../assets/amongUsAssets/amongus_orange.png";
import amongUsPink from "../assets/amongUsAssets/amongus_pink.png";
import amongUsRed from "../assets/amongUsAssets/amongus_red.png";
import amongUsWhite from "../assets/amongUsAssets/amongus_white.png";

const AmongUsEjectionAnimation: React.FC = () => {
  const amongUsImages: string[] = [
    amongUsBlue,
    amongUsCyan,
    amongUsGreen,
    amongUsLime,
    amongUsOrange,
    amongUsPink,
    amongUsRed,
    amongUsWhite,
  ];
  const amongUsAppRef = useRef<Application | null>(null);

  function getRandomIndex(length: number): number {
    return Math.floor(Math.random() * length);
  }

  function getRandomValue(height: number): number {
    return Math.random() * height;
  }

  useEffect(() => {
    console.log("running useEffect");

    const initializePixi = async (): Promise<void> => {
      if (amongUsAppRef.current) return;

      const amongUsApp = new Application();
      const parentContainer = document.querySelector(
        ".pixi-container"
      ) as HTMLDivElement;
      if (!parentContainer) return;

      await amongUsApp.init({
        background: "#000000",
        resizeTo: parentContainer,
      });
      amongUsAppRef.current = amongUsApp;

      parentContainer.appendChild(amongUsApp.view);

      const stars: Graphics[] = [];
      const starCount = 25;

      for (let i = 0; i < starCount; i++) {
        const star = new Graphics();
        star.beginFill(0xffffff);
        star.drawCircle(0, 0, 3);
        star.endFill();

        star.x = Math.random() * parentContainer.clientWidth;
        star.y = Math.random() * parentContainer.clientHeight;

        amongUsApp.stage.addChild(star);
        stars.push(star);
      }

      amongUsApp.ticker.add(() => {
        stars.forEach((star) => {
          star.x += 2;

          if (star.x > parentContainer.clientWidth) {
            star.x = 0;
          }
        });
      });

      const LoadedTextures: Texture[] = [];
      for (let i = 0; i < amongUsImages.length; i++) {
        const texture = await Assets.load<Texture>({
          src: amongUsImages[i],
          loader: "loadTextures",
        });
        LoadedTextures.push(texture);
      }

      const sprites: Sprite[] = [];
      for (let i = 0; i < LoadedTextures.length; i++) {
        const sprite = new Sprite(LoadedTextures[i]);
        sprite.height = 125;
        sprite.width = 100;
        sprite.anchor.set(0.5);
        sprite.x = -30;
        sprite.y = parentContainer.clientHeight / 2;

        sprites.push(sprite);
      }

      let randomAmongUsSprite = sprites[getRandomIndex(sprites.length)];
      amongUsApp.stage.addChild(randomAmongUsSprite);

      amongUsApp.ticker.add(() => {
        randomAmongUsSprite.x += 3.4;
        randomAmongUsSprite.rotation += 0.035;

        if (randomAmongUsSprite.x > parentContainer.clientWidth + 50) {
          console.log(1);

          amongUsApp.ticker.stop();

          amongUsApp.stage.removeChild(randomAmongUsSprite);

          randomAmongUsSprite = sprites[getRandomIndex(sprites.length)];
          randomAmongUsSprite.x = -30;
          randomAmongUsSprite.y = getRandomValue(parentContainer.clientHeight);
          amongUsApp.stage.addChild(randomAmongUsSprite);

          amongUsApp.ticker.start();
        }
      });
    };

    initializePixi();

    return () => {
      if (amongUsAppRef.current != null) {
        amongUsAppRef.current.destroy(true, {
          children: true,
          texture: true,
        });
        amongUsAppRef.current = null;
      }
    };
  }, []);

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

export default AmongUsEjectionAnimation;
