import React from 'react';
import axios from 'axios';
import './PostItem.css';

const PostItem = ({ post, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/quotes/posts/${post._id}`);
        onDelete();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="post-item">
      <div className="post-header">
        <span className="post-date">{formatDate(post.createdAt)}</span>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
      <div className="post-content">
        <p className="post-text">"{post.content}"</p>
        <p className="post-author">— {post.author}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;

