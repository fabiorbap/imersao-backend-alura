import { getAllPosts, createNewPost, updatePost } from "../models/postModel.js";
import fs from "fs";
import generateDescriptionWithGemini from "../services/geminiService.js"

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).send(posts);
}

export async function postNewPost(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await createNewPost(newPost)
        res.status(200).json(createdPost)
    } catch(e) {
        console.error(e.message)
        res.status(500).json({"error": "Request failed"})
    }
}

export async function uploadImage(req, res) {
    const novoPost = {
        description: "",
        url: req.file.originalname,
        alt: ""
    };

    try {
        const createdPost = await createNewPost(novoPost);
        const updatedImage = `uploads/${createdPost.insertedId}.png`
        fs.renameSync(req.file.path, updatedImage)
        res.status(200).json(createdPost);  
    } catch(e) {
        console.error(e.message);
        res.status(500).json({"error": "Request failed"})
    }
}

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const imgUrl = `http://localhost:3000/${id}.png`
    const post = {
        description: req.body.description,
        url: imgUrl,
        alt: req.body.alt
    };
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const description = await generateDescriptionWithGemini(imgBuffer)
        post.description = description
        const createdPost = await updatePost(id, post)
        res.status(200).json(createdPost)
    } catch(e) {
        console.error(e.message)
        res.status(500).json({"error": "Request failed"})
    }
}