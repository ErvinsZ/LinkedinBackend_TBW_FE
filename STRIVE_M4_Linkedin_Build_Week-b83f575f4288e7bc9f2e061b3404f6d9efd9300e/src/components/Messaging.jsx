import React,{Component} from "react"
import io from "socket.io-client";
import { Modal, InputGroup, FormControl, Button } from "react-bootstrap";
import {IoIosArrowUp} from "react-icons/io"

class Messaging extends Component{
    socket = null;

    state = {
      username: null,
      message: "",
      messages: [],
      showModal: true,
    };
  
    componentDidMount() {
      const connOpt = {
        transports: ["websocket"],
      };
  
      this.socket = io("https://striveschool.herokuapp.com/", connOpt);
  
      this.socket.on("bmsg", (msg) =>
        this.setState({ messages: this.state.messages.concat(msg) })
      );
    }
  
    handleMessage = (e) => {
      this.setState({
        message: e.currentTarget.value,
      });
    };
  
    sendMessage = (e) => {
      e.preventDefault();
      if (this.state.message !== "") {
        this.socket.emit("bmsg", {
          user: this.state.username,
          message: this.state.message,
        });
        this.setState({
          message: "",
        });
      }
    };
  
    toggleModal = () => {
      this.setState({ showModal: !this.state.showModal });
    };
    render() {
      return (
        <>
        <div className ="Frame" 
        style={{backgroundColor:"white",
        width: "50vh",
        height:"50vh",
        display: "flex",
        postition:"relative",
        borderStyle: "solid",
        borderColor:"grey",
        borderWidth: "1px",
        margin:"auto"}}>
          <div className="App" >
            <ul id="messages" style={{ listStyle: "none", padding: "0 2rem" }}>
              {this.state.messages.map((msg, i) => (
                <li key={i}>
                  <strong>{msg.user}</strong> {msg.message}
                </li>
              ))}
            </ul>

            
          </div>
         
          </div>

          <form id="chat" onSubmit={this.sendMessage}
            style={{
                bottom: 0,
                width: "50vh",
                height:"150px",
                borderStyle:"solid",
                borderWidth:"1px",
                display: "flex",
                padding: "1rem",
                background: "white",
                width:"50vh",
                margin:"auto"
              }}>
        
              <input
                autoComplete="off"
                value={this.state.message}
                placeholder="Write a message..."
                onChange={this.handleMessage}
                style={{ flex: "1 auto", outline: 0,
                height:"120px"}}
                className="rounded-0 border-0"
              />
              {/* <button type="send" className="rounded-0"
              style={{
                backgroundColor:"transparent",
                border:"none",
                outline:"none",
                height:"30px",
          
              }}>
            <IoIosArrowUp style={{fontSize:"30px"}}/>
          </button> */}
           <button type="send" style={{
                height:"30px", 
                width:"70px",
                margin:"auto",
                backgroundColor:"#0073B1",
                border:"none",
                outline:"none"
                }}><span style={{fontWeight:"bold", color:"white"}}>Send</span>
                </button>
            </form>
            <div className="bottom"
            style={{
              backgroundColor:"#F3F6F8",
              width: "50vh",
              height:"50px",
              display: "flex",
              borderRight:"solid",
              borderLeft:"solid",
              borderBottom:"solid",
              borderWidth:"1px",
              margin:"auto",
              display:"flex"
            }}>
             
            </div>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.showModal}
            onHide={this.toggleModal}
          >
            <Modal.Header>
              <Modal.Title>Set username</Modal.Title>
              <Modal.Body>
                <InputGroup className="mb-3">
                  <FormControl
                    onChange={(e) =>
                      this.setState({ username: e.currentTarget.value })
                    }
                  ></FormControl>
                </InputGroup>
              </Modal.Body>
            </Modal.Header>
            <Modal.Footer>
              <Button onClick={this.toggleModal}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

export default Messaging