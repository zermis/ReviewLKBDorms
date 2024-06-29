document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#signup-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting normally
        
        // Get the values from the input fields
        const username = document.getElementById('inputUsername').value;
        const password = document.getElementById('inputPassword').value;
        const passwordAgain = document.getElementById('inputPasswordAgain').value;
        
        console.log('Form submitted');
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Password Again:', passwordAgain);

        const data = {
            username: username,
            password: password,
            comfirm_password: passwordAgain
        };

        const protocol = 'http';
        const host = '127.0.0.1';
        const port = 5000;
        const url = `${protocol}://${host}:${port}/user/signup`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
          .then(data => console.log(data))
          .catch(error => console.log('Error:', error));
    });
});