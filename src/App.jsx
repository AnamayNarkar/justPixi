import React from 'react';
import AmongUsEjectionAnimation from './components/AmongUsEjectionAnimation';
import DotsBackground from './components/DotsBackground';

const App = () => {
        return (
                <div className="App">
                        <div className="animationMainParent">
                                {/* <AmongUsEjectionAnimation /> */}
                                <DotsBackground />
                        </div>
                </div>
        );
};

export default App;