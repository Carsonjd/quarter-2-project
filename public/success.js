$(document).ready(() => {
  let token = getCookie('token');
  console.log(token);
  $.ajax('/user-favs', (result) => {
    headers: token,
    console.log(result);

    // $('body').append(result.locations[0].location_name)

  })

})

var getCookie = function(name) {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; ++i) {
    var pair = cookies[i].trim().split('=');
    if (pair[0] == name) {
      return pair[1]
    }
  }
  return null;
};
