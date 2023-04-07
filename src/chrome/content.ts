import { memo } from "react";
import { ChromeMessage, Sender } from "../types";
import '../oauth2/lib/oauth2.js';
import $ from 'jquery';
import '../js/custom.js';
import '../css/content.css';
type MessageResponse = (response?: any) => void

const addPopUpButton = () => {
    const body = document.getElementsByTagName("body");
    const popUpBtnDiv = document.createElement("div");
    popUpBtnDiv.className = "popUpBtnClassv1";
    popUpBtnDiv.id = "popopenaiv1";
    //document.body.appendChild(popUpBtnDiv);
    console.info("cate=",body[0].getAttribute('data-title'));
    if(body[0].getAttribute('data-title') == "index.html") {
        return;
    }
    body[0]?.prepend(popUpBtnDiv);
    
    const popUpDiv = document.createElement("div");
    popUpDiv.className = "popUpClassv1";
    popUpDiv.id = "contentopenaiv1";
    //document.body.appendChild(popUpDiv);
    body[0]?.prepend(popUpDiv);
    
}

const main = () => {
    addPopUpButton();
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
        console.log("Message has been recieved, msg is " + msg.setTextareaContent);
        if(msg.operation === "gpt response"){
            var textMessage = msg.setTextareaContent;
            console.log(textMessage.replace(/^\s+|\s+$/gm,''))
            var returnData = textMessage.replace(/^\s+|\s+$/gm,'');
            console.log('returnData='+returnData);
            document.getElementById("openaigptResponse").textContent = textMessage.replace(/^\s+|\s+$/gm,'');
        }
        if(msg.operation === "openSearchPopup"){
            console.log('inside opensearch');
            document.getElementById("showPopUpBtn").click()
        }
        if(msg.operation === "closePopup"){
            console.log('inside closePopup');
            document.getElementById("popUpCloseBtn").click()
        }
        return true;
    });
}

main();


