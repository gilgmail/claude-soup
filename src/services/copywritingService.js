// src/services/copywritingService.js
import { aiService } from './aiService';

/**
 * 生成800-1000字的長文案
 * @param {Object} params - 文案生成參數
 * @param {string} params.topic - 主題或產品
 * @param {string} params.theme - 文案類型 (product/service/lifestyle/business)
 * @param {string} params.tone - 語調 (professional/friendly/urgent/creative)
 * @param {number} params.wordCount - 目標字數 (800-1000)
 * @param {boolean} params.useAI - 是否使用 AI 增強
 * @returns {Object} - 生成的長文案
 */
export async function generateCopywriting({ topic, theme = 'product', tone = 'professional', wordCount = 800, useAI = true }) {
    if (!topic) {
        throw new Error("主題不能為空");
    }

    // 基礎文案結構
    const baseStructure = {
        hook: generateHook(topic, theme),
        problemAwareness: generateProblemAwareness(topic, theme),
        solutionIntro: generateSolutionIntro(topic, theme),
        benefitsDetails: generateBenefitsDetails(topic, theme, wordCount),
        socialProof: generateSocialProof(topic, theme),
        callToAction: generateCallToAction(topic, theme, tone),
        wordCount: 0,
        aiEnhanced: false
    };

    // 計算基礎字數
    let totalWords = calculateWordCount(baseStructure);
    
    // AI 增強功能
    if (useAI) {
        try {
            const aiEnhancement = await aiService.enhanceCopywriting(topic, theme, tone, wordCount);
            
            if (aiEnhancement.aiGenerated) {
                const enhancedCopy = expandToTargetLength(baseStructure, aiEnhancement, wordCount);
                
                return {
                    ...enhancedCopy,
                    wordCount: calculateWordCount(enhancedCopy),
                    aiEnhanced: true,
                    aiConfidence: aiEnhancement.confidence,
                    suggestions: aiEnhancement.suggestions,
                    structureAnalysis: aiEnhancement.structureAnalysis
                };
            }
        } catch (error) {
            console.error('AI 增強失敗，使用基礎版本:', error);
        }
    }

    // 擴展到目標字數
    const expandedCopy = expandToTargetLength(baseStructure, null, wordCount);
    
    return {
        ...expandedCopy,
        wordCount: calculateWordCount(expandedCopy),
        aiEnhanced: false
    };
}

// 生成吸引人的標題/開頭
function generateHook(topic, theme) {
    const hooks = {
        product: [
            `你是否曾經因為選錯${topic}而感到後悔？`,
            `在眾多${topic}中，如何找到真正適合你的那一個？`,
            `為什麼越來越多人選擇${topic}？答案可能超出你的想像。`,
            `關於${topic}，有個秘密大多數人都不知道...`
        ],
        service: [
            `尋找專業${topic}服務？你來對地方了。`,
            `為什麼選擇我們的${topic}服務？讓數據告訴你答案。`,
            `在${topic}領域，專業與普通的差別在哪裡？`,
            `想要真正解決${topic}問題？先聽聽我們怎麼說。`
        ],
        lifestyle: [
            `生活可以更美好，從選擇對的${topic}開始。`,
            `你值得擁有更好的${topic}體驗。`,
            `改變生活品質，有時只需要一個關於${topic}的決定。`,
            `為什麼懂得享受的人都選擇${topic}？`
        ],
        business: [
            `在${topic}市場中，機會總是留給準備好的人。`,
            `想在${topic}領域取得突破？時機就是現在。`,
            `成功的${topic}投資，需要的不只是資金，更是眼光。`,
            `為什麼聰明的投資者都關注${topic}？`
        ]
    };
    
    const themeHooks = hooks[theme] || hooks.product;
    return themeHooks[Math.floor(Math.random() * themeHooks.length)];
}

