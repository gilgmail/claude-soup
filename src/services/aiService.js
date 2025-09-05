// src/services/aiService.js

class AIService {
    constructor() {
        // 模擬 AI API 配置
        this.baseURL = 'https://api.openai.com/v1';
        this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';
        
        // 生人文案主題庫
        this.copywritingThemes = {
            product: {
                keywords: ['品質', '創新', '價值', '體驗', '信賴', '專業', '卓越', '突破'],
                scenarios: ['產品發布', '品牌故事', '用戶見證', '技術優勢', '市場領導'],
                hooks: ['你知道嗎？', '想像一下...', '有沒有想過', '是時候了', '別再等了']
            },
            service: {
                keywords: ['專業', '貼心', '效率', '解決', '支援', '服務', '滿意', '安心'],
                scenarios: ['服務介紹', '客戶案例', '問題解決', '專業諮詢', '售後保障'],
                hooks: ['為什麼選擇我們？', '讓我們來幫您', '您的需求我們懂', '專業團隊為您服務', '一站式解決方案']
            },
            lifestyle: {
                keywords: ['生活', '品味', '享受', '質感', '美好', '精緻', '優雅', '舒適'],
                scenarios: ['生活方式', '品味提升', '休閒娛樂', '居家生活', '個人風格'],
                hooks: ['生活可以更美好', '品味從選擇開始', '給自己一個理由', '值得擁有的美好', '讓生活更精彩']
            },
            business: {
                keywords: ['商機', '成長', '效益', '投資', '收益', '策略', '競爭', '優勢'],
                scenarios: ['商業機會', '投資方案', '合作提案', '市場分析', '競爭優勢'],
                hooks: ['抓住商機', '投資未來', '合作共贏', '領先競爭', '創造價值']
            }
        };
        
        // 文案結構模板庫
        this.copyTemplates = {
            hooks: [
                "你是否曾經想過{問題}？",
                "在{場景}中，最重要的是什麼？",
                "為什麼{目標對象}都選擇{解決方案}？",
                "如果有一個方法能讓你{期望結果}...",
                "想像一下{理想情境}的感覺"
            ],
            benefits: [
                "不僅僅是{基本功能}，更是{深層價值}",
                "從{現況}到{理想狀態}的完美轉換",
                "讓{目標}變得{形容詞}又{形容詞}",
                "專為{目標對象}量身打造的{解決方案}"
            ],
            proofs: [
                "超過{數字}的用戶見證了{效果}",
                "經過{時間}的市場驗證",
                "{權威機構}認證推薦",
                "成功案例遍布{範圍}"
            ],
            actions: [
                "現在就開始{行動}，改變從今天開始",
                "把握{時機}，機會不等人",
                "加入{群體}，一起{目標}",
                "聯繫我們，讓專業為您{服務內容}"
            ]
        };
    }

    // 模擬 AI 增強的文案生成
    async enhanceCopywriting(topic, theme, tone, wordCount = 800) {
        try {
            // 模擬 API 延遲
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const longFormContent = this.generateLongFormCopywriting(topic, theme, tone, wordCount);
            const suggestions = this.generateCopywritingSuggestions(topic, theme);
            const structureAnalysis = this.analyzeCopywritingStructure(longFormContent);
            
            return {
                copywriting: longFormContent,
                suggestions: suggestions,
                structureAnalysis: structureAnalysis,
                confidence: Math.floor(Math.random() * 20) + 80, // 80-100% 信心度
                aiGenerated: true
            };
            
        } catch (error) {
            console.error('AI 增強失敗:', error);
            // 回退到基本功能
            return this.fallbackEnhancement(topic, theme, tone);
        }
    }

    // 生成長文案內容
    generateLongFormCopywriting(topic, theme, tone, wordCount) {
        const themeData = this.copywritingThemes[theme] || this.copywritingThemes.product;
        const hooks = themeData.hooks || themeData.keywords;
        const scenarios = themeData.scenarios;
        
        const structure = {
            headline: this.generateHeadline(topic, theme, hooks),
            introduction: this.generateIntroduction(topic, theme, tone),
            mainContent: this.generateMainContent(topic, theme, scenarios, wordCount),
            benefits: this.generateBenefitsList(topic, theme),
            proof: this.generateSocialProof(topic, theme),
            conclusion: this.generateConclusion(topic, tone),
            cta: this.generateCTA(topic, tone)
        };
        
        return structure;
    }

