import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { articleService } from '../services/articleService';
import { useAutoMode } from '../hooks/useAutoMode';

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Slider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  input[type="range"] {
    flex: 1;
    height: 6px;
    background: #ddd;
    border-radius: 3px;
    outline: none;
    
    &::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      background: #0066cc;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  
  span {
    min-width: 60px;
    font-weight: bold;
    color: #0066cc;
  }
`;

const Button = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #0052a3;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ArticleOutput = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 4px;
  line-height: 1.8;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const WordCount = styled.div`
  background: #e8f4fd;
  color: #0066cc;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1rem;
`;

const AIBadge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-left: 0.5rem;
`;

const ConfidenceIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f0f8ff;
  border-radius: 6px;
  font-size: 0.9rem;
  
  .confidence-bar {
    width: 100px;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .confidence-fill {
    height: 100%;
    background: linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%);
    border-radius: 3px;
    transition: width 0.3s ease;
  }
`;

const InsightsList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:before {
      content: "💭";
      margin-right: 0.5rem;
    }
  }
`;

const SuggestionsPanel = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  
  h4 {
    margin: 0 0 1rem 0;
    color: #333;
  }
  
  .suggestions-grid {
    display: grid;
    gap: 0.5rem;
  }
  
  .suggestion-item {
    padding: 0.5rem;
    background: white;
    border-radius: 4px;
    font-size: 0.9rem;
  }
`;

const ArticleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('成長');
  const [tone, setTone] = useState('溫馨');
  const [wordCount, setWordCount] = useState(800);
  const [generatedArticle, setGeneratedArticle] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { settings, autoConfirm, getDelay } = useAutoMode();

  // 自動填充內容
  useEffect(() => {
    if (settings.autoGenerate && !topic) {
      const autoTopic = generateAutoTopic(category);
      if (autoTopic) {
        setTimeout(() => setTopic(autoTopic), getDelay(500));
      }
    }
  }, [settings.autoGenerate, category, getDelay, topic]);

  const generateAutoTopic = (category) => {
    const topics = {
      成長: ['自我提升', '學習與進步', '面對挫折', '個人成長', '突破舒適圈'],
      勵志: ['追求夢想', '堅持不懈', '相信自己', '克服困難', '積極人生'],
      人生感悟: ['人生意義', '生活哲學', '時間的價值', '簡單生活', '內心平靜'],
      愛與溫暖: ['感恩之心', '家人情深', '友情可貴', '愛的力量', '溫暖他人']
    };
    const categoryTopics = topics[category] || topics.成長;
    return categoryTopics[Math.floor(Math.random() * categoryTopics.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 根據 CLAUDE.md 設定，自動回答 YES
    const shouldGenerate = await autoConfirm('確定要生成心靈雞湯文章嗎？', true);
    if (!shouldGenerate && !settings.skipConfirmations) return;
    
    setIsGenerating(true);
    try {
      const result = await articleService.generateInspirationalArticle({ 
        topic, 
        category, 
        tone, 
        wordCount,
        useAI: true 
      });
      
      setGeneratedArticle(result);
      
    } catch (error) {
      console.error('文章生成失敗:', error);
      if (!settings.skipConfirmations) {
        alert('文章生成失敗，請重試');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!generatedArticle) {
    return (
      <Container>
        <h2>💖 心靈雞湯文章生成器</h2>
        <p>輸入您想要探討的主題，AI 將為您生成溫暖人心的正能量文章（800-1000字）</p>
        
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="topic">文章主題：</label>
            <Input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例如：自我提升、追求夢想、感恩之心..."
              required
              style={{
                borderColor: settings.autoGenerate ? '#10b981' : '#ddd'
              }}
            />
            {settings.autoGenerate && <small style={{color: '#10b981'}}>✨ 自動生成已啟用</small>}
          </div>

          <div>
            <label htmlFor="category">文章分類：</label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="成長">🌱 成長</option>
              <option value="勵志">💪 勵志</option>
              <option value="人生感悟">🤔 人生感悟</option>
              <option value="愛與溫暖">💕 愛與溫暖</option>
            </Select>
          </div>

          <div>
            <label htmlFor="tone">文章風格：</label>
            <Select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="溫馨">💝 溫馨</option>
              <option value="激勵">⚡ 激勵</option>
              <option value="深刻">🎯 深刻</option>
              <option value="輕鬆">😊 輕鬆</option>
            </Select>
          </div>

          <div>
            <label htmlFor="wordCount">目標字數：</label>
            <Slider>
              <input
                id="wordCount"
                type="range"
                min="600"
                max="1200"
                step="50"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
              />
              <span>{wordCount} 字</span>
            </Slider>
          </div>

          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? '🤖 AI 創作中...' : '生成心靈雞湯文章'}
          </Button>
        </Form>
      </Container>
    );
  }

  return (
    <Container>
      <h2>
        您的心靈雞湯文章
        {generatedArticle?.aiEnhanced && <AIBadge>🤖 AI 增強</AIBadge>}
      </h2>
      
      <WordCount>
        📊 文章字數：{generatedArticle.wordCount || 0} 字
      </WordCount>
      
      {generatedArticle?.aiEnhanced && (
        <ConfidenceIndicator>
          <span>AI 品質評分:</span>
          <div className="confidence-bar">
            <div 
              className="confidence-fill" 
              style={{ width: `${generatedArticle.aiConfidence}%` }}
            />
          </div>
          <span>{generatedArticle.aiConfidence}%</span>
        </ConfidenceIndicator>
      )}
      
      <ArticleOutput>
        {generatedArticle.article && (
          <>
            <Section>
              <SectionTitle>{generatedArticle.article.title}</SectionTitle>
              <p><strong>開場白：</strong></p>
              <p>{generatedArticle.article.introduction}</p>
            </Section>

            <Section>
              <SectionTitle>故事內容</SectionTitle>
              <div style={{ whiteSpace: 'pre-line' }}>
                {generatedArticle.article.story}
              </div>
            </Section>

            {generatedArticle.article.insights && (
              <Section>
                <SectionTitle>人生感悟</SectionTitle>
                <InsightsList>
                  {generatedArticle.article.insights.map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </InsightsList>
              </Section>
            )}

            {generatedArticle.article.reflection && (
              <Section>
                <SectionTitle>深度思考</SectionTitle>
                <p>{generatedArticle.article.reflection}</p>
              </Section>
            )}

            <Section>
              <SectionTitle>結語</SectionTitle>
              <p>{generatedArticle.article.conclusion}</p>
            </Section>

            <Section>
              <SectionTitle>正能量訊息</SectionTitle>
              <p><strong>✨ {generatedArticle.article.message}</strong></p>
            </Section>
          </>
        )}
        
        <Button onClick={() => setGeneratedArticle(null)}>重新生成</Button>
        
        {generatedArticle?.suggestions && (
          <SuggestionsPanel>
            <h4>💡 AI 建議與優化</h4>
            
            {generatedArticle.suggestions.alternativeTitles?.length > 0 && (
              <div>
                <strong>替代標題建議:</strong>
                <div className="suggestions-grid">
                  {generatedArticle.suggestions.alternativeTitles.map((title, i) => (
                    <div key={i} className="suggestion-item">
                      "{title}"
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {generatedArticle.suggestions.improvementTips?.length > 0 && (
              <div style={{marginTop: '1rem'}}>
                <strong>寫作建議:</strong>
                <div className="suggestions-grid">
                  {generatedArticle.suggestions.improvementTips.map((tip, i) => (
                    <div key={i} className="suggestion-item">
                      • {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generatedArticle.suggestions.relatedTopics?.length > 0 && (
              <div style={{marginTop: '1rem'}}>
                <strong>相關主題:</strong>
                <div className="suggestion-item">
                  {generatedArticle.suggestions.relatedTopics.join(' • ')}
                </div>
              </div>
            )}
          </SuggestionsPanel>
        )}
      </ArticleOutput>
    </Container>
  );
};

export default ArticleGenerator;