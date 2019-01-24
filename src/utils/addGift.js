class addGift {
  constructor() {
    this.xhr = new XMLHttpRequest();
    this.xhr.open("post", "api/gifts/giftSettings/addGift");
    this.xhr.setRequestHeader("Content-type", "application/json");
    this.xhr.responseType = "json";
  }
  send = () => {
    this.data.socketId = sessionStorage.getItem("socketId");
    this.xhr.addEventListener("load", () => {
      if (this.xhr.status === 200) {
        this.onSaccess(this.xhr.response);
      } else {
        this.onError();
      }
    });
    this.xhr.send(JSON.stringify(this.data));
  };
  onSaccess = function() {};
  onError = function() {};
  data = {};
}

export default addGift;
