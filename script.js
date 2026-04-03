/*
    ===================================================================
    Script de Funcionalidades - Scratch na Educação Básica
    ===================================================================
    Objetivo: Implementar interatividade, alternância de tema, rolagem suave, lazy loading e funções de impressão para cartões, guias e projetos.
    Autor : Gisele Nunes, Rodrigo Barbosa
    Data  : 2026
    ===================================================================
*/

// Aguarda o carregamento completo do DOM para executar as funções que manipulam elementos da página
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o botão de alternância de tema pelo seu ID
    const themeToggle = document.getElementById('themeToggle');
    // Se o botão não existir, interrompe a execução desta parte
    if (!themeToggle) return;

    // Verifica a preferência do sistema por tema escuro usando a media query
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    // Variável para armazenar o tema atual salvo no localStorage
    let currentTheme = null;
    // Tenta recuperar o tema salvo, caso ocorra erro (ex: localStorage desabilitado) ignora
    try {
        currentTheme = localStorage.getItem('theme');
    } catch (e) {
        // Não faz nada se localStorage não estiver disponível
    }

    // Aplica o tema inicial baseado no localStorage ou na preferência do sistema
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        // Adiciona a classe 'dark-mode' ao body para ativar o tema escuro
        document.body.classList.add('dark-mode');
        // Altera o texto do botão para um ícone de sol (indicando que pode voltar ao claro)
        themeToggle.textContent = '☀️';
        // Define o atributo aria-pressed como true para acessibilidade
        themeToggle.setAttribute('aria-pressed', 'true');
    } else {
        // Caso contrário, tema claro: ícone de lua
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-pressed', 'false');
    }

    // Adiciona evento de clique no botão de alternância
    themeToggle.addEventListener('click', function () {
        // Alterna a classe 'dark-mode' no body
        document.body.classList.toggle('dark-mode');
        // Verifica se o modo escuro está ativo após a alternância
        const isDark = document.body.classList.contains('dark-mode');
        // Atualiza o ícone do botão conforme o novo estado
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        // Atualiza o atributo aria-pressed para acessibilidade
        themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        // Salva a preferência no localStorage
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {
            // Ignora erros de localStorage
        }
    });
});

// =============================================
// ROLAGEM SUAVE PARA LINKS ÂNCORA
// =============================================

// Seleciona todos os links cujo atributo href começa com '#'
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Adiciona um evento de clique para cada link âncora
    anchor.addEventListener('click', function (e) {
        // Previne o comportamento padrão do link (navegar imediatamente)
        e.preventDefault();
        // Obtém o elemento alvo através do seletor armazenado no href
        const target = document.querySelector(this.getAttribute('href'));
        // Se o elemento alvo existir, rola suavemente até ele
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =============================================
// MARCAÇÃO DA PÁGINA ATIVA NO MENU
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    // Obtém o nome do arquivo da página atual (ex: 'index.html')
    const currentPage = window.location.pathname.split('/').pop();
    // Seleciona todos os links de navegação dentro da tag <nav>
    const navLinks = document.querySelectorAll('nav a');
    // Para cada link, compara o href com o nome da página atual
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            // Se for igual, adiciona a classe 'active' para destacar
            link.classList.add('active');
        } else {
            // Caso contrário, remove a classe 'active' (caso já exista)
            link.classList.remove('active');
        }
    });
    // Tratamento especial para a página inicial (vazia ou index.html)
    if (currentPage === '' || currentPage === 'index.html') {
        const homeLink = document.querySelector('nav a[href="index.html"]');
        if (homeLink) homeLink.classList.add('active');
    }
});

// =============================================
// LAZY LOADING PARA IMAGENS (com data-src)
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todas as imagens que possuem o atributo 'data-src'
    const images = document.querySelectorAll('img[data-src]');
    // Cria um observer que monitora a interseção dos elementos com a viewport
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se a imagem está visível na tela
            if (entry.isIntersecting) {
                const img = entry.target;
                // Define o atributo 'src' com o valor armazenado em 'data-src'
                img.src = img.dataset.src;
                // Remove o atributo 'data-src' para não tentar carregar novamente
                img.removeAttribute('data-src');
                // Para de observar essa imagem (já foi carregada)
                observer.unobserve(img);
            }
        });
    });
    // Inicia a observação de cada imagem
    images.forEach(img => imageObserver.observe(img));
});

