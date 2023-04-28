import React, { Component } from "react";

class Register extends Component {
    constructor(props) {
        super();
        this.state = {
            email: "",
            password: "",
            name: ""
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitRegister = () => {
        fetch("http://localhost:3000/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user) {
                    console.log('Success on Registering!')
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })

    }

    render() {
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-2">
                <main className="pa4 black-90 w-100">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 underline">Register</legend>
                            <div className="mt3">
                                <label className="tl db fw6 lh-copy f4" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange} />
                            </div>
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
                            <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Register" />
                        </fieldset>
                    </div>
                </main>
            </article>

        );
    }
}

export default Register;