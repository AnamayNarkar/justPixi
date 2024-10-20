import React from 'react';
import Particles from './components/particles';
const App = () => {
        return (
                <div
                        className="App"
                        style={{
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                margin: 0,
                                padding: 0,
                        }}
                >
                        <Particles />
                </div>
        );
};

export default App;