// =============================================
// FUNÇÃO DE IMPRESSÃO DE CARTÕES (se aplicável)
// =============================================

// Função que cria uma pré-visualização e permite imprimir os cartões Scratch
function showPrintPreview() {
    // Verifica se a página atual é a de cartões
    const isCartoesPage = window.location.pathname.includes('cartoes-scratch.html') ||
        window.location.pathname.endsWith('cartoes-scratch.html');
    if (!isCartoesPage) return; // Sai se não estiver na página correta

    // Cria uma div de overlay para cobrir a tela
    const printOverlay = document.createElement('div');
    printOverlay.className = 'print-overlay';
    printOverlay.style.display = 'flex'; // Exibe como flex para centralizar

    // Cria o container da pré-visualização
    const printPreview = document.createElement('div');
    printPreview.className = 'print-preview';

    // Botão para fechar a pré-visualização
    const closeButton = document.createElement('button');
    closeButton.className = 'close-preview';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => document.body.removeChild(printOverlay); // Remove o overlay ao clicar

    // Container interno para o conteúdo da impressão
    const printContainer = document.createElement('div');
    printContainer.className = 'print-container';

    // Instruções de impressão
    const printInstructions = document.createElement('div');
    printInstructions.className = 'print-instructions';
    printInstructions.innerHTML = `
        <h2>Instruções para Impressão</h2>
        <ul>
            <li>Use papel A4 de 180-250g para melhor durabilidade</li>
            <li>Configure a impressão para "Retrato"</li>
            <li>Defina margens para "Mínimo" ou "Nenhuma"</li>
            <li>Imprima em qualidade normal ou alta</li>
            <li>Recorte seguindo as linhas pontilhadas</li>
        </ul>
    `;

    // Container para os cartões que serão impressos
    const printCards = document.createElement('div');
    printCards.className = 'print-cards';

    // Seleciona todos os cartões (elementos com classe 'nav-card') da página
    const allCards = document.querySelectorAll('.nav-card');
    allCards.forEach(card => {
        // Clona cada cartão para não alterar o original
        const printCard = card.cloneNode(true);
        printCard.classList.add('print-card'); // Adiciona classe específica para impressão
        // Copia também as classes de cor/categoria, se existirem
        if (card.classList.contains('movimento')) printCard.classList.add('movimento');
        if (card.classList.contains('aparencia')) printCard.classList.add('aparencia');
        if (card.classList.contains('som')) printCard.classList.add('som');
        if (card.classList.contains('eventos')) printCard.classList.add('eventos');
        if (card.classList.contains('controle')) printCard.classList.add('controle');
        if (card.classList.contains('operadores')) printCard.classList.add('operadores');
        printCards.appendChild(printCard);
    });

    // Área dos botões de ação (imprimir e fechar)
    const printActions = document.createElement('div');
    printActions.className = 'print-actions';

    // Botão para executar a impressão
    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = '🖨️ Imprimir Cartões';
    printBtn.onclick = () => {
        // Cria um container temporário para enviar à impressão
        const tempContainer = document.createElement('div');
        tempContainer.className = 'print-temp-container';
        tempContainer.innerHTML = `
            <div class="print-instructions">${printInstructions.innerHTML}</div>
            <div class="print-cards">${printCards.innerHTML}</div>
        `;
        document.body.appendChild(tempContainer);
        window.print(); // Chama a função de impressão do navegador
        document.body.removeChild(tempContainer); // Remove o container temporário
        document.body.removeChild(printOverlay); // Fecha o overlay
    };

    // Botão para fechar sem imprimir
    const closeBtn = document.createElement('button');
    closeBtn.className = 'secondary-button';
    closeBtn.innerHTML = 'Fechar';
    closeBtn.onclick = () => document.body.removeChild(printOverlay);

    // Monta a estrutura dos botões
    printActions.appendChild(printBtn);
    printActions.appendChild(closeBtn);

    // Monta a estrutura completa da pré-visualização
    printContainer.appendChild(printInstructions);
    printContainer.appendChild(printCards);
    printPreview.appendChild(closeButton);
    printPreview.appendChild(printContainer);
    printPreview.appendChild(printActions);
    printOverlay.appendChild(printPreview);

    // Adiciona o overlay ao body da página
    document.body.appendChild(printOverlay);
}

