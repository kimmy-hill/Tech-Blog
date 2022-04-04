const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector('#comment').value.trim();

    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const user_id = "user"
  
    if (text) {
      const response = await fetch('/api/blogs/:id', {
        method: 'POST',
        body: JSON.stringify({ 
            text, blog_id, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.comment-form').addEventListener('submit', commentFormHandler);