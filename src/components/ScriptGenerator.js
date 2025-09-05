import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { generateScript } from '../services/scriptGenerator';
import AIQuoteSuggestions from './AIQuoteSuggestions';
import { useAutoMode } from '../hooks/useAutoMode';

const Container = styled.div`
  max-width: 800px;
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

const Input = styled.textarea`
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
`;

const ScriptOutput = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 4px;
  white-space: pre-wrap;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const Timestamp = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const AIToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }
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

const ScriptGenerator = () => {
  const [quote, setQuote] = useState('');
  const [theme, setTheme] = useState('success');
  const [tone, setTone] = useState('inspirational');
  const [generatedScript, setGeneratedScript] = useState(null);
  const [useAI, setUseAI] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { settings, autoConfirm, autoSelect, autoGenerateContent, getDelay } = useAutoMode();

  // 自動填充內容
  useEffect(() => {
    if (settings.autoGenerate && !quote) {
      const autoQuote = autoGenerateContent('quote');
      if (autoQuote) {
        setTimeout(() => setQuote(autoQuote), getDelay(500));
      }
    }
  }, [settings.autoGenerate]);

  // 自動設定 AI
  useEffect(() => {
    if (settings.autoEnableAI) {
      setUseAI(true);
    }
  }, [settings.autoEnableAI]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 自動確認生成
    const shouldGenerate = await autoConfirm('確定要生成腳本嗎？', true);
    if (!shouldGenerate && !settings.skipConfirmations) return;
    
    setIsGenerating(true);
    try {
      // 快速模式下減少生成延遲
      const startTime = Date.now();
      const script = await generateScript({ quote, theme, tone, useAI });
      
      if (settings.quickMode) {
        const elapsed = Date.now() - startTime;
        const minDelay = 300; // 最少顯示時間
        if (elapsed < minDelay) {
          await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
        }
      }
      
      setGeneratedScript(script);
      
      // 自動接受建議
      if (settings.autoAcceptSuggestions && script.suggestions?.alternativeQuotes?.length > 0) {
        const autoAccept = await autoConfirm('是否採用 AI 建議的替代金句？', false);
        if (autoAccept) {
          const bestSuggestion = autoSelect(script.suggestions.alternativeQuotes, 'first');
          if (bestSuggestion) {
            console.log('🤖 自動採用建議:', bestSuggestion);
          }
        }
      }
      
    } catch (error) {
      console.error('腳本生成失敗:', error);
      if (!settings.skipConfirmations) {
        alert('腳本生成失敗，請重試');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!generatedScript) {
    return (
      <Container>
        <h2>3分鐘勵志短片腳本生成器</h2>
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="quote">請輸入核心訊息或金句：</label>
            <Input
              id="quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="請輸入想要在影片中傳達的主要訊息..."
              required
            />
          </div>

          <div>
            <label htmlFor="theme">
              選擇主題：
              {settings.autoSelectTheme && <span style={{color: '#10b981', fontSize: '0.8rem'}}> (自動)</span>}
            </label>
            <Select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{
                borderColor: settings.autoSelectTheme ? '#10b981' : '#ddd'
              }}
            >
              <option value="success">成功</option>
              <option value="growth">個人成長</option>
              <option value="courage">勇氣</option>
            </Select>
          </div>

          <div>
            <label htmlFor="tone">
              選擇語氣：
              {settings.autoSelectTheme && <span style={{color: '#10b981', fontSize: '0.8rem'}}> (自動)</span>}
            </label>
            <Select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{
                borderColor: settings.autoSelectTheme ? '#10b981' : '#ddd'
              }}
            >
              <option value="inspirational">啟發性</option>
              <option value="motivational">激勵性</option>
              <option value="reflective">反思性</option>
            </Select>
          </div>

          <AIToggle>
            <label>
              <input
                type="checkbox"
                checked={useAI}
                onChange={(e) => setUseAI(e.target.checked)}
              />
              啟用 AI 增強
              <span style={{opacity: 0.7}}>(智能優化內容與建議)</span>
            </label>
          </AIToggle>

          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? '🤖 AI 生成中...' : '生成腳本'}
          </Button>
        </Form>
        <AIQuoteSuggestions
          selectedTheme={theme}
          onQuoteSelect={(selectedQuote) => {
            setQuote(selectedQuote);
          }}
          onThemeChange={(newTheme) => {
            setTheme(newTheme);
          }}
        />
      </Container>
    );
  }

  return (
    <Container>
      <h2>
        您的3分鐘勵志短片腳本
        {generatedScript?.aiEnhanced && <AIBadge>🤖 AI 增強</AIBadge>}
      </h2>
      
      {generatedScript?.aiEnhanced && (
        <ConfidenceIndicator>
          <span>AI 信心度:</span>
          <div className="confidence-bar">
            <div 
              className="confidence-fill" 
              style={{ width: `${generatedScript.aiConfidence}%` }}
            />
          </div>
          <span>{generatedScript.aiConfidence}%</span>
        </ConfidenceIndicator>
      )}
      <ScriptOutput>
        <p>總時長：{formatTime(generatedScript.totalDuration)}</p>
        
        {generatedScript.sections.map((section, index) => {
          const sectionTypes = {
            intro: '開場',
            quote: '核心金句',
            story: '故事發展',
            closing: '結尾'
          };
          
          return (
            <Section key={index}>
              <SectionTitle>
                {sectionTypes[section.type]}{' '}
                <Timestamp>[{formatTime(section.duration)}]</Timestamp>
              </SectionTitle>
              
              <p><strong>場景：</strong> {
                Array.isArray(section.scene) 
                  ? section.scene.map((scene, i) => <div key={i}>• {scene}</div>)
                  : section.scene
              }</p>
              
              <p><strong>旁白：</strong> {section.voiceover}</p>
              <p><strong>音樂：</strong> {section.musicNote}</p>
            </Section>
          );
        })}
        
        <Button onClick={() => setGeneratedScript(null)}>重新生成</Button>
        
        {generatedScript?.suggestions && (
          <SuggestionsPanel>
            <h4>💡 AI 建議</h4>
            
            {generatedScript.suggestions.alternativeQuotes?.length > 0 && (
              <div>
                <strong>替代金句建議:</strong>
                <div className="suggestions-grid">
                  {generatedScript.suggestions.alternativeQuotes.map((altQuote, i) => (
                    <div key={i} className="suggestion-item">
                      "{altQuote}"
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {generatedScript.suggestions.improvementTips?.length > 0 && (
              <div style={{marginTop: '1rem'}}>
                <strong>改進建議:</strong>
                <div className="suggestions-grid">
                  {generatedScript.suggestions.improvementTips.map((tip, i) => (
                    <div key={i} className="suggestion-item">
                      • {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {generatedScript.visualElements && (
              <div style={{marginTop: '1rem'}}>
                <strong>視覺建議:</strong>
                <div className="suggestions-grid">
                  <div className="suggestion-item">
                    <strong>推薦色彩:</strong> {generatedScript.visualElements.colors?.join(', ')}
                  </div>
                  <div className="suggestion-item">
                    <strong>字體風格:</strong> {generatedScript.visualElements.fonts?.join(', ')}
                  </div>
                  <div className="suggestion-item">
                    <strong>視覺特效:</strong> {generatedScript.visualElements.effects?.join(', ')}
                  </div>
                </div>
              </div>
            )}
          </SuggestionsPanel>
        )}
      </ScriptOutput>
    </Container>
  );
};

export default ScriptGenerator;