// =============================================
// INICIALIZAÇÃO DE BOTÕES DE IMPRESSÃO (cartões)
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    // Verifica se está na página de cartões
    const isCartoesPage = window.location.pathname.includes('cartoes-scratch.html') ||
        window.location.pathname.endsWith('cartoes-scratch.html');
    if (isCartoesPage) {
        // Cria um botão de impressão
        const printButton = document.createElement('button');
        printButton.className = 'print-button';
        printButton.innerHTML = '🖨️ Imprimir Cartões';
        printButton.onclick = showPrintPreview; // Associa a função de pré-visualização
        // Insere o botão após a primeira seção de conteúdo (.content-section)
        const firstSection = document.querySelector('.content-section');
        if (firstSection) {
            firstSection.parentNode.insertBefore(printButton, firstSection.nextSibling);
        }
    }
});

// =============================================
// FUNÇÃO DE IMPRESSÃO PARA PÁGINA INICIAL (cartilha)
// =============================================

function showPrintPreviewIndex() {
    // Verifica se está na página inicial (index.html ou raiz)
    const isIndexPage = window.location.pathname.includes('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/');
    if (!isIndexPage) return;

    // Cria overlay e estrutura similar à anterior, mas para o conteúdo da cartilha
    const printOverlay = document.createElement('div');
    printOverlay.className = 'print-overlay';
    printOverlay.style.display = 'flex';

    const printPreview = document.createElement('div');
    printPreview.className = 'print-preview';
    printPreview.style.maxWidth = '90%';
    printPreview.style.maxHeight = '90%';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-preview';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => document.body.removeChild(printOverlay);

    const printContainer = document.createElement('div');
    printContainer.className = 'print-container';

    const printInstructions = document.createElement('div');
    printInstructions.className = 'print-instructions';
    printInstructions.innerHTML = `
        <h2>Instruções para Impressão - Cartilha Pedagógica</h2>
        <ul>
            <li>Use papel A4 padrão</li>
            <li>Configure a impressão para "Retrato"</li>
            <li>Defina margens para "Padrão" ou "Mínimo"</li>
            <li>Imprima em qualidade normal</li>
        </ul>
    `;

    const printIndexContent = document.createElement('div');
    printIndexContent.className = 'print-index-content';

    // Clona todas as seções de conteúdo da página inicial
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        const printSection = section.cloneNode(true);
        printSection.classList.add('print-section');
        printIndexContent.appendChild(printSection);
    });

    const printActions = document.createElement('div');
    printActions.className = 'print-actions';

    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = '🖨️ Imprimir Cartilha';
    printBtn.onclick = () => {
        const tempContainer = document.createElement('div');
        tempContainer.className = 'print-temp-container';
        tempContainer.innerHTML = `
            <div class="print-instructions">${printInstructions.innerHTML}</div>
            <div class="print-index-content">${printIndexContent.innerHTML}</div>
        `;
        document.body.appendChild(tempContainer);
        window.print();
        document.body.removeChild(tempContainer);
        document.body.removeChild(printOverlay);
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'secondary-button';
    closeBtn.innerHTML = 'Fechar';
    closeBtn.onclick = () => document.body.removeChild(printOverlay);

    printActions.appendChild(printBtn);
    printActions.appendChild(closeBtn);

    printContainer.appendChild(printInstructions);
    printContainer.appendChild(printIndexContent);
    printPreview.appendChild(closeButton);
    printPreview.appendChild(printContainer);
    printPreview.appendChild(printActions);
    printOverlay.appendChild(printPreview);

    document.body.appendChild(printOverlay);
}

// Adiciona botão de impressão na página inicial
document.addEventListener('DOMContentLoaded', function () {
    const isIndexPage = window.location.pathname.includes('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/');
    if (isIndexPage) {
        const printButton = document.createElement('button');
        printButton.className = 'print-button';
        printButton.innerHTML = '🖨️ Imprimir Cartilha';
        printButton.onclick = showPrintPreviewIndex;
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.parentNode.insertBefore(printButton, pageHeader.nextSibling);
        }
    }
});

// =============================================
// FUNÇÃO DE IMPRESSÃO PARA PRIMEIROS PASSOS
// =============================================

