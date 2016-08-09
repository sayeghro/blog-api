import Post from '../models/post_model';


// clean multiple posts
const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};

// clean a single post
const cleanPost = (post) => {
  return { id: post._id, title: post.title, tags: post.tags, content: post.content };
};

// for creating posts
export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.save()
      .then(result => {
        res.json({ message: 'Post created!' });
      })
      .catch(error => {
        res.json({ error });
      });
};

// get all posts
export const getPosts = (req, res) => {
  Post.find().sort({ createdAt: -1 })
      .then(posts => {
        res.json(cleanPosts(posts));
      })
      .catch(error => {
        res.json({ error });
      });
};

// get one post
export const getPost = (req, res) => {
  Post.findById({ _id: req.params.id })
      .then(post => {
        console.log(post);
        res.json(cleanPost(post));
      })
      .catch(error => {
        res.json({ error });
      });
};

// delete one post
export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id })
      .then(() => {
        res.json({ message: 'Post deleted!' });
      })
      .catch(error => {
        res.json({ error });
      });
};


export const updatePost = (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title,
                          tags: req.body.tags, content: req.body.content })
      .then(() => {
        res.json({ message: 'Post updated!' });
      })
      .catch(error => {
        res.json({ error });
      });
};
