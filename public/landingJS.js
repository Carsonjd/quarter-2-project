$(document).ready(() => {
  console.log('barnarnars');
})

const $firstName = $('#f_name');
const $lastName = $('#l_name');
const $userName = $('#u_name');
const $password = $('#password');
const $email = $('#email');
const $loginUsername = $('#user_login');
const $loginPassword = $('#password_login');

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
    user_name: $loginUsername.val(),
    password: $loginPassword.val()
  }
}

$('#newUserButton').click(function() {
  $('#newUserForm').toggle('slow');
  $('#loginForm').hide();
});

$('#loginButton').click(function(){
  $('#loginForm').toggle('slow');
  $('#newUserForm').hide();
})

$('#mapButton').click(function(){
  window.location = './map.html'
})

$loginUsername.on("blur", () => {
  if ($loginUsername["0"].value < 1) {
    $($loginUsername).css("border-color", "red").attr("placeholder", "Username Cannot Be Blank")
  } else {
    $($loginUsername.css("border-color", "green"))
  }
})

$loginPassword.on("blur", () => {
  if ($loginPassword["0"].value.length < 8) {
    $loginPassword.css("border-color", "red").attr("placeholder", "Password Must Be At Least 8 Characters")
  } else {
    $($loginPassword.css("border-color", "green"))
    $('#submit').attr("disabled", false).focus();
  }
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
  $.post('/users', data, (success) => {
    if(success.code === 4) {
      swal({
      title: "Account Created!",
      text: "Please log in to continue.",
      icon: "success",
      button: "Log In",
    });
    $('#newUserForm').toggle('slow');
    $('#loginForm').toggle('slow');
  } else if (success.code === 3) {
    console.log('NO');
  }
})
});

$('#submitLogin').click((event) => {
  event.preventDefault();
  let data = $.param(getLoginForm());
  console.log(data);
  $.post('/login', data, (success) => {
    console.log(success);
    // insert conditionals to update page tiu c5o tell user about log-in errors
    if (success.code === 0) {
      // Cookies.set = `token=${success.token}`
      document.cookie = `token=${success.token}`;
      window.location = './map.html'
    }
  })
})


$(document).ajaxError((event, jqxhr, settings, thrownError) => {

  if (jqxhr.responseJSON.code === 1) {
    $loginUsername.focus().css("border-color", "red");
    console.log("invalid username"); // Materialize Toast
  } else if (jqxhr.responseJSON.code === 2) {
    $loginPassword.focus().css("border-color", "red");
    console.log("incorrect password");  // Materialize Toast
  } else if (jqxhr.responseJSON.code === 3) {
    $userName.focus().css("border-color", "red"); // sweetalert
    console.log('username taken');
    swal({
    title: "User Name Taken.",
    text: "Please Choose New User Name.",
    icon: "error",
    button: "Try Again",
  });
  }

})