function showPrintPreviewPrimeirosPassos() {
    const isPrimeirosPassosPage = window.location.pathname.includes('primeiros_passos.html');
    if (!isPrimeirosPassosPage) return;

    const printOverlay = document.createElement('div');
    printOverlay.className = 'print-overlay';
    printOverlay.style.display = 'flex';

    const printPreview = document.createElement('div');
    printPreview.className = 'print-preview';
    printPreview.style.maxWidth = '90%';
    printPreview.style.maxHeight = '90%';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-preview';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => document.body.removeChild(printOverlay);

    const printContainer = document.createElement('div');
    printContainer.className = 'print-container';

    const printInstructions = document.createElement('div');
    printInstructions.className = 'print-instructions';
    printInstructions.innerHTML = `
        <h2>Instruções para Impressão - Guia Primeiros Passos</h2>
        <ul>
            <li>Use papel A4 padrão</li>
            <li>Configure a impressão para "Retrato"</li>
            <li>Defina margens para "Padrão" ou "Mínimo"</li>
            <li>Imprima em qualidade normal</li>
        </ul>
    `;

    const printContent = document.createElement('div');
    printContent.className = 'print-primeiros-passos-content';

    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        const printSection = section.cloneNode(true);
        // Remove qualquer botão de impressão que possa existir dentro da seção clonada
        const btn = printSection.querySelector('.print-button');
        if (btn) btn.remove();
        printSection.classList.add('print-section');
        printContent.appendChild(printSection);
    });

    const printActions = document.createElement('div');
    printActions.className = 'print-actions';

    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = '🖨️ Imprimir Guia';
    printBtn.onclick = () => {
        const tempContainer = document.createElement('div');
        tempContainer.className = 'print-temp-container';
        tempContainer.innerHTML = `
            <div class="print-instructions">${printInstructions.innerHTML}</div>
            <div class="print-primeiros-passos-content">${printContent.innerHTML}</div>
        `;
        document.body.appendChild(tempContainer);
        window.print();
        document.body.removeChild(tempContainer);
        document.body.removeChild(printOverlay);
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'secondary-button';
    closeBtn.innerHTML = 'Fechar';
    closeBtn.onclick = () => document.body.removeChild(printOverlay);

    printActions.appendChild(printBtn);
    printActions.appendChild(closeBtn);

    printContainer.appendChild(printInstructions);
    printContainer.appendChild(printContent);
    printPreview.appendChild(closeButton);
    printPreview.appendChild(printContainer);
    printPreview.appendChild(printActions);
    printOverlay.appendChild(printPreview);

    document.body.appendChild(printOverlay);
}

// Adiciona evento ao botão de impressão da página primeiros_passos.html (se existir)
document.addEventListener('DOMContentLoaded', function () {
    const printButton = document.getElementById('printPrimeirosPassosBtn');
    if (printButton) {
        printButton.addEventListener('click', showPrintPreviewPrimeirosPassos);
    }
});

// =============================================
// FUNÇÃO DE IMPRESSÃO PARA PROJETOS 6º ANO
// =============================================

function showPrintPreviewProjetos6Ano() {
    const isProjetos6AnoPage = window.location.pathname.includes('projetos_6_ano.html');
    if (!isProjetos6AnoPage) return;

    const printOverlay = document.createElement('div');
    printOverlay.className = 'print-overlay';
    printOverlay.style.display = 'flex';

    const printPreview = document.createElement('div');
    printPreview.className = 'print-preview';
    printPreview.style.maxWidth = '90%';
    printPreview.style.maxHeight = '90%';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-preview';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => document.body.removeChild(printOverlay);

    const printContainer = document.createElement('div');
    printContainer.className = 'print-container';

    const printInstructions = document.createElement('div');
    printInstructions.className = 'print-instructions';
    printInstructions.innerHTML = `
        <h2>Instruções para Impressão - Projetos 6º Ano</h2>
        <ul>
            <li>Use papel A4 padrão</li>
            <li>Configure a impressão para "Retrato"</li>
            <li>Defina margens para "Padrão" ou "Mínimo"</li>
            <li>Imprima em qualidade normal</li>
        </ul>
    `;

    const printContent = document.createElement('div');
    printContent.className = 'print-projetos6-content';

    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        const printSection = section.cloneNode(true);
        const btn = printSection.querySelector('.print-button');
        if (btn) btn.remove();
        printSection.classList.add('print-section');
        printContent.appendChild(printSection);
    });

    const printActions = document.createElement('div');
    printActions.className = 'print-actions';

    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = '🖨️ Imprimir Projetos';
    printBtn.onclick = () => {
        const tempContainer = document.createElement('div');
        tempContainer.className = 'print-temp-container';
        tempContainer.innerHTML = `
            <div class="print-instructions">${printInstructions.innerHTML}</div>
            <div class="print-projetos6-content">${printContent.innerHTML}</div>
        `;
        document.body.appendChild(tempContainer);
        window.print();
        document.body.removeChild(tempContainer);
        document.body.removeChild(printOverlay);
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'secondary-button';
    closeBtn.innerHTML = 'Fechar';
    closeBtn.onclick = () => document.body.removeChild(printOverlay);

    printActions.appendChild(printBtn);
    printActions.appendChild(closeBtn);

    printContainer.appendChild(printInstructions);
    printContainer.appendChild(printContent);
    printPreview.appendChild(closeButton);
    printPreview.appendChild(printContainer);
    printPreview.appendChild(printActions);
    printOverlay.appendChild(printPreview);

    document.body.appendChild(printOverlay);
}

