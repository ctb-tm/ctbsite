document.addEventListener('DOMContentLoaded', () => {

    // Inicializa a biblioteca de animações ao rolar
    AOS.init({
        duration: 800, // Duração da animação
        once: true,    // Anima apenas uma vez
        offset: 50,    // Inicia a animação 50px antes do elemento aparecer
    });

    // Função para navegar entre as páginas
    window.showPage = function(pageId, element) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');

        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        element.classList.add('active');
    }

    // Lógica para a galeria de fotos (lightbox)
    const galleryImages = document.querySelectorAll('.photo-item img');
    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentIndex;

    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                currentIndex = parseInt(img.dataset.index);
                overlay.style.display = 'flex';
                lightboxImg.src = img.src;
            });
        });

        document.getElementById('lightbox-next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
        });

        document.getElementById('lightbox-prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
        });

        document.getElementById('lightbox-close').addEventListener('click', () => {
            overlay.style.display = 'none';
        });
        
        overlay.addEventListener('click', e => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    }

    // Lógica para o zoom nas imagens
    document.querySelectorAll('.zoomable-image').forEach(image => {
        image.addEventListener('click', (event) => {
            event.stopPropagation();
            image.classList.toggle('zoomed'); // A lógica do zoom em si pode ser feita com CSS
        });
    });

    /*--------------------------------------------------*/
    /* LÓGICA DO BANNER POP-UP (ADICIONADA)             */
    /*--------------------------------------------------*/
    const fullscreenBanner = document.getElementById('fullscreen-banner');
    const closeBannerButton = document.getElementById('close-banner');

    // Mostra o banner após um pequeno atraso (ex: 1 segundo)
    if (fullscreenBanner) {
        setTimeout(() => {
            fullscreenBanner.classList.remove('hidden');
        }, 1000); // 1000 milissegundos = 1 segundo
    }

    // Adiciona listener para fechar o banner ao clicar no botão 'x'
    if (closeBannerButton) {
        closeBannerButton.addEventListener('click', function() {
            if (fullscreenBanner) {
                fullscreenBanner.classList.add('hidden');
            }
        });
    }
    // Opcional: Fechar o banner clicando fora dele
    if (fullscreenBanner) {
        fullscreenBanner.addEventListener('click', (e) => {
            if (e.target === fullscreenBanner) { // Verifica se o clique foi no overlay em si, não nos filhos
                fullscreenBanner.classList.add('hidden');
            }
        });
    }

}); // Fim de DOMContentLoaded
