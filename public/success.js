$(document).ready(() => {
  $.get('/user-favs', (result) => {
    console.log('your favorite locations are right here!', result.locations);
  })

})