// Adiciona botão de impressão na página projetos_6_ano.html
document.addEventListener('DOMContentLoaded', function () {
    const isProjetos6AnoPage = window.location.pathname.includes('projetos_6_ano.html');
    if (isProjetos6AnoPage) {
        const printButton = document.createElement('button');
        printButton.className = 'print-button';
        printButton.innerHTML = '🖨️ Imprimir Projetos';
        printButton.onclick = showPrintPreviewProjetos6Ano;
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.parentNode.insertBefore(printButton, pageHeader.nextSibling);
        }
    }
});

// =============================================
// FUNÇÃO DE IMPRESSÃO PARA PROJETOS 7º ANO
// =============================================

function showPrintPreviewProjetos7Ano() {
    const isProjetos7AnoPage = window.location.pathname.includes('projetos_7_ano.html');
    if (!isProjetos7AnoPage) return;

    const printOverlay = document.createElement('div');
    printOverlay.className = 'print-overlay';
    printOverlay.style.display = 'flex';

    const printPreview = document.createElement('div');
    printPreview.className = 'print-preview';
    printPreview.style.maxWidth = '90%';
    printPreview.style.maxHeight = '90%';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-preview';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => document.body.removeChild(printOverlay);

    const printContainer = document.createElement('div');
    printContainer.className = 'print-container';

    const printInstructions = document.createElement('div');
    printInstructions.className = 'print-instructions';
    printInstructions.innerHTML = `
        <h2>Instruções para Impressão - Projetos 7º Ano</h2>
        <ul>
            <li>Use papel A4 padrão</li>
            <li>Configure a impressão para "Retrato"</li>
            <li>Defina margens para "Padrão" ou "Mínimo"</li>
            <li>Imprima em qualidade normal</li>
        </ul>
    `;

    const printContent = document.createElement('div');
    printContent.className = 'print-projetos7-content';

    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        const printSection = section.cloneNode(true);
        const btn = printSection.querySelector('.print-button');
        if (btn) btn.remove();
        printSection.classList.add('print-section');
        printContent.appendChild(printSection);
    });

    const printActions = document.createElement('div');
    printActions.className = 'print-actions';

    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = '🖨️ Imprimir Projetos';
    printBtn.onclick = () => {
        const tempContainer = document.createElement('div');
        tempContainer.className = 'print-temp-container';
        tempContainer.innerHTML = `
            <div class="print-instructions">${printInstructions.innerHTML}</div>
            <div class="print-projetos7-content">${printContent.innerHTML}</div>
        `;
        document.body.appendChild(tempContainer);
        window.print();
        document.body.removeChild(tempContainer);
        document.body.removeChild(printOverlay);
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'secondary-button';
    closeBtn.innerHTML = 'Fechar';
    closeBtn.onclick = () => document.body.removeChild(printOverlay);

    printActions.appendChild(printBtn);
    printActions.appendChild(closeBtn);

    printContainer.appendChild(printInstructions);
    printContainer.appendChild(printContent);
    printPreview.appendChild(closeButton);
    printPreview.appendChild(printContainer);
    printPreview.appendChild(printActions);
    printOverlay.appendChild(printPreview);

    document.body.appendChild(printOverlay);
}

// Adiciona evento ao botão de impressão da página projetos_7_ano.html (se existir)
document.addEventListener('DOMContentLoaded', function () {
    const isProjetos7AnoPage = window.location.pathname.includes('projetos_7_ano.html');
    if (isProjetos7AnoPage) {
        const printButton = document.getElementById('printProjetos7Btn');
        if (printButton) {
            printButton.addEventListener('click', showPrintPreviewProjetos7Ano);
        }
    }
});

