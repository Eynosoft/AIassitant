export {}
import { memo } from "react";
import { ChromeMessage, Sender } from "../types";

chrome.runtime.onInstalled.addListener((details) => {
    console.log('[background.js] onInstalled', details);
});

chrome.runtime.onConnect.addListener((port) => {
    console.log('[background.js] onConnect', port)
});

chrome.runtime.onStartup.addListener(() => {
    console.log('[background.js] onStartup')
});


chrome.runtime.onSuspend.addListener(() => {
    console.log('[background.js] onSuspend')
});
  
  chrome.runtime.onMessage.addListener((msg, sender,sendResponse) => {
    // First, validate the message's structure.
    console.log('called in background');
    //console.log(msg);
    
    //console.log(sender);
    //console.log(msg.operation);
    if(msg) {
      
      if(msg.operation == "read content") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        fetch('http://localhost:8080/openai/getData',{
        //  fetch('http://74.235.224.151:8080/openai/getData',{
          method: 'POST',
          body: JSON.stringify({ animal: msg.selectedContent }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }
        }) 
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
              //chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                console.log(tabs.length);
                if(tabs.length > 0) {
                  console.log(tabs[0].id);
                  chrome.tabs.sendMessage(tabs[0].id, {operation: "gpt response",setTextareaContent: data.data}, function(response) {});  
                } 
              //});
              console.log(data);
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      });
      }
      if(msg.operation === "currentweb") {
        
      }
      if(msg.operation === "allweb" && msg.enable === "1") {
        /*console.log('disable for all');
        chrome.management.get(chrome.runtime.id, function(ex) {
          console.log("Checking",ex,"-",chrome.runtime.id);
          if(!ex.enabled){
              chrome.management.setEnabled(chrome.runtime.id,false);
          }
        });*/
      }
      if(msg.operation === "allweb" && msg.enable === "") {
        /*console.log('enable for all');
        chrome.management.get(chrome.runtime.id, function(ex) {
          console.log("Checking",ex,"-",chrome.runtime.id);
          if(!ex.enabled){
              chrome.management.setEnabled(chrome.runtime.id,true);
          }
        });*/
      }
      
      console.log(msg.operation)
      if(msg.operation == "google login") {
          if (user_signed_in) {
            return;
          } else {
            chrome.identity.launchWebAuthFlow({
              url: create_oauth(),
              interactive: true
            }, function (redirect_uri) {
              if(typeof redirect_uri != 'undefined'){
                var tokenAuth = extractAccessToken(redirect_uri);
                console.log('authTokenb='+tokenAuth);
                
                chrome.runtime.sendMessage({
                  selectedContent: tokenAuth, 
                  operation: 'glogin' 
                });
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  
                  var tab = tabs[0];

                  console.log('inject_custom.js tabid='+tab.id)
                  chrome.scripting.executeScript({
                    target: {tabId : tab.id, allFrames : true},
                    files : ['inject_custom.js'],
                    
                  })
                  .then(injectionResults => {
                    //for (const {frameId, result} of injectionResults) {
                    //  console.log(`Frame ${frameId} result:`, result);
                    //}
                  });
                });
                
                
                chrome.storage.local.set({ "authToken": tokenAuth }, function(){
                  
                });
                
                //console.log(redirect_uri)
                sendResponse('success');
                
              }
            })
          }
          
      }
      if(msg.operation == "google logout") {
          chrome.identity.launchWebAuthFlow(
            { 'url': 'https://accounts.google.com/logout' },
            function(tokenUrl) {
              chrome.storage.local.set({ "authToken": '' }, function(){
                
              });
              chrome.runtime.sendMessage({
                selectedContent: '', 
                operation: 'glogout' 
              });
              console.log(getCurrentTab());
              chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var tab = tabs[0];
                console.log('injeect.js tabid='+tab.id)
                chrome.scripting.executeScript({
                  target: {tabId : tab.id, allFrames : true},
                  files : ['inject.js'],
                  
                })
                .then(injectionResults => {
                  //for (const {frameId, result} of injectionResults) {
                  //  console.log(`Frame ${frameId} result:`, result);
                  //}
                });
              });
              
                //responseCallback();
                console.log('logout');
            }
          );
        
        
      }
    }
  });
  let user_signed_in = false;

  const CLIENT_ID = "270328180147-mhtr9cd3bgjovvf9nfio017drs4bqpq1.apps.googleusercontent.com"
  const RESPONSE_TYPE = encodeURIComponent('token')
  const REDIRECT_URI = chrome.identity.getRedirectURL("oauth2");
  const STATE = encodeURIComponent('jsksf3')
  const SCOPE = encodeURIComponent('openid')
  const PROMPT = encodeURIComponent('consent')
  function create_oauth() {

    let auth_url = `https://accounts.google.com/o/oauth2/v2/auth?`
  
    var auth_params = {
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'token',
      scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    };
  
    const url = new URLSearchParams(Object.entries(auth_params));
    url.toString();
    auth_url += url;
    
    return auth_url;
  }
  function extractAccessToken(redirectUri) {
    let m = redirectUri.match(/[#?](.*)/);
    if (!m || m.length < 1)
        return null;
    let params = new URLSearchParams(m[1].split("#")[0]);
    return params.get("access_token");
  }
  function is_user_signedIn() {
    console.log(user_signed_in);
    return user_signed_in;
  }

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
  if (command === 'myCommand') {
    console.log('inside mycommand')
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { operation: "openSearchPopup"})
    })
    
  }
        
})

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
  if (command === 'myCommandClose') {
    console.log('inside myCommandClose')
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { operation: "closePopup"})
    })
    
  }
        
})
/*var blockedUrls = function () {
  var websiteList = localStorage.getItem("currentWebsite");
  console.log(websiteList);
  if (websiteList) {
      return JSON.parse(websiteList)
  } else {
      return [];
  }
}


chrome.webRequest.onBeforeRequest.addListener(
  function () {
      return {cancel: true};
  },
  {urls: blockedUrls()},
  ["blocking"]
);*/
/*
chrome.management.get(id, function(ex) {
  console.log("Checking",ex,"-",id);
  if(!ex.enabled){
      Notify("Extension reloaded!",ex.name+" was found crashed, and reloaded!");
      chrome.management.setEnabled(id,true);
  }
});*/
