import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
//import { useState } from 'react'

const clientId = '567295502131-pea68t74e80ilnjimlqkpmqh8faj25fs.apps.googleusercontent.com'
//import from 'react'


function Login() {

    const [isAuth, setIsAuth] = useState(false)
    //let isAuth = false

    const onSuccess = (response) => {
        setIsAuth(true)
        console.log('[Login Success] currentUser:', response.profileObj);
        console.log("token:", response.tokenObj)
        //saving to the local storage
        if (window.localStorage) {
            localStorage.setItem("token", response.tokenObj.access_token/*just specified the */);
        }
        return


    };
    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };

    console.log("this is login auth", isAuth)



    return (
        <div>

            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                //cookiePolicy={'single_host_origin'}
                style={{ marginTop: "100px" }}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;