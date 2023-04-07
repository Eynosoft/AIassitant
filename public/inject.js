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

