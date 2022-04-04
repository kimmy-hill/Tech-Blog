const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#newblogTitle').value.trim();

    const content = document.querySelector('#blogBody').value.trim();

    const user_id = "user"
  
    if (title && content) {
      const response = await fetch('/dash/newblog', {
        method: 'POST',
        body: JSON.stringify({ 
            title, content, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace("/dash");
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.blog-form').addEventListener('submit', blogFormHandler);