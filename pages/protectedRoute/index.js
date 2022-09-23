import {Button} from "@mui/material";
import { signOut } from "firebase/auth";
import {auth} from "../../functions/firebase/config";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useAuthUser} from "next-firebase-auth";
const Application = () => {
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    const currentUser = useAuthUser()
    const router = useRouter()
    useEffect(() => {
        if (currentUser.firebaseUser) {
            router.push("/protectedRoute");
        } else if (currentUser.firebaseUser == null) {
            router.push("/");
        }
    }, [currentUser]);
    return(
        <>
            some text
            <Button onClick={logOut}>Sign Out</Button>
        </>
    )
}

export default Application
