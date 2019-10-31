import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> 
                <img alt="logo" src={brain} style={{paddingTop: '5px'}}/></div>
            </Tilt>
        </div>
    )
}

export default Logo