import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  min-width: 300px;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #667eea;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 1001;
  transition: all 0.3s ease;
  
  &:hover {
    background: #764ba2;
    transform: scale(1.1);
  }
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #4ade80;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
`;

const StatusIndicator = styled.div`
  background: ${props => props.active ? '#10b981' : '#ef4444'};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const AutoModeSettings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState({
    autoGenerate: true,
    skipConfirmations: true,
    autoSelectTheme: true,
    autoEnableAI: true,
    autoAcceptSuggestions: true,
    quickMode: true
  });

  // 保存設定到 localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('autoModeSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('autoModeSettings', JSON.stringify(settings));
    // 觸發全域設定更新
    window.dispatchEvent(new CustomEvent('autoModeSettingsChanged', { detail: settings }));
  }, [settings]);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const allEnabled = Object.values(settings).every(value => value === true);

  return (
    <>
      <ToggleButton onClick={() => setIsVisible(!isVisible)}>
        ⚙️
      </ToggleButton>
      
      {isVisible && (
        <SettingsContainer>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>
            🤖 全自動模式設定
          </h3>
          
          <StatusIndicator active={allEnabled}>
            {allEnabled ? '✅ 全自動模式已啟用' : '⚠️ 部分手動模式'}
          </StatusIndicator>
          
          <SettingItem>
            <span>自動生成腳本</span>
            <Switch>
              <input
                type="checkbox"
                checked={settings.autoGenerate}
                onChange={() => toggleSetting('autoGenerate')}
              />
              <span className="slider"></span>
            </Switch>
          </SettingItem>
          
          <SettingItem>
            <span>跳過所有確認</span>
            <Switch>
              <input
                type="checkbox"
                checked={settings.skipConfirmations}
                onChange={() => toggleSetting('skipConfirmations')}
              />
              <span className="slider"></span>
            </Switch>
          </SettingItem>
          
          <SettingItem>
            <span>自動選擇主題</span>
            <Switch>
              <input
                type="checkbox"
                checked={settings.autoSelectTheme}
                onChange={() => toggleSetting('autoSelectTheme')}
              />
              <span className="slider"></span>
            </Switch>
          </SettingItem>
          
          <SettingItem>
            <span>自動啟用 AI</span>
            <Switch>
              <input
                type="checkbox"
                checked={settings.autoEnableAI}
                onChange={() => toggleSetting('autoEnableAI')}
              />
              <span className="slider"></span>
            </Switch>
          </SettingItem>
          
          <SettingItem>
            <span>自動接受建議</span>
            <Switch>
              <input
                type="checkbox"
                checked={settings.autoAcceptSuggestions}
                onChange={() => toggleSetting('autoAcceptSuggestions')}
              />
              <span className="slider"></span>
            </Switch>
          </SettingItem>
          
          <SettingItem>
            <span>快速模式</span>
            <Switch>
              <input
                type="checkbox"
                checked={settings.quickMode}
                onChange={() => toggleSetting('quickMode')}
              />
              <span className="slider"></span>
            </Switch>
          </SettingItem>
        </SettingsContainer>
      )}
    </>
  );
};

export default AutoModeSettings;