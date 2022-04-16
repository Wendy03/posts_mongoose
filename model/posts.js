const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '貼文姓名未填寫'],
    },
    avatar: {
      type: String,
      default:
        'blob:https://xd.adobe.com/43d7e2d1-ea5e-41cd-acc7-09b9106c77c6',
    },
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    image: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    likes: {
      type: Number,
      default: 0,
    },
    follow: [{ type: String }],
  },
  { versionKey: false }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
