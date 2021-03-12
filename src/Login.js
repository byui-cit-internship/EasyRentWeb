import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = '567295502131-pea68t74e80ilnjimlqkpmqh8faj25fs.apps.googleusercontent.com'

function Login() {

    const onSuccess = (response) => {
        console.log('[Login Success] currentUser:', response.profileObj);
        console.log("token:", response.tokenObj)

    };

    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                //cookiePolicy={'single_host_origin'}
                style={{ marginTop: "100px" }}
                isSignedIn={true} />
        </div>
    );
}

export default Login;