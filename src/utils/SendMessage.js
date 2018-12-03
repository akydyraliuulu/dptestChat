import {serverUrl} from '../utils/Constants'

class SendMessages {
    constructor(){
        this.xhr = new XMLHttpRequest();
        this.xhr.open('post', `${serverUrl}api/messages`);
        this.xhr.setRequestHeader('Content-type', 'application/json');
        this.xhr.responseType = 'json';
    };

    send = () => {
        this.xhr.addEventListener('load', () => {
            if (this.xhr.status === 200) {
                this.onSuccess(this.xhr.response);
                console.log("response")
            } else {
                console.log("error")
                this.onError();
            }
        });
        this.xhr.send(JSON.stringify(this.data));
        console.log(this.data)
    };
    onSuccess = function(){
    };
    onError = function(){
    };
    data = {};
}

export default SendMessages;