import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Welcome</b> to our thin client video calling app{" "}
            </h4>
            <p className="flow-text grey-text text-darken-1">
              For new users , after registration your account will be activated by the admin
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="waves-effect waves-light btn-large"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="waves-effect waves-light btn-large"
              >
                Log In
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/admin"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="waves-effect waves-light btn-large"
                style = {{
                  'height': "54px",'line-height': "54px",
                  'font-size': '15px',
                  'padding':'0 28px',
                  'margin-left':'350px'
              }}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
