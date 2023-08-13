import React from 'react';
import LeftNavMenu from '../components/LeftNavMenu';
import iconImage from "/assets/icons/128x128.png";

function Home() {
  return (
    <div>
      <div className="flex-container">
        <LeftNavMenu currentPage="Home" />
        <div className="App-Body">
          <div className="Result">
            <div className="flex-container-vertical">
              <div className='flex-item text-center'>
                <img src={iconImage} />
                <h3 className='welcome-text-style'>Welcome to Muerta Toolbox Lite</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
