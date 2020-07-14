const axios = require('axios')
 
axios.post('http://localhost:5000/', {
	Number: 24
}).then((response) => {
	console.log(response);
}, (error) => {
	console.log(error);
})

