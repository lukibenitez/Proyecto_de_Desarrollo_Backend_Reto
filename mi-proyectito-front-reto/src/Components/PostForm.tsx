import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";

interface Post {
    id?: number;
    title: string;
    body: string;
}

interface PostFormProps {
    onPostCreated: (post: Post) => void;
    post?: Post;
    onPostUpdated?: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({
    onPostCreated,
    post,
    onPostUpdated,
}) => {
    const [title, setTitle] = useState(post?.title || "");
    const [body, setBody] = useState(post?.body || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
        }
    }, [post]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!title.trim() || !body.trim()) {
            setError("Todos los campos son obligatorios.");
            setLoading(false);
            return;
        }

        try {
            if (post && onPostUpdated) {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...post, title, body }),
                    }
                );
                const data = await response.json();
                onPostUpdated(data);
                setSuccess(true);
            } else {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title, body }),
                    }
                );
                const data = await response.json();
                onPostCreated(data);
                setTitle("");
                setBody("");
                setSuccess(true);
            }
        } catch {
            setError("Error al guardar la publicación.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Typography variant="h6" mb={2}>
                {post ? "Editar publicación" : "Crear nueva publicación"}
            </Typography>
            <TextField
                label="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Contenido"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
                sx={{ mt: 2 }}
            >
                {loading
                    ? post
                        ? "Actualizando..."
                        : "Creando..."
                    : post
                    ? "Actualizar"
                    : "Crear"}
            </Button>
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    ¡Publicación creada!
                </Alert>
            )}
        </form>
    );
};

export default PostForm;