// =============================================
// FUNÇÃO DE IMPRESSÃO PARA PROJETOS 8º ANO
// =============================================

function showPrintPreviewProjetos8Ano() {
    const isProjetos8AnoPage = window.location.pathname.includes('projetos_8_ano.html');
    if (!isProjetos8AnoPage) return;

    const printOverlay = document.createElement('div');
    printOverlay.className = 'print-overlay';
    printOverlay.style.display = 'flex';

    const printPreview = document.createElement('div');
    printPreview.className = 'print-preview';
    printPreview.style.maxWidth = '90%';
    printPreview.style.maxHeight = '90%';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-preview';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => document.body.removeChild(printOverlay);

    const printContainer = document.createElement('div');
    printContainer.className = 'print-container';

    const printInstructions = document.createElement('div');
    printInstructions.className = 'print-instructions';
    printInstructions.innerHTML = `
        <h2>Instruções para Impressão - Projetos 8º Ano</h2>
        <ul>
            <li>Use papel A4 padrão</li>
            <li>Configure a impressão para "Retrato"</li>
            <li>Defina margens para "Padrão" ou "Mínimo"</li>
            <li>Imprima em qualidade normal</li>
        </ul>
    `;

    const printContent = document.createElement('div');
    printContent.className = 'print-projetos8-content';

    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        const printSection = section.cloneNode(true);
        const btn = printSection.querySelector('.print-button');
        if (btn) btn.remove();
        printSection.classList.add('print-section');
        printContent.appendChild(printSection);
    });

    const printActions = document.createElement('div');
    printActions.className = 'print-actions';

    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = '🖨️ Imprimir Projetos 8º Ano';
    printBtn.onclick = () => {
        const tempContainer = document.createElement('div');
        tempContainer.className = 'print-temp-container';
        tempContainer.innerHTML = `
            <div class="print-instructions">${printInstructions.innerHTML}</div>
            <div class="print-projetos8-content">${printContent.innerHTML}</div>
        `;
        document.body.appendChild(tempContainer);
        window.print();
        document.body.removeChild(tempContainer);
        document.body.removeChild(printOverlay);
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'secondary-button';
    closeBtn.innerHTML = 'Fechar';
    closeBtn.onclick = () => document.body.removeChild(printOverlay);

    printActions.appendChild(printBtn);
    printActions.appendChild(closeBtn);

    printContainer.appendChild(printInstructions);
    printContainer.appendChild(printContent);
    printPreview.appendChild(closeButton);
    printPreview.appendChild(printContainer);
    printPreview.appendChild(printActions);
    printOverlay.appendChild(printPreview);

    document.body.appendChild(printOverlay);
}

// Adiciona botão de impressão na página projetos_8_ano.html
document.addEventListener('DOMContentLoaded', function () {
    const isProjetos8AnoPage = window.location.pathname.includes('projetos_8_ano.html');
    if (isProjetos8AnoPage) {
        const printButton = document.createElement('button');
        printButton.className = 'print-button';
        printButton.innerHTML = '🖨️ Imprimir Projetos 8º Ano';
        printButton.onclick = showPrintPreviewProjetos8Ano;
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.parentNode.insertBefore(printButton, pageHeader.nextSibling);
        }
    }
});

// =============================================
// FUNÇÃO DE IMPRESSÃO PARA PROJETOS 9º ANO
// =============================================

