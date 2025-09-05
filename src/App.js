import React, { useState } from 'react';
import styled from 'styled-components';
import ScriptGenerator from './components/ScriptGenerator';
import CopywritingGenerator from './components/CopywritingGenerator';
import AutoModeSettings from './components/AutoModeSettings';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f5f6fa;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p {
    color: #7f8c8d;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const Tab = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.active ? `
    background: #0066cc;
    color: white;
  ` : `
    background: #f0f0f0;
    color: #666;
    
    &:hover {
      background: #e0e0e0;
    }
  `}
`;

function App() {
  const [activeTab, setActiveTab] = useState('script');

  return (
    <AppContainer>
      <AutoModeSettings />
      <Header>
        <h1>🤖 AI 智能內容生成器</h1>
        <p>強大的 AI 驅動內容创作工具，支持短片腳本和長文案生成</p>
        <p style={{fontSize: '0.9rem', opacity: 0.8}}>
          ⚙️ 點擊右上角設定按鈕開啟全自動模式
        </p>
      </Header>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'script'} 
          onClick={() => setActiveTab('script')}
        >
          🎥 短片腳本
        </Tab>
        <Tab 
          active={activeTab === 'copywriting'} 
          onClick={() => setActiveTab('copywriting')}
        >
          🖋️ 長文案 (800-1000字)
        </Tab>
      </TabContainer>
      
      {activeTab === 'script' && <ScriptGenerator />}
      {activeTab === 'copywriting' && <CopywritingGenerator />}
    </AppContainer>
  );
}

export default App;