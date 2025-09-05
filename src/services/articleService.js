// src/services/articleService.js
import { aiService } from './aiService';

class ArticleService {
    constructor() {
        this.categories = {
            成長: '個人成長與自我提升',
            勵志: '激勵人心與正能量',
            人生感悟: '人生哲理與智慧',
            愛與溫暖: '愛情親情與人際關係'
        };
        
        this.tones = {
            溫馨: 'warm',
            激勵: 'inspirational', 
            深刻: 'profound',
            輕鬆: 'casual'
        };
    }

    // 生成心靈雞湯文章
    async generateInspirationalArticle({ topic, category, tone, wordCount, useAI = false }) {
        try {
            let result;
            
            if (useAI && aiService) {
                // 使用 AI 增強版本
                result = await aiService.enhanceInspirationalArticle(topic, category, tone, wordCount);
                
                if (result && result.article) {
                    return {
                        ...result,
                        wordCount: this.countWords(this.formatArticle(result.article)),
                        aiEnhanced: true,
                        aiConfidence: result.confidence || 85
                    };
                }
            }
            
            // 基本版本生成
            const basicArticle = this.generateBasicArticle(topic, category, tone, wordCount);
            
            return {
                article: basicArticle,
                wordCount: this.countWords(this.formatArticle(basicArticle)),
                aiEnhanced: false,
                suggestions: {
                    alternativeTitles: this.generateAlternativeTitles(topic, category),
                    improvementTips: this.getWritingTips(category),
                    relatedTopics: this.getRelatedTopics(category)
                }
            };
            
        } catch (error) {
            console.error('文章生成失敗:', error);
            throw new Error('文章生成失敗，請重試');
        }
    }

    // 生成基本文章
    generateBasicArticle(topic, category, tone, targetWords) {
        const templates = this.getTemplates(category);
        
        return {
            title: this.generateTitle(topic, category),
            introduction: this.generateIntroduction(topic, category, tone),
            story: this.generateStory(topic, category, targetWords),
            insights: this.generateInsights(topic, category),
            reflection: this.generateReflection(topic, category),
            conclusion: this.generateConclusion(topic, tone),
            message: this.generateMessage(topic, tone)
        };
    }

    // 生成文章標題
    generateTitle(topic, category) {
        const titleTemplates = {
            成長: [
                `關於${topic}，我想對你說...`,
                `${topic}教會我的人生道理`,
                `從${topic}中學到的成長智慧`,
                `${topic}：每個人都需要知道的事`
            ],
            勵志: [
                `${topic}：相信自己的力量`,
                `當你覺得${topic}很困難時，請記住...`,
                `${topic}不是終點，而是起點`,
                `擁抱${topic}，創造屬於你的奇蹟`
            ],
            人生感悟: [
                `人生如${topic}，苦甜自知`,
                `關於${topic}的人生思考`,
                `${topic}中隱藏的人生智慧`,
                `生命中的${topic}時刻`
            ],
            愛與溫暖: [
                `愛如${topic}，溫暖人心`,
                `${topic}裡的愛與被愛`,
                `用心感受${topic}的溫度`,
                `${topic}：愛的另一種表達`
            ]
        };
        
        const templates = titleTemplates[category] || titleTemplates.成長;
        return templates[Math.floor(Math.random() * templates.length)];
    }

    // 生成開場段落
    generateIntroduction(topic, category, tone) {
        const introTemplates = {
            溫馨: `親愛的朋友，當我們談到${topic}時，總是充滿了溫暖與感動。在這個快節奏的世界裡，讓我們停下腳步，一起感受內心最真實的聲音。`,
            激勵: `你有沒有想過，${topic}其實是改變我們人生的關鍵？每個人心中都有一股力量，等待被喚醒。今天，就讓我們一起探索這個充滿可能性的話題。`,
            深刻: `在人生的長河中，${topic}如同一顆石子，激起層層漣漪。它不只是一個概念，更是我們理解自己、理解世界的重要視角。`,
            輕鬆: `嘿，朋友！讓我們輕鬆地聊聊${topic}這個話題。生活已經夠複雜了，不如用最簡單的方式來理解這些美好的事物。`
        };
        
        return introTemplates[tone] || introTemplates.溫馨;
    }

