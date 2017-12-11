$(document).ready(() => {
  console.log("bananas");
})

const $form = $('form');
const $firstNameInput = $('#f_name');
const $lastNameInput = $('#l_name');
const $email = $('#email');

$('#submit').click((event) => {
  event.preventDefault();

  $.post('/users', getUserFromForm)
    .then(console.log(getUserFromForm()))
    // .catch(showError);
});

const getUserFromForm = () => {
  return {
    firstName: $firstNameInput.val(),
    lastName: $lastNameInput.val(),
    email: $email.val()
  }
}

// clickme.click((event) => {
//   event.preventDefault();
//   console.log(getUserFromForm());
// });
