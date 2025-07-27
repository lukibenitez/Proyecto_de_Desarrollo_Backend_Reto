import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    List,
    ListItem,
    Paper,
    Button,
    Card,
    CardContent,
    CardActions,
} from "@mui/material";
import PostForm from "./PostForm";
import PostDialog from "./PostDialog"; // ⬅️ Lo vas a crear abajo en el mismo archivo o importar si lo separás

interface Post {
    id?: number;
    title: string;
    body: string;
}

const PostsList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [openCreate, setOpenCreate] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar publicaciones");
                setLoading(false);
            });
    }, []);

    const handlePostCreated = (newPost: Post) => {
        setPosts([newPost, ...posts]);
        setOpenCreate(false);
    };

    const handleEditClick = (post: Post) => {
        setEditingPost(post);
    };

    const handlePostUpdated = (updatedPost: Post) => {
        setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
        setEditingPost(null);
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "DELETE",
            });
            setPosts(posts.filter((p) => p.id !== id));
        } catch {
            alert("Error al eliminar la publicación");
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box mt={4} width="100%" maxWidth="md" mx="auto">
            {/* Botón para crear publicación */}
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenCreate(true)}
                >
                    Crear publicación
                </Button>
            </Box>
            <Typography variant="h5" mb={2} align="center">
                Publicaciones
            </Typography>
            <Paper>
                <List>
                    {posts.map((post) => (
                        <ListItem key={post.id} divider disableGutters>
                            <Card sx={{ width: "100%" }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {post.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {post.body}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEditClick(post)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </CardActions>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Dialog para crear publicación */}
            <PostDialog
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                title="Crear nueva publicación"
            >
                <PostForm onPostCreated={handlePostCreated} />
            </PostDialog>

            {/* Dialog para edición */}
            <PostDialog
                open={!!editingPost}
                onClose={() => setEditingPost(null)}
                title="Editar publicación"
            >
                {editingPost && (
                    <PostForm
                        post={editingPost}
                        onPostCreated={() => {}} // No se usa en edición
                        onPostUpdated={handlePostUpdated}
                    />
                )}
            </PostDialog>
        </Box>
    );
};

export default PostsList;
