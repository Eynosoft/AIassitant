import React, { useEffect, useState} from "react";
import { render } from "react-dom";
import { ChromeMessage, Sender } from "../types";
import '../oauth2/lib/oauth2.js';

export const Options = () => {
    const [url, setUrl] = useState<string>('');
    const [responseFromContent, setResponseFromContent] = useState<string>('');

    useEffect(() => {
        var googleAuth = new OAuth2('google', {
            client_id: '16493581954-7rjvml02ltp6rupvm5dq1itgpe9agfqb.apps.googleusercontent.com',
            client_secret: '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',
            api_scope: 'https://www.googleapis.com/auth/tasks'
          });
          googleAuth.authorize(function() {
            // Ready for action, can now make requests with
            googleAuth.getAccessToken()
          });
        
    },[]);
    
    
    /**
     * Send message to the content script 
     */
    return(
        <div id="fly">
            <button id="google">
                Grant Google Access
            </button>
            
        </div>
    );
}

render(<Options/>,document.getElementById("optionBtn"))