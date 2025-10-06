document.addEventListener('DOMContentLoaded', function () {

    // ===========================================
    // --- LÓGICA DO FUNDO MATRIX ---
    // ===========================================
    const canvas = document.getElementById('matrix-background');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(26, 15, 46, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#9D00FF';
            ctx.font = fontSize + 'px arial';

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        const matrixInterval = setInterval(draw, 33);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Recalcula as colunas ao redimensionar para evitar falhas
            const newColumns = canvas.width / fontSize;
            for (let x = 0; x < newColumns; x++) {
                drops[x] = 1;
            }
        });
    }

    // ===========================================
    // --- LÓGICA DO FORMULÁRIO DE CONTATO ---
    // ===========================================
    const portfolioForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (portfolioForm) {
        portfolioForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const action = form.action;
            formStatus.innerHTML = 'Enviando...';
            
            fetch(action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    formStatus.innerHTML = "Obrigado! Sua mensagem foi enviada.";
                    formStatus.style.color = 'green';
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário.";
                            formStatus.style.color = 'red';
                        }
                    })
                }
            }).catch(error => {
                formStatus.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário.";
                formStatus.style.color = 'red';
            });
        });
    }

    // ===========================================
    // --- LÓGICA DO MODAL DE PROJETOS ---
    // ===========================================
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const modalProjectLink = document.getElementById('modal-project-link');

    if (modal) { // Garante que a lógica do modal só rode se o modal existir na página
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const image = card.dataset.image;
                const title = card.dataset.title;
                const details = card.dataset.details;
                const link = card.dataset.link;
                
                modalImage.src = image;
                modalTitle.innerText = title;
                modalDetails.innerText = details;
                modalProjectLink.href = link;
                
                modal.style.display = 'flex';
            });
        });

        const closeModal = () => { modal.style.display = 'none'; };
        
        if (modalCloseButton) { modalCloseButton.addEventListener('click', closeModal); }
        
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { closeModal(); }
        });
    }
});