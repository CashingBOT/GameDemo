const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  lb: cc.Label = null;

  start() {
    // let xhr = new XMLHttpRequest();
    // xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4 && xhr.status === 200) cc.log(xhr.responseText);
    // };
    // xhr.send();

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((d) => d.json())
      .then((r) => (this.lb.string = JSON.stringify(r[0])));
  }
}
