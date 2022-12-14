import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {Google, Facebook} from '@mui/icons-material';
import {signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../functions/firebase/config";
import * as Yup from 'yup';
import React, {useEffect} from "react";
import {useAuthUser} from "next-firebase-auth";
import {useRouter} from "next/router";

const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();
const signInWithGoogle = () => {
  signInWithPopup(auth, gProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
const signInWithFacebook = () => {
  signInWithPopup(auth, fProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    // ...
  });
}


export default function Home() {
  const currentUser = useAuthUser()
  const router = useRouter()
  useEffect(() => {
    if (currentUser.firebaseUser) {
      router.push("/protectedRoute");
    } else if (currentUser.firebaseUser == null) {
      router.push("/");
    }
  }, [currentUser]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
      password: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
    }),
    onSubmit: (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          })
    }
  })
  return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to Next.js!
          </h1>
          <div className={styles.grid}>
            <TextField
                error={Boolean(formik.errors.email)}
                fullWidth
                helperText={formik.errors.email}
                label="Email"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="filled"
            />
            <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="filled"
            />
            <Button
                variant="contained"
                sx={{
                  marginTop: "30px"
                }}
                onClick={formik.handleSubmit}
            >
              Log in
            </Button>
          </div>
          <Button
              variant="contained"
              sx={{
                marginTop: "30px",
                minWidth: '300px'
              }}
              onClick={signInWithGoogle}
          >
            <Google sx={{m: 1}}/>
            Log in With Google
          </Button>
          <Button
              variant="contained"
              sx={{
                marginTop: "30px",
                minWidth: '300px'
              }}
              onClick={signInWithFacebook}
          >
            <Facebook sx={{m: 1}}/>
            Log in With Facebook
          </Button>
        </main>

        <footer className={styles.footer}>
          <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
          </a>
        </footer>
      </div>
  )
}