    // 生成標題
    generateHeadline(topic, theme, hooks) {
        const headlines = [
            `革新${topic}體驗，創造無限可能`,
            `專業${topic}解決方案，值得信賴的選擇`,
            `${topic}新標準，引領行業變革`,
            `選擇優質${topic}，投資美好未來`
        ];
        return headlines[Math.floor(Math.random() * headlines.length)];
    }

    // 生成介紹段落
    generateIntroduction(topic, theme, tone) {
        const intros = {
            professional: `在當今競爭激烈的市場環境中，選擇合適的${topic}至關重要。我們深入了解客戶需求，致力於提供最專業的解決方案。`,
            friendly: `你好！很高興與你分享關於${topic}的精彩內容。讓我們一起探索這個充滿機會的領域吧！`,
            urgent: `機會稍縱即逝！現在正是選擇優質${topic}的最佳時機。不要讓猶豫成為成功路上的絆腳石。`,
            creative: `想像一個全新的${topic}世界，在這裡，創新與品質完美融合，每一個細節都在訴說著卓越的故事。`
        };
        return intros[tone] || intros.professional;
    }

    // 生成主要內容
    generateMainContent(topic, theme, scenarios, targetWords) {
        const baseContent = scenarios.map(scenario => {
            return `在${scenario}領域，我們的${topic}展現出卓越的表現。通過深入的市場研究和技術創新，我們不斷提升產品品質，確保能夠滿足各種複雜需求。我們的專業團隊擁有豐富的行業經驗，能夠為客戶提供量身訂製的解決方案。`;
        });
        
        // 擴展內容以達到目標字數
        const expandedContent = [];
        const wordsPerSection = Math.ceil(targetWords * 0.6 / baseContent.length); // 主內容佔 60%
        
        baseContent.forEach((content, index) => {
            let expandedSection = content;
            
            // 根據主題添加特定內容
            switch (theme) {
                case 'product':
                    expandedSection += `我們的${topic}採用先進的製造工藝和優質材料，確保產品的耐用性和可靠性。每一個產品都經過嚴格的品質檢測，只有達到我們嚴苛標準的產品才能與客戶見面。`;
                    break;
                case 'service':
                    expandedSection += `我們的服務團隊24小時待命，隨時準備為客戶解決各種${topic}相關問題。我們相信，優質的服務是建立長期合作關係的基礎。`;
                    break;
                case 'lifestyle':
                    expandedSection += `選擇我們的${topic}，就是選擇一種更加精緻的生活方式。我們注重每一個細節，力求為您創造最舒適的使用體驗。`;
                    break;
                case 'business':
                    expandedSection += `在商業環境中，效率與成本控制同樣重要。我們的${topic}方案能夠幫助企業優化流程，提高工作效率，同時降低營運成本。`;
                    break;
            }
            
            expandedContent.push(expandedSection);
        });
        
        return expandedContent.join('\n\n');
    }

    // 生成效益清單
    generateBenefitsList(topic, theme) {
        const benefits = {
            product: [
                `高品質保證：每一個${topic}都經過嚴格品質控制`,
                `創新設計：融合最新技術與人性化設計理念`,
                `長期價值：投資於品質，享受長久效益`,
                `專業支援：完善的售前售後服務體系`
            ],
            service: [
                `專業團隊：由行業專家組成的服務團隊`,
                `客製化方案：根據客戶需求量身訂製`,
                `高效執行：標準化流程確保服務品質`,
                `持續優化：根據反饋不斷改進服務`
            ],
            lifestyle: [
                `品質生活：提升日常生活品質`,
                `個人風格：彰顯獨特品味與格調`,
                `舒適體驗：注重使用者感受`,
                `長期投資：品質選擇的持續回報`
            ],
            business: [
                `效率提升：優化業務流程`,
                `成本控制：有效降低營運成本`,
                `競爭優勢：在市場中保持領先`,
                `風險管理：專業的風險評估與控制`
            ]
        };
        
        return benefits[theme] || benefits.product;
    }

    // 生成社會證明
    generateSocialProof(topic, theme) {
        const proofs = [
            `超過10,000名滿意客戶選擇了我們的${topic}`,
            `98%的客戶推薦率證明了我們的專業水準`,
            `榮獲多項行業認證與獎項`,
            `成功案例遍布各個行業領域`
        ];
        return proofs[Math.floor(Math.random() * proofs.length)];
    }

