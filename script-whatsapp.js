
const whatsappQuestions = [
    {
        question: "1. Um familiar pede dinheiro por um número novo. Qual é a atitude correta?",
        answers: [
            "Fazer o Pix imediatamente.",
            "Confirmar a identidade por uma ligação para um número conhecido.",
            "Enviar seus dados pessoais."
        ],
        correct: 1,
        explanation: "Sempre confirme a identidade da pessoa antes de realizar qualquer transferência."
    },
    {
        question: "2. Alguém solicita o código recebido por SMS para confirmar um cadastro. O que fazer?",
        answers: [
            "Compartilhar o código.",
            "Enviar também sua senha.",
            "Não compartilhar o código com ninguém."
        ],
        correct: 2,
        explanation: "O código de confirmação é pessoal e pode permitir que outra pessoa acesse sua conta."
    },
    {
        question: "3. Você recebeu um link prometendo um prêmio. Qual é a melhor atitude?",
        answers: [
            "Não clicar e verificar a promoção nos canais oficiais.",
            "Acessar imediatamente.",
            "Compartilhar com seus contatos."
        ],
        correct: 0,
        explanation: "Promoções falsas são utilizadas para roubar informações e disseminar golpes."
    },
    {
        question: "4. Como aumentar a segurança da sua conta WhatsApp?",
        answers: [
            "Utilizar uma senha simples.",
            "Ativar a confirmação em duas etapas.",
            "Compartilhar seu código com familiares."
        ],
        correct: 1,
        explanation: "A confirmação em duas etapas adiciona uma camada extra de proteção à conta."
    },
    {
        question: "5. Você percebeu que alguém está utilizando sua conta sem autorização. O que fazer?",
        answers: [
            "Ignorar o problema.",
            "Apagar apenas as conversas.",
            "Tentar recuperar o acesso, avisar seus contatos e buscar os canais oficiais de suporte."
        ],
        correct: 2,
        explanation: "É importante agir rapidamente, recuperar a conta e alertar seus contatos para evitar novas vítimas."
    }
];

let whatsappIndex = 0;
let whatsappScore = 0;
let whatsappAnswered = false;

const wQuestion = document.getElementById("module-question");
const wAnswers = document.getElementById("module-answers");
const wFeedback = document.getElementById("module-feedback");
const wNext = document.getElementById("module-next");
const wResult = document.getElementById("module-result");

function showWhatsappQuestion() {
    whatsappAnswered = false;

    const item = whatsappQuestions[whatsappIndex];

    wQuestion.textContent = item.question;
    wAnswers.innerHTML = "";
    wFeedback.textContent = "";
    wNext.hidden = true;

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkWhatsappAnswer(index);
        });

        wAnswers.appendChild(button);
    });
}

function checkWhatsappAnswer(selected) {
    if (whatsappAnswered) return;

    whatsappAnswered = true;

    const item = whatsappQuestions[whatsappIndex];
    const buttons = wAnswers.querySelectorAll("button");

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
        whatsappScore++;
        wFeedback.textContent = "✓ Correto! " + item.explanation;
        wFeedback.style.color = "#14865e";
    } else {
        wFeedback.textContent = "✗ Não foi dessa vez. " + item.explanation;
        wFeedback.style.color = "#c0392b";
    }

    wNext.hidden = false;

    if (whatsappIndex === whatsappQuestions.length - 1) {
        wNext.textContent = "Finalizar treinamento";
    }
}

function nextWhatsappQuestion() {
    whatsappIndex++;

    if (whatsappIndex < whatsappQuestions.length) {
        showWhatsappQuestion();
    } else {
        finishWhatsappTraining();
    }
}

function finishWhatsappTraining() {
        localStorage.setItem("modulo1Concluido", "true");
    wQuestion.hidden = true;
    wAnswers.hidden = true;
    wFeedback.hidden = true;
    wNext.hidden = true;

    const percentage = Math.round(
        (whatsappScore / whatsappQuestions.length) * 100
    );

    let message;

    if (whatsappScore === 5) {
        message = "Excelente! Você demonstrou ótimo conhecimento sobre prevenção de golpes.";
    } else if (whatsappScore >= 3) {
        message = "Muito bem! Continue praticando as orientações de segurança.";
    } else {
        message = "Continue aprendendo. Revise o conteúdo e tente novamente!";
    }

    wResult.hidden = false;

    wResult.innerHTML = `
        <h2>Treinamento concluído!</h2>
        <p>Você acertou ${whatsappScore} de 5 perguntas.</p>
        <p>Aproveitamento: ${percentage}%</p>
        <p>${message}</p>
        <button id="retry-whatsapp" class="btn-primary">
            Refazer treinamento
        </button>
    `;

    document.getElementById("retry-whatsapp")
        .addEventListener("click", restartWhatsappTraining);
}

function restartWhatsappTraining() {
    whatsappIndex = 0;
    whatsappScore = 0;

    wQuestion.hidden = false;
    wAnswers.hidden = false;
    wFeedback.hidden = false;
    wResult.hidden = true;

    showWhatsappQuestion();
}

wNext.addEventListener("click", nextWhatsappQuestion);

showWhatsappQuestion();