    // 生成故事內容
    generateStory(topic, category, targetWords) {
        const storyElements = this.getStoryElements(category);
        const mainStory = storyElements.stories[Math.floor(Math.random() * storyElements.stories.length)];
        
        // 基礎故事內容
        let story = mainStory.replace('{主題}', topic);
        
        // 擴展故事到目標字數
        const wordsPerParagraph = Math.ceil(targetWords * 0.7 / 3); // 故事佔70%，分3段
        
        const expandedParagraphs = [];
        
        // 第一段：背景設定
        expandedParagraphs.push(`${story} 這個故事讓我想起了生活中的許多時刻，那些看似平凡卻蘊含深意的瞬間。在我們每個人的生命中，都會遇到與${topic}相關的挑戰和機遇。有時候我們會迷茫，有時候我們會堅定，但無論如何，這些經歷都在塑造著我們成為更好的自己。`);
        
        // 第二段：深入探討
        expandedParagraphs.push(`當我們仔細思考${topic}的本質時，會發現它不僅僅是表面上看到的那樣。它代表著一種態度，一種選擇，一種面對生活的方式。每個人對於${topic}的理解都不盡相同，這正是人生多彩的地方。有人從中看到希望，有人從中學到堅韌，有人從中感受到愛與溫暖。`);
        
        // 第三段：個人感悟
        expandedParagraphs.push(`我們都在尋找屬於自己的${topic}答案。這個過程可能充滿挑戰，但也充滿收穫。重要的不是我們走得多快，而是我們是否在這個過程中成長，是否變得更加理解自己和他人。每一次的思考，每一次的嘗試，都在讓我們更接近內心的真實聲音。`);
        
        return expandedParagraphs.join('\n\n');
    }

    // 生成人生感悟
    generateInsights(topic, category) {
        const insightTemplates = {
            成長: [
                `${topic}教會我們，成長不是一蹴而就的過程`,
                `在${topic}中，我們學會了接受不完美的自己`,
                `每一次的${topic}經歷，都是生命給我們的禮物`
            ],
            勵志: [
                `${topic}告訴我們，困難只是成功路上的墊腳石`,
                `相信${topic}的力量，就是相信自己的無限可能`,
                `在${topic}面前，我們都是勇敢的戰士`
            ],
            人生感悟: [
                `${topic}讓我明白，人生的意義在於體驗而非結果`,
                `透過${topic}，我們看見了生命的真諦`,
                `${topic}是人生路上最好的老師`
            ],
            愛與溫暖: [
                `${topic}提醒我們，愛是世界上最強大的力量`,
                `在${topic}中，我們感受到被愛與愛人的幸福`,
                `${topic}告訴我們，溫暖總會戰勝寒冷`
            ]
        };
        
        const templates = insightTemplates[category] || insightTemplates.成長;
        return templates.slice(0, 2); // 返回2個感悟
    }

    // 生成反思段落
    generateReflection(topic, category) {
        const reflectionTemplates = {
            成長: `回想起與${topic}相關的這些經歷，我深深感受到成長的不易與珍貴。我們都在自己的道路上前行，或許步伐不同，但方向一致——都在尋找更好的自己。`,
            勵志: `每當想到${topic}，我的心中就充滿力量。這不是一種虛無的感覺，而是來自內心深處的堅定信念。我們每個人都有無限的潛能，只是需要被喚醒。`,
            人生感悟: `生命就像一本書，而${topic}是其中最精彩的章節之一。我們在其中學會思考，學會感受，學會珍惜每一個當下的美好。`,
            愛與溫暖: `${topic}讓我明白，這個世界之所以美好，是因為有愛的存在。無論走到哪裡，都要記得保持一顆溫暖的心，去愛，也去接受愛。`
        };
        
        return reflectionTemplates[category] || reflectionTemplates.成長;
    }

    // 生成結論
    generateConclusion(topic, tone) {
        const conclusionTemplates = {
            溫馨: `願我們都能在${topic}中找到屬於自己的溫暖與力量，在人生的路上互相扶持，共同成長。`,
            激勵: `相信自己，相信${topic}的力量！你的人生，由你自己書寫！`,
            深刻: `${topic}不僅是一個話題，更是我們理解生命、感受生活的重要途徑。`,
            輕鬆: `生活就是這樣，簡單而美好。願我們都能在${topic}中找到快樂的理由。`
        };
        
        return conclusionTemplates[tone] || conclusionTemplates.溫馨;
    }

    // 生成正能量訊息
    generateMessage(topic, tone) {
        const messageTemplates = {
            溫馨: `記住，你比想像中更強大，你值得所有美好的事物。`,
            激勵: `今天是新的開始，去創造屬於你的奇蹟吧！`,
            深刻: `人生的意義，在於我們如何對待每一個平凡的日子。`,
            輕鬆: `保持微笑，生活會對你微笑回應。`
        };
        
        return messageTemplates[tone] || messageTemplates.溫馨;
    }

