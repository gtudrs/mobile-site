function login() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const error = document.getElementById('error');
  
    if (!user || !pass) {
      error.innerText = 'Please enter both username and password.';
      return;
    }
  
    error.innerText = '';
    document.getElementById('login').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    document.getElementById('greeting').innerText = `Welcome, ${user}!`;
  }
  
  function logout() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error').innerText = '';
  }
  