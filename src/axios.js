const axios = require('axios')
 
function sendPost(n) {
	axios.post('http://localhost:3050', {
	    Name: 'Fred',
	    Age: n
	  })
	  .then(function (response) {
	    console.log(response);
	  })
}

export{sendPost};

