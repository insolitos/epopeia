/**
 * Aplicação Educativa sobre Epopeia
 * Script principal para funcionalidades interativas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização da aplicação
    initNavigation();
    initTabs();
    initDragAndDrop();
    initQuiz();
    initEpicCreator();
    initMapInteraction();
});

/**
 * Sistema de navegação entre secções
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('#main-nav a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe active de todos os links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Adicionar classe active ao link clicado
            this.classList.add('active');
            
            // Obter o ID da secção a mostrar
            const targetId = this.getAttribute('href').substring(1);
            
            // Esconder todas as secções
            sections.forEach(section => section.classList.remove('active'));
            
            // Mostrar a secção alvo
            document.getElementById(targetId).classList.add('active');
            
            // Scroll para o topo da secção
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Sistema de tabs para a secção de características
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Mostrar o conteúdo correspondente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Sistema de drag and drop para a estrutura da epopeia
 */
function initDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropSlots = document.querySelectorAll('.drop-slot');
    const feedbackMessage = document.querySelector('.feedback-message');
    
    let draggedItem = null;
    
    // Configurar eventos para itens arrastáveis
    dragItems.forEach(item => {
        item.addEventListener('dragstart', function() {
            draggedItem = this;
            setTimeout(() => this.style.opacity = '0.5', 0);
        });
        
        item.addEventListener('dragend', function() {
            this.style.opacity = '1';
            draggedItem = null;
        });
    });
    
    // Configurar eventos para slots de destino
    dropSlots.forEach(slot => {
        slot.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('active');
        });
        
        slot.addEventListener('dragleave', function() {
            this.classList.remove('active');
        });
        
        slot.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('active');
            
            if (draggedItem) {
                // Verificar se o slot já tem um item
                if (this.firstChild) {
                    // Devolver o item atual para a lista de itens
                    const container = document.querySelector('.drag-container');
                    container.appendChild(this.firstChild);
                }
                
                // Mover o item arrastado para o slot
                this.appendChild(draggedItem);
                
                // Verificar se a ordem está correta
                checkOrder();
            }
        });
    });
    
    // Função para verificar se a ordem dos itens está correta
    function checkOrder() {
        let isCorrect = true;
        let allSlotsFilled = true;
        
        dropSlots.forEach(slot => {
            if (!slot.firstChild) {
                allSlotsFilled = false;
                return;
            }
            
            const slotOrder = parseInt(slot.getAttribute('data-slot'));
            const itemOrder = parseInt(slot.firstChild.getAttribute('data-order'));
            
            if (slotOrder !== itemOrder) {
                isCorrect = false;
            }
        });
        
        if (!allSlotsFilled) {
            feedbackMessage.textContent = '';
            feedbackMessage.className = 'feedback-message';
            return;
        }
        
        if (isCorrect) {
            feedbackMessage.textContent = 'Parabéns! A ordem está correta!';
            feedbackMessage.className = 'feedback-message success';
        } else {
            feedbackMessage.textContent = 'A ordem não está correta. Tenta novamente!';
            feedbackMessage.className = 'feedback-message error';
        }
    }
}

/**
 * Sistema de quiz interativo
 */
function initQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    const submitButton = document.getElementById('submit-quiz');
    const restartButton = document.getElementById('restart-quiz');
    const progressFill = document.querySelector('.progress-fill');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const resultDiv = document.querySelector('.quiz-result');
    const correctAnswersSpan = document.getElementById('correct-answers');
    const totalAnswersSpan = document.getElementById('total-answers');
    const resultMessage = document.querySelector('.result-message');
    
    let currentQuestion = 0;
    const totalQuestions = questions.length;
    
    // Configurar contadores iniciais
    totalQuestionsSpan.textContent = totalQuestions;
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Respostas corretas
    const correctAnswers = {
        q1: 'b',
        q2: 'c',
        q3: 'b',
        q4: 'd',
        q5: 'c'
    };
    
    // Função para mostrar a pergunta atual
    function showQuestion(index) {
        questions.forEach((question, i) => {
            if (i === index) {
                question.classList.remove('hidden');
            } else {
                question.classList.add('hidden');
            }
        });
        
        // Atualizar botões de navegação
        prevButton.disabled = index === 0;
        
        if (index === totalQuestions - 1) {
            nextButton.classList.add('hidden');
            submitButton.classList.remove('hidden');
        } else {
            nextButton.classList.remove('hidden');
            submitButton.classList.add('hidden');
        }
        
        // Atualizar progresso
        currentQuestionSpan.textContent = index + 1;
        progressFill.style.width = `${((index + 1) / totalQuestions) * 100}%`;
    }
    
    // Botão Anterior
    prevButton.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });
    
    // Botão Próxima
    nextButton.addEventListener('click', function() {
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });
    
    // Botão Verificar Respostas
    submitButton.addEventListener('click', function() {
        let correctCount = 0;
        
        // Verificar respostas
        for (let i = 1; i <= totalQuestions; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            
            if (selectedOption && selectedOption.value === correctAnswers[`q${i}`]) {
                correctCount++;
            }
        }
        
        // Mostrar resultado
        correctAnswersSpan.textContent = correctCount;
        totalAnswersSpan.textContent = totalQuestions;
        
        // Definir mensagem baseada na pontuação
        const percentage = (correctCount / totalQuestions) * 100;
        
        if (percentage >= 80) {
            resultMessage.textContent = 'Excelente! Tens um ótimo conhecimento sobre a Epopeia!';
            resultMessage.className = 'result-message good';
        } else if (percentage >= 50) {
            resultMessage.textContent = 'Bom trabalho! Continua a estudar para melhorar ainda mais.';
            resultMessage.className = 'result-message average';
        } else {
            resultMessage.textContent = 'Continua a estudar! A Epopeia tem muitos detalhes interessantes para descobrir.';
            resultMessage.className = 'result-message poor';
        }
        
        // Esconder perguntas e mostrar resultado
        questions.forEach(question => question.classList.add('hidden'));
        resultDiv.classList.remove('hidden');
        submitButton.classList.add('hidden');
        prevButton.disabled = true;
    });
    
    // Botão Reiniciar Quiz
    restartButton.addEventListener('click', function() {
        // Limpar seleções
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Voltar para a primeira pergunta
        currentQuestion = 0;
        showQuestion(currentQuestion);
        
        // Esconder resultado
        resultDiv.classList.add('hidden');
    });
    
    // Iniciar com a primeira pergunta
    showQuestion(currentQuestion);
}

/**
 * Sistema de criação de mini-epopeia
 */
