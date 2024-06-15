export function checkAuthentication(path) {
    if (!sessionStorage.getItem('authenticated')) {
      if (window.location.pathname !== '/components/sign_in/signin.html') {
        window.location.href = '/components/sign_in/signin.html';
      }
    } else {
      if (window.location.pathname !== path) {
        window.location.href = path;
      }
    }
  }