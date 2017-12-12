$(document).ready(() => {
  console.log('barnarnars');
})

const username = $('#username');
const password = $('#password');

const getUserFromForm = () => {
  return {
    user_name: username.val(),
    password: password.val()
  }
}

$('#submit').click((event) => {
  event.preventDefault();
  const data = $.param(getUserFromForm());
  // console.log(data);

  $.post('/login', data, (success) => {
    console.log(success);

    if (success.code === 0) {
      Cookies.set('token', success.token)
      window.location = '/map.html'
    }
  })
})

$(document).ajaxError((event, jqxhr, settings, thrownError) => {

  if (jqxhr.responseJSON.code === 1) {
    username.focus().css("border-color", "red");
    console.log("invalid username"); // Materialize Toast
  } else if (jqxhr.responseJSON.code === 2) {
    password.focus().css("border-color", "red");
    console.log("incorrect password");  // Materialize Toast
  }

});
