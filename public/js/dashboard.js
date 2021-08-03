const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const res = await fetch(`/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (res.status === 200) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };

document.querySelector('.post-list').addEventListener('click', delButtonHandler);