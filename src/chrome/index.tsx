/*global chrome*/
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ChromeMessage, Sender } from "../types";
import '../css/index.css';

export const ChromeIndex = () => {

    const [url, setUrl] = useState<string>('');
    const [login,setLogin] = useState<string>('');
    const [showLogin, setShowLogin] = React.useState(true)
    const [showLogout, setShowLogout] = React.useState(false)
    const [responseFromContent, setResponseFromContent] = useState<string>('');
    const [currentWebsite, setCurrentWebsite] = useState(false);
    const [allWebsite, setAllWebsite] = useState(false);

    useEffect(() => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            console.log('url1='+url)
            var urls = localStorage.getItem("currentWebsite");
            console.log('urls='+urls)
            if(urls) {
                var arraycontainsturtles = (urls.indexOf(url) > -1);
                if(arraycontainsturtles) {
                    setCurrentWebsite(true);
                    
                } else {
                    setCurrentWebsite(false);
                }
            }
            console.log(urls);
            
        });
        
    },[]);

    const handleOptions = (event) => {
        setCurrentWebsite(!currentWebsite);
        console.log('currentWebsite='+currentWebsite)
        const target = event.target;
        var targetValue = event.target.value
        console.log('handleOptions')
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            console.log('tabsurl='+tabs[0].url)
            let url = tabs[0].url;
            console.log(target.checked);
            console.log(targetValue);
            if(target.checked && targetValue === "current") {
                
                var websiteList = localStorage.getItem("currentWebsite");
                if(websiteList) {
                    var stored_datas = JSON.parse(websiteList);
                    stored_datas.push(url);
                    const uniqueStoredDatas = new Set(stored_datas);
                    const uniqueData = [...uniqueStoredDatas];
                    /*stored_datas.filter((item, 
                        index) => stored_datas.indexOf(item) === index);*/
                    //console.log(url);
                    //console.log('currentWebsite');
                    console.log(uniqueData);
                    localStorage.setItem("currentWebsite",JSON.stringify(uniqueData));
                    

                } else {
                    var datas = [];
                    datas.push(url);
                    //console.log('currentWebsite');
                    //console.log(datas);
                    localStorage.setItem("currentWebsite",JSON.stringify(datas));
                }
                chrome.runtime.sendMessage({
                    selectedContent: '', 
                    operation: 'currentweb' 
                });
            } else {
                
                    var websiteList = localStorage.getItem("currentWebsite");
                    console.log('in else');
                    if(websiteList) {
                        
                        var stored_datas = JSON.parse(websiteList);
                        console.log('stored_datas='+stored_datas);
                        const index = stored_datas.indexOf(url);
                        const x = stored_datas.splice(index, 1);
                        console.log(stored_datas);
                        localStorage.setItem("currentWebsite",JSON.stringify(stored_datas));
                        console.log('x='+x);
                        console.log(localStorage.getItem("currentWebsite"));
                    }
                
            }
            
            // use `url` here inside the callback because it's asynchronous!
        });
        
                
        //sendTestMessage();
    }
    const handleOptionsAll = (event) => {
        const target = event.target;
        var targetValue = event.target.value
        if(target.checked && targetValue === "all") {
            console.log('disable all');
            //alert('Disable for all websites.');
            localStorage.setItem("allWebsite", "1");
            setAllWebsite(true);
            chrome.runtime.sendMessage({
                enable: '1', 
                operation: 'allweb' 
            });  
        } else {
            setAllWebsite(false);
            localStorage.setItem("allWebsite", "");  
            chrome.runtime.sendMessage({
                enable: '', 
                operation: 'allweb' 
            });  
        }
    }

    const handleGoogleLogin = () => {
        chrome.runtime.sendMessage({
            selectedContent: '', 
            operation: 'google login' 
        });
        
    }
    const handleGoogleLogOut = () => {
        var waitText = document.getElementsByClassName("waitCls")[0];
        waitText.style.display = "block";
        chrome.runtime.sendMessage({
            selectedContent: '', 
            operation: 'google logout' 
        });
    }   
    /**
     * Send message to the content script 
     */
    const sendTestMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "Hello from React",
        }
        
        const queryInfo: chrome.tabs.QueryInfo = {
            active: true,
            currentWindow: true
        };

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const currentTabId = tabs[0].id;
            
            chrome.tabs.sendMessage(
                currentTabId,
                message,
                (response) => {
                    setResponseFromContent(response);
                    console.log(response);
                    console.log('called');
                }
            )
        })
    }
    return(
        <div id="popup1" className="openAI_popup_wrap">
            <div className="exten-popup">
                <div className="db-popup">
                    <h5 className=""><span className="material-symbols-outlined"></span>OpenAi</h5>
                </div>
                <div className="db-toggle">
                    <div className="db-toggle-pannel">
                            <label className="switch">
                                <input type="checkbox" checked={currentWebsite} id="weboptions1" name="weboptions" value="current" onChange={handleOptions}/>
                                <span className="slider round"></span>
                            </label>
                            <p>Disable for current website</p>
                    </div>
                    <div className="db-toggle-pannel">
                        <label className="switch">
                            <input type="checkbox" id="weboptions2" checked={allWebsite} name="weboptions" value="all" onChange={handleOptionsAll}/>
                            <span className="slider round"></span>
                        </label>
                        <p>Disable for all website</p>
                </div>

                <div className="db-btn">
                    <div className="db-popup-btn btn-signIn">
                        <a href="" type="button" onClick={handleGoogleLogin}>Sign in</a>
                    </div>
                    
                    <div className="db-popup-btn btn-signOut">
                        <a href="" type="button" onClick={handleGoogleLogOut}>sign out</a>
                    </div>
                    <span className="waitCls">Please Wait...</span>
                </div>

                <div className="db-footer">
                    <span>powerd by Dev</span>
                </div>
            
            </div>
        </div>
    </div>
    );
}

render(<ChromeIndex/>,document.getElementById("settingsfrm"));
