
const treinamentos = [
    {
        nome: "Golpes pelo WhatsApp",
        chave: "modulo1Concluido"
    },
    {
        nome: "Golpes bancários e Pix",
        chave: "modulo2Concluido"
    },
    {
        nome: "E-mails falsos e phishing",
        chave: "modulo3Concluido"
    },
    {
        nome: "Lojas virtuais falsas",
        chave: "modulo4Concluido"
    }
];

function atualizarProgresso() {
    const lista = document.getElementById("progress-list");
    const contador = document.getElementById("progress-count");
    const barra = document.getElementById("progress-fill");

    if (!lista || !contador || !barra) return;

    const concluidos = treinamentos.filter(
        item => localStorage.getItem(item.chave) === "true"
    ).length;

    contador.textContent = `${concluidos} de 4`;

    barra.style.width = `${(concluidos / 4) * 100}%`;

    lista.innerHTML = treinamentos.map(item => {
        const concluido = localStorage.getItem(item.chave) === "true";

        return `
            <div class="progress-item">
                <span>${item.nome}</span>
                <span class="progress-status ${concluido ? "completed" : ""}">
                    ${concluido ? "✓ Concluído" : "Pendente"}
                </span>
            </div>
        `;
    }).join("");
    const certificado = document.getElementById("certificate-section");

if (certificado) {
    certificado.hidden = concluidos !== treinamentos.length;
}
}

atualizarProgresso();

const generateButton = document.getElementById("generate-certificate");

if (generateButton) {
    generateButton.addEventListener("click", function () {
        const nameInput = document.getElementById("participant-name");
        const certificateResult = document.getElementById("certificate-result");

        const participantName = nameInput.value.trim();

        if (!participantName) {
            alert("Por favor, informe seu nome completo.");
            nameInput.focus();
            return;
        }

        const safeName = participantName
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        const completionDate = new Date().toLocaleDateString("pt-BR");

        
certificateResult.innerHTML = `
    <div class="certificate" id="certificate">
        <div class="certificate-content">
            <span class="certificate-icon">🛡️</span>

            <h2>INTERNET SEGURA</h2>

            <p class="certificate-subtitle">
                CERTIFICADO DE CONCLUSÃO
            </p>

            <p class="certificate-text">
                Certificamos que
            </p>

            <h1>${safeName}</h1>

            <p class="certificate-description">
                concluiu com sucesso os quatro módulos de treinamento
                do projeto Internet Segura, demonstrando conhecimentos
                sobre prevenção de golpes virtuais e segurança digital.
            </p>

            <p class="certificate-date">
                Data de conclusão: ${completionDate}
            </p>

            <div class="certificate-footer">
                <span>PROJETO ACADÊMICO DE EXTENSÃO</span>

                <strong>Centro Universitário Internacional Uninter</strong>

                <span>Curso: Tecnologia em Segurança da Informação</span>

                <strong>
                    A Segurança da Informação como Instrumento para o Desenvolvimento Sustentável na Era Digital
                </strong>

                <span>Objetivos de Desenvolvimento Sustentável</span>

                <strong>ODS 4 • ODS 9 • ODS 10 • ODS 16</strong>

                <span>Uberaba – MG</span>
            </div>
        </div>
    </div>

    <button id="print-certificate" class="btn-primary" type="button">
        Imprimir / Salvar em PDF
    </button>
`;


        document.getElementById("print-certificate")
            .addEventListener("click", function () {
                window.print();
            });
    });
}

