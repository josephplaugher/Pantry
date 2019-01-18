import {Form, Input, Button} from 'reactform-appco'
import React from 'react' 
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import EB from 'Util/EB'
import checkLoginState from 'Util/CheckLoginState'
import Home from './mainmenu/home'
import 'css/main.css'
import 'css/userNotify.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoggedIn: true,
      userData: {}
    }
    this.setLoginState = this.setLoginState.bind(this);
    this.response = this.response.bind(this);
    this.setLoginState();
  }

  setLoginState = () => {
    const AppCoToken = sessionStorage.getItem('PantryToken');
    if(AppCoToken !== null) {
      let auth = checkLoginState();
      auth.then( headers => {
        if(headers.authorized === "true") {
          let userData = JSON.parse(sessionStorage.getItem('PantryUser'));
          sessionStorage.setItem('PantryToken', headers.token);
          this.setState({ 
            isLoggedIn: true,
            userData: userData 
          });
        } else {
          sessionStorage.removeItem('PantryUser');
          sessionStorage.removeItem('PantryToken');
          this.setState({ 
            isLoggedIn: false,
            userData: {} 
          });
        }
      });
    }
  }

  response = (res) => {
    if(typeof res.userData !== 'undefined') {
      sessionStorage.setItem('PantryUser', JSON.stringify(res.userData));
      sessionStorage.setItem('PantryToken', res.token);
      this.setState({
          token: res.token,
          userNotify: res.userNotify,
          userData: res.userData,
          isLoggedIn: true
      });
    }
    if(typeof res.error !== 'undefined') {
      console.error('submit error: ', res.error);
    }
  }

  render() {

    return (
      <div id="container">
        <div>
          {this.state.isLoggedIn ? (
          <EB comp="Home">
          
            <Home userData={this.state.userData} />
          </EB>
          ) : (
              <div id="sign-in">
                <div id="logoBox"><h1>pantry</h1></div>
                <Form formTitle="Sign In" 
                  action={`${SetUrl()}/login`}
                  valrules={ValRules} response={this.response} >
                  <Input name="email" label="Email" /><br />
                  <Input name="password" label="Password" />
                  <div className="buttondiv">
                    <Button id="submit" value="Sign In" />
                  </div>

                </Form>
              </div>
            )}
        </div>
      </div>
    )
  }

}

export default App;