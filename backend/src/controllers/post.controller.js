import { Post } from "../models/posts.model.js";  // Make sure this path is correct

// create a new post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const post = await Post.create({ name, description, age });
        res.status(201).json({ 
            message: "Post created successfully", 
            postId: post.insertId 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();  // Fixed: changed variable name
        res.status(200).json(posts);  // Fixed: sending posts instead of undefined variable
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }    
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, age } = req.body;
        
        // Basic validation to check if all fields are provided
        if (!name && !description && !age) {
            return res.status(400).json({ message: "At least one field is required to update" });
        }
        
        // Check if post exists
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        // Use your custom update method (not findByIdAndUpdate)
        const result = await Post.update(id, { name, description, age });
        
        // Get the updated post
        const updatedPost = await Post.findById(id);
        
        res.status(200).json({ 
            message: "Post updated successfully", 
            post: updatedPost,
            affectedRows: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        }); 
    }
};
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if post exists
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        // Use your custom delete method
        const result = await Post.delete(id);
        
        res.status(200).json({ 
            message: "Post deleted successfully",
            affectedRows: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
export { createPost, getPosts, updatePost, deletePost };