function initEpicCreator() {
    const epicForm = document.getElementById('epic-form');
    const previewButton = document.getElementById('preview-epic');
    const saveButton = document.getElementById('save-epic');
    const resetButton = document.getElementById('reset-epic');
    const editButton = document.getElementById('edit-epic');
    const shareButton = document.getElementById('share-epic');
    const printButton = document.getElementById('print-epic');
    const epicPreview = document.querySelector('.epic-preview');
    const savedEpicsList = document.getElementById('saved-epics-list');
    
    // Botão de Pré-visualização
    previewButton.addEventListener('click', function() {
        const title = document.getElementById('epic-title').value;
        const theme = document.getElementById('epic-theme').value;
        const invocation = document.getElementById('epic-invocation').value;
        const dedication = document.getElementById('epic-dedication').value;
        const hero = document.getElementById('epic-hero').value;
        const setting = document.getElementById('epic-setting').value;
        const narrative = document.getElementById('epic-narrative').value;
        
        // Verificar se os campos obrigatórios estão preenchidos
        if (!title || !theme || !invocation || !hero || !narrative) {
            alert('Por favor, preenche todos os campos obrigatórios (título, tema, invocação, herói e narrativa).');
            return;
        }
        
        // Preencher a pré-visualização
        document.getElementById('preview-title').textContent = title;
        document.querySelector('#preview-proposicao .preview-text').textContent = theme;
        document.querySelector('#preview-invocacao .preview-text').textContent = invocation;
        document.querySelector('#preview-dedicatoria .preview-text').textContent = dedication || '(Sem dedicatória)';
        
        const narrativeText = `${hero}, em ${setting}, ${narrative}`;
        document.querySelector('#preview-narracao .preview-text').textContent = narrativeText;
        
        // Mostrar a pré-visualização
        epicForm.classList.add('hidden');
        epicPreview.classList.remove('hidden');
    });
    
    // Botão de Editar
    editButton.addEventListener('click', function() {
        epicForm.classList.remove('hidden');
        epicPreview.classList.add('hidden');
    });
    
    // Botão de Guardar
    saveButton.addEventListener('click', function() {
        const title = document.getElementById('epic-title').value;
        const theme = document.getElementById('epic-theme').value;
        const invocation = document.getElementById('epic-invocation').value;
        const dedication = document.getElementById('epic-dedication').value;
        const hero = document.getElementById('epic-hero').value;
        const setting = document.getElementById('epic-setting').value;
        const narrative = document.getElementById('epic-narrative').value;
        
        // Verificar se os campos obrigatórios estão preenchidos
        if (!title || !theme || !invocation || !hero || !narrative) {
            alert('Por favor, preenche todos os campos obrigatórios (título, tema, invocação, herói e narrativa).');
            return;
        }
        
        // Criar objeto da epopeia
        const epic = {
            id: Date.now(),
            title,
            theme,
            invocation,
            dedication,
            hero,
            setting,
            narrative,
            date: new Date().toLocaleDateString('pt-PT')
        };
        
        // Guardar no localStorage
        saveEpicToLocalStorage(epic);
        
        // Atualizar a lista de epopeias guardadas
        updateSavedEpicsList();
        
        // Limpar o formulário
        epicForm.reset();
        
        // Mostrar mensagem de sucesso
        alert('A tua epopeia foi guardada com sucesso!');
    });
    
    // Botão de Partilhar
    shareButton.addEventListener('click', function() {
        const title = document.getElementById('preview-title').textContent;
        const proposicao = document.querySelector('#preview-proposicao .preview-text').textContent;
        const invocacao = document.querySelector('#preview-invocacao .preview-text').textContent;
        const dedicatoria = document.querySelector('#preview-dedicatoria .preview-text').textContent;
        const narracao = document.querySelector('#preview-narracao .preview-text').textContent;
        
        const text = `Minha Epopeia: ${title}\n\nProposição:\n${proposicao}\n\nInvocação:\n${invocacao}\n\nDedicatória:\n${dedicatoria}\n\nNarração:\n${narracao}`;
        
        // Tentar usar a API de partilha se disponível
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text
            }).catch(err => {
                console.error('Erro ao partilhar:', err);
                fallbackShare();
            });
        } else {
            fallbackShare();
        }
        
        // Método alternativo de partilha
        function fallbackShare() {
            // Criar um elemento textarea temporário
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            
            try {
                // Copiar para a área de transferência
                document.execCommand('copy');
                alert('Texto copiado para a área de transferência! Agora podes colá-lo onde quiseres para partilhar.');
            } catch (err) {
                console.error('Erro ao copiar texto:', err);
                alert('Não foi possível copiar o texto. Por favor, tenta novamente.');
            }
            
            document.body.removeChild(textarea);
        }
    });
    
    // Botão de Imprimir
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // Função para guardar epopeia no localStorage
    function saveEpicToLocalStorage(epic) {
        let savedEpics = JSON.parse(localStorage.getItem('savedEpics')) || [];
        savedEpics.push(epic);
        localStorage.setItem('savedEpics', JSON.stringify(savedEpics));
    }
    
    // Função para atualizar a lista de epopeias guardadas
    function updateSavedEpicsList() {
        const savedEpics = JSON.parse(localStorage.getItem('savedEpics')) || [];
        
        if (savedEpics.length === 0) {
            savedEpicsList.innerHTML = '<p class="no-saved-epics">Ainda não guardaste nenhuma epopeia.</p>';
            return;
        }
        
        savedEpicsList.innerHTML = '';
        
        savedEpics.forEach(epic => {
            const epicCard = document.createElement('div');
            epicCard.className = 'saved-epic-card';
            epicCard.innerHTML = `
                <div class="saved-epic-title">${epic.title}</div>
                <div class="saved-epic-date">Criada em: ${epic.date}</div>
                <div class="saved-epic-actions">
                    <button class="btn btn-small view-epic" data-id="${epic.id}">Ver</button>
                    <button class="btn btn-small btn-secondary delete-epic" data-id="${epic.id}">Apagar</button>
                </div>
            `;
            savedEpicsList.appendChild(epicCard);
        });
        
        // Adicionar event listeners para os botões
        document.querySelectorAll('.view-epic').forEach(button => {
            button.addEventListener('click', function() {
                const epicId = parseInt(this.getAttribute('data-id'));
                const epic = savedEpics.find(e => e.id === epicId);
                
                if (epic) {
                    // Preencher o formulário com os dados da epopeia
                    document.getElementById('epic-title').value = epic.title;
                    document.getElementById('epic-theme').value = epic.theme;
                    document.getElementById('epic-invocation').value = epic.invocation;
                    document.getElementById('epic-dedication').value = epic.dedication;
                    document.getElementById('epic-hero').value = epic.hero;
                    document.getElementById('epic-setting').value = epic.setting;
                    document.getElementById('epic-narrative').value = epic.narrative;
                    
                    // Mostrar a pré-visualização
                    previewButton.click();
                    
                    // Scroll para o topo da secção
                    document.getElementById('cria-epopeia').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        document.querySelectorAll('.delete-epic').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('Tens a certeza que queres apagar esta epopeia?')) {
                    const epicId = parseInt(this.getAttribute('data-id'));
                    const updatedEpics = savedEpics.filter(e => e.id !== epicId);
                    localStorage.setItem('savedEpics', JSON.stringify(updatedEpics));
                    updateSavedEpicsList();
                }
            });
        });
    }
    
    // Inicializar a lista de epopeias guardadas
    updateSavedEpicsList();
}

/**
 * Interação com o mapa da viagem
 */
function initMapInteraction() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            alert(`Local: ${location}\nEste foi um dos pontos importantes na viagem de Vasco da Gama narrada n'Os Lusíadas.`);
        });
    });
}
