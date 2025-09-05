// src/services/aiService.js

class AIService {
    constructor() {
        // 模擬 AI API 配置
        this.baseURL = 'https://api.openai.com/v1';
        this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';
        
        // 預設的勵志主題庫
        this.inspirationalThemes = {
            success: {
                keywords: ['成功', '成就', '目標', '夢想', '堅持', '努力'],
                scenarios: ['創業故事', '運動員奮鬥', '學業成就', '職場晉升', '技能提升']
            },
            growth: {
                keywords: ['成長', '學習', '進步', '改變', '突破', '蛻變'],
                scenarios: ['個人發展', '技能學習', '心智成長', '克服困難', '自我提升']
            },
            courage: {
                keywords: ['勇氣', '勇敢', '挑戰', '冒險', '決心', '無畏'],
                scenarios: ['面對恐懼', '挑戰困難', '做出選擇', '承擔責任', '勇敢追夢']
            }
        };
        
        // 金句模板庫
        this.quoteTemplates = [
            "成功不是{終點}，而是{過程}的累積",
            "每一次的{挫折}都是{成長}的機會",
            "真正的{力量}來自於{內心}的堅持",
            "當你{相信}自己時，{奇蹟}就會發生",
            "最大的{敵人}不是別人，而是{昨天的自己}"
        ];
    }

    // 模擬 AI 增強的腳本生成
    async enhanceScript(quote, theme, tone) {
        try {
            // 模擬 API 延遲
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const enhancedContent = this.generateEnhancedContent(quote, theme, tone);
            const suggestions = this.generateSuggestions(quote, theme);
            const visualElements = this.generateVisualElements(theme);
            
            return {
                enhancedScript: enhancedContent,
                suggestions: suggestions,
                visualElements: visualElements,
                confidence: Math.floor(Math.random() * 20) + 80, // 80-100% 信心度
                aiGenerated: true
            };
            
        } catch (error) {
            console.error('AI 增強失敗:', error);
            // 回退到基本功能
            return this.fallbackEnhancement(quote, theme, tone);
        }
    }

    // 生成增強內容
    generateEnhancedContent(quote, theme, tone) {
        const themeData = this.inspirationalThemes[theme];
        const randomKeyword = themeData.keywords[Math.floor(Math.random() * themeData.keywords.length)];
        const randomScenario = themeData.scenarios[Math.floor(Math.random() * themeData.scenarios.length)];
        
        const enhancedSections = {
            intro: this.generateEnhancedIntro(theme, randomKeyword),
            story: this.generateEnhancedStory(quote, theme, randomScenario),
            closing: this.generateEnhancedClosing(tone, randomKeyword),
            scenes: this.generateEnhancedScenes(theme, randomScenario)
        };
        
        return enhancedSections;
    }

    // 生成增強版開場白
    generateEnhancedIntro(theme, keyword) {
        const intros = {
            success: [
                `在追求${keyword}的路上，每個人都有屬於自己的故事...`,
                `${keyword}從來不是偶然，而是來自日復一日的堅持...`,
                `什麼是真正的${keyword}？讓我們從一個故事開始說起...`
            ],
            growth: [
                `${keyword}是生命中最美麗的過程，就像破繭而出的蝴蝶...`,
                `每一次的${keyword}都在告訴我們，改變是可能的...`,
                `在${keyword}的道路上，沒有終點，只有不斷的超越...`
            ],
            courage: [
                `${keyword}不是沒有恐懼，而是即使恐懼仍然前行...`,
                `真正的${keyword}來自於面對未知的決心...`,
                `${keyword}是一種選擇，選擇相信自己的力量...`
            ]
        };
        
        const themeIntros = intros[theme] || intros.success;
        return themeIntros[Math.floor(Math.random() * themeIntros.length)];
    }

    // 生成增強版故事
    generateEnhancedStory(quote, theme, scenario) {
        return `想像一下${scenario}中的主角，面對重重困難時的內心掙扎。${quote} 這句話不僅僅是文字，更是一種信念的力量。當我們真正理解並實踐這句話時，我們會發現內在的潛能被喚醒，原本看似不可能的事情變得觸手可及。這就是信念的力量，這就是${scenario}背後真正的意義。`;
    }

