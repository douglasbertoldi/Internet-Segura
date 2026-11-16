
const phishingQuestions = [
    {
        question: "1. Você recebeu um e-mail informando que sua conta será bloqueada se não clicar em um link. O que fazer?",
        answers: [
            "Clicar imediatamente para evitar o bloqueio.",
            "Verificar a informação diretamente no site ou aplicativo oficial.",
            "Informar sua senha pelo e-mail."
        ],
        correct: 1,
        explanation: "Correto! Acesse os canais oficiais diretamente. Mensagens que provocam urgência podem ser tentativas de phishing."
    },
    {
        question: "2. O que é phishing?",
        answers: [
            "Uma técnica utilizada para enganar pessoas e roubar informações.",
            "Um programa de proteção de computadores.",
            "Uma ferramenta para melhorar a velocidade da internet."
        ],
        correct: 0,
        explanation: "Phishing é uma técnica de fraude que busca obter informações confidenciais por meio de mensagens e páginas falsas."
    },
    {
        question: "3. Você recebeu um anexo inesperado de um remetente desconhecido. Qual é a atitude correta?",
        answers: [
            "Abrir o arquivo imediatamente.",
            "Encaminhar para todos os contatos.",
            "Não abrir e verificar a origem da mensagem."
        ],
        correct: 2,
        explanation: "Anexos inesperados podem conter arquivos maliciosos. Verifique a origem antes de qualquer interação."
    },
    {
        question: "4. Como identificar um possível e-mail falso?",
        answers: [
            "Conferindo o remetente, os links e o conteúdo da mensagem.",
            "Observando apenas o logotipo da empresa.",
            "Confiando em qualquer mensagem bem formatada."
        ],
        correct: 0,
        explanation: "Logotipos podem ser copiados. É importante verificar o endereço do remetente e a autenticidade dos links."
    },
    {
        question: "5. Você informou sua senha em uma página suspeita. O que deve fazer?",
        answers: [
            "Esperar para ver se acontece alguma coisa.",
            "Alterar a senha imediatamente por um canal oficial e revisar a segurança da conta.",
            "Compartilhar a senha com outra pessoa."
        ],
        correct: 1,
        explanation: "Troque a senha comprometida, encerre sessões desconhecidas e ative a autenticação em duas etapas."
    }
];

let phishingIndex = 0;
let phishingScore = 0;
let phishingAnswered = false;

const fQuestion = document.getElementById("module-question");
const fAnswers = document.getElementById("module-answers");
const fFeedback = document.getElementById("module-feedback");
const fNext = document.getElementById("module-next");
const fResult = document.getElementById("module-result");

function showPhishingQuestion() {
    phishingAnswered = false;

    const item = phishingQuestions[phishingIndex];

    fQuestion.textContent = item.question;
    fAnswers.innerHTML = "";
    fFeedback.textContent = "";
    fNext.hidden = true;

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkPhishingAnswer(index);
        });

        fAnswers.appendChild(button);
    });
}

function checkPhishingAnswer(selected) {
    if (phishingAnswered) return;

    phishingAnswered = true;

    const item = phishingQuestions[phishingIndex];
    const buttons = fAnswers.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === item.correct) {
            button.classList.add("correct");
        }

        if (index === selected && selected !== item.correct) {
            button.classList.add("incorrect");
        }
    });

    if (selected === item.correct) {
        phishingScore++;
        fFeedback.textContent = "✓ Correto! " + item.explanation;
        fFeedback.style.color = "#14865e";
    } else {
        fFeedback.textContent = "✗ Resposta incorreta. " + item.explanation;
        fFeedback.style.color = "#c0392b";
    }

    fNext.hidden = false;

    if (phishingIndex === phishingQuestions.length - 1) {
        fNext.textContent = "Finalizar treinamento";
    }
}

function nextPhishingQuestion() {
    phishingIndex++;

    if (phishingIndex < phishingQuestions.length) {
        showPhishingQuestion();
    } else {
        finishPhishingTraining();
    }
}

function finishPhishingTraining() {
    localStorage.setItem("modulo3Concluido", "true");
    fQuestion.hidden = true;
    fAnswers.hidden = true;
    fFeedback.hidden = true;
    fNext.hidden = true;

    const percentage = Math.round(
        (phishingScore / phishingQuestions.length) * 100
    );

    let message;

    if (phishingScore === 5) {
        message = "Excelente! Você demonstrou ótimo conhecimento sobre prevenção de phishing.";
    } else if (phishingScore >= 3) {
        message = "Muito bem! Continue aplicando os cuidados aprendidos.";
    } else {
        message = "Continue estudando! Revise o conteúdo e tente novamente.";
    }

    fResult.hidden = false;

    fResult.innerHTML = `
        <h2>Treinamento concluído!</h2>
        <p>Você acertou ${phishingScore} de 5 perguntas.</p>
        <p>Aproveitamento: ${percentage}%</p>
        <p>${message}</p>
        <button id="retry-phishing" class="btn-primary">
            Refazer treinamento
        </button>
    `;

    document.getElementById("retry-phishing")
        .addEventListener("click", restartPhishingTraining);
}

function restartPhishingTraining() {
    phishingIndex = 0;
    phishingScore = 0;

    fQuestion.hidden = false;
    fAnswers.hidden = false;
    fFeedback.hidden = false;
    fResult.hidden = true;

    showPhishingQuestion();
}

fNext.addEventListener("click", nextPhishingQuestion);

showPhishingQuestion();
