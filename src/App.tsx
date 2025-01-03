import React from "react";
import AmongUsEjectionAnimation from "./components/AmongUsEjectionAnimation.tsx";
import DotsBackground from "./components/DotsBackground.tsx";
import AmongUsEjectionStyleAnimationForGithubReadme from "./components/AmongUsEjectionStyleAnimationForGithubReadme.js";
import EyeTracking from "./components/EyeTracking.tsx";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="animationMainParent">
        {/* <AmongUsEjectionAnimation /> */}
        <AmongUsEjectionStyleAnimationForGithubReadme />
        {/* <DotsBackground /> */}
        {/* <EyeTracking /> */}
      </div>
    </div>
  );
};

export default App;
