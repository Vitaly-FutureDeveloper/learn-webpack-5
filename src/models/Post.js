export default class Post{
  constructor(title, png){
    this.title = title;
    this.date = new Date();
    this.png = png;
  }
  toString(){
    return JSON.stringify({
      title: this.title,
      date: this.date,
      img: this.png,
    }, null, 2);
  }

  get uppercaseTitle(){
    return this.title.toUpperCase();
  }
}
