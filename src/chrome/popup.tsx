import React, { useEffect, useState} from "react";
import { render } from "react-dom";
import "../css/popup.css";

const Popup = () => {
    const [popup, setPopup] = useState<string>(true);
    
    const showPopup = () => {
        setPopup(!popup);
        chrome.runtime.sendMessage("Hello from the popup!");
    }
    return(
        <>
            <a className="button" href="#popup1" onClick={showPopup}> Pop up</a>
            <div id="popup1" className="overlay">
                <div classNameName="popup">
                    <div classNameName="popup-header">
                        <div classNameName="icon-box">
                        {popup ? "Disable the snow 🥶" : "Let it snow! ❄️"}
                            <a href="#" classNameName="material-symbols-outlined">bookmark</a>
                            <a href="#" className="material-symbols-outlined">dehaze</a>
                            <a href="#" className="close">&times;</a>
                        </div>
                    </div>

                    <div className="popup-input">
                        <input type="text" className="" placeholder="what u need to know?"/>
                        <div className="popup-selected-btn">
                            <a href="" className="dark">usadeeee<span className="btn-add"> + </span></a>
                            <a href="" className="dark">usadeeee<span className="btn-add"> + </span></a>
                            <a href="" className="dark">usadeeee<span className="btn-add"> + </span></a>
                        </div>
                    </div>

                    <div className="popup-selected">
                    <p>your selectecd :</p>
                    <textarea name="" id="" cols="" placeholder=""></textarea>
                    </div>

                    <div className="popup-text">
                        <div className="popup-content">
                            <p>Merlin Says:</p>
                            <div className="text-item">
                                <span className=""> &lt;1/1&gt; </span>
                                <a href="" className="material-symbols-outlined">refresh</a>
                                <a href="" className="material-symbols-outlined">content_copy</a>
                            </div>
                        </div>
                        <div className="popup-textarea">
                            <textarea name="" id="" cols="" placeholder="Type your request above and press enter"></textarea>
                        </div>
                    </div>
                    
                    <div className="popup-footer">
                        <div className="footer-icon-box">
                            <span className="material-symbols-outlined">logo_dev</span>
                            <span className="free">Free</span>
                            <span className="usg-text"> Usage: 0 / 11 per day</span>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}

render(<Popup/>,document.getElementById("react-target"));