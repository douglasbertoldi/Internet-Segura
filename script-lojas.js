
const questions = [
    {
        question: "1. Qual situação pode indicar que uma loja virtual é falsa?",
        answers: [
            "A loja apresenta informações completas sobre a empresa.",
            "O site oferece preços muito abaixo do mercado e exige compra imediata.",
            "A loja possui canais de atendimento."
        ],
        correct: 1,
        explanation: "Preços exageradamente baixos e pressão para comprar rapidamente são sinais de alerta."
    },
    {
        question: "2. O que devemos verificar antes de comprar em uma loja desconhecida?",
        answers: [
            "Somente a aparência do site.",
            "Apenas o preço do produto.",
            "CNPJ, endereço, avaliações e canais de atendimento."
        ],
        correct: 2,
        explanation: "Pesquisar os dados da empresa e as avaliações ajuda a identificar possíveis fraudes."
    },
    {
        question: "3. Você encontrou um celular muito barato em um anúncio de rede social. O que deve fazer?",
        answers: [
            "Comprar imediatamente para não perder a promoção.",
            "Pesquisar a loja e comparar o preço antes de comprar.",
            "Enviar seus dados pessoais para reservar o produto."
        ],
        correct: 1,
        explanation: "Sempre pesquise a loja e desconfie de ofertas muito abaixo do preço normal."
    },
    {
        question: "4. Qual forma de pagamento exige atenção especial?",
        answers: [
            "Pagamento por Pix para uma pessoa física desconhecida.",
            "Pagamento em uma loja oficial e identificada.",
            "Pagamento em uma plataforma confiável."
        ],
        correct: 0,
        explanation: "Um Pix para uma pessoa desconhecida pode dificultar a recuperação do dinheiro em caso de golpe."
    },
    {
        question: "5. O que fazer se você perceber que comprou em uma loja falsa?",
        answers: [
            "Apagar todas as mensagens e aguardar.",
            "Não fazer nada.",
            "Entrar em contato com o banco, guardar provas e registrar um boletim de ocorrência."
        ],
        correct: 2,
        explanation: "Agir rapidamente, guardar comprovantes e comunicar a instituição financeira são medidas importantes."
    }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("quiz-result");
const restartButton = document.getElementById("restart-quiz");

function showQuestion() {
    resultContainer.innerHTML = "";
    restartButton.style.display = "none";

    const question = questions[currentQuestion];

    quizContainer.innerHTML = `
        <h3>${question.question}</h3>
        <div class="answers">
            ${question.answers.map((answer, index) => `
                <button class="answer-button" onclick="checkAnswer(${index})">
                    ${answer}
                </button>
            `).join("")}
        </div>
        <p class="feedback"></p>
        <p class="question-progress">
            Pergunta ${currentQuestion + 1} de ${questions.length}
        </p>
    `;
}

function checkAnswer(selected) {
    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll(".answer-button");
    const feedback = document.querySelector(".feedback");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selected === question.correct) {
        score++;
        buttons[selected].classList.add("correct");
        feedback.textContent = "Muito bem! " + question.explanation;
        feedback.className = "feedback correct";
    } else {
        buttons[selected].classList.add("incorrect");
        buttons[question.correct].classList.add("correct");
        feedback.textContent = "Resposta incorreta. " + question.explanation;
        feedback.className = "feedback incorrect";
    }

    const nextButton = document.createElement("button");
    nextButton.className = "btn-primary";
    nextButton.textContent = currentQuestion === questions.length - 1
        ? "Ver resultado"
        : "Próxima pergunta";

    nextButton.onclick = nextQuestion;
    quizContainer.appendChild(nextButton);
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    localStorage.setItem("modulo4Concluido", "true");
    quizContainer.innerHTML = "";
    resultContainer.innerHTML = `
        <h3>Treinamento concluído!</h3>
        <p>Você acertou <strong>${score} de ${questions.length}</strong> perguntas.</p>
        <p>
            ${score === 5
                ? "Excelente! Você demonstrou conhecer muito bem os cuidados nas compras online."
                : score >= 3
                ? "Muito bem! Continue praticando os cuidados para comprar com segurança."
                : "Continue estudando! Revise o conteúdo para aprender a identificar lojas falsas."}
        </p>
    `;

    restartButton.style.display = "inline-block";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

restartButton.addEventListener("click", restartQuiz);

showQuestion();
