async function createPostHandler (event) {
    event.preventDefault();
    const title = document.querySelector('#inputTitle').value;
    const body = document.querySelector('#inputBody').value;
  
    const res = await fetch(`/create`, {
        method: 'POST',
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
    } else {
        console.log(res)
    }
};
  
document.querySelector('#create-post-form').addEventListener('submit', createPostHandler);