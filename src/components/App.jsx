import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import Contacts from './Contacts/Contacts';
import ContactForm from './ContactForm/ContactForm';


export class App extends Component {
  constructor(){
    super();

    this.state = {
      contacts: [
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
      ],
      filter: '',
      name: '',
      number: ''
    };
  };

  setForm = (e) =>{
    const {name, value} = e.target;   
    this.setState({[name]: value});
   
  };
  
  submitForm = (e)=>{
    e.preventDefault();
    const {name, number} = this.state;
    
    if(this.includes(name) === true){
      alert(`${name} is already in contacts`);
      this.reset();
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    }

    this.setState((prev)=>({
      
      contacts: [contact, ...prev.contacts],
      name: '',
      number: '',

    }))
  };

  reset=()=>{
    this.setState(()=>({
      name: '',
      number: '',
    }))
  }

  includes = (contactName)=>{
    return this.state.contacts.some((itemContact)=>itemContact.name.toLocaleLowerCase() === contactName.toLocaleLowerCase());
  }


  filteredName =(e)=>{
    const value = e.target.value
    this.setState({filter: value})
  };

  getFilteredContacts = ()=>{
    const {contacts} = this.state;
    return contacts.filter((contact)=>contact.name.toLowerCase().includes(this.state.filter.toLowerCase()));
  }

  deleteCoontact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contacts => contacts.id !== contactId)
    }));
  };


  render() {
    const contactsItems = this.getFilteredContacts();


    return (
      <>
      <div>
        <h3>Phonebook</h3>

        <ContactForm onSubmit={this.submitForm} onChange={this.setForm} valueName={this.state.name} valueNumber={this.state.number}/>

      </div>

      <div>
        <h3>Contacts</h3>
        <input type="text" name='filter' onChange={this.filteredName}/>


        {this.state.filter === ''? 
        <Contacts contacts={this.state.contacts} handleDel={this.deleteCoontact}/> 
        : 
        <Filter contactsList={contactsItems}/>}

      </div>

      </>

    )
  }
}