function showPrintPreviewProjetos9Ano() {
    const isProjetos9AnoPage = window.location.pathname.includes('projetos_9_ano.html');
    if (!isProjetos9AnoPage) return;

    const printOverlay = document.createElement('div');
    printOverlay.className = 'print-overlay';
    printOverlay.style.display = 'flex';

    const printPreview = document.createElement('div');
    printPreview.className = 'print-preview';
    printPreview.style.maxWidth = '90%';
    printPreview.style.maxHeight = '90%';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-preview';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => document.body.removeChild(printOverlay);

    const printContainer = document.createElement('div');
    printContainer.className = 'print-container';

    const printInstructions = document.createElement('div');
    printInstructions.className = 'print-instructions';
    printInstructions.innerHTML = `
        <h2>Instruções para Impressão - Projetos 9º Ano</h2>
        <ul>
            <li>Use papel A4 padrão</li>
            <li>Configure a impressão para "Retrato"</li>
            <li>Defina margens para "Padrão" ou "Mínimo"</li>
            <li>Imprima em qualidade normal</li>
        </ul>
    `;

    const printContent = document.createElement('div');
    printContent.className = 'print-projetos9-content';

    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        const printSection = section.cloneNode(true);
        const btn = printSection.querySelector('.print-button');
        if (btn) btn.remove();
        printSection.classList.add('print-section');
        printContent.appendChild(printSection);
    });

    const printActions = document.createElement('div');
    printActions.className = 'print-actions';

    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = '🖨️ Imprimir Projetos 9º Ano';
    printBtn.onclick = () => {
        const tempContainer = document.createElement('div');
        tempContainer.className = 'print-temp-container';
        tempContainer.innerHTML = `
            <div class="print-instructions">${printInstructions.innerHTML}</div>
            <div class="print-projetos9-content">${printContent.innerHTML}</div>
        `;
        document.body.appendChild(tempContainer);
        window.print();
        document.body.removeChild(tempContainer);
        document.body.removeChild(printOverlay);
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'secondary-button';
    closeBtn.innerHTML = 'Fechar';
    closeBtn.onclick = () => document.body.removeChild(printOverlay);

    printActions.appendChild(printBtn);
    printActions.appendChild(closeBtn);

    printContainer.appendChild(printInstructions);
    printContainer.appendChild(printContent);
    printPreview.appendChild(closeButton);
    printPreview.appendChild(printContainer);
    printPreview.appendChild(printActions);
    printOverlay.appendChild(printPreview);

    document.body.appendChild(printOverlay);
}

// Adiciona botão de impressão na página projetos_9_ano.html
document.addEventListener('DOMContentLoaded', function () {
    const isProjetos9AnoPage = window.location.pathname.includes('projetos_9_ano.html');
    if (isProjetos9AnoPage) {
        const printButton = document.createElement('button');
        printButton.className = 'print-button';
        printButton.innerHTML = '🖨️ Imprimir Projetos 9º Ano';
        printButton.onclick = showPrintPreviewProjetos9Ano;
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.parentNode.insertBefore(printButton, pageHeader.nextSibling);
        }
    }
});

// =============================================
// FUNÇÃO DE IMPRESSÃO PARA PLANOS DE AULA (NOVA)
// =============================================

function showPrintPreviewPlanosDeAula() {
    const isPlanosDeAulaPage = window.location.pathname.includes('planos_de_aula.html');
    if (!isPlanosDeAulaPage) return;

    const printOverlay = document.createElement('div');
    printOverlay.className = 'print-overlay';
    printOverlay.style.display = 'flex';

    const printPreview = document.createElement('div');
    printPreview.className = 'print-preview';
    printPreview.style.maxWidth = '90%';
    printPreview.style.maxHeight = '90%';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-preview';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => document.body.removeChild(printOverlay);

    const printContainer = document.createElement('div');
    printContainer.className = 'print-container';

    const printInstructions = document.createElement('div');
    printInstructions.className = 'print-instructions';
    printInstructions.innerHTML = `
        <h2>Instruções para Impressão - Planos de Aula</h2>
        <ul>
            <li>Use papel A4 padrão</li>
            <li>Configure a impressão para "Retrato"</li>
            <li>Defina margens para "Padrão" ou "Mínimo"</li>
            <li>Imprima em qualidade normal</li>
        </ul>
    `;

    const printContent = document.createElement('div');
    printContent.className = 'print-planos-de-aula-content';

    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        const printSection = section.cloneNode(true);
        const btn = printSection.querySelector('.print-button');
        if (btn) btn.remove();
        printSection.classList.add('print-section');
        printContent.appendChild(printSection);
    });

    const printActions = document.createElement('div');
    printActions.className = 'print-actions';

    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = '🖨️ Imprimir Planos de Aula';
    printBtn.onclick = () => {
        const tempContainer = document.createElement('div');
        tempContainer.className = 'print-temp-container';
        tempContainer.innerHTML = `
            <div class="print-instructions">${printInstructions.innerHTML}</div>
            <div class="print-planos-de-aula-content">${printContent.innerHTML}</div>
        `;
        document.body.appendChild(tempContainer);
        window.print();
        document.body.removeChild(tempContainer);
        document.body.removeChild(printOverlay);
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'secondary-button';
    closeBtn.innerHTML = 'Fechar';
    closeBtn.onclick = () => document.body.removeChild(printOverlay);

    printActions.appendChild(printBtn);
    printActions.appendChild(closeBtn);

    printContainer.appendChild(printInstructions);
    printContainer.appendChild(printContent);
    printPreview.appendChild(closeButton);
    printPreview.appendChild(printContainer);
    printPreview.appendChild(printActions);
    printOverlay.appendChild(printPreview);

    document.body.appendChild(printOverlay);
}

