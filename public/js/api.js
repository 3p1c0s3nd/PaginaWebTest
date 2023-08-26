document.addEventListener('click', (e) => {
    if(e.target.dataset.short){
        const url = 'http://localhost:9000/${e.target.dataset.short}';
        navigator.clipboard.writeText(url).then(() => {
            console.log('Copiado al portapapeles');
        }).catch((err) => {
            console.log(err);
        })
    }    
})