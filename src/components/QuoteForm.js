import React, { useState } from 'react';

const QuoteForm = ({ onSubmit }) => {
    const [quote, setQuote] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setQuote(event.target.value);
        setError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!quote.trim()) {
            setError('請輸入一段激勵人心的文字');
            return;
        }
        onSubmit(quote);
        setQuote('');
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="quote-input"
                    placeholder="輸入激勵人心的文字..."
                    value={quote}
                    onChange={handleChange}
                    rows={4}
                />
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="submit-button">
                    生成腳本
                </button>
            </form>
        </div>
    );
};

export default QuoteForm;