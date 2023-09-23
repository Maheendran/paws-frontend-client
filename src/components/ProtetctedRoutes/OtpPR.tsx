import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { currentUserDetail } from "../../Redux/Slice/AuthSlice";
import { Error } from "../error/Error";
import { ErrorBoundary } from "react-error-boundary";

const OtpPR = (props: any) => {
  const { Component } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(currentUserDetail());
    if (!auth.otpVerified && !auth.token) {
    return  navigate("/choose-profile");
    }
    if (!auth.token) {
      <Outlet />;
    } else {
      if (auth?.choosePerson === "PetOwner") {
        navigate("/pet-owner");
      } else {
        if (auth?.choosePerson === "Clinic") {
          navigate("/clinic");
        } 
      }
    }
  }, []);

  return (
    <>
       <ErrorBoundary  FallbackComponent={Error} >
       <Component />
       </ErrorBoundary>

        
  
    </>
  );
};

export default OtpPR;
