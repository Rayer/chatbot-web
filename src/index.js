import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Chatter extends React.Component {

    submit = () => {
        let url = "http://localhost:8080/chatbot"
        //let url = "http://node.rayer.idv.tw:8800/chatbot"
        let user = document.getElementById("chatbot_n").value
        let input = document.getElementById("chatbot_p").value
        console.log("submitted : " + user + " " + input);
        fetch(url, {
            method: "POST",
            mode: "cors",
            redirect: "follow",
            body: JSON.stringify({"user": user, "input": input})
        }).then((response) => {
            console.log(response);
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

class Responser extends React.Component {

    render() {
        return <h1> I am RESPONSER!</h1>
    }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(<Chatter />, document.getElementById("chatter"));
ReactDOM.render(<Responser />, document.getElementById("responser"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
