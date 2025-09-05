import { useState, useEffect } from 'react';

export const useAutoMode = () => {
  const [settings, setSettings] = useState({
    autoGenerate: true,
    skipConfirmations: true,
    autoSelectTheme: true,
    autoEnableAI: true,
    autoAcceptSuggestions: true,
    quickMode: true
  });

  useEffect(() => {
    // 從 localStorage 載入設定
    const savedSettings = localStorage.getItem('autoModeSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // 監聽設定變更
    const handleSettingsChange = (event) => {
      setSettings(event.detail);
    };

    window.addEventListener('autoModeSettingsChanged', handleSettingsChange);
    
    return () => {
      window.removeEventListener('autoModeSettingsChanged', handleSettingsChange);
    };
  }, []);

  // 自動確認函數 - 所有詢問都回答 yes
  const autoConfirm = (question, defaultValue = true) => {
    if (settings.skipConfirmations) {
      console.log(`🤖 自動模式: "${question}" -> YES`);
      return Promise.resolve(true);
    }
    return Promise.resolve(defaultValue);
  };

  // 自動選擇最佳選項
  const autoSelect = (options, criteria = 'first') => {
    if (!settings.autoSelectTheme) return null;
    
    switch (criteria) {
      case 'random':
        return options[Math.floor(Math.random() * options.length)];
      case 'best':
        // 選擇評分最高的
        return options.reduce((best, current) => 
          (current.score || 0) > (best.score || 0) ? current : best
        );
      case 'first':
      default:
        return options[0];
    }
  };

  // 自動生成建議
  const autoGenerateContent = async (type, context) => {
    if (!settings.autoGenerate) return null;
    
    // 模擬自動生成不同類型的內容
    const generators = {
      quote: () => `成功來自${Math.random() > 0.5 ? '堅持' : '努力'}，永不放棄就是勝利！`,
      theme: () => ['success', 'growth', 'courage'][Math.floor(Math.random() * 3)],
      tone: () => ['inspirational', 'motivational', 'reflective'][Math.floor(Math.random() * 3)]
    };
    
    return generators[type] ? generators[type]() : null;
  };

  // 快速模式 - 減少延遲
  const getDelay = (normalDelay = 1000) => {
    return settings.quickMode ? Math.min(normalDelay / 3, 300) : normalDelay;
  };

  return {
    settings,
    autoConfirm,
    autoSelect,
    autoGenerateContent,
    getDelay,
    isFullyAuto: Object.values(settings).every(v => v === true)
  };
};

export default useAutoMode;