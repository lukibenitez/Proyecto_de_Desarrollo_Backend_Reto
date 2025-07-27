import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import type { User } from "firebase/auth";
import PostsList from "./PostsList";

interface HomeProps {
    user: User;
}

const Home: React.FC<HomeProps> = ({ user }) => {
    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <Box>
            {/* Barra superior */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={4}
                py={2}
                position="fixed"
                top={0}
                left={0}
                right={0}
                bgcolor="#222"
                zIndex={1000}
            >
                <Typography variant="h6" color="white" noWrap>
                    ¡Bienvenido, {user.displayName || user.email}!
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    sx={{ whiteSpace: "nowrap" }}
                >
                    Cerrar sesión
                </Button>
            </Box>
            {/* Contenido principal */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={12} // margen superior para que no tape la barra
            >
                <PostsList />
            </Box>
        </Box>
    );
};

export default Home;
