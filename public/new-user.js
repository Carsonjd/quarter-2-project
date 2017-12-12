$(document).ready(() => {
  console.log("banarnars");
})

const $form = $('form');
const $firstName = $('#f_name');
const $lastName = $('#l_name');
const $userName = $('#u_name');
const $password = $('#password');
const $email = $('#email');

$firstName.on("blur", () => {
  if ($firstName["0"].value < 1) {
    $($firstName).css("border-color", "red").attr("placeholder", "First Name Cannot Be Blank")
  } else {
    $($firstName.css("border-color", "green"))
  }
})

$lastName.on("blur", () => {
  if ($lastName["0"].value < 1) {
    $($lastName).css("border-color", "red").attr("placeholder", "Last Name Cannot Be Blank")
  } else {
    $($lastName.css("border-color", "green"))
  }
})

$userName.on("blur", () => {
  if ($userName["0"].value.length < 6) {
    $($userName).css("border-color", "red").attr("placeholder", "User Name Must Be At Least 6 Characters")
  } else {
    $($userName.css("border-color", "green"))
  }
})

$email.on("blur", () => {
  if ($email["0"].value < 1) {
    $($email).css("border-color", "red").attr("placeholder", "Please enter a valid email")
  } else {
    $($email.css("border-color", "green"))
  }
})

$password.on("blur", () => {
  if ($password["0"].value.length < 8) {
    $($password).css("border-color", "red").attr("placeholder", "Password Must Be At Least 8 Characters")
  } else {
    $($password.css("border-color", "green"))
    $('#submit').attr("disabled", false).focus();
  }
})

$('#submit').click((event) => {
  console.log('in click event');
  event.preventDefault();
  const data = $.param(getUserFromForm());
  document.cookie = `username=${$userName.val()}`
  $.post('/users', data);
  window.location = './map.html'
});



const getUserFromForm = () => {
  return {
    first_name: $firstName.val(),
    last_name: $lastName.val(),
    user_name: $userName.val(),
    email: $email.val(),
    password: $password.val()
  }
}
