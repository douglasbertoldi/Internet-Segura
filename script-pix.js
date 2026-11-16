
const pixQuestions = [
    {
        question: "1. Uma pessoa apresenta um comprovante de Pix e pede a entrega de um produto. O que você deve fazer?",
        answers: [
            "Entregar imediatamente.",
            "Confiar na imagem do comprovante.",
            "Conferir se o dinheiro realmente entrou no extrato bancário."
        ],
        correct: 2,
        explanation: "Sempre confirme o recebimento diretamente no aplicativo ou extrato do banco."
    },
    {
        question: "2. Uma pessoa que diz ser do banco solicita sua senha e um código recebido por SMS. Qual é a atitude correta?",
        answers: [
            "Informar os dados para proteger a conta.",
            "Não compartilhar as informações e procurar o banco pelos canais oficiais.",
            "Realizar uma transferência para uma conta indicada."
        ],
        correct: 1,
        explanation: "Nunca compartilhe senhas ou códigos de autenticação com supostos atendentes."
    },
    {
        question: "3. Alguém diz que enviou um Pix por engano e pede a devolução para outra conta. O que fazer?",
        answers: [
            "Fazer um novo Pix para a conta indicada.",
            "Ignorar o extrato bancário.",
            "Verificar o recebimento e, se confirmado, utilizar a função de devolução da própria transação."
        ],
        correct: 2,
        explanation: "A função de devolução do próprio Pix direciona o dinheiro de volta à conta de origem."
    },
    {
        question: "4. Uma plataforma promete multiplicar seu dinheiro rapidamente e sem riscos. O que fazer?",
        answers: [
            "Desconfiar e verificar a legitimidade da empresa antes de investir.",
            "Investir todo o dinheiro disponível.",
            "Compartilhar a oportunidade com familiares."
        ],
        correct: 0,
        explanation: "Promessas de ganhos elevados e garantidos são sinais de alerta."
    },
    {
        question: "5. Você realizou um Pix e descobriu que foi vítima de um golpe. Qual deve ser sua primeira atitude?",
        answers: [
            "Aguardar vários dias.",
            "Entrar em contato imediatamente com o banco e solicitar a análise do caso pelo MED, quando aplicável.",
            "Apagar as conversas com o golpista."
        ],
        correct: 1,
        explanation: "A comunicação rápida com o banco aumenta as possibilidades de análise e recuperação dos valores."
    }
];

let pixIndex = 0;
let pixScore = 0;
let pixAnswered = false;

const pQuestion = document.getElementById("module-question");
const pAnswers = document.getElementById("module-answers");
const pFeedback = document.getElementById("module-feedback");
const pNext = document.getElementById("module-next");
const pResult = document.getElementById("module-result");

function showPixQuestion() {
    pixAnswered = false;

    const item = pixQuestions[pixIndex];

    pQuestion.textContent = item.question;
    pAnswers.innerHTML = "";
    pFeedback.textContent = "";
    pNext.hidden = true;

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkPixAnswer(index);
        });

        pAnswers.appendChild(button);
    });
}

function checkPixAnswer(selected) {
    if (pixAnswered) return;

    pixAnswered = true;

    const item = pixQuestions[pixIndex];
    const buttons = pAnswers.querySelectorAll("button");

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
        pixScore++;
        pFeedback.textContent = "✓ Correto! " + item.explanation;
        pFeedback.style.color = "#14865e";
    } else {
        pFeedback.textContent = "✗ Resposta incorreta. " + item.explanation;
        pFeedback.style.color = "#c0392b";
    }

    pNext.hidden = false;

    if (pixIndex === pixQuestions.length - 1) {
        pNext.textContent = "Finalizar treinamento";
    }
}

function nextPixQuestion() {
    pixIndex++;

    if (pixIndex < pixQuestions.length) {
        showPixQuestion();
    } else {
        finishPixTraining();
    }
}

function finishPixTraining() {
    localStorage.setItem("modulo2Concluido", "true");
    pQuestion.hidden = true;
    pAnswers.hidden = true;
    pFeedback.hidden = true;
    pNext.hidden = true;

    const percentage = Math.round(
        (pixScore / pixQuestions.length) * 100
    );

    let message;

    if (pixScore === 5) {
        message = "Excelente! Você demonstrou ótimo conhecimento sobre prevenção de fraudes financeiras.";
    } else if (pixScore >= 3) {
        message = "Muito bem! Continue aplicando os cuidados apresentados.";
    } else {
        message = "Continue aprendendo! Revise o conteúdo e tente novamente.";
    }

    pResult.hidden = false;

    pResult.innerHTML = `
        <h2>Treinamento concluído!</h2>
        <p>Você acertou ${pixScore} de 5 perguntas.</p>
        <p>Aproveitamento: ${percentage}%</p>
        <p>${message}</p>
        <button id="retry-pix" class="btn-primary">
            Refazer treinamento
        </button>
    `;

    document.getElementById("retry-pix")
        .addEventListener("click", restartPixTraining);
}

function restartPixTraining() {
    pixIndex = 0;
    pixScore = 0;

    pQuestion.hidden = false;
    pAnswers.hidden = false;
    pFeedback.hidden = false;
    pResult.hidden = true;

    showPixQuestion();
}

pNext.addEventListener("click", nextPixQuestion);

showPixQuestion();
