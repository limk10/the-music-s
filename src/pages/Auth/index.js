import React, { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import "./styles.css";

import imageIllustration from "~/assets/image/g10.svg";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="u-flex u-justify-center bg-red-500">
      <div className="u-flex u-center u-justify-space-around u-items-center bg-white box-auth">
        <div className="flex-1 u-center">
          <img className="image" src={imageIllustration} />
        </div>
        <div className="flex-1">
          <div className="mx-5 pb-1">
            <h4
              className="mb-6 text-primary
"
            >
              &gt; The Music S
            </h4>
            {isSignUp ? (
              <>
                <SignUp />
                <p className="u-center">
                  Já possuí uma conta?&nbsp;
                  <a
                    className="text-primary"
                    onClick={() => handleSignUp()}
                    href="#!"
                  >
                    Logue-se
                  </a>
                </p>
              </>
            ) : (
              <>
                <SignIn />
                <p className="u-center">
                  Não possui conta?&nbsp;
                  <a
                    className="text-primary"
                    onClick={() => handleSignUp()}
                    href="#!"
                  >
                    Registre-se
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
