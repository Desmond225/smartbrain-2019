import React from 'react';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className="f3">
                {'This magic brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className="center">
                <div className="center pa4 br3 shadow-5">
                    <input className="form f4 pa2 center" type="text" onChange={onInputChange}/>
                    <button 
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue"
                        onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm