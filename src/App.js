import React from 'react';
import './App.css';

class Chatter extends React.Component {

    constructor(props) {
        super(props);
        this.receiveResponse = this.receiveResponse.bind(this);
    }

    receiveResponse(prompt, next) {
        this.props.onReceivedMessage("message", prompt)
        this.props.onReceivedMessage("next", next)
    }

    submit = () => {
        //let url = "http://localhost:8080/chatbot"
        let url = "http://node.rayer.idv.tw:8800/chatbot"
        let user = document.getElementById("chatbot_n").value
        let input = document.getElementById("chatbot_p").value
        console.log("submitted : " + user + " " + input);
        fetch(url, {
            method: "POST",
            mode: "cors",
            redirect: "follow",
            body: JSON.stringify({"user": user, "input": input})
        }).then((response) => {
            return response.json()
        }).then(result => {
            console.log(result);
            this.receiveResponse(result.message, result.next)
        });
    }

    render() {
        return <form action="http://node.rayer.idv.tw:8800/chatbot" method="post">
            <fieldset>
                <legend>ChatBot test client</legend>
                Name : <label htmlFor="chatbot_n"/><input type="text" name="user" id="chatbot_n"/><br/>
                Chat : <label htmlFor="chatbot_p"/><input type="text" name="input" id="chatbot_p"/><br/>
                {/*<input type="submit" value="submit!" id="chatbot_submit" onClick={this.submit}/>*/}
                <button type="button" onClick={this.submit.bind()}>Submit!</button>
            </fieldset>
        </form>;
    }
}

class Responder extends React.Component {
    constructor(prop) {
        super(prop);
    }

    renderInfo(messageListRaw) {
        return messageListRaw.messageList.map(raw => {
            return(
                <li>{raw}</li>
            )
        })
    }

    render() {
        if(this.props.willRenderMessage.length === 0) {
            return <h1> I am RESPONSER!</h1>
        } else {
            return <ul>
                    {this.renderInfo(this.props.willRenderMessage)}
                </ul>
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messageList : [], messageType : []}
    }

    renderResponse(messageType, message) {
        this.setState(prevState => ({
            messageList: [...prevState.messageList, message],
            messageType: [...prevState.messageType, messageType]
        }))
    }

    render() {
        return (
            <div className="App">
                <Chatter onReceivedMessage={this.renderResponse.bind(this)}/>
                <Responder willRenderMessage={this.state}/>
            </div>
        );
    }
}


export default App;
