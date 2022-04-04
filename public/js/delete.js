const deleteFormHandler = async (event) => {
    event.preventDefault();
  
    const blog_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    console.log(blog_id)
    if (blog_id) {
      const response = await fetch('/dash/:id', {
        method: 'DELETE',
        body: JSON.stringify({
          blog_id
        }),
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
    .querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);