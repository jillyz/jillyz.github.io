const {
  
} = window.App;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.renderBooksView = this.renderBooksView.bind(this);
  }

  componentDidMount() {
    fetch('data/data.json')
    .then((response) => {
      return response.json();
    }).then((res) => {
      this.setState({
        data: res
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  onError(){
    this.setState({

    })
  }

  renderBooksView(data){
    return (
      data.map(book => (
        <div className={`item stage stage-${book.stage}`} key={book.id}>
          <div className="info">
            <span className="title">
              <span className="id">{book.id}</span> 
              {book.title}
              <span className="en">{book['title-en']}</span>
            </span>        
            <span className="subject">
              {book.subject}
            </span>
          </div>
          <div ref="preview" className="topics">
            <img src={`/img/content/amiq${book.id}.jpg`} onError="this.src='/img/content/none.jpg'" />
          </div>
        </div>
      ))
    )
  }

  toggleBooksHandler(id){
    $('.books' + id).toggle();
  }

  render() {
    return (
      <div className="grid">
        {this.state.data.map(stage => (
          <section key={stage.stage}>
            <a className={`stage-bg stage-bg-${stage.stage}`} onClick={this.toggleBooksHandler(stage.stage)}>
              <h2>第 {stage.stage} 階</h2>
              <p>{stage.content}</p>
            </a>
            <div ref={`books-${stage.stage}`} className={`books books-${stage.stage}`}>
              {this.renderBooksView(stage.books)}
            </div>
          </section>
        ))}
        <div ref="preview" className="preview">
          <img src="/img/content/106.jpg" />
        </div>
      </div>
    )
  } 

}

window.App.App = App;
