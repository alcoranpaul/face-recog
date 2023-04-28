import React, { Component } from "react";
import "./SignIn.css"

class SignIn extends Component {
    constructor(props) {
        super();
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch("http://localhost:3000/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    console.log('Success on signin!')
                    this.props.loadUser(data)
                    this.props.onRouteChange('home')
                }
            })

    }


    render() {
        const { onRouteChange } = this.props
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-2" >
                <main className="pa4 black-80 w-100">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 underline">Sign In</legend>
                            <div className="mt3">
                                <label className="tl db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="tl db fw6 lh-copy f4" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
                        <div className="lh-copy mt3">
                            <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Sign in" />
                            <p onClick={() => onRouteChange("register")} className="f5 link dim black db pointer ">Register</p>
                        </div>
                    </div>
                </main>
            </article>

        );
    }
}

export default SignIn;