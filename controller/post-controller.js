import Post from "../models/post.js";

export const createPost = async (request, response) => {
  try {
    const post = await new Post(request.body);
    post.save();
    response.status(200).json("Post saved successfully");
  } catch (err) {
    response.status(500).json(err);
  }
};

export const getAllPosts = async (request, response) => {
  let category = request.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category });
      console.log("Hello", category);
    } else {
      posts = await Post.find();
    }
    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const getPost = async (request, response) => {
  try {
    let post = await Post.findById(request.params.id);
    return response.status(200).json(post);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const updatePost = async (request, response) => {
  try {
    let post = await Post.findById(request.params.id);

    if (!post) {
      return response.status(404).json({ msg: "Post not Found" });
    }

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body }); // "$set" is the method to update. there are several other method do same.

    return response.status(200).json({ msg: "Post Updated Successfully" });
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const deletePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
        
    await post.deleteOne()
    return response.status(200).json({ msg: "Post Deleted successfully" });

  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};
