import React from "react";
import Tilt from 'react-parallax-tilt'
import brain from './brainLogo.png'
import './Logo.css'

function Logo() {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 100, width: 150 }}>
                <div>
                    <img src={brain} alt="Brain" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;