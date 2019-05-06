import { FormClass, Input, Button } from 'reactform-appco'
import React from 'react'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'

class NewStore extends FormClass {
	constructor(props) {
		super(props)
		this.route = SetUrl() + '/newStore'
		this.valRules = ValRules
		this.state = {
			dataView: false,
			table: [],
			userNotify: {},
			formData: {
				store: ''
			},
			store: ''
		}
		this.response = this.response.bind(this)
	}

	response = (res) => {
		if (res.data.success === true) {
			let msg = res.data.userNotify
			this.setState({ userNotify: msg })
		}
	}

	render() {
		return (
			<>
				<div id='workingPane'>
					<p className='formTitle'>Create New Grocery Store</p>
					<form onSubmit={this.rfa_onSubmit}>
						<Input
							name='store'
							label='Store Name'
							value={this.state.store}
							onChange={this.rfa_onChange}
							error={this.state.userNotify.item}
						/>
						<div className='buttondiv'>
							<Button id='submit' value='Save New Store' />
						</div>
					</form>
					<p className='userNotify-success'>{this.state.userNotify.success}</p>
				</div>
			</>
		)
	}
}

export default NewStore
