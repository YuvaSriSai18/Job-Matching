import React from "react";
import SignIn from "../../Components/auth/SignIn";
import UploadImage from "../../Components/UploadImage";
import { useSelector } from "react-redux";
export default function Home() {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div>
      {/* Home */}
      {!userData.email && <SignIn />}
      {userData.email && <UploadImage />}
    </div>
  );
}
