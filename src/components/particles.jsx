import React, { useEffect, useRef } from 'react';
import { Application, Assets, Graphics, Sprite } from 'pixi.js';
import Anamay from '../assets/anamay.png';
import amongUsBlue from '../assets/amongus_blue.png'
import amongUsCyan from '../assets/amongus_cyan.png'
import amongUsGreen from '../assets/amongus_green.png'
import amongUsLime from '../assets/amongus_lime.png'
import amongUsOrange from '../assets/amongus_orange.png'
import amongUsPink from '../assets/amongus_pink.png'
import amongUsRed from '../assets/amongus_red.png'
import amongUsWhite from '../assets/amongus_white.png'

const Particles = () => {
        const amongUsImages = [
                amongUsBlue,
                amongUsCyan,
                amongUsGreen,
                amongUsLime,
                amongUsOrange,
                amongUsPink,
                amongUsRed,
                amongUsWhite,
                Anamay
        ];
        const appRef = useRef(null);

        function getRandomIndex(length) {
                return Math.floor(Math.random() * length);
        }

        function getRandomValue(height) {
                return (Math.random() * height)
        }

        useEffect(() => {
                console.log("running useEffect");

                const initializePixi = async () => {

                        if (appRef.current) return;

                        const app = new Application();
                        const parentContainer = document.querySelector('.pixi-container');
                        await app.init({ background: '#000000', resizeTo: parentContainer });
                        appRef.current = app;

                        parentContainer.appendChild(app.canvas);

                        const stars = [];
                        const starCount = 25;

                        for (let i = 0; i < starCount; i++) {
                                const star = new Graphics();
                                star.beginFill(0xffffff);
                                star.drawCircle(0, 0, 3);
                                star.endFill();

                                star.x = Math.random() * parentContainer.clientWidth;
                                star.y = Math.random() * parentContainer.clientHeight;

                                app.stage.addChild(star);
                                stars.push(star);
                        }

                        app.ticker.add(() => {
                                stars.forEach(star => {
                                        star.x += 2;

                                        if (star.x > parentContainer.clientWidth) {
                                                star.x = 0;
                                                // star.y = Math.random() * parentContainer.clientHeight;
                                        }
                                });
                        });

                        const LoadedTextures = [];
                        for (let i = 0; i < amongUsImages.length; i++) {
                                const texture = await Assets.load({
                                        src: amongUsImages[i],
                                        loader: 'loadTextures'
                                });
                                LoadedTextures.push(texture);
                        }

                        const sprites = [];
                        for (let i = 0; i < LoadedTextures.length; i++) {
                                const sprite = new Sprite(LoadedTextures[i]);
                                sprite.anchor.set(0.5);
                                sprite.x = 0;
                                sprite.y = parentContainer.clientHeight / 2;
                                if (amongUsImages[i] === Anamay) {
                                        sprite.height = 250;
                                        sprite.width = 250;
                                } else {
                                        sprite.height = 125;
                                        sprite.width = 100;
                                }
                                sprites.push(sprite);
                        }

                        let randomAmongUsSprite = sprites[getRandomIndex(sprites.length)];
                        app.stage.addChild(randomAmongUsSprite);

                        app.ticker.add(() => {
                                randomAmongUsSprite.x += 3.4;
                                randomAmongUsSprite.rotation += 0.04;

                                if (randomAmongUsSprite.x > parentContainer.clientWidth + 50) {

                                        console.log(1);

                                        app.ticker.stop();

                                        app.stage.removeChild(randomAmongUsSprite);

                                        randomAmongUsSprite = sprites[getRandomIndex(sprites.length)];
                                        randomAmongUsSprite.x = 0;
                                        randomAmongUsSprite.y = getRandomValue(parentContainer.clientHeight);
                                        app.stage.addChild(randomAmongUsSprite);

                                        app.ticker.start();
                                }
                        });
                };

                initializePixi();

                return () => {
                        if (appRef.current != null) {
                                appRef.current.destroy(true, { children: true, texture: true, baseTexture: true });
                                appRef.current = null;
                        }
                };
        }, []);

        return (
                <div className='pixi-container' style={{
                        width: '100%', height: '100%', margin: 0, padding: 0, overflowX: 'hidden', overflowY: 'hidden'
                }}>
                </div>
        );
};

export default Particles;
