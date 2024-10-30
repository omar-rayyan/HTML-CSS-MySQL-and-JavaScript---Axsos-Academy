function signOut() {
    fetch('/signout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/';
        } else {
            console.error('Failed to sign out');
        }
    })
    .catch(error => console.error('Error:', error));
}