const ValRules = {
	settings: {
		mode: process.env.NODE_ENV,
		log: {
			dev: function(data) {
				console.log(data)
			},
			prod: function(data) {
				console.log(data)
			}
		}
	},
	rules: [
		{
			name: 'fname',
			required: true,
			alphanumeric: 'true',
			errorMsg: 'Your name is required'
		},
		{
			name: 'email',
			required: true,
			email: true,
			errorMsg: 'Must provide a valid email address'
		},
		{
			name: 'message',
			required: true,
			alphanumeric: true,
			errorMsg: 'Please tell us a little about your business needs'
		},
		{
			name: 'date',
			required: true,
			alphanumeric: true,
			errorMsg: 'Please provide a date'
		},
		{
			name: 'instock',
			required: false,
			numeric: true,
			errorMsg: 'How much do you currently have? E.G. 3.'
		},
		{
			name: 'units',
			required: false,
			numeric: true,
			errorMsg: 'How many are in a package? E.G. 3.'
		},
		{
			name: 'par',
			required: false,
			numeric: true,
			errorMsg: 'what is the minimum you want in stock? E.G. 3.'
		}
	]
}

export default ValRules
