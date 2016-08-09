import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field, added extra fields
const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