    // 生成增強版結尾
    generateEnhancedClosing(tone, keyword) {
        const closings = {
            inspirational: [
                `現在就是開始的最佳時機，讓${keyword}成為你前進的動力。`,
                `每一天都是新的開始，每一步都在創造屬於你的${keyword}故事。`,
                `相信自己，相信${keyword}的力量，你的未來從現在開始改寫。`
            ],
            motivational: [
                `行動起來吧！讓${keyword}不再只是夢想，而是你生活的實踐。`,
                `現在就動手，現在就改變，${keyword}就在你的手中。`,
                `不要等待完美的時機，因為每一個當下都是創造${keyword}的最佳時刻。`
            ],
            reflective: [
                `回頭看看走過的路，${keyword}一直都在那裡，等待著你去發現。`,
                `靜下心來想想，${keyword}的種子早已在心中萌芽。`,
                `或許${keyword}的真諦就在於這種深度的思考與感悟。`
            ]
        };
        
        const toneClosings = closings[tone] || closings.inspirational;
        return toneClosings[Math.floor(Math.random() * toneClosings.length)];
    }

    // 生成增強版場景
    generateEnhancedScenes(theme, scenario) {
        const sceneTemplates = {
            success: [
                "日出時分，城市天際線的鳥瞰鏡頭，象徵新的開始",
                "人物在辦公室深夜工作的剪影，專注而堅定",
                "從失敗到成功的蒙太奇，展現努力的過程",
                "成功時刻的慶祝場面，但重點在眼中的堅定"
            ],
            growth: [
                "植物從種子到參天大樹的延時攝影",
                "人物學習新技能的過程片段",
                "從困難到突破的轉變時刻",
                "蝴蝶破繭而出的隱喻畫面"
            ],
            courage: [
                "人物站在懸崖邊，面對廣闊天空的背影",
                "在黑暗中點亮第一盞燈的瞬間",
                "決定性時刻的慢鏡頭特寫",
                "從恐懼到勇敢的眼神變化"
            ]
        };
        
        return sceneTemplates[theme] || sceneTemplates.success;
    }

    // 生成建議
    generateSuggestions(quote, theme) {
        return {
            alternativeQuotes: this.generateAlternativeQuotes(quote, theme),
            improvementTips: this.generateImprovementTips(theme),
            relatedThemes: this.getRelatedThemes(theme)
        };
    }

    // 生成替代金句
    generateAlternativeQuotes(originalQuote, theme) {
        const alternatives = [];
        const themeData = this.inspirationalThemes[theme];
        
        for (let i = 0; i < 3; i++) {
            const template = this.quoteTemplates[Math.floor(Math.random() * this.quoteTemplates.length)];
            const keywords = themeData.keywords;
            
            let quote = template.replace(/\{[^}]+\}/g, (match) => {
                return keywords[Math.floor(Math.random() * keywords.length)];
            });
            
            alternatives.push(quote);
        }
        
