import { serverUrl } from "../utils/Constants";
class Logout {
  constructor() {
    this.xhr = new XMLHttpRequest();
    this.xhr.open("post", `${serverUrl}api/users/logout`);
    this.xhr.setRequestHeader("Content-type", "application/json");
    this.xhr.responseType = "json";
  }
  send = () => {
    this.xhr.addEventListener("load", () => {
      if (this.xhr.status === 200) {
        this.onSuccess(this.xhr.response);
      } else {
        this.onError();
      }
    });
    this.xhr.send(JSON.stringify(this.data));
    console.log(this.data);
  };
  onSuccess = function() {};
  onError = function() {};
  data = {};
}

export default Logout;
