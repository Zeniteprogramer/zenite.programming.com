// Objeto de Gerenciamento da UI
const ui = {
    switchTab(panel) {
        document.getElementById('panel-explorer').style.display = 'none';
        document.getElementById('panel-settings').style.display = 'none';
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

        if(panel === 'explorer') {
            document.getElementById('panel-explorer').style.display = 'block';
            document.getElementById('btn-explorer').classList.add('active');
        } else {
            document.getElementById('panel-settings').style.display = 'block';
            document.getElementById('btn-settings').classList.add('active');
        }
    },
    toggleFolder(id) {
        const el = document.getElementById(id);
        const arrow = document.getElementById(id + '-arrow');
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
        arrow.style.transform = el.style.display === 'none' ? 'rotate(-90deg)' : 'rotate(0deg)';
    },
    syncScroll() {
        const editor = document.getElementById('code-editor');
        const gutter = document.getElementById('gutter');
        gutter.scrollTop = editor.scrollTop;
    }
};

// Objeto de Lógica da Linguagem
const core = {
    handleInput() {
        this.updateGutter();
    },
    updateGutter() {
        const lines = document.getElementById('code-editor').value.split('\n').length;
        const gutter = document.getElementById('gutter');
        gutter.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');
    },
    updateEngine() {
        const lang = document.getElementById('lang-engine').value;
        const editor = document.getElementById('code-editor');
        if(lang === 'EN') {
            editor.value = 'set name = "Geni"\nprint "Zenite Core v1"';
        } else {
            editor.value = 'guardar nome = "Geni"\naparecer "Zênite Code Iniciado"';
        }
        this.updateGutter();
    }
};

// LÓGICA DE INSTALAÇÃO (PWA)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-app').style.display = 'block';
});

document.getElementById('install-app').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('ZNT Instalado!');
        }
        deferredPrompt = null;
    }
});

// Inicialização
core.updateGutter();
