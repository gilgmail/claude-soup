import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { aiService } from '../services/aiService';

const Container = styled.div`
  margin: 1rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const AIIcon = styled.span`
  font-size: 1.2rem;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

const QuoteCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const QuoteText = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const QuoteMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  opacity: 0.8;
`;

const ConfidenceBar = styled.div`
  width: 50px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    width: ${props => props.confidence || 0}%;
    height: 100%;
    background: #4ade80;
    border-radius: 2px;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const ThemeSelect = styled.select`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`;

const RefreshButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #fca5a5;
  text-align: center;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(239, 68, 68, 0.3);
`;

const AIQuoteSuggestions = ({ selectedTheme, onQuoteSelect, onThemeChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(selectedTheme || 'success');

  const loadSuggestions = async (theme = currentTheme) => {
    setLoading(true);
    setError(null);
    
    try {
      const quotes = await aiService.generateSmartQuotes(theme, 'positive', 6);
      setSuggestions(quotes);
    } catch (err) {
      setError('無法載入 AI 金句建議，請稍後重試');
      console.error('載入建議失敗:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  useEffect(() => {
    if (selectedTheme !== currentTheme) {
      setCurrentTheme(selectedTheme);
      loadSuggestions(selectedTheme);
    }
  }, [selectedTheme]);

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
    loadSuggestions(newTheme);
  };

  const handleQuoteClick = (quote) => {
    if (onQuoteSelect) {
      onQuoteSelect(quote.text);
    }
  };

  const getThemeDisplayName = (theme) => {
    const names = {
      success: '成功',
      growth: '成長',
      courage: '勇氣'
    };
    return names[theme] || theme;
  };

  return (
    <Container>
      <Header>
        <h3>
          <AIIcon>🤖</AIIcon>
          AI 智能金句建議
          {loading && <LoadingSpinner />}
        </h3>
      </Header>
      
      <Controls>
        <ThemeSelect
          value={currentTheme}
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          <option value="success">成功</option>
          <option value="growth">個人成長</option>
          <option value="courage">勇氣</option>
        </ThemeSelect>
        
        <RefreshButton
          onClick={() => loadSuggestions()}
          disabled={loading}
        >
          🔄 重新生成
        </RefreshButton>
      </Controls>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {!error && suggestions.length > 0 && (
        <SuggestionsGrid>
          {suggestions.map((quote, index) => (
            <QuoteCard
              key={index}
              onClick={() => handleQuoteClick(quote)}
            >
              <QuoteText>"{quote.text}"</QuoteText>
              <QuoteMeta>
                <span>{getThemeDisplayName(quote.theme)}</span>
                <ConfidenceBar confidence={quote.confidence} />
              </QuoteMeta>
            </QuoteCard>
          ))}
        </SuggestionsGrid>
      )}

      {!loading && !error && suggestions.length === 0 && (
        <div style={{ textAlign: 'center', opacity: 0.7 }}>
          暫無建議，請點擊重新生成
        </div>
      )}
    </Container>
  );
};

export default AIQuoteSuggestions;