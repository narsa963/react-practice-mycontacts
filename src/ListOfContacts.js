import React, {Component} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";


class ListOfContacts extends Component{
    static propTypes ={
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    } 
    
    state={
        query:''
    }
    UpdateQuery =(query) =>{
        this.setState({query: query.trim() })
    }

    clearQuery = () => {
      this.setState({ query: '' })
    }
  
render(){
    const {contacts, onDeleteContact}=this.props
    const query =this.state
    let showingContacts
    if(query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
        showingContacts = contacts.filter((contact)=>match.test(contact.name))
    }else{
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

   

    return(
        <div className="list-contacts">
            <div className="list-contact-top">
              <input 
                className="search-contacts"
                type="text"
               placeholder="Search Contacts"
               value={this.state.query}
               onChange={(event)=> this.UpdateQuery(event.target.value)} 
              />
              <Link to="/create">Add Contact</Link>
            </div>
            {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
          <ol className="contact-list"> 
          {showingContacts.map(contact =>(
            <li  className="contact-list-item "key={contact.id}>
             <div>
                 <img className="avatar-img" src={contact.avatarURL} />
                </div> 
             <div className="contact-details">
                 <p>{contact.name}</p>
                 <p>{contact.email}</p>
             </div>
             <button onClick={()=>this.props.onDeleteContact(contact)} className="remove-btn">x</button>
           </li>

       ))}

           
       </ol>
      </div>
      
    )
}
}

export default ListOfContacts;