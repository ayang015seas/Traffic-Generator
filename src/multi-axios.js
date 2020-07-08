const axios = require('axios')
 
function sendPost(n) {
	axios.post('http://192.168.108.19:5000', {
	    Name: 'Fred',
	    Age: n
	  })
	  .then(function (response) {
	    console.log(response);
	  })
}

for (var i = 0; i < 1; i++) {
	sendPost(5);
}

// sendPost()
