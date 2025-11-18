import React from 'react';
import PostItem from './PostItem';
import './PostList.css';

const PostList = ({ posts, onDelete }) => {
  if (posts.length === 0) {
    return (
      <div className="empty-posts">
        <p>No posts yet. Create your first post by fetching a quote!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default PostList;

