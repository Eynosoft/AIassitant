/**
 * Calls on page load
 */
$(window).on('load', function() {
    var authToken='';
    chrome.storage.local.get(["authToken"], function(items){
        authToken = items.authToken
        console.log('authTokeni='+authToken);
        if(typeof authToken != 'undefined') {
            console.log('insinin');
            /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if(tabs.length > 0) {
                    var tab = tabs[0];
                    chrome.scripting.executeScript({
                    target: {tabId : tab.id, allFrames : true},
                    files : ['inject_custom.js'],
                    
                    })
                    .then(injectionResults => {
                    //for (const {frameId, result} of injectionResults) {
                    //  console.log(`Frame ${frameId} result:`, result);
                    //}
                    });
                }
            });*/
            chrome.storage.local.get(["authToken"], function(items){
                authToken = items.authToken
                console.log('authTokeni='+authToken);
                if(authToken != '') {
                    var popupBeforeLogin = document.getElementsByClassName("popupBeforeLogin")[0];
                    popupBeforeLogin.style.display = "none";
            
                    var btn_signIn = document.getElementsByClassName("btn-signIn")[0];
                    btn_signIn.style.display = "none";
            
                    var btn_signOut = document.getElementsByClassName("btn-signOut")[0];
                    if(typeof btn_signOut !='undefined') {
                        btn_signOut.style.display = "block";
                    }
                    //var waitText = document.getElementsByClassName("waitCls")[0];
                    //waitText.style.display = "none";
            
                } else {
                    var popupBeforeLogin = document.getElementsByClassName("popupBeforeLogin")[0];
                    popupBeforeLogin.style.display = "block";
            
                    var btn_signIn = document.getElementsByClassName("btn-signIn")[0];
                    btn_signIn.style.display = "block";
            
                    var btn_signOut = document.getElementsByClassName("btn-signOut")[0];
                    if(typeof btn_signOut !='undefined') {
                        btn_signOut.style.display = "none";
                    }
                    
                }
            });  
            //$("#gloginbtn").hide();
            $(".popupBeforeLogin").hide();
            $(".btn-signOut").show();
            $(".btn-signIn").hide();
        } else {
            console.log('insininjkjkj');
            /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if( typeof tabs != 'undefined') {
                    var tab = tabs[0];
                    chrome.scripting.executeScript({
                    target: {tabId : tab.id, allFrames : true},
                    files : ['inject.js'],
                    
                    })
                    .then(injectionResults => {
                    //for (const {frameId, result} of injectionResults) {
                    //  console.log(`Frame ${frameId} result:`, result);
                    //}
                    });
                }
                
            });*/
            chrome.storage.local.get(["authToken"], function(items){
                authToken = items.authToken
                console.log('authTokeni='+authToken);
                if(authToken != '') {
                    var popupBeforeLogin = document.getElementsByClassName("popupBeforeLogin")[0];
                    popupBeforeLogin.style.display = "none";
            
                    var btn_signIn = document.getElementsByClassName("btn-signIn")[0];
                    btn_signIn.style.display = "none";
            
                    var btn_signOut = document.getElementsByClassName("btn-signOut")[0];
                    if(typeof btn_signOut !='undefined') {
                        btn_signOut.style.display = "block";
                    }
                   
                } else {
                    var popupBeforeLogin = document.getElementsByClassName("popupBeforeLogin")[0];
                    popupBeforeLogin.style.display = "block";
            
                    var btn_signIn = document.getElementsByClassName("btn-signIn")[0];
                    btn_signIn.style.display = "block";
            
                    var btn_signOut = document.getElementsByClassName("btn-signOut")[0];
                    if(typeof btn_signOut !='undefined') {
                        btn_signOut.style.display = "none";
                    }
                   // var waitText = document.getElementsByClassName("waitCls")[0];
                   // waitText.style.display = "none";
                }
            });
            
             
            //$("#gloginbtn").show();
            $(".popupBeforeLogin").show();
            $(".btn-signOut").hide();
            $(".btn-signIn").show();
        }
    });
    /*
    chrome.tabs.query({ active: true, currentWindow: true, }, tabs => {
        let url = tabs[0].url;
        var urls = localStorage.getItem("currentWebsite");
        if (urls) {
            var arraycontainsturtles = (urls.indexOf(url) > -1);
            if (arraycontainsturtles) {
                $('#myCheckbox').prop('checked', true);
                chrome.action.disable(tabs[0].id);
            } else {
                chrome.action.enable(tabs[0].id);
            }
        }

    });*/
    /**
     * add the popup button in th site body
     */
    $(".popUpBtnClassv1").append('<a id="showPopUpBtn" class="button" style="bottom: 10px;border-radius: 50px;padding: 8px 15px;color: #FFF;border: 0px;background-color: #04aa6d;font-weight: 400;" href="#popup2">Pop up</a>');
    /****************************************************************************************/
    /****************************************************************************************/
    /**
     * Add the div to the body content
     */
    var imgrefresh = chrome.runtime.getURL("./refresh.png");
    var imgcopy = chrome.runtime.getURL("./copy.png");
    var popupBody = '<div id="popup2" class="overlay"><div class="popup"><div class="popupBeforeLogin"></div><div class="popup-header"><div class="icon-box"><a id="popUpCloseBtn" href="#" class="close">&times;</a></div></div><div class="popup-input"><input type="text" id="openAichatgpt_text" class="" placeholder="what u need to know?"/></div><div class="popup-selected"><h3>Your selectecd :</h3><textarea name="opneaiv1PlacedContent" id="opneaiv1PlacedContent" cols="" placeholder=""></textarea></div><div class="db-popup-btn btn-signIn"><a id="gloginbtn" href="javascript:void(0)" type="button">Sign in</a></div><div style=""class="popup-text"><div class="popup-content"><h3>AI Says:<div class="chatGptloader"></div></h3><div class="text-item"><span class=""> &lt;1/1&gt; </span><a id="openAiChatGptRefresh" href="javascript:void(0)" class="material-symbols-outlined"><img src="'+imgrefresh+'"/></a><a id="openAiChatGptCopy" href="javascript:void(0)" class="material-symbols-outlined"><img src="'+imgcopy+'"/></a></div></div><div class="popup-textarea"><textarea name="openaigptResponse" id="openaigptResponse" cols="" placeholder="Type your request above and press enter"></textarea></div></div><div class="popup-footer"><div class="footer-icon-box"><span class="material-symbols-outlined">logo_dev</span></div></div></div></div>'
    $(".popUpClassv1").append(popupBody);
    //$(".popUpClassv1").load(chrome.extension.getURL("popup.html"));

})
/****************************************************************************************/
/****************************************************************************************/

