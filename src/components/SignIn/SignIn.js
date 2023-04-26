import React from "react";
import "./SignIn.css"

function SignIn({ onRouteChange }) {
    return (
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-2">
            <main className="pa4 black-80 w-100">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="tl db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="tl db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="lh-copy mt3">
                        <input onClick={() => onRouteChange("home")} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Sign in" />
                        <p onClick={() => onRouteChange("register")} className="f5 link dim black db pointer ">Register</p>
                    </div>
                </div>
            </main>
        </article>

    );
}

export default SignIn;