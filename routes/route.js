import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";
import { uploadImage } from "../controller/image-controller.js";
import upload from "../utils/upload.js";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import { newComments, getComments, deleteComment } from "../controller/comments-controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.post("/file/upload", upload.single("file"), uploadImage); //upload is the middleware. here we have to uplaod the single file hence use ".single"
router.post("/create", authenticateToken, createPost);
router.get("/posts", authenticateToken, getAllPosts);
router.get("/post/:id", authenticateToken, getPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

router.post("/comment/new", authenticateToken, newComments);
router.get("/comments/:id", authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;