// 生成問題意識段落
function generateProblemAwareness(topic, theme) {
    const problems = {
        product: `市面上的${topic}琳琅滿目，但真正能滿足需求的卻寥寥無幾。許多消費者在購買後才發現，產品與期待之間存在巨大落差。品質不穩定、功能不實用、售後服務不到位...這些問題讓人頭疼不已。`,
        service: `尋找可靠的${topic}服務並不容易。市場上充斥著各種承諾，但真正能兌現的服務商屈指可數。溝通不良、交付延遲、效果不達標...這些經歷讓人對服務品質失去信心。`,
        lifestyle: `忙碌的生活讓我們常常忽略了品質的重要性。將就使用的${topic}，不僅影響使用體驗，更可能影響生活品質。為什麼不給自己一個提升生活格調的機會？`,
        business: `在競爭激烈的市場中，選擇錯誤的${topic}方案可能導致巨大損失。時間成本、機會成本、資金成本...每一個決策都關係著企業的未來發展。`
    };
    
    return problems[theme] || problems.product;
}

// 生成解決方案介紹
function generateSolutionIntro(topic, theme) {
    const solutions = {
        product: `正是基於這些痛點，我們重新定義了${topic}的標準。經過無數次的測試與改良，我們打造出了這款真正以用戶需求為核心的產品。`,
        service: `我們深知客戶的需求與痛點，因此建立了一套完整的${topic}服務體系。從初期諮詢到後期維護，每一個環節都經過精心設計。`,
        lifestyle: `我們相信，每個人都應該擁有更好的${topic}體驗。這不只是一個產品，更是一種生活態度的體現。`,
        business: `基於多年的行業經驗，我們開發了這套${topic}解決方案。它不僅能解決當前問題，更能為未來發展奠定基礎。`
    };
    
    return solutions[theme] || solutions.product;
}

// 生成詳細效益說明（可擴展至目標字數）
function generateBenefitsDetails(topic, theme, targetWords) {
    const baseBenefits = {
        product: [
            `卓越品質：採用業界最高標準的材料與工藝，確保${topic}的持久耐用。每一個細節都經過嚴格把關，只為給您最好的使用體驗。`,
            `人性化設計：深入了解用戶習慣，設計出真正符合使用需求的${topic}。操作簡便，功能實用，讓您的每一次使用都充滿愉悅。`,
            `全方位支援：購買只是服務的開始。我們提供完善的售前諮詢、售中指導、售後保障，讓您使用無憂。`,
            `不斷創新：我們持續投入研發，確保${topic}始終保持領先地位。定期的功能更新與改良，讓您的投資持續增值。`
        ],
        service: [
            `專業團隊：由行業資深專家組成的服務團隊，擁有豐富的實戰經驗。無論遇到什麼挑戰，我們都能提供專業的${topic}解決方案。`,
            `客製化方案：我們深知每個客戶的需求都是獨特的。因此，我們提供量身訂製的${topic}服務，確保完美符合您的具體要求。`,
            `高效執行：標準化的作業流程，確保服務品質的穩定性。同時，我們注重效率，讓您的${topic}需求得到快速響應。`,
            `持續優化：服務不是一次性的，而是持續性的。我們會根據效果反饋，不斷優化服務內容，確保最佳成果。`
        ],
        lifestyle: [
            `品質生活：選擇優質的${topic}，是對自己生活品質的投資。它不僅提升使用體驗，更展現個人品味與格調。`,
            `舒適體驗：每一次使用都是一種享受。精心設計的${topic}，讓日常生活變得更加舒適愉悅。`,
            `長期價值：投資於品質，就是投資於未來。優質的${topic}使用壽命更長，長期來看更加經濟實惠。`,
            `個人風格：${topic}不僅是實用工具，更是個人風格的體現。選擇適合的${topic}，彰顯您的獨特品味。`
        ],
        business: [
            `提升效率：專業的${topic}方案能顯著提升工作效率，讓您在競爭中保持領先優勢。`,
            `降低成本：通過優化流程和提高效率，${topic}方案能有效降低營運成本，提高利潤空間。`,
            `風險管控：專業的風險評估與管控機制，確保${topic}投資的安全性與穩定性。`,
            `未來發展：${topic}不僅解決當前問題，更為未來發展奠定基礎，是企業成長的重要投資。`
        ]
    };
    
    return baseBenefits[theme] || baseBenefits.product;
}

