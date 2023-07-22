'use client'
import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Image from "next/image";
import { AuthContext } from "@/auth/AuthProvider";
import { auth, signInAsGuest } from "@/utils/firebase";

const LoginPage = () => {
  const { setCurrentUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const userCredential = await signInAsGuest();
      setCurrentUser(userCredential.user);
    } catch (error) {
      console.error("Error signing in anonymously: ", error);
    }
  };

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      {
        provider: "google.com",
        scopes: ["openid", "email", "profile"],
        customParameters: {
          prompt: "select_account",
        },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <main>
      <div className="flex items-center min-h-screen p-6 bg-white dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-xl dark:bg-black">
          <div className="flex flex-col overflow-y-auto md:flex-row w-full md:w-auto">
            <div className="h-96 md:h-auto md:w-1/2">
              <Image
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src="/login.jpg"
                alt="image"
                height={800}
                width={426}
                priority
              />
            </div>
            <main className="flex items-center justify-center p-6 w-full md:w-1/2">
              <div className="text-gray-700 dark:text-gray-200">
             
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-3 md:mb-4 tracking-tighter leading-2">
                  GetFit
                </h1>
                <h2 className="text-lg text-center font-medium mb-8 leading-3">
                  Start your fitness journey today!
                </h2>

                <div className="pt-2 md:pt-0">
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                </div>
                <div className="flex justify-center items-center">
                  <button 
                    className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-anonymous firebaseui-id-idp-button" 
                    onClick={handleLogin}
                    style={{backgroundColor: 'black'}}
                  >
                    <span className="firebaseui-idp-icon-wrapper">
                      <img
                        className="firebaseui-idp-icon"
                        alt=""
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/anonymous.png"
                      />
                    </span>
                    <span className="firebaseui-idp-text firebaseui-idp-text-long">
                      Continue as Guest
                    </span>
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
