// form loading animation

const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i * 100);
})

window.onload = () => {
    if (sessionStorage.name) {
        location.href = '/';
    }
}

// form validation

const Name = document.querySelector('.name') ;//|| null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

/*if (name == null) { // means login page is open
    submitBtn.addEventListener('click', () => {
        // name must be > 6 string
        // if (email.value.length < 6) {
        //     alertBox('Email must be greater than 6 characters');
        //     return;
        // }
        // if (document.querySelector('.name').value.length < 6) {
        //     alertBox('Name must be greater than 6 characters');
        //     return;
        // }
        // 不完整：

        // if (document.querySelector('.name').value == "" || document.querySelector('.emall').value == "") {
        //     alertBox('Name or Email must be filled');
        // }

        fetch('/login-user', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
            .then(res => res.json())
            .then(data => {
                validateData(data);
            })
    })
} else { // means register page is open*/
    submitBtn.addEventListener('click', () => {
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                name: Name.value,
                email: email.value,
                password: password.value
            })
        })
            .then(res => res.json())
            .then(data => {
                validateData(data);
            })
    })

//}

const validateData = (data) => {
    if (!data.name) {
        alertBox(data);
    } //else if(data.name.length<6){
        //alerBox("Name must be greater than 6 characters!");
    //}
    else {
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        sessionStorage.password = password.value;
        location.href = '/';
    }
}

