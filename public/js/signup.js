async function signupHandler (event) {
    event.preventDefault();
    const email = document.querySelector('#inputEmail').value;
    const username = document.querySelector('#inputUsername').value;
    const password = document.querySelector('#inputPassword').value;
  
    const res = await fetch(`/signup`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            username,
            password
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (res.status === 200) {
        // document.location.replace('/dashboard');
        console.log(res)
    } else {
        console.log(res)
        alert('Error signing up: password must be at least 8 characters long');
    }
};
  
document.querySelector('#signup-form').addEventListener('submit', signupHandler);