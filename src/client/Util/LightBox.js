import React from 'react';
import 'css/lightbox.css'
import 'css/form.css'

class LightBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {
        
        return (
            <>
            <div className="lightbox-foundation">
            {/*this div intentionally empty. Allows the light box content to scroll */}     
            </div> 
            <div className="lightbox-background">
                <div className="lightbox">
                <span className="close" onClick={this.props.close}>x</span>
                {this.props.children} {/*there must be nested markup components passed in*/}
                </div>
            </div>
            </>
        )
    };
}

export default LightBox;