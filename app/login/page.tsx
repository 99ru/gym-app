"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "@/auth/AuthProvider";
import { signInAsGuest, signInWithGoogle } from "@/utils/firebase";

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

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();
      setCurrentUser(userCredential.user);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

 const googleStyles = {
    backgroundColor: "white",
    color: "black",
    height: "50px",
    padding: "0 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    marginBottom: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const guestStyles = {
    backgroundColor: "black",
    color: "white",
    height: "50px",
    padding: "0 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    marginBottom: "10px",
  };
 
  const googleIconStyles = {
    height: "20px",
    width: "20px",
    marginRight: "10px",
  };

  const anonymousIconStyles = {
    height: "26px", 
    width: "26px", 
    marginRight: "10px",
  };

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-white dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-xl dark:bg-black">
          <div className="flex flex-col overflow-y-auto md:flex-row w-full md:w-auto">
            <div className="h-96 md:h-auto md:w-1/2">
              <Image
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src="/login2.webp"
                alt="image"
                height={400}
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

                <div
                  className="pt-2 md:pt-0"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button onClick={handleGoogleLogin} style={googleStyles}>
                    <Image
                      style={googleIconStyles}
                      alt=""
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      width={40}
                      height={40}
                    />
                    <span>Sign in with Google</span>
                  </button>
                  <button onClick={handleLogin} style={guestStyles}>
                    <Image
                      style={anonymousIconStyles}
                      alt=""
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/anonymous.png"
                      width={40}
                      height={40}
                    />
                    <span>Continue as Guest</span>
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
