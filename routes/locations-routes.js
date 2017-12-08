$('document').ready({
  console.log('bananas');
  const baseURL = 'http://localhost:3000'

  $('#compare').on('click', (event) => {
    const user1 = $('#username-1').val()
    const user2 = $('#username-2').val()
    if (user1 && user2) {
      axios.all([
        axios.get(`https://api.github.com/users/${user1}`),
        axios.get(`https://api.github.com/users/${user2}`)
      ]).then((res) => {
        showDataOne(res[0].data)
        showDataTwo(res[1].data)
      })
    } else {
      alert('Invalid input')
    }
  })

  

})
