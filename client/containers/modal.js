import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal, Popover, Tooltip, Button, OverlayTrigger } from 'react-bootstrap';
import Login from './login';


export default class OurModal extends Component{
   constructor(props){
    super(props);
    this.state = {
      showModal: false
    }
    OurModal.context = this;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    OurModal.context.setState({'showModal': false});
  }

  open() {
    OurModal.context.setState({'showModal': true });
  }

  render() {

    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    return (
      <div>
        <Button onClick={this.open}>
          Sign In
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Hail Atlantis!</h4>
            <Login />
            <h4>Popovitch in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>
            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
