import React, {Component} from "react";
import ListOfContacts from "./ListOfContacts";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Router } from "react-router-dom";
import './index.css';
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContacts from "./CreateContacts";



class App extends Component {
  state={
    
    contacts: []
  }
  componentDidMount(){
    ContactsAPI.getAll().then(contacts =>{
      this.setState({contacts})
    })
  }
  removeContact =(contact) =>{
    this.setState((state) =>({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    ContactsAPI.remove(contact)
  }
  createContact(contact){
    ContactsAPI.create(contact).then(contact =>{
      this.setState(state=>({
        contacts:state.contacts.contact([contact])
      }))
    })
  }
  render(){
    return (
      <div className="container">
      
       <Routes>
       <Route exact path="/" 
       element={<ListOfContacts
        onDeleteContact={this.removeContact} 
        contacts={this.state.contacts}
        
         />}>

       </Route>
        
         <Route path ="/create"  
         element={
         <CreateContacts 
          onCreateContat={(contact)=>{
            this.createContact(contact)
            
          }}
        
         />
         }/>
         </Routes>
         
       
      </div>
    );
  }
  
}

export default App;