        return alternatives;
    }

    // 生成改進建議
    generateImprovementTips(theme) {
        const tips = {
            success: [
                "考慮添加具體的成功指標或里程碑",
                "可以融入失敗後重新站起的元素",
                "強調過程而非結果的重要性"
            ],
            growth: [
                "加入個人成長的具體例子",
                "可以對比過去和現在的改變",
                "強調學習和適應的重要性"
            ],
            courage: [
                "描述克服具體恐懼的情境",
                "可以加入支持和鼓勵的元素",
                "強調勇氣是可以培養的品質"
            ]
        };
        
        return tips[theme] || tips.success;
    }

    // 獲取相關主題
    getRelatedThemes(currentTheme) {
        const relationships = {
            success: ['growth', 'courage'],
            growth: ['success', 'courage'],
            courage: ['success', 'growth']
        };
        
        return relationships[currentTheme] || [];
    }

    // 生成視覺元素建議
    generateVisualElements(theme) {
        const elements = {
            success: {
                colors: ['#FFD700', '#FF6B35', '#1E3A8A'],
                fonts: ['現代感強的無襯線字體', '粗體標題字型'],
                effects: ['金色光芒特效', '上升箭頭動畫', '光線追蹤效果']
            },
            growth: {
                colors: ['#22C55E', '#84CC16', '#0EA5E9'],
                fonts: ['自然有機感的字體', '手寫風格字型'],
                effects: ['生長動畫', '漸變色過渡', '粒子效果']
            },
            courage: {
                colors: ['#DC2626', '#F59E0B', '#7C3AED'],
                fonts: ['力量感的粗體字', '英雄主義風格字型'],
                effects: ['火焰特效', '閃電動畫', '光劍效果']
            }
        };
        
        return elements[theme] || elements.success;
    }

    // 回退增強功能（當 AI API 不可用時）
    fallbackEnhancement(quote, theme, tone) {
        return {
            enhancedScript: {
                intro: `關於${theme}的思考...`,
                story: `${quote} 這句話蕴含着深刻的智慧...`,
                closing: "讓我們一起踐行這個理念。",
                scenes: ["基本場景描述"]
            },
            suggestions: {
                alternativeQuotes: ["建議功能暫時不可用"],
                improvementTips: ["請稍後重試"],
                relatedThemes: []
            },
            visualElements: {
                colors: ['#333333'],
                fonts: ['默認字體'],
                effects: ['基本效果']
            },
            confidence: 60,
            aiGenerated: false
        };
    }

    // 生成智能金句建議
    async generateSmartQuotes(theme, mood, length = 5) {
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const themeData = this.inspirationalThemes[theme];
            const quotes = [];
            
            for (let i = 0; i < length; i++) {
                const template = this.quoteTemplates[Math.floor(Math.random() * this.quoteTemplates.length)];
                const keywords = themeData.keywords;
                
                let quote = template.replace(/\{[^}]+\}/g, () => {
                    return keywords[Math.floor(Math.random() * keywords.length)];
                });
                
                quotes.push({
                    text: quote,
                    theme: theme,
                    confidence: Math.floor(Math.random() * 20) + 80,
                    popularity: Math.floor(Math.random() * 100)
                });
            }
            
            return quotes.sort((a, b) => b.confidence - a.confidence);
            
        } catch (error) {
            console.error('智能金句生成失敗:', error);
            return [];
        }
    }

    // 分析使用者輸入的金句
    async analyzeQuote(quote) {
        try {
            await new Promise(resolve => setTimeout(resolve, 600));
            
            const analysis = {
                sentiment: this.analyzeSentiment(quote),
                themes: this.detectThemes(quote),
                emotionalImpact: Math.floor(Math.random() * 30) + 70,
                suggestions: this.getQuoteImprovementSuggestions(quote),
                keywords: this.extractKeywords(quote)
            };
            
            return analysis;
            
        } catch (error) {
            console.error('金句分析失敗:', error);
            return null;
        }
    }

    // 情感分析
    analyzeSentiment(quote) {
        const positiveWords = ['成功', '成長', '勇氣', '希望', '夢想', '堅持', '努力', '相信'];
        const negativeWords = ['失敗', '困難', '挫折', '恐懼'];
        
        let positive = 0;
        let negative = 0;
        
        positiveWords.forEach(word => {
            if (quote.includes(word)) positive++;
        });
        
        negativeWords.forEach(word => {
            if (quote.includes(word)) negative++;
        });
        
        if (positive > negative) return 'positive';
        if (negative > positive) return 'negative';
        return 'neutral';
    }

    // 檢測主題
    detectThemes(quote) {
        const themes = [];
        
        Object.keys(this.inspirationalThemes).forEach(theme => {
            const keywords = this.inspirationalThemes[theme].keywords;
            const matches = keywords.filter(keyword => quote.includes(keyword));
            
            if (matches.length > 0) {
                themes.push({
                    theme: theme,
                    confidence: (matches.length / keywords.length) * 100,
                    matchedKeywords: matches
                });
            }
        });
        
        return themes.sort((a, b) => b.confidence - a.confidence);
    }

    // 提取關鍵詞
    extractKeywords(quote) {
        const allKeywords = Object.values(this.inspirationalThemes)
            .flatMap(theme => theme.keywords);
        
        return allKeywords.filter(keyword => quote.includes(keyword));
    }

    // 獲取金句改進建議
    getQuoteImprovementSuggestions(quote) {
        const suggestions = [];
        
        if (quote.length < 10) {
            suggestions.push("金句可以更具體一些，增加更多細節");
        }
        
        if (quote.length > 50) {
            suggestions.push("金句可以更簡潔，突出核心訊息");
        }
        
        if (!quote.includes('你') && !quote.includes('我')) {
            suggestions.push("可以加入人稱代詞，讓金句更有親和力");
        }
        
        const keywords = this.extractKeywords(quote);
        if (keywords.length === 0) {
            suggestions.push("可以加入更多勵志關鍵詞，增強激勵效果");
        }
        
        return suggestions;
    }
}

// 導出單例實例
export const aiService = new AIService();
export default AIService;