    // 獲取故事元素
    getStoryElements(category) {
        const elements = {
            成長: {
                stories: [
                    "有一個年輕人，在面對{主題}時，曾經感到迷茫和困惑...",
                    "我認識一個朋友，她用自己的經歷告訴我{主題}的真正含義...",
                    "在一個普通的日子裡，我偶然遇到了一位老人，他關於{主題}的話改變了我的想法..."
                ]
            },
            勵志: {
                stories: [
                    "有一位運動員，在最困難的時刻，{主題}成為了他繼續前進的動力...",
                    "一個創業者的故事告訴我們，{主題}是成功路上最重要的品質...",
                    "當所有人都說不可能時，她用{主題}證明了奇蹟的存在..."
                ]
            },
            人生感悟: {
                stories: [
                    "坐在咖啡廳裡，看著窗外的行人，我突然對{主題}有了新的理解...",
                    "讀到一本書中關於{主題}的描述，我陷入了深深的思考...",
                    "在人生的某個轉折點上，{主題}讓我重新審視了自己的價值觀..."
                ]
            },
            愛與溫暖: {
                stories: [
                    "一個母親和孩子的故事，讓我明白了{主題}最純粹的樣子...",
                    "在醫院裡，我看到了{主題}最真實、最感人的表現...",
                    "一對老夫妻的日常生活，詮釋了{主題}最深刻的含義..."
                ]
            }
        };
        
        return elements[category] || elements.成長;
    }

    // 生成替代標題
    generateAlternativeTitles(topic, category) {
        const alternatives = [
            `${topic}：每個人心中的那道光`,
            `關於${topic}，我們都需要知道的事`,
            `在${topic}中尋找人生的答案`,
            `${topic}背後的深層意義`
        ];
        return alternatives.slice(0, 3);
    }

    // 獲取寫作技巧
    getWritingTips(category) {
        const tips = {
            成長: [
                '多使用具體的例子和故事來說明觀點',
                '從讀者的角度出發，讓內容更有共鳴',
                '結合個人經歷，讓文章更有真實感'
            ],
            勵志: [
                '使用積極正面的詞彙和語調',
                '設置明確的行動呼籲，激勵讀者採取行動',
                '加入數據或成功案例增強說服力'
            ],
            人生感悟: [
                '保持思考的深度，避免浮於表面',
                '運用比喻和類比讓抽象概念更易理解',
                '給讀者留下思考的空間'
            ],
            愛與溫暖: [
                '注重情感的表達，讓文字有溫度',
                '使用溫馨的故事和場景',
                '營造親切友善的寫作風格'
            ]
        };
        
        return tips[category] || tips.成長;
    }

    // 獲取相關主題
    getRelatedTopics(category) {
        const related = {
            成長: ['自我提升', '學習成長', '個人發展'],
            勵志: ['正能量', '夢想追求', '堅持不懈'],
            人生感悟: ['人生哲理', '生活智慧', '內心平靜'],
            愛與溫暖: ['感恩', '友情', '家庭溫暖']
        };
        
        return related[category] || related.成長;
    }

    // 格式化文章
    formatArticle(article) {
        if (!article) return '';
        
        let formatted = '';
        
        if (article.title) {
            formatted += `# ${article.title}\n\n`;
        }
        
        if (article.introduction) {
            formatted += `${article.introduction}\n\n`;
        }
        
        if (article.story) {
            formatted += `${article.story}\n\n`;
        }
        
        if (article.insights && Array.isArray(article.insights)) {
            formatted += `## 人生感悟\n\n`;
            article.insights.forEach(insight => {
                formatted += `💭 ${insight}\n\n`;
            });
        }
        
        if (article.reflection) {
            formatted += `## 深度思考\n\n${article.reflection}\n\n`;
        }
        
        if (article.conclusion) {
            formatted += `${article.conclusion}\n\n`;
        }
        
        if (article.message) {
            formatted += `**✨ ${article.message}**\n`;
        }
        
        return formatted;
    }

    // 計算字數
    countWords(text) {
        if (!text) return 0;
        // 移除 markdown 標記和特殊字符，只計算中文字符數
        const cleanText = text.replace(/[#*`\-\n\r]/g, '').replace(/[a-zA-Z0-9\s]/g, '');
        return cleanText.length;
    }

    // 獲取模板
    getTemplates(category) {
        return {
            category: category,
            description: this.categories[category]
        };
    }
}

// 導出單例實例
export const articleService = new ArticleService();
export default ArticleService;