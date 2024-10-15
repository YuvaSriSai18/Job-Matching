import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
} from "@mui/material";
import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, provider } from "../../Utils/firebase";
import { setUserData } from "../../reducers/auth/authSlice";
import { setResumeData } from "../../reducers/Resume/ResumeSlice";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../apis/index";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [tabValue, setTabValue] = useState(0); // 0: Sign In, 1: Sign Up
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData); // Fetch user data from Redux

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tabValue === 0) {
      // Handle Sign-In
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          if (user.emailVerified) {
            const response = await api.getUserByEmail(email);
            if (response?.data?.user) {
              dispatch(setUserData(response.data.user));
              fetchResume(email); // Fetch resume after sign-in
            } else {
              console.error("User data could not be retrieved.");
            }
          } else {
            alert("Email not verified. Please verify your email.");
            await sendEmailVerification(user);
          }
        })
        .catch((error) => console.error("Sign-in error:", error.message));
    } else {
      // Handle Sign-Up
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(user).then(() => {
            alert("Verification email sent.");
            const userData = {
              displayName: name,
              email: email,
              photoUrl: "https://static.thenounproject.com/png/5593059-200.png",
            };
            api.postUserData(userData);
            dispatch(setUserData(userData)); // Save user data
          });
        })
        .catch((error) => console.error("Sign-up error:", error.message));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const userData = {
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL || "https://static.thenounproject.com/png/5593059-200.png",
      };
      api.postUserData(userData);
      dispatch(setUserData(user));

      const response = await api.getUserByEmail(user.email);
      if (response?.data?.user) {
        dispatch(setUserData(response.data.user));
        fetchResume(user.email); // Fetch resume after Google login
      } else {
        console.error("User data could not be retrieved.");
      }
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  const handleTabChange = (event, newValue) => {
    event.preventDefault();
    setTabValue(newValue);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };

  const fetchResume = async (email) => {
    try {
      const resume = await api.getUserResume(email);
      console.log(resume.data);
      dispatch(setResumeData(resume.data.resume)); // Dispatch resume data to Redux store
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundPosition: "center",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(224, 242, 241, 0.8)",
          padding: "2rem",
          borderRadius: "8px",
          backdropFilter: "blur(10px)",
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
          {tabValue === 1 && (
            <TextField
              label="Full Name"
              type="text"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ marginBottom: "1rem" }}
            />
          )}
          <TextField
            label="Email ID"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
          {tabValue === 1 && (
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ marginBottom: "1rem" }}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginBottom: "1rem" }}
          >
            {tabValue === 0 ? "Log In" : "Sign Up"}
          </Button>
        </form>

        <Grid container spacing={2} maxWidth="sm">
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleLogin}
              startIcon={
                <img
                  src="https://cdn-icons-png.flaticon.com/256/2702/2702602.png"
                  alt="Google"
                  style={{ width: 20, height: 20 }}
                />
              }
            >
              Sign {tabValue === 0 ? "in" : "up"} with Google
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignIn;