/**
 * Calls on rigth side footer pop button click
 */
$(document).on('click',"#showPopUpBtn", function() {
    //$("#opneaiv1PlacedContent").val('');
    $("#popup2").css({ "opacity": 1, "visibility": "visible" });
    
    chrome.storage.local.get(["authToken"], function(items){
        var authToken = items.authToken;
        console.log('authTokenia='+items.authToken);
        if(authToken.length > 0) {
            //$("#gloginbtn").hide();
            $(".popupBeforeLogin").hide();  
            $(".btn-signIn").hide();
        } else {
            //$("#gloginbtn").show();
            $(".popupBeforeLogin").show();
            $(".btn-signIn").show();
        }
        
    });
});
/****************************************************************************************/
/****************************************************************************************/

/**
 * Calls on popup button close
 */
$(document).on('click',"#popUpCloseBtn", function() {
    $("#popup2").css({ "opacity": 0, "visibility": "hidden" });
});
/****************************************************************************************/
/****************************************************************************************/

$(document).ready(function() {
    
    /**
     * Get the text and add it to the textfield
     */
    document.addEventListener("mouseup", function(event) {
        var storeDatas = localStorage.getItem("allWebsite");
        console.log('storeDatas='+storeDatas);
        if (storeDatas) {
            return false;
        }
        console.log(event.target.id);
        if(event.target.id === "opneaiv1PlacedContent" || event.target.id === "openAichatgpt_text" || event.target.id === "openaigptResponse") {
            return true;
        }
        var selectedText = window.getSelection().toString();
        console.log('text=' + selectedText);
        if (selectedText.length > 0) {
            console.log('selectedText1=' + selectedText);
            $("#opneaiv1PlacedContent").val(selectedText);
            $("#showPopUpBtn").css({ "opacity": 1, "visibility": "visible" });
            setTimeout(function() {
                $("#showPopUpBtn").css({ "opacity": 0, "visibility": "hidden" });
            }, 5000);
            
        }


    }, false);
    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * Click to login
     */
    $(document).on('click', "#gloginbtn", function(e) {
        e.preventDefault();
        chrome.runtime.sendMessage({
            selectedContent: '',
            operation: 'google login'
        });
        return true;
    })
    /****************************************************************************************/
    /****************************************************************************************/
    
    /**
     * Search content on enter key press
     */
    document.addEventListener("keyup", function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            chrome.runtime.sendMessage({
                selectedContent: $("#openAichatgpt_text").val(),
                operation: 'read content'
            });
        }

    }, false);
    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * Reset the text field
     */
    $(document).on('click', "#openAiChatGptRefresh", function(e) {
        e.preventDefault();
        //popup-text
        document.getElementById("openaigptResponse").textContent = '';
    });
    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * Copy text
     */
    $(document).on('click', "#openAiChatGptCopy", function(e) {
        e.preventDefault();
        var copyText = document.getElementById("openaigptResponse");
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
    });
    /****************************************************************************************/
    /****************************************************************************************/
    /**
     * Check if login or not and hide/show button
     */
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        console.log('msg.selectedContent='+msg.selectedContent)
        //var authToken = chrome.storage.local.get(["authToken"], function(items){
            //return items.authToken
        //});
        
        if (msg.operation === "glogout") {
            console.log("###");
            if(msg.selectedContent === '') {
                $(".btn-signIn").show();
                $(".btn-signOut").hide();
            }
            
        }
        if (msg.operation === "glogin" || msg.operation === "google login") {
            console.log("###@");
            if(msg.selectedContent != '') {
                $(".btn-signIn").hide();
                $(".btn-signOut").show();
            }
        }
        return true;
    });
    
    /****************************************************************************************/
    /****************************************************************************************/
    /*$(document).on('change', '#weboptions1', function() {

        if (this.checked) {
            console.log('tesr1');
            $(this).prop('checked', true);
            chrome.tabs.query({ active: true, currentWindow: true, }, tabs => {
                //console.log(window.location.href)
                let url = tabs[0].url;
                console.log('url=' + url)
                var urls = localStorage.getItem("currentWebsite");
                console.log(urls);
                if (urls) {
                    var arraycontainsturtles = (urls.indexOf(url) > -1);
                    if (arraycontainsturtles) {
                        console.log('contians url=' + url);
                        $('#weboptions1').prop('checked', true);
                    }
                }

            });
        } else {
            $(this).prop('checked', false);
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                let url = tabs[0].url;
                console.log('url=' + url)
                var urls = localStorage.getItem("currentWebsite");
                if (urls) {
                    var arraycontainsturtles = (urls.indexOf(url) > -1);
                    if (arraycontainsturtles) {
                        
                            //$('#weboptions1').prop('checked', true);
                    }
                }

            });
            
        }

    });*/
});
