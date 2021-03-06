import React, {Component} from "react";
import {Link} from "react-router-dom";
import ImageInput from "./ImageInput";
import serializeForm from "form-serialize";
 
class CreateContacts extends Component{
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: 'true'})
    if(this.props.onCreateContact)
    this.props.onCreateContact(values)
  }
  
render(){
    return(
      <div>
        <Link className="close-create-contact" to="/">colse</Link>
        <form onSubmit={this.handleSubmit} className="create-contac-form">
         <ImageInput
           className="create-contact-avatar-input"
           name="avatarURL"
           maxHeight={64}
          />
          <div className="create-contact-details">
           <input type="text" name="name" placeholder="Name" />
           <input type="text" name="email" placeholder="Email" />
           <button>addcontact</button>
          </div>
        </form>
      </div>
    )
}
}
export default CreateContacts;