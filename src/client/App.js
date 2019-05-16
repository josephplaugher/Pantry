import { FormClass, Input, Button } from 'reactform-appco'
import React from 'react'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import EB from 'Util/EB'
import checkLoginState from 'Util/CheckLoginState'
import Home from './mainmenu/home'
import 'css/main.css'
import 'css/userNotify.css'

class App extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/login'
		this.valRules = ValRules
		this.state = {
			isLoggedIn: false,
			userData: {},
			email: '',
			password: ''
		}
		this.setLoginState = this.setLoginState.bind(this)
		this.response = this.response.bind(this)
		this.signOut = this.signOut.bind(this)
		this.setLoginState()
	}

	setLoginState = () => {
		let auth = checkLoginState()
		auth.then((res) => {
			if (res.isLoggedIn === true) {
				this.setState({
					isLoggedIn: res.isLoggedIn,
					userData: res.userData
				})
			} else {
				this.setState({
					isLoggedIn: false,
					userData: {}
				})
			}
		})
	}

	response = (res) => {
		if (typeof res.data.userData !== 'undefined') {
			sessionStorage.setItem(
				process.env.USER_DATA_LABEL,
				JSON.stringify(res.data.userData)
			)
			sessionStorage.setItem(process.env.TOKEN_NAME, res.data.token)
			this.setState({
				token: res.token,
				userNotify: res.data.userNotify,
				userData: res.data.userData,
				isLoggedIn: true
			})
		}
		if (typeof res.error !== 'undefined') {
			console.error('submit error: ', res.error)
		}
	}

	signOut() {
		sessionStorage.removeItem(process.env.USER_DATA_LABEL)
		sessionStorage.removeItem(process.env.TOKEN_NAME)
		this.setState({
			isLoggedIn: false,
			userData: {}
		})
		Ajax.get(SetUrl() + '/user/logout')
	}

	render() {
		return (
			<div id='container'>
				<div>
					{this.state.isLoggedIn ? (
						<EB comp='Home'>
							<Home userData={this.state.userData} signOut={this.signOut} />
						</EB>
					) : (
						<div id='sign-in'>
							<div id='logoBox'>
								<h1>pantry</h1>
							</div>
							<p className='formTitle'>Sign In</p>
							{/* prettier-ignore */}
							<form onSubmit={this.rfa_onSubmit} >
                      <Input name="email" label="Email" value={this.state.email} onChange={this.rfa_onChange} autoComplete={true}/>
                      <Input name="password" label="Password" value={this.state.password} onChange={this.rfa_onChange} />
                      <div className="rfa_button-div">
                        <Button id="submit" value="Sign In" />
                      </div>
                      <p className="error-msg"> {this.state.userData.error}</p>
                  </form>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default App