    // 生成結論
    generateConclusion(topic, tone) {
        const conclusions = {
            professional: `綜合以上所述，選擇我們的${topic}是明智的投資決策。我們承諾為每一位客戶提供最優質的產品與服務。`,
            friendly: `希望這些資訊對你有所幫助！如果你對我們的${topic}感興趣，歡迎隨時與我們聯繫。`,
            urgent: `時間寶貴，機會難得！現在就採取行動，選擇我們的${topic}，開啟成功之路！`,
            creative: `讓我們一起創造屬於你的${topic}傳奇故事，在這個充滿可能性的旅程中，我們將是你最可靠的夥伴。`
        };
        return conclusions[tone] || conclusions.professional;
    }

    // 生成行動號召
    generateCTA(topic, tone) {
        const ctas = {
            professional: `立即聯繫我們的專業顧問，了解更多${topic}詳細資訊。`,
            friendly: `想要了解更多嗎？歡迎與我們聊聊！`,
            urgent: `機會有限！立即行動，把握${topic}優惠！`,
            creative: `準備好開始你的${topic}冒險之旅了嗎？`
        };
        return ctas[tone] || ctas.professional;
    }

    // 生成文案建議
    generateCopywritingSuggestions(topic, theme) {
        return {
            alternativeHeadlines: this.generateAlternativeHeadlines(topic, theme),
            improvementTips: this.getCopywritingTips(theme),
            relatedThemes: this.getRelatedThemes(theme),
            keywordSuggestions: this.getKeywordSuggestions(topic, theme)
        };
    }

    // 生成替代標題
    generateAlternativeHeadlines(topic, theme) {
        const alternatives = [
            `突破性${topic}解決方案`,
            `重新定義${topic}標準`,
            `專業${topic}，品質保證`,
            `創新${topic}，超越期待`,
            `值得信賴的${topic}夥伴`
        ];
        return alternatives.slice(0, 3);
    }

    // 獲取文案建議
    getCopywritingTips(theme) {
        const tips = {
            product: [
                '強調產品的獨特賣點與競爭優勢',
                '加入具體的數據與事實支撐',
                '突出客戶使用後的具體效益'
            ],
            service: [
                '展示服務團隊的專業能力',
                '提供具體的服務流程說明',
                '強調客戶成功案例與見證'
            ],
            lifestyle: [
                '營造情感共鳴與美好想像',
                '強調生活品質的提升',
                '突出個人品味與風格'
            ],
            business: [
                '量化商業價值與投資回報',
                '提供行業分析與市場數據',
                '強調競爭優勢與風險控制'
            ]
        };
        return tips[theme] || tips.product;
    }

    // 獲取關鍵詞建議
    getKeywordSuggestions(topic, theme) {
        const themeData = this.copywritingThemes[theme] || this.copywritingThemes.product;
        return themeData.keywords.slice(0, 5);
    }

    // 分析文案結構
    analyzeCopywritingStructure(content) {
        return {
            structure: '完整的文案結構包含標題、介紹、主要內容、效益、證明、結論和行動號召',
            readability: '內容結構清晰，邏輯性強，易於理解',
            engagement: '採用多種修辭手法，增強讀者參與感',
            persuasion: '運用說服力原則，有效引導讀者採取行動'
        };
    }

    // 回退增強功能
    fallbackEnhancement(topic, theme, tone) {
        return {
            copywriting: {
                headline: `關於${topic}的專業方案`,
                introduction: `我們為您提供優質的${topic}服務`,
                mainContent: `專業、可靠、值得信賴的${topic}解決方案`,
                benefits: ['專業服務', '品質保證', '客戶滿意'],
                proof: '眾多客戶的信賴選擇',
                conclusion: `選擇我們，選擇專業的${topic}服務`,
                cta: '立即聯繫我們了解更多'
            },
            suggestions: {
                alternativeHeadlines: ['建議功能暫時不可用'],
                improvementTips: ['請稍後重試'],
                relatedThemes: [],
                keywordSuggestions: []
            },
            structureAnalysis: {
                structure: '基本結構',
                readability: '標準',
                engagement: '一般',
                persuasion: '普通'
            },
            confidence: 60,
            aiGenerated: false
        };
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