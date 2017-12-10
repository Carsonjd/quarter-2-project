$(document).ready(() => {
  console.log('barnarnars');
})

const username = $('#u_name');
const password = $('#password');

const getUserFromForm = () => {
  return {
    user_name: username.val(),
    password: password.val()
  }
}

$('#login').click((event) => {
  event.preventDefault();
  const data = $.param(getUserFromForm());
  document.cookie = `username=${username.val()}`;
  $.post('/login', data, (success) => {
    console.log(success);
    console.log('banankas');
  });
})

$(document).ajaxError((event, jqxhr, settings, thrownError) => {

  if (jqxhr.responseJSON.code === 1) {
    console.log("invalid username"); // can update page to say so
  }

});
