const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#uName-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dash');
      } else {
        alert("Please type in three vaild entries.");
      }
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);