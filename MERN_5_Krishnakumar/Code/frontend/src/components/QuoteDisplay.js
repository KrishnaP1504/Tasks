import React from 'react';
import './QuoteDisplay.css';

const QuoteDisplay = ({ quote }) => {
  if (!quote) return null;

  return (
    <div className="quote-display">
      <div className="quote-content">
        <p className="quote-text">"{quote.content}"</p>
        <p className="quote-author">— {quote.author}</p>
        {quote.tags && quote.tags.length > 0 && (
          <div className="quote-tags">
            {quote.tags.map((tag, index) => (
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

export default QuoteDisplay;

