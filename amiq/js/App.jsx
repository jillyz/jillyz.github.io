const {
  Image,
  Preview
} = window.App;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isPreview: false,
      book: '',
      bookId: ''
    }
    this.previewShow = this.previewShow.bind(this);
    this.previewHide = this.previewHide.bind(this);
    this.toggleBooksHandler = this.toggleBooksHandler.bind(this);
  }

  componentDidMount() {
    // fetch('data/data.json')
    // .then((response) => {
    //   return response.json();
    // }).then((res) => {
    //   this.setState({
    //     data: res
    //   })
    //   console.table(res)
    // }).catch((err) => {
    //   console.log(err);
    // });
    var that = this;
    $.ajax({
      url: 'data/data.json',
      dataType: 'json',
      type: 'GET',
      success: function(response) {
        that.setState({data: response})
      }
    });
  }

  previewShow(book){
    document.body.style.overflow = 'hidden';
    this.setState({
      isPreview: true,
      book: book,
      bookId: book.id
    })

    console.log(this.state.isPreview)
  }

  previewHide(){
    document.body.style.overflow = 'auto';
    this.setState({
      isPreview: false,
      book: ''
    })
  }

  renderBooksView(data){
    const DEFAULT_IMAGE = '/img/content/none.jpg';
    return (
      data.map(book => (
        <div className={`item stage stage-${book.stage}`} key={book.id} onClick={() => this.previewShow(book)}>
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
            <img src={`img/content/amiq${book.id}.jpg`} onError={()=>{this.src='DEFAULT_IMG'}} />
          </div>
        </div>
      ))
    )
  }

  toggleBooksHandler(id){
    $('.books-' + id).stop().slideToggle(800);
  }

  render() {
    let isPreview = this.state.isPreview;
    return (
      <div className="grid">
        <img className="amiq" src="img/amiq.jpg" />
        <iframe className="video" src="https://www.youtube.com/embed/5MqM41gZGOM" frameborder="0" allowfullscreen></iframe>
        {this.state.data.map(stage => (
          <section key={stage.stage}>
            <a className={`stage-bg stage-bg-${stage.stage}`} onClick={() => this.toggleBooksHandler(stage.stage)}>
              <h2>第 {stage.stage} 階</h2>
              <p>{stage.content}</p>
            </a>
            <div ref={`books-${stage.stage}`} className={`books books-${stage.stage} hide`}>
              {this.renderBooksView(stage.books)}
            </div>
          </section>
        ))}

        {isPreview ? 
          <div ref="preview" className="preview" onDoubleClick={() => this.previewHide()}>
            <Preview book={this.state.book} previewId={this.state.bookId} />
          </div>
          : ''       
        }
      </div>
    )
  } 

}

window.App.App = App;
