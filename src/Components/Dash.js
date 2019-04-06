import React, {Component} from 'react';
import Navbar from './Navbar';
import AddTimer from './AddTimer';
import Container from 'react-bootstrap/Container';
import Modal from 'react-modal';



const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class Dash extends Component {
  constructor(props) {
    console.log(props);
    super(props)

    this.state = {
      timers: [],
      groups: [],
      modalIsOpen: false
    }
    this.addModal = this.addModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  addModal() {
    this.setState({modalIsOpen: true});
  }

  render() {
    return (
      <div>
        <Navbar addModal={this.addModal} getTimers={this.props.getTimers} loggedOut={this.props.loggedOut}></Navbar>
        <div>
       <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles}
         contentLabel="Example Modal"
       >

         <h2 ref={subtitle => this.subtitle = subtitle}>Create a new group of Timers</h2>
         <button onClick={this.closeModal}>close</button>
         <AddTimer getTimers={this.props.getTimers}></AddTimer>
       </Modal>
      </div>
    </div>
    )
  }

}

export default Dash;
