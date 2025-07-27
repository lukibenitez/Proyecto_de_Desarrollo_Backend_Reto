import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Login: React.FC = () => {
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch {
            alert("Error al iniciar sesión con Google");
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
            <Typography variant="h4" mb={3}>
                Iniciar sesión
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoogleLogin}
            >
                Iniciar sesión con Google
            </Button>
        </Box>
    );
};

export default Login;