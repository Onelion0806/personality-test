// 1. 定義題目與選項
const questions = [
    {
        question: "1. 當你參加一個大型社交場合時，你的感受通常是？",
        options: [
            { text: "待一下就想回家，需要獨處充電", score: 1 },
            { text: "視情況而定，跟熟人聊天還算自在", score: 2 },
            { text: "感到興奮，喜歡認識新朋友與連結", score: 3 }
        ]
    },
    {
        question: "2. 辛苦工作一整週後，你最理想的休息方式是？",
        options: [
            { text: "獨自看書、看劇，享受安靜時光", score: 1 },
            { text: "找一兩個好朋友聚餐聊聊近況", score: 2 },
            { text: "參加熱鬧的聚會或出門大玩特玩", score: 3 }
        ]
    },
    {
        question: "3. 走在路上遇到不太熟的同事或同學時，你會？",
        options: [
            { text: "默默觀察，希望對方沒看到我", score: 1 },
            { text: "等對方先打招呼，再禮貌回應", score: 2 },
            { text: "主動揮手打招呼，輕鬆聊兩句", score: 3 }
        ]
    },
    {
        question: "4. 當你有一個新點子想表達時，你傾向？",
        options: [
            { text: "寫成文字或在腦中深思後才開口", score: 1 },
            { text: "先聽聽別人的意見，再給予回饋", score: 2 },
            { text: "直接說出來，邊說邊整理思考", score: 3 }
        ]
    },
    {
        question: "5. 你對週末計畫的安排通常是？",
        options: [
            { text: "最好完全沒有行程，待在家裡", score: 1 },
            { text: "一半時間獨處，一半時間留給朋友", score: 2 },
            { text: "排滿社交活動，不喜歡沒事做", score: 3 }
        ]
    }
];

// 2. 變數設定
let currentQuestionIndex = 0;
let totalScore = 0;

// 3. 抓取 HTML 元素
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress');

// 4. 開始測驗功能
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
});

// 5. 顯示題目功能
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    optionsContainer.innerHTML = ''; // 清空舊選項

    // 更新進度條
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // 產生選項按鈕
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(option.score));
        optionsContainer.appendChild(button);
    });
}

// 6. 選取選項功能
function selectOption(score) {
    totalScore += score;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 7. 顯示結果功能
function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-desc');

    if (totalScore <= 8) {
        resultTitle.innerText = "溫柔的深思者 (偏內向型)";
        resultDesc.innerText = "你喜歡在深思熟慮後行動，獨處是你的能量來源。這並非害羞，而是你更珍惜內心的平靜與深度的交流。";
    } else if (totalScore <= 11) {
        resultTitle.innerText = "靈活的變色龍 (平衡型)";
        resultDesc.innerText = "你具備極佳的適應力，能享受社交的樂趣，也懂得在安靜中與自己對話，能根據環境調整最舒服的狀態。";
    } else {
        resultTitle.innerText = "熱情的發光體 (偏外向型)";
        resultDesc.innerText = "你是天生的行動派，與人互動能讓你感到充滿活力！你喜歡分享想法，是團體中帶動氣氛的重要存在。";
    }
}

// 8. 重新測驗
restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    totalScore = 0;
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});
