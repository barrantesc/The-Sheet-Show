//SIGN UP FORM HANDLER
const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("This is working");
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
};



//LOGIN FORM HANDLER
async function loginFormHandler(event) {
    event.preventDefault();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {'Content-Type': 'application/json'}
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
};
  

  
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  