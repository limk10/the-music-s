import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import "./styles.css";

import imageIllustration from "~/assets/images/3256897.svg";
import { isAuthenticated } from "~/services/auth";

function Auth() {
  const history = useHistory();
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) history.push("/home");
  }, []);

  const handleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="u-flex u-justify-center bg-red-500">
      <div
        className="u-flex u-center u-justify-space-around 
        u-items-center bg-white box-auth"
      >
        <div className="flex-1 u-center image-section">
          <img className="image" src={imageIllustration} />
        </div>
        <div className="flex-1">
          <div className="mx-5 pb-1">
            <h4 className="mb-6 text-primary">_The Music S</h4>
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
