$(document).ready(() => {
  console.log("banarnars");
})

const $form = $('form');
const $firstNameInput = $('#f_name');
const $lastNameInput = $('#l_name');
const $userName = $('#u_name');
const $email = $('#email');

$('#submit').click((event) => {
  event.preventDefault();
  let data = $.param(getUserFromForm());
  $.post('/users', data)
});

const getUserFromForm = () => {
  return {
    first_name: $firstNameInput.val(),
    last_name: $lastNameInput.val(),
    user_name: $userName.val(),
    email: $email.val()
  }
}
