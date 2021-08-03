async function loginHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#inputUsername').value;
    const password = document.querySelector('#inputPassword').value;
  
    const res = await fetch(`/login`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (res.status === 200) {
        document.location.replace('/dashboard');
        // console.log(res)
    } else if (res.status === 403) {
        alert('Incorrect username or password!');
    }
};
  
document.querySelector('#login-form').addEventListener('submit', loginHandler);