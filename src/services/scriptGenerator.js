// src/services/scriptGenerator.js
import { aiService } from './aiService';

/**
 * Generates a 3-minute motivational script with scenes and voiceovers.
 * @param {Object} params - Script generation parameters
 * @param {string} params.quote - The core motivational quote
 * @param {string} params.theme - The theme or topic (optional)
 * @param {string} params.tone - The emotional tone (optional)
 * @param {boolean} params.useAI - Whether to use AI enhancement (optional)
 * @returns {Object} - The generated script with timing and sections
 */
export async function generateScript({ quote, theme = 'success', tone = 'inspirational', useAI = true }) {
    if (!quote) {
        throw new Error("Quote cannot be empty");
    }

    // Calculate approximate timing for a 3-minute video
    const TOTAL_TIME = 180; // 3 minutes in seconds
    const INTRO_TIME = 20;
    const QUOTE_TIME = 30;
    const STORY_TIME = 90;
    const CLOSING_TIME = 40;

    // 基礎腳本生成
    let script = {
        totalDuration: TOTAL_TIME,
        sections: [
            {
                type: 'intro',
                duration: INTRO_TIME,
                scene: '電影風格的自然或城市全景鏡頭',
                voiceover: generateIntroText(theme),
                musicNote: '柔和漸強的配樂'
            },
            {
                type: 'quote',
                duration: QUOTE_TIME,
                scene: '與主題相呼應的動態視覺效果',
                voiceover: quote,
                musicNote: '高潮激勵配樂'
            },
            {
                type: 'story',
                duration: STORY_TIME,
                scene: generateSceneSequence(theme),
                voiceover: generateStoryText(quote, theme),
                musicNote: '情感漸強的音樂'
            },
            {
                type: 'closing',
                duration: CLOSING_TIME,
                scene: '振奮人心的結束畫面，疊加文字',
                voiceover: generateClosingText(tone),
                musicNote: '勝利凱旋的尾聲'
            }
        ]
    };

    // AI 增強功能
    if (useAI) {
        try {
            const aiEnhancement = await aiService.enhanceScript(quote, theme, tone);
            const quoteAnalysis = await aiService.analyzeQuote(quote);
            
            if (aiEnhancement.aiGenerated) {
                // 更新腳本內容使用 AI 增強版本
                script.sections[0].voiceover = aiEnhancement.enhancedScript.intro;
                script.sections[2].voiceover = aiEnhancement.enhancedScript.story;
                script.sections[2].scene = aiEnhancement.enhancedScript.scenes;
                script.sections[3].voiceover = aiEnhancement.enhancedScript.closing;
                
                // 添加 AI 相關資訊
                script.aiEnhanced = true;
                script.aiConfidence = aiEnhancement.confidence;
                script.suggestions = aiEnhancement.suggestions;
                script.visualElements = aiEnhancement.visualElements;
                script.quoteAnalysis = quoteAnalysis;
            }
        } catch (error) {
            console.error('AI 增強失敗，使用基礎版本:', error);
            script.aiEnhanced = false;
        }
    }

    return script;
}

function generateIntroText(theme) {
    const intros = {
        success: "在這個每一刻都彌足珍貴的世界裡，成功不僅僅是關於終點...",
        growth: "成長始於一小步，一個決定要超越現在的自己的決定...",
        courage: "勇氣不是沒有恐懼，而是即便恐懼仍然前進的力量..."
    };
    return intros[theme] || intros.success;
}

function generateSceneSequence(theme) {
    const scenes = {
        success: [
            "人物在深夜專注工作的場景",
            "在各種環境中克服困難的畫面",
            "突破與成就的精彩時刻"
        ],
        growth: [
            "種子發芽成長為植物的延時攝影",
            "學生學習進步的過程",
            "職業生涯里程碑的成就時刻"
        ],
        courage: [
            "人物面對挑戰的關鍵時刻",
            "做出決定和採取行動的瞬間",
            "克服逆境取得勝利的畫面"
        ]
    };
    return scenes[theme] || scenes.success;
}

function generateStoryText(quote, theme) {
    // Create a narrative that expands on the quote's message
    return `每一天，人們都會面臨定義自己人生旅程的時刻。${quote} 這個真理與所有敢於追夢和採取行動的人產生共鳴。通過挑戰與勝利，這份智慧指引著我們攀向更高峰。`;
}

function generateClosingText(tone) {
    const closings = {
        inspirational: "你的旅程從現在開始。帶著這個訊息前進，讓它成為你邁向未來的動力。",
        motivational: "改變的力量就在你心中。就讓今天成為你蛻變的起點。",
        reflective: "在前進的路上，記住這些話語，讓它們指引你邁向卓越。"
    };
    return closings[tone] || closings.inspirational;
}