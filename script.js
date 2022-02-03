const form = document.getElementById('form');
const username = document.getElementById('username');
const username1 = document.getElementById('username1');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function isValidusername(username) {
    const re = /^[a-zа-яё]{2,20}$/i;
    return re.test(String(username).toLowerCase());
}
function isValidusername1(username1) {
    const re = /^[a-zа-яё]{2,20}$/i;
    return re.test(String(username1).toLowerCase());
}
function validate(password) { 
     var minMaxLength = /^[\s\S]{8,32}$/,  
     upper = /[A-Z]/, 
     lower = /[a-z]/, 
     number = /[0-9]/,  
     special = /[^A-Za-z0-9]/,  
     count = 0;  
     if (minMaxLength.test(password)) {  // Only need 3 out of 4 of these to match  
    if (upper.test(password)) count++;  
    if (lower.test(password)) count++;  
    if (number.test(password)) count++;  
    if (special.test(password)) count++;  } 
    return count >= 4; }


function validateInputs() {
    const usernameValue = username.value.trim();
    const username1Value = username1.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {
        setError(username, 'имя не соответствует');
    } else if (!isValidusername(usernameValue)) {
        setError(username, 'использованы недопустимые символы');
    } else {
        setSuccess(username);
    }
    if (username1Value === '') {
        setError(username1, 'фамилия не соответсвует');
    } else if (!isValidusername(username1Value)) {
        setError(username1, 'использованы недопустимые символы');
    } else {
        setSuccess(username1);
    }
    if (emailValue === '') {
        setError(email, 'Ошибка email');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Email не соответсвует стандартом');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'ошибка пароля');
    } else if (passwordValue.length < 8) {
        setError(password, 'пароль меньше 8 символов');
    } else {
        setSuccess(password);
    }
    if (passwordValue === '') {
        setError(password, 'Ошибка пароля');
    } else if (!validate(passwordValue)) {
        setError(password, "проверьте пароль содержащий по крайней мере одну строчную букву, одну заглавную букву, одну цифровую цифру и один специальный символ");
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'повторите пароль');
    } else if (password2Value !== passwordValue) {
        setError(password2, "пароль не совпадает");
    } else {
        setSuccess(password2);
    }
    webshims.setOptions('forms', {
        iVal: {
            sel: '.ws-validate'
        }
    });
    
    webshims.polyfill('forms forms-ext');
    
    
    $(function () {
        $('input[data-relmax]').each(function () {
            var oldVal = $(this).prop('value');
            var relmax = $(this).data('relmax');
            var max = new Date();
            max.setFullYear(max.getFullYear() + relmax);
            $.prop(this, 'max', $(this).prop('valueAsDate', max).val());
            $.prop(this, 'value', oldVal);
        });
    });
}