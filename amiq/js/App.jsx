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
      bookId: '',
      bookGuid: '',
      bookContent: '',
      bookTopics: []
    }
    this.previewShow = this.previewShow.bind(this);
    this.previewHide = this.previewHide.bind(this);
    this.toggleBooksHandler = this.toggleBooksHandler.bind(this);
    this.bookGoNav = this.bookGoNav.bind(this);
    // this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    console.log('app mount')
    console.log(this.state)


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

  componentDidUpdate(prevProps, prevState) {
    // console.log('app go ', this.state.book, this.state.bookGuid)
    console.log('app update')
    console.log(this.state)
  }

  bookGoNav(forward){   
    var guid = this.state.bookGuid + forward;

    this.state.data.map(stage => {
      stage.books.map(book => {
        if (book.guid == guid) {
          this.setState({
            book: book,
            bookGuid: guid
          })
          // this.fetch(guid);
        }
      })
    })

    console.log(':::: bookGoNav :::::')

    this.state.data.map(stage => {
      stage.books.map(book => {
        if (book.guid == guid) {
          this.previewShow(book);
          console.log('::: book', book)
        }
      })
    })


  }


  // fetch(guid){
  //   var that = this;

  //   var url = 'data/' + guid +'.json';
  //   // console.log('url', url);

  //   $.ajax({
  //     url: url,
  //     dataType: 'json',
  //     type: 'GET',
  //     success: function(res) {
  //       that.setState({
  //         bookContent: res.content,
  //         bookTopics: res.topics
  //       })
  //       console.log('app: ', res)
  //       console.log('app: ' , guid, 'bookContent: ', that.state.bookContent)
  //       console.log('app: ' , guid, 'bookTopics: ')
  //       console.table('app: ' , that.state.bookTopics)
  //     },
  //   });
  // }

  previewShow(book){
    document.body.style.overflow = 'hidden';
    this.setState({
      isPreview: true,
      book: book,
      bookId: book.id,
      bookGuid: book.guid
    })

    console.log('previewShow', book, this.state)
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
        <div className={`item stage stage-${book.stage}`} key={book.guid} onClick={() => this.previewShow(book)}>
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
    const that = this;
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
          <div ref="preview" id="preview" className="preview">
            <Preview 
              book={that.state.book} 
              previewGuid={that.state.book.guid} 
              bookGoNav={that.bookGoNav} 
              bookContent={that.state.bookContent}
              bookTopics={that.state.bookTopics}
               />
              }
            <div className="closePreview" onClick={() => this.previewHide()}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
          : ''       
        }
      </div>
    )
  } 

}

window.App.App = App;
