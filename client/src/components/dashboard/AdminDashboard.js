import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutAdmin } from "../../actions/authActions";
import { activateUser,inactivateUser } from "../../actions/adminActions";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { loadAdmin } from "../../actions/authActions";
class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
    this.item = {};

    this.data = [];

    this.makedynamicdata = this.makedynamicdata.bind(this);
    
  }
  componentWillMount = () => {
    this.props.loadAdmin();

    //   var doc = new DOMParser().parseFromString(this.html, "text/xml");
    //   this.html = doc
  };
  onLogoutClick = (e) => {
    console.log(this.props.auth.user[0]);
    e.preventDefault();
    this.props.logoutAdmin();
  };
  onActivateClick = (e) => {
    console.log(this.item);
    let data = [];
    let item = this.item;
    let count = 0
    for (var key in item) {
      count++ ;
      if (item.hasOwnProperty(key)) {
          
          
            console.log(key + " -> " + item[key]);
            data.push(this.data[parseInt(key)-1]);
          
      }
      console.log(data)
  }
    // let keys = item.keys();
    // for (let i = 0; i < keys.length; i++) {

    // }
    // console.log("To be pushed", data);
    this.props.activateUser(data)
  };
  onChangeCheck(child, e) {
    console.log(child.checked);
    console.log(e.innerHTML);
    // console.log(document.getElementById("myVar").innerHTML)

    if (child.checked) {
      this.item[e.innerHTML] = 0;
    } else {
      delete this.item[e.innerHTML];
    }

    console.log(this.item);
    // console.log(child )
  }
  //   componentWillMount = e => {

  //   }

  makedynamicdata = () => {
    let data = this.props.auth.user;
    //this.data = this.props.auth.user
    console.log("Data0", data[0]);

    let a = "";
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      data[i]["srno"] = i + 1;
      this.data.push(data[i]);
      if (data[i].activate) {
        data[i].checked = "disabled";
      } else {
        data[i].checked = "";
      }
    }
    console.log("Data", this.data);
    //   return data.map(food =>  <tr>
    //     <td><label>

    //     <input type="checkbox" class="filled-in" onClick = {e => this.onChangeCheck(document.getElementById("myVar"),e)}/>
    //     <span ><var id="myVar">1</var></span>
    //     </label></td>
    // <td>${food.name}</td>
    //     <td>$0.87</td>
    //   </tr>)
    //       for(let i=0;i<data.length();i++)
    //       {
    //             this.data.push(data[i])
    //       }
    //   }}
  };

  enableDisable = (sr) => {
    let srno = sr.innerHTML
    console.log(this.data[srno-1])
    this.props.inactivateUser(this.data[srno-1])
    
  }

  render() {
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <table class="striped">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>User Name</th>
              <th>Disable User</th>
            </tr>
            {this.makedynamicdata()}
          </thead>

          <tbody>
            {this.data.map((food) => (
              <tr>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      id={food.name}
                      class="filled-in"
                      disabled={food.checked}
                      onClick={(e) =>
                        this.onChangeCheck(
                          document.getElementById(`${food.name}`),
                          document.getElementById(`${food.srno}`)
                        )
                      }
                    />
                    <span>
                      <var id={food.srno}>{food.srno}</var>
                    </span>
                  </label>
                </td>
                <td>{food.name}</td>
                <td>
                  <input id="btnSubmit" 
                        class="waves-effect waves-light btn-small"
                        type = "button" 
                        value="Disable" 
                        disabled={!food.activate}
                        onClick = {() => this.enableDisable(
                          document.getElementById(`${food.srno}`)
                        )}
                        />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {this.enableDisable(document.getElementById("btnSubmit"))} */}

        <div className="col s6">
          <button
            style={{
              float: "left",
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              position: "relative",
              left: "500px",
              top: "100px"
            }}
            onClick={this.onActivateClick}
            className="waves-effect waves-light btn-large"
          >
            Enable
          </button>
        </div>

        <div className="col s6">
          <button
            style={{
              float: "right",
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              position: "relative",
              top: "100px",
              right: "500px"
            }}
            onClick={this.onLogoutClick}
            className="waves-effect waves-light btn-large"
          >
            Logout
          </button>
        </div>
      </form>
    );
  }
}

AdminDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
// const dispatch = () =>{
//     logoutAdmin(),
//     loadAdmin()
// }
export default connect(mapStateToProps, {
  logoutAdmin,
  loadAdmin,
  activateUser,
  inactivateUser
})(AdminDashboard);
