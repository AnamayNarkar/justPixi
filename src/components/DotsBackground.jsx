import { Application, Graphics } from 'pixi.js';
import React, { useEffect, useRef } from 'react';

const DotsBackground = () => {
        const gradientStyles = {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
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

        `
        };

        const containerStyles = {
                position: 'relative',
                width: '100%',
                height: '100%',
                margin: 0,
                padding: 0,
                overflow: 'hidden'
        };

        const dotsBackgroundAppRef = useRef(null);
        const mousePosition = { x: 0, y: 0 };
        let isMouseInsideParentContainer = true;

        useEffect(() => {
                async function initializePixi() {
                        if (dotsBackgroundAppRef.current) return;

                        const dotsBackgroundApp = new Application();
                        dotsBackgroundAppRef.current = dotsBackgroundApp;

                        const parentContainer = document.querySelector('.pixi-container');
                        await dotsBackgroundApp.init({
                                background: '#000000',
                                resizeTo: parentContainer,
                                resolution: 4,
                                autoDensity: true,
                        });

                        parentContainer.appendChild(dotsBackgroundApp.view);

                        const dots = [];
                        let currentXCordinate = 0;
                        let currentYCordinate = parentContainer.clientHeight;

                        while (currentYCordinate > 0) {
                                while (currentXCordinate < parentContainer.clientWidth) {
                                        const dot = new Graphics().beginFill(0x848282).drawCircle(0, 0, 1.2).endFill();

                                        dot.x = currentXCordinate;
                                        dot.y = currentYCordinate;

                                        dotsBackgroundApp.stage.addChild(dot);
                                        dots.push(dot);

                                        currentXCordinate += 15;
                                }

                                currentXCordinate = 0;
                                currentYCordinate -= 15;
                        }

                        const parentContainerForMouseEventsSinceGradientIsOnTopOfCanvas = document.querySelector('.pixi-container-top-level-gradient');

                        parentContainerForMouseEventsSinceGradientIsOnTopOfCanvas.addEventListener('mouseleave', () => {
                                isMouseInsideParentContainer = false;
                        });

                        parentContainerForMouseEventsSinceGradientIsOnTopOfCanvas.addEventListener('mouseenter', () => {
                                isMouseInsideParentContainer = true;
                        });

                        parentContainerForMouseEventsSinceGradientIsOnTopOfCanvas.addEventListener('mousemove', (event) => {
                                mousePosition.x = event.clientX;
                                mousePosition.y = event.clientY;
                        });

                        dotsBackgroundApp.ticker.add(() => {
                                if (!isMouseInsideParentContainer) {
                                        dots.forEach(dot => {
                                                dot.tint = 0x848282;
                                        });
                                        return;
                                }

                                dots.forEach(dot => {
                                        const distance = Math.sqrt(
                                                Math.pow(dot.x - mousePosition.x, 2) + Math.pow(dot.y - mousePosition.y, 2)
                                        );

                                        if (distance < 100) {
                                                dot.tint = 0x00dbb3;
                                                dot.scale = 1.4;
                                        } else if (distance > 100 && distance < 175) {
                                                dot.tint = 0x09BE9E;
                                                dot.scale = 1.2;
                                        } else {
                                                dot.tint = 0x848282;
                                                dot.scale = 1;
                                        }
                                });
                        });
                }

                initializePixi();
        }, []);

        return (
                <div style={containerStyles}>
                        <div className="pixi-container-top-level-gradient" style={gradientStyles}></div>
                        <div className='pixi-container' style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}></div>
                </div>
        );
};

export default DotsBackground;
