
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');



inputRub.addEventListener('input', ()=> {
function currencyConverter() {
    return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
    
            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();

            request.onload = () => {
                if (request.readyState === 4 && request.status == 200) {
                    resolve(request);
                } else {
                    reject();
                }
            }
        });
    };
    currencyConverter()
        .then( ({ response }) => {
            let data = JSON.parse(response);
            inputUsd.value = inputRub.value / data.usd;
        })
        .catch(()=> inputUsd.value = 'Что-то пошло не так!');
});