// 生成社會證明
function generateSocialProof(topic, theme) {
    const proofs = {
        product: `已有超過10,000名用戶選擇了我們的${topic}，滿意度高達98%。許多用戶反饋，這是他們使用過最好的${topic}產品。`,
        service: `我們已為超過500家企業提供${topic}服務，成功案例遍布各行各業。客戶續約率達95%，是業界的領先水平。`,
        lifestyle: `數千位追求品質生活的消費者都選擇了我們的${topic}，並在社交媒體上分享他們的美好體驗。`,
        business: `包括多家知名企業在內，已有數百家公司採用我們的${topic}方案，並獲得顯著的業務增長。`
    };
    
    return proofs[theme] || proofs.product;
}

// 生成行動號召
function generateCallToAction(topic, theme, tone) {
    const ctas = {
        professional: `現在就聯繫我們，了解更多關於${topic}的詳細資訊。我們的專業顾問將為您提供免費諮詢，協助您做出最適合的選擇。`,
        friendly: `還在猶豫嗎？不妨先了解看看！我們很樂意為您介紹${topic}的更多細節，沒有壓力，只有真誠的建議。`,
        urgent: `限時優惠，機不可失！現在行動，立即享受${topic}帶來的改變。數量有限，售完為止！`,
        creative: `準備好迎接${topic}帶來的全新體驗了嗎？加入我們，一起創造屬於您的美好故事！`
    };
    
    return ctas[tone] || ctas.professional;
}

// 計算文字數量
function calculateWordCount(structure) {
    let totalWords = 0;
    
    if (typeof structure === 'string') {
        return structure.length;
    }
    
    Object.values(structure).forEach(value => {
        if (typeof value === 'string') {
            totalWords += value.length;
        } else if (Array.isArray(value)) {
            value.forEach(item => {
                if (typeof item === 'string') {
                    totalWords += item.length;
                }
            });
        }
    });
    
    return totalWords;
}

// 擴展到目標字數
function expandToTargetLength(baseStructure, aiEnhancement, targetWords) {
    const currentWords = calculateWordCount(baseStructure);
    
    if (currentWords >= targetWords) {
        return baseStructure;
    }
    
    // 需要擴充的字數
    const wordsNeeded = targetWords - currentWords;
    
    // 擴充策略：加入更多案例、詳細說明、附加價值
    const expandedStructure = { ...baseStructure };
    
    // 擴充效益詳情
    if (Array.isArray(expandedStructure.benefitsDetails)) {
        expandedStructure.benefitsDetails = [
            ...expandedStructure.benefitsDetails,
            generateAdditionalBenefits(baseStructure.hook, wordsNeeded)
        ];
    } else {
        expandedStructure.benefitsDetails = [
            expandedStructure.benefitsDetails,
            generateAdditionalBenefits(baseStructure.hook, wordsNeeded)
        ];
    }
    
    // 如果有 AI 增強內容，整合進去
    if (aiEnhancement && aiEnhancement.copywriting) {
        expandedStructure.aiInsights = aiEnhancement.copywriting;
    }
    
    return expandedStructure;
}

// 生成額外的效益說明
function generateAdditionalBenefits(topic, wordsNeeded) {
    const additionalContent = [
        `此外，我們還提供全方位的客戶支援服務。無論您在使用過程中遇到任何問題，我們的專業團隊都會及時為您解答。我們相信，優質的產品需要配合完善的服務，才能發揮最大價值。`,
        `我們的品牌承諾不僅體現在產品品質上，更體現在對客戶的長期承諾。我們提供延長保固、定期保養、免費升級等增值服務，確保您的投資得到最大保障。`,
        `選擇我們，您不只是購買一個產品或服務，更是加入一個重視品質與創新的社群。我們定期舉辦用戶聚會、分享會、教育訓練，讓您持續獲得最新資訊與使用技巧。`,
        `我們深信，成功的關鍵在於細節。從產品設計到客戶服務，從包裝配送到售後支援，每一個環節我們都力求完美。這種對細節的執著，正是我們能在競爭激烈的市場中脫穎而出的原因。`
    ];
    
    // 根據需要的字數選擇合適的內容
    let result = '';
    let wordsAdded = 0;
    
    for (const content of additionalContent) {
        if (wordsAdded < wordsNeeded) {
            result += content + ' ';
            wordsAdded += content.length;
        }
    }
    
    return result.trim();
}

export default generateCopywriting;