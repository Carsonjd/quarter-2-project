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

  $.post('/login', data, (success) => {
    console.log(success);
    // insert conditionals to update page to tell user about log-in errors
    if (success.code === 0) {
      document.cookie = `token=${success.token}`
      // document.cookie = `token=${success.token}`;
      window.location = '/success.html'
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
