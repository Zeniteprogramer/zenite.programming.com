let deferredPrompt;

// 1. Captura o evento de instalação
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('Zênite pronto para ser instalado!');
});

// 2. Lógica do Botão
document.getElementById('install-button').addEventListener('click', async (e) => {
    if (deferredPrompt) {
        // Se o navegador permitir a instalação, ele CANCELA o download do ZIP
        e.preventDefault(); 
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('Usuário aceitou a instalação');
        }
        deferredPrompt = null;
    } else {
        // Se NÃO puder instalar (PWA não carregou), ele segue e baixa o ZIP normalmente
        console.log('Instalação não disponível, baixando ZIP...');
    }
});

// 3. Registrar o Service Worker (Garante que o ícone apareça)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
