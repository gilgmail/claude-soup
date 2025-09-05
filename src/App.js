import React from 'react';
import styled from 'styled-components';
import ScriptGenerator from './components/ScriptGenerator';
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

function App() {
  return (
    <AppContainer>
      <AutoModeSettings />
      <Header>
        <h1>🤖 心靈雞湯短影音腳本生成器</h1>
        <p>輸入你的核心訊息，讓AI幫你生成3分鐘的勵志短片腳本</p>
        <p style={{fontSize: '0.9rem', opacity: 0.8}}>
          ⚙️ 點擊右上角設定按鈕開啟全自動模式
        </p>
      </Header>
      <ScriptGenerator />
    </AppContainer>
  );
}

export default App;