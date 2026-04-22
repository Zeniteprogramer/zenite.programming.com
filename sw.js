self.addEventListener('install', (event) => {
    console.log('Zênite SW instalado');
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Necessário para o Chrome liberar o ícone de instalação
});
