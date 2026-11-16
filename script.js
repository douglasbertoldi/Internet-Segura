
const questions = [
    {
        question: "1. Você recebe uma mensagem no WhatsApp de um familiar pedindo dinheiro emprestado. O que deve fazer?",
        answers: [
            "Transferir o dinheiro imediatamente.",
            "Confirmar a identidade da pessoa por uma ligação ou outro canal confiável.",
            "Enviar seus dados bancários."
        ],
        correct: 1,
        explanation: "Correto! Golpistas podem utilizar fotos e nomes de familiares. Sempre confirme a solicitação por outro canal."
    },
    {
        question: "2. Você recebeu um e-mail informando que sua conta bancária será bloqueada se não clicar em um link. O que fazer?",
        answers: [
            "Clicar no link para evitar o bloqueio.",
            "Responder ao e-mail com seus dados.",
            "Não clicar e verificar a situação diretamente no aplicativo ou canal oficial do banco."
        ],
        correct: 2,
        explanation: "Correto! Mensagens que provocam medo ou urgência podem ser tentativas de phishing."
    },
    {
        question: "3. Uma pessoa liga dizendo ser do banco e solicita o código recebido por SMS. Qual atitude é segura?",
        answers: [
            "Não compartilhar o código e encerrar a ligação.",
            "Informar o código para confirmar minha identidade.",
            "Enviar também minha senha."
        ],
        correct: 0,
        explanation: "Correto! Códigos de autenticação são pessoais e não devem ser compartilhados com terceiros."
    },
    {
        question: "4. Você encontrou uma loja virtual oferecendo um celular por um preço muito abaixo do mercado. O que fazer?",
        answers: [
            "Comprar imediatamente para aproveitar a oferta.",
            "Verificar a reputação da loja, seus dados e canais oficiais antes de comprar.",
            "Realizar o Pix sem conferir o destinatário."
        ],
        correct: 1,
        explanation: "Correto! Preços muito abaixo do mercado podem ser um sinal de fraude. Pesquise a loja antes de pagar."
    },
    {
        question: "5. Qual é uma boa prática para proteger suas contas na internet?",
        answers: [
            "Utilizar a mesma senha em todos os sites.",
            "Compartilhar senhas com amigos.",
            "Utilizar senhas fortes e autenticação em duas etapas."
        ],
        correct: 2,
        explanation: "Correto! Senhas exclusivas e autenticação em duas etapas aumentam a proteção das suas contas."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("quiz-result");

function showQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;
    answersElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.hidden = true;

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answersElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === question.correct) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && selectedIndex !== question.correct) {
            button.classList.add("incorrect");
        }
    });

    if (selectedIndex === question.correct) {
        score++;
        feedbackElement.textContent = "✓ Resposta correta! " + question.explanation;
        feedbackElement.style.color = "#14865e";
    } else {
        feedbackElement.textContent = "✗ Resposta incorreta. " + question.explanation;
        feedbackElement.style.color = "#c0392b";
    }

    nextButton.hidden = false;

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Ver meu resultado";
    }
}

function showResult() {
    questionElement.hidden = true;
    answersElement.hidden = true;
    feedbackElement.hidden = true;
    nextButton.hidden = true;

    const percentage = Math.round((score / questions.length) * 100);

    let message;

    if (score === questions.length) {
        message = "Excelente! Você demonstrou um ótimo conhecimento sobre segurança digital.";
    } else if (score >= 3) {
        message = "Muito bem! Você já conhece boas práticas, mas pode continuar aprendendo.";
    } else {
        message = "Continue estudando! Conhecer os golpes digitais é fundamental para se proteger.";
    }

    resultElement.hidden = false;

    resultElement.innerHTML = `
        <h2>Treinamento concluído!</h2>
        <p>Você acertou <strong>${score} de ${questions.length}</strong> perguntas.</p>
        <p>Seu aproveitamento foi de <strong>${percentage}%</strong>.</p>
        <p>${message}</p>
        <button id="restart-button" class="btn-primary">
            Refazer treinamento
        </button>
    `;

    document.getElementById("restart-button").addEventListener("click", restartQuiz);
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    questionElement.hidden = false;
    answersElement.hidden = false;
    feedbackElement.hidden = false;
    resultElement.hidden = true;

    showQuestion();
}

nextButton.addEventListener("click", nextQuestion);

showQuestion();
