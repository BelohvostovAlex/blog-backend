import {
  PostModel
} from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const {
      title,
      text,
      imageUrl,
      tags
    } = req.body;
    const user = req.userId;

    const post = await PostModel.create({
      title,
      text,
      imageUrl,
      tags,
      user,
    });

    res.json(post);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Cant create a post",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    // const posts = await PostModel.find().populate('user').exec()

    res.json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Cant get posts",
    });
  }
};

export const getOnePost = (req, res) => {
  try {
    const id = req.params.id;

    PostModel.findOneAndUpdate({
        _id: id,
      }, {
        $inc: {
          viewsCount: 1,
        },
      }, {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(error);

          return res.status(500).json({
            message: "Cant find a post",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Post not found",
          });
        }

        res.json(doc);
      }
    );

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Cant find a post",
    });
  }
};

export const removePost = async (req, res) => {
  try {
    const id = req.params.id
    PostModel.findByIdAndDelete({
      _id: id
    }, (err, doc) => {
      if (err) {
        console.log(error);

        return res.status(500).json({
          message: "Cant delete a post",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Cant find and delete a post",
        });
      }

      res.json({
        success: true
      })
    })

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Cant find a post",
    });
  }
}