// Adiciona botão de impressão na página planos_de_aula.html
document.addEventListener('DOMContentLoaded', function () {
    const isPlanosDeAulaPage = window.location.pathname.includes('planos_de_aula.html');
    if (isPlanosDeAulaPage) {
        const printButton = document.createElement('button');
        printButton.className = 'print-button';
        printButton.innerHTML = '🖨️ Imprimir Planos de Aula';
        printButton.onclick = showPrintPreviewPlanosDeAula;
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.parentNode.insertBefore(printButton, pageHeader.nextSibling);
        }
    }
});

// =============================================
// FUNÇÃO DE IMPRESSÃO PARA REFERÊNCIAS BNCC
// =============================================

function showPrintPreviewReferenciasBNCC() {
    const isReferenciasBNCCPage = window.location.pathname.includes('referencias_BNCC.html');
    if (!isReferenciasBNCCPage) return;

    const printOverlay = document.createElement('div');
    printOverlay.className = 'print-overlay';
    printOverlay.style.display = 'flex';

    const printPreview = document.createElement('div');
    printPreview.className = 'print-preview';
    printPreview.style.maxWidth = '90%';
    printPreview.style.maxHeight = '90%';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-preview';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => document.body.removeChild(printOverlay);

    const printContainer = document.createElement('div');
    printContainer.className = 'print-container';

    const printInstructions = document.createElement('div');
    printInstructions.className = 'print-instructions';
    printInstructions.innerHTML = `
        <h2>Instruções para Impressão - Referências BNCC e Bibliografia</h2>
        <ul>
            <li>Use papel A4 padrão</li>
            <li>Configure a impressão para "Retrato"</li>
            <li>Defina margens para "Padrão" ou "Mínimo"</li>
            <li>Imprima em qualidade normal</li>
        </ul>
    `;

    const printContent = document.createElement('div');
    printContent.className = 'print-referencias-bncc-content';

    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        const printSection = section.cloneNode(true);
        const btn = printSection.querySelector('.print-button');
        if (btn) btn.remove();
        printSection.classList.add('print-section');
        printContent.appendChild(printSection);
    });

    const printActions = document.createElement('div');
    printActions.className = 'print-actions';

    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = '🖨️ Imprimir Referências BNCC';
    printBtn.onclick = () => {
        const tempContainer = document.createElement('div');
        tempContainer.className = 'print-temp-container';
        tempContainer.innerHTML = `
            <div class="print-instructions">${printInstructions.innerHTML}</div>
            <div class="print-referencias-bncc-content">${printContent.innerHTML}</div>
        `;
        document.body.appendChild(tempContainer);
        window.print();
        document.body.removeChild(tempContainer);
        document.body.removeChild(printOverlay);
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'secondary-button';
    closeBtn.innerHTML = 'Fechar';
    closeBtn.onclick = () => document.body.removeChild(printOverlay);

    printActions.appendChild(printBtn);
    printActions.appendChild(closeBtn);

    printContainer.appendChild(printInstructions);
    printContainer.appendChild(printContent);
    printPreview.appendChild(closeButton);
    printPreview.appendChild(printContainer);
    printPreview.appendChild(printActions);
    printOverlay.appendChild(printPreview);

    document.body.appendChild(printOverlay);
}

// Adiciona botão de impressão na página referencias_BNCC.html
document.addEventListener('DOMContentLoaded', function () {
    const isReferenciasBNCCPage = window.location.pathname.includes('referencias_BNCC.html');
    if (isReferenciasBNCCPage) {
        const printButton = document.createElement('button');
        printButton.className = 'print-button';
        printButton.innerHTML = '🖨️ Imprimir Referências BNCC';
        printButton.onclick = showPrintPreviewReferenciasBNCC;
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.parentNode.insertBefore(printButton, pageHeader.nextSibling);
        }
    }
});