import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { generateCopywriting } from '../services/copywritingService';
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

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
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

const CopywritingOutput = styled.div`
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

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:before {
      content: "✅";
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

const CopywritingGenerator = () => {
  const [topic, setTopic] = useState('');
  const [theme, setTheme] = useState('product');
  const [tone, setTone] = useState('professional');
  const [wordCount, setWordCount] = useState(800);
  const [generatedCopy, setGeneratedCopy] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { settings, autoConfirm, getDelay } = useAutoMode();

  // 自動填充內容
  useEffect(() => {
    if (settings.autoGenerate && !topic) {
      const autoTopic = generateAutoTopic(theme);
      if (autoTopic) {
        setTimeout(() => setTopic(autoTopic), getDelay(500));
      }
    }
  }, [settings.autoGenerate, theme]);

  const generateAutoTopic = (theme) => {
    const topics = {
      product: ['智能家居系統', '健康營養品', '專業工具', '科技產品'],
      service: ['數位行銷服務', '專業諮詢', '技術支援', '教育培訓'],
      lifestyle: ['精品咖啡', '居家裝飾', '健身器材', '休閒娛樂'],
      business: ['企業解決方案', '投資機會', '商業顧問', '創業輔導']
    };
    const themeTopics = topics[theme] || topics.product;
    return themeTopics[Math.floor(Math.random() * themeTopics.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const shouldGenerate = await autoConfirm('確定要生成文案嗎？', true);
    if (!shouldGenerate && !settings.skipConfirmations) return;
    
    setIsGenerating(true);
    try {
      const result = await generateCopywriting({ 
        topic, 
        theme, 
        tone, 
        wordCount,
        useAI: true 
      });
      
      setGeneratedCopy(result);
      
    } catch (error) {
      console.error('文案生成失敗:', error);
      if (!settings.skipConfirmations) {
        alert('文案生成失敗，請重試');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const formatCopywriting = (copywriting) => {
    if (!copywriting) return '';
    
    let formatted = '';
    
    if (copywriting.headline) {
      formatted += `# ${copywriting.headline}\n\n`;
    }
    
    if (copywriting.introduction) {
      formatted += `${copywriting.introduction}\n\n`;
    }
    
    if (copywriting.mainContent) {
      formatted += `${copywriting.mainContent}\n\n`;
    }
    
    if (copywriting.benefits && Array.isArray(copywriting.benefits)) {
      formatted += `## 主要優勢\n\n`;
      copywriting.benefits.forEach(benefit => {
        formatted += `• ${benefit}\n`;
      });
      formatted += '\n';
    }
    
    if (copywriting.proof) {
      formatted += `## 客戶見證\n\n${copywriting.proof}\n\n`;
    }
    
    if (copywriting.conclusion) {
      formatted += `${copywriting.conclusion}\n\n`;
    }
    
    if (copywriting.cta) {
      formatted += `**${copywriting.cta}**\n`;
    }
    
    return formatted;
  };

  if (!generatedCopy) {
    return (
      <Container>
        <h2>🖋️ 生人文案生成器</h2>
        <p>輸入您的產品或服務主題，AI 將為您生成專業的長文案（800-1000字）</p>
        
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="topic">主題或產品名稱：</label>
            <Input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例如：智能家居系統、數位行銷服務..."
              required
              style={{
                borderColor: settings.autoGenerate ? '#10b981' : '#ddd'
              }}
            />
            {settings.autoGenerate && <small style={{color: '#10b981'}}>✨ 自動生成已啟用</small>}
          </div>

          <div>
            <label htmlFor="theme">文案類型：</label>
            <Select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="product">產品介紹</option>
              <option value="service">服務推廣</option>
              <option value="lifestyle">生活風格</option>
              <option value="business">商業方案</option>
            </Select>
          </div>

          <div>
            <label htmlFor="tone">語調風格：</label>
            <Select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="professional">專業正式</option>
              <option value="friendly">親切友善</option>
              <option value="urgent">急迫促銷</option>
              <option value="creative">創意生動</option>
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
            {isGenerating ? '🤖 AI 生成中...' : '生成專業文案'}
          </Button>
        </Form>
      </Container>
    );
  }

  return (
    <Container>
      <h2>
        您的專業文案
        {generatedCopy?.aiEnhanced && <AIBadge>🤖 AI 增強</AIBadge>}
      </h2>
      
      <WordCount>
        📊 文案字數：{generatedCopy.wordCount || 0} 字
      </WordCount>
      
      {generatedCopy?.aiEnhanced && (
        <ConfidenceIndicator>
          <span>AI 品質評分:</span>
          <div className="confidence-bar">
            <div 
              className="confidence-fill" 
              style={{ width: `${generatedCopy.aiConfidence}%` }}
            />
          </div>
          <span>{generatedCopy.aiConfidence}%</span>
        </ConfidenceIndicator>
      )}
      
      <CopywritingOutput>
        {generatedCopy.copywriting && (
          <>
            <Section>
              <SectionTitle>{generatedCopy.copywriting.headline}</SectionTitle>
              <p><strong>開場引言：</strong></p>
              <p>{generatedCopy.copywriting.introduction}</p>
            </Section>

            <Section>
              <SectionTitle>主要內容</SectionTitle>
              <div style={{ whiteSpace: 'pre-line' }}>
                {generatedCopy.copywriting.mainContent}
              </div>
            </Section>

            {generatedCopy.copywriting.benefits && (
              <Section>
                <SectionTitle>核心優勢</SectionTitle>
                <BenefitsList>
                  {generatedCopy.copywriting.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </BenefitsList>
              </Section>
            )}

            {generatedCopy.copywriting.proof && (
              <Section>
                <SectionTitle>客戶見證</SectionTitle>
                <p>{generatedCopy.copywriting.proof}</p>
              </Section>
            )}

            <Section>
              <SectionTitle>結論</SectionTitle>
              <p>{generatedCopy.copywriting.conclusion}</p>
            </Section>

            <Section>
              <SectionTitle>行動號召</SectionTitle>
              <p><strong>{generatedCopy.copywriting.cta}</strong></p>
            </Section>
          </>
        )}
        
        <Button onClick={() => setGeneratedCopy(null)}>重新生成</Button>
        
        {generatedCopy?.suggestions && (
          <SuggestionsPanel>
            <h4>💡 AI 建議與優化</h4>
            
            {generatedCopy.suggestions.alternativeHeadlines?.length > 0 && (
              <div>
                <strong>替代標題建議:</strong>
                <div className="suggestions-grid">
                  {generatedCopy.suggestions.alternativeHeadlines.map((headline, i) => (
                    <div key={i} className="suggestion-item">
                      "{headline}"
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {generatedCopy.suggestions.improvementTips?.length > 0 && (
              <div style={{marginTop: '1rem'}}>
                <strong>優化建議:</strong>
                <div className="suggestions-grid">
                  {generatedCopy.suggestions.improvementTips.map((tip, i) => (
                    <div key={i} className="suggestion-item">
                      • {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generatedCopy.suggestions.keywordSuggestions?.length > 0 && (
              <div style={{marginTop: '1rem'}}>
                <strong>關鍵詞建議:</strong>
                <div className="suggestion-item">
                  {generatedCopy.suggestions.keywordSuggestions.join(' • ')}
                </div>
              </div>
            )}
          </SuggestionsPanel>
        )}
      </CopywritingOutput>
    </Container>
  );
};

export default CopywritingGenerator;