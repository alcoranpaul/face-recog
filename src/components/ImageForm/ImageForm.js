import React from "react";
import "./ImageForm.css"
function ImageForm({ onInputChange, onButtonSubmit }) {
    return (
        <div>
            <p className="f3 white">
                {`This magic brain will detect faces in your photos`}
            </p>
            <div className="center">
                <div className="center form pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="tex"
                        onChange={onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                        onClick={onButtonSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageForm;