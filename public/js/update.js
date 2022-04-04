const updateFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#postTitle').value.trim();
  
    const content = document.querySelector('#postContent').value.trim();
    
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];
  
    const user = "user"
  
  
    console.log(title, content)
    if (title && content) {
      const response = await fetch(`/dash/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title, content, user
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
    .querySelector('.editPostForm').addEventListener('submit', updateFormHandler);