// console.log(req.body);

// window.location = '/login.html';

$(document).ready(() => {
  console.log('bananas');
  let username = document.cookie;
  console.log(username);
  $.get('/user-favs')
})
