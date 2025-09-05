import React, { useState } from 'react';
import styled from 'styled-components';
import { generateScript } from '../services/scriptGenerator';

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

const ScriptGenerator = () => {
  const [quote, setQuote] = useState('');
  const [theme, setTheme] = useState('success');
  const [tone, setTone] = useState('inspirational');
  const [generatedScript, setGeneratedScript] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const script = generateScript({ quote, theme, tone });
    setGeneratedScript(script);
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
            <label htmlFor="theme">選擇主題：</label>
            <Select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="success">成功</option>
              <option value="growth">個人成長</option>
              <option value="courage">勇氣</option>
            </Select>
          </div>

          <div>
            <label htmlFor="tone">選擇語氣：</label>
            <Select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="inspirational">啟發性</option>
              <option value="motivational">激勵性</option>
              <option value="reflective">反思性</option>
            </Select>
          </div>

          <Button type="submit">生成腳本</Button>
        </Form>
      </Container>
    );
  }

  return (
    <Container>
      <h2>您的3分鐘勵志短片腳本</h2>
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
      </ScriptOutput>
    </Container>
  );
};

export default ScriptGenerator;