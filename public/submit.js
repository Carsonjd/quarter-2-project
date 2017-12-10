$(document).ready(() => {
  console.log("banarnars");
})

const $form = $('form');
const $firstName = $('#f_name');
const $lastName = $('#l_name');
const $userName = $('#u_name');
const $password = $('#password');
const $email = $('#email');

$('#submit').click((event) => {
  event.preventDefault();
  let validity = validate();
  if (!validity) {
    console.log("invalid");
  } else {
    console.log('clicked');
    event.preventDefault();
    let data = $.param(getUserFromForm());
    $.post('/users', data)
  }
});

const validate = () => {
  let data = getUserFromForm();
  // 
  return true;
}

const getUserFromForm = () => {
  return {
    first_name: $firstName.val(),
    last_name: $lastName.val(),
    user_name: $userName.val(),
    email: $email.val(),
    password: $password.val()
  }
}
