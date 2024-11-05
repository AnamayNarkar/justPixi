import React, { useEffect, useRef, useState } from 'react';
import { Application, Assets, Graphics, Sprite, Text } from 'pixi.js';
import Red from '../assets/amongUsAssets/amongus_red.png';

const AmongUsEjectionStyleAnimationForGithubReadme = () => {
        const myImage = Red;
        const AmongUsEjectionStyleAnimationForGithubReadmeAppRef = useRef(null);

        const phrases = [
                'Developer',
                'Machane Wala',
                'Tech Enthusiast',
        ];

        const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

        useEffect(() => {
                const initializePixi = async () => {
                        if (AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current) return;

                        const AmongUsEjectionStyleAnimationForGithubReadmeApp = new Application();
                        const parentContainer = document.querySelector('.pixi-container');
                        await AmongUsEjectionStyleAnimationForGithubReadmeApp.init({
                                background: '#000000',
                                resizeTo: parentContainer,
                                resolution: 3,
                        });
                        AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current = AmongUsEjectionStyleAnimationForGithubReadmeApp;

                        parentContainer.appendChild(AmongUsEjectionStyleAnimationForGithubReadmeApp.canvas);

                        const stars = [];
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
                                stars.forEach(star => {
                                        star.x += 2;

                                        if (star.x > parentContainer.clientWidth) {
                                                star.x = 0;
                                        }
                                });
                        });

                        await document.fonts.ready;

                        const ejectionText = new Text({
                                text: `Anamay Narkar\n${currentPhrase}`,
                                style: {
                                        fontFamily: 'Protest Strike, serif',
                                        fontSize: 50,
                                        fill: 'white',
                                        align: 'center',
                                },
                        });

                        ejectionText.anchor.set(0.5);
                        ejectionText.x = parentContainer.clientWidth / 2;
                        ejectionText.y = parentContainer.clientHeight / 2;

                        AmongUsEjectionStyleAnimationForGithubReadmeApp.stage.addChild(ejectionText);

                        const Rectangle = new Graphics();
                        Rectangle.beginFill(0xff0000); // Red color
                        Rectangle.drawRect(0, 0, parentContainer.clientWidth, parentContainer.clientHeight / 5);
                        Rectangle.endFill();

                        Rectangle.pivot.set(Rectangle.width, Rectangle.height / 2);
                        Rectangle.x = -150;
                        Rectangle.y = parentContainer.clientHeight / 2;

                        ejectionText.mask = Rectangle;

                        AmongUsEjectionStyleAnimationForGithubReadmeApp.stage.addChild(Rectangle);

                        const LoadedTexture = await Assets.load({
                                src: myImage,
                                loader: 'loadTexture',
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
                                        AmongUsEjectionStyleAnimationForGithubReadmeApp.stage.removeChild(mySprite)
                                }

                                if (Rectangle.x > parentContainer.clientWidth) {
                                        hasRectangleReachedCenter = true;
                                }
                        });

                        const handleResize = () => {
                                // Resize the application and reposition elements
                                const newWidth = parentContainer.clientWidth;
                                const newHeight = parentContainer.clientHeight;

                                AmongUsEjectionStyleAnimationForGithubReadmeApp.renderer.resize(newWidth, newHeight);

                                ejectionText.x = newWidth / 2;
                                ejectionText.y = newHeight / 2;

                                Rectangle.width = newWidth; // Adjust rectangle width relative to new width
                                Rectangle.height = newHeight / 5;   // Keep the rectangle height consistent
                                Rectangle.y = newHeight / 2;        // Keep rectangle vertically centered
                        };

                        window.addEventListener('resize', handleResize);

                        // Initial call to set up correct dimensions
                        handleResize();
                };

                initializePixi();

                return () => {
                        if (AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current != null) {
                                AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current.destroy(true, { children: true, texture: true, baseTexture: true });
                                AmongUsEjectionStyleAnimationForGithubReadmeAppRef.current = null;
                        }

                        window.removeEventListener('resize', handleResize);
                };
        }, []);

        return (
                <div className='pixi-container' style={{
                        width: '100%', height: '100%', margin: 0, padding: 0
                }}>
                </div>
        );
};

export default AmongUsEjectionStyleAnimationForGithubReadme;
