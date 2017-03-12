const {
  Preview,
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
      bookTopics: [],
      filterTypes: [],
      filterData: []
    }
    this.previewShow = this.previewShow.bind(this);
    this.previewHide = this.previewHide.bind(this);
    this.toggleBooksHandler = this.toggleBooksHandler.bind(this);
    this.bookGoNav = this.bookGoNav.bind(this);
    this.filterTypes = this.filterTypes.bind(this);
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
        that.setState({data: response});
        window.bookData = response;
      }
    });

  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('app go ', this.state.book, this.state.bookGuid)
    console.log('app update')
    console.log(this.state)
  }

  bookGoNav(guid){   
    // var guid = this.state.bookGuid + forward;

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

  filterTypes(){

    // console.log('!!! filterTypes')

    var arr = $('.filter:checked').map(function() {
      return parseInt(this.value);
    }).get();

    if(arr.length > 0) {

      var showTypes = [];
      var hideTypes = [];
      arr.map(id => {
        showTypes.push('.books.isType' + id);
        hideTypes.push('.books:not(.isType' + id + ')');
      })

      var elem = showTypes.toString();
      var noElem = hideTypes.toString();

      console.log(elem)
      console.log(noElem)

      // $('.books, .stage-bg').hide();
      $(noElem + ', .stage-bg').hide();
      $(elem).show();

    } else {
      $('.books, .stage-bg').show();
    }

    $('.gridBook').hide().fadeIn();


    // var that = this;
    // that.setState({filterTypes: arr});

    // const filterTypes = this.state.filterTypes;
    // const filterData = [];

    // this.state.data.map(stage => {
    //   stage.books.map(book => {
    //     book.types.map(bookTypeId => {
    //       arr.map(typeId => {            
    //         if(bookTypeId === typeId){
    //           filterData.push(book);
    //         }
    //       })
    //     })
    //   })
    // })

    // console.log('filterTypes' , filterTypes, arr)
    // console.log('filterData' , filterData)
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

  typesClassName(typeIds, stageId){
    var classNames = 'books books-' + stageId;
    if(typeIds !== undefined) {
      typeIds.map(id => {
        classNames = classNames + ' isType' + id;
      })      
    }
    return classNames;
  }

  renderBooksView(data){
    const DEFAULT_IMAGE = '/img/content/none.jpg';
    return (
      data.map(book => (
        <div ref={`books-${book.stage}`} className={this.typesClassName(book.types, book.stage)}>
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

        {/*
        <img className="amiq" src="img/amiq.jpg" />
        <iframe className="video" src="https://www.youtube.com/embed/5MqM41gZGOM" frameborder="0" allowfullscreen></iframe>
        */}

        <div>
          <input type="checkbox" value="1" id="type1" className="filter" onChange={() => this.filterTypes()} /><label htmlFor="type1">1</label>
          <input type="checkbox" value="2" id="type2" className="filter" onChange={() => this.filterTypes()} /><label htmlFor="type2">2</label>
          <input type="checkbox" value="3" id="type3" className="filter" onChange={() => this.filterTypes()} /><label htmlFor="type3">3</label>
        </div>

        <div className="gridBook">
          {this.state.data.map(stage => (
            <section key={stage.stage} className="section">
              <a className={`stage-bg stage-bg-${stage.stage}`} onClick={() => this.toggleBooksHandler(stage.stage)}>
                <h2>第 {stage.stage} 階（{stage.stageName}）</h2>
                <p>{stage.content}</p>
              </a>            
                {this.renderBooksView(stage.books)}
            </section>
          ))}
        </div>
          
        {isPreview ? 
          <div ref="preview" id="preview" className="preview animated zoomIn">
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
