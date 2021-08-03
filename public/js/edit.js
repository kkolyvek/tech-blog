async function commentHandler (event) {
    event.preventDefault();
    const title = document.querySelector('#inputTitle').value;
    const body = document.querySelector('#inputBody').value;
  
    const res = await fetch(window.location.pathname, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (res.status === 200) {
        document.location.replace('/dashboard');
        console.log(res)
    } else {
        console.log(res);
    }
};
  
document.querySelector('#update-post-form').addEventListener('submit', commentHandler);