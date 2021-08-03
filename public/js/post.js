async function commentHandler (event) {
    // event.preventDefault();
    const body = document.querySelector('#inputBody').value;
  
    const res = await fetch(window.location.pathname, {
        method: 'POST',
        body: JSON.stringify({
            body
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (res.status === 200) {
        // document.location.replace('/dashboard');
        console.log(res)
    } else {
        console.log(res);
    }
};
  
document.querySelector('#create-post-comment').addEventListener('submit', commentHandler);