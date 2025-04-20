import PropTypes from 'prop-types';
import { memo } from 'react';

const Card = ({ post, isActive, onClick }) => {
  const handleReadMore = (e) => {
    e.stopPropagation();
    onClick(post.id)
  };

  return (
    <div
      className={`card ${isActive ? 'active' : ''} !cursor-default`}
      tabIndex={0}
    >
      <div className="card-content">
        <h3 className="card-title">{post.title}</h3>
        <p className={`card-body ${!isActive ? 'collapsed' : ''}`}>
          {post.body}
        </p>
      </div>
      <div className="card-footer">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
          <button 
            className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-300 cursor-pointer"
            onClick={handleReadMore}
            aria-label="Read more about this post"
          >
            {isActive ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default memo(Card); 