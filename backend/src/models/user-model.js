
//mongodb schema for user data, using mongoose
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 1,
            maxlength: 30,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    })

export const User = mysql2.model('User', userSchema);
