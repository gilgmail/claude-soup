// src/utils/helpers.js

export const formatQuote = (quote) => {
    return quote.trim().replace(/\s+/g, ' ');
};

export const validateInput = (input) => {
    return input && input.length > 0;
};

export const generateTimestamp = () => {
    return new Date().toISOString();
};