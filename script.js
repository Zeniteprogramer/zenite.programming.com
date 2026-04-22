let deferredPrompt;
const installBtn = document.getElementById('install-button');

// Escuta o evento de instalação do navegador
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'flex'; // Mostra o botão cinza quando puder instalar
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('Zênite Instalado!');
        }
        deferredPrompt = null;
    }
});

// Atualiza números das linhas
const editor = document.getElementById('code-editor');
const gutter = document.getElementById('gutter');

editor.addEventListener('input', () => {
    const lines = editor.value.split('\n').length;
    gutter.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');
});
