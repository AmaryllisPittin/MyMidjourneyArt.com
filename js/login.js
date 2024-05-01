document.addEventListener('DOMContentLoaded', function () {
    const inputMail = document.getElementById('mail');
    const inputPassword = document.getElementById('password');
    const inputSubmitConnection = document.querySelector('.login-submit');
    const errorMessageContainer = document.querySelector('.error-message-container');

    inputSubmitConnection.addEventListener('click', function (event) {
        event.preventDefault();

        if (inputMail.value.length < 1 || inputPassword.value.length < 1) {
            displayErrorMessage('Erreur: veuillez remplir les deux champs pour vous connecter');
            return;
        }

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: inputMail.value,
                password: inputPassword.value,
            }),
        })
        .then(response => {
            if (response.status !== 200) {
                displayErrorMessage('Identifiant ou mot de passe incorrect')
                throw new Error('Identifiant ou mot de passe incorrect');
            } else {
                return response.json();
            }
        })
        .then(body => {
            localStorage.setItem('token', body.token);
            window.location.replace('portfolio.html');
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    });

    inputMail.addEventListener('input', function () {
        const errorMessage = document.getElementById('login-error-message');
        if(errorMessage){
            errorMessage.style.display = 'none';
        }
    });

    function displayErrorMessage(message){
        let errorMessage = document.getElementById('login-error-message');
        if(!errorMessage) {
            errorMessage = document.createElement('p');
        }

        errorMessage.id = 'login-error-message';
    
        errorMessage.innerText = message;
        errorMessage.style.display = 'block';

        errorMessageContainer.appendChild(errorMessage);
    }
});