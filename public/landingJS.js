$(document).ready(() => {
  console.log('barnarnars');
})


const $firstName = $('#f_name');
const $lastName = $('#l_name');
const $userName = $('#u_name');
const $password = $('#password');
const $email = $('#email');

const username = $('#username');
const password = $('#password');

const getNewUserForm = () => {
  return {
    first_name: $firstName.val(),
    last_name: $lastName.val(),
    user_name: $userName.val(),
    email: $email.val(),
    password: $password.val()
  }
}

const getLoginForm = () => {
  return {
    user_name: username.val(),
    password: password.val()
  }
}


$('#newUserButton').click(function() {
  $('#newUserForm').toggle();
});

$('#loginButton').click(function(){
  $('#loginForm').toggle();
})

$('#mapButton').click(function(){
  window.location = './map.html'
})


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

$('#submitNewUser').click((event) => {
  console.log('new user click event');
  event.preventDefault();
  let data = $.param(getNewUserForm());
  // document.cookie = `username=${$userName.val()}`
  $.post('/users', data);
  window.location = './map.html'
});
//
//
$('#submitLogin').click((event) => {
  event.preventDefault();
  let data = $.param(getLoginForm());
  console.log(data);
  $.post('/login', data, (success) => {
    console.log(success);
    // insert conditionals to update page tiu c5o tell user about log-in errors
    if (success.code === 0) {
      document.cookie = `token=${success.token}`
      // document.cookie = `token=${success.token}`;
      window.location = './map.html'
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

})
