const axios = require('axios')
 
axios.post('http://localhost:3050', {
    Name: 'Fred',
    Age: '23'
  })
  .then(function (response) {
    console.log(response);
  })
