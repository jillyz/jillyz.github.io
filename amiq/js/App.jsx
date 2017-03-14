const {
  Preview,
  Loading
} = window.App;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      listTypeGrid: false,
      isPreview: false,
      book: '',
      bookId: '',
      bookGuid: '',
      bookContent: '',
      bookTopics: [],
      filterOpen: false,
      filterTypes: [],
      filterData: [],
      showLoading: false
    }
    this.switchListToGrid = this.switchListToGrid.bind(this);
    this.switchFilterPanel = this.switchFilterPanel.bind(this);
    this.previewShow = this.previewShow.bind(this);
    this.previewHide = this.previewHide.bind(this);
    this.onKeyDownPreviewHide = this.onKeyDownPreviewHide.bind(this);
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

  switchListToGrid() {
    this.setState({
      listTypeGrid: !this.state.listTypeGrid
    })
    var element = document.getElementById('body');
    scrollTo(element, 0, 100);
  }

  switchFilterPanel() {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
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
          this.previewShow(book);
          console.log('::: book', book)        }
      })

      this.scrollToBook(guid);

    })

  }

  scrollToBook(guid){
    var top = $('.book-guid-' + guid).offset().top;
    $('body').scrollTop( top );
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

    $('.gridBook').hide().fadeIn()
    $('body').animate({
        scrollTop: 0
    }, 250);

    this.setState({showLoading: true})
    setTimeout(() => {
      this.setState({showLoading: false})
    }, 250);


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

  onKeyDownPreviewHide(e){
    console.log('keydown')
    //ESC
    if(e.keyCode === 27) {
      this.previewHide();
    }
  }

  typesClassName(typeIds, stageId, guid){
    var classNames = 'books books-' + stageId + ' book-guid-' + guid;
    if(typeIds !== undefined) {
      typeIds.map(id => {
        classNames = classNames + ' isType' + id;
      })      
    }
    return classNames;
  }

  renderBooksGrid(data){
    const DEFAULT_IMAGE = '/img/content/none.jpg';
    return (
      data.map(book => (
        <div ref={`books-${book.stage}`} className={this.typesClassName(book.types, book.stage, book.guid)}>
          <div className={`item item-grid stage stage-${book.stage}`} key={book.guid} onClick={() => this.previewShow(book)}>
            <div className="info">
              <span className="title">
                <span className="id">{book.id}</span>
                <span className="ch">{book.title}</span>
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

  renderBooksList(data){
    return (
      data.map(book => (
        <div ref={`books-${book.stage}`} className={this.typesClassName(book.types, book.stage, book.guid)}>
          <div className={`book-list book-list-stage book-list-stage-${book.stage}`} key={book.guid} onClick={() => this.previewShow(book)}>
            <div className="info">
              <span className="id">{book.id}</span> 
              <strong className="title">
                <span className="ch">{book.title}</span>
                <span className="en">{book['title-en']}</span>
              </strong>        
              <span className="subject">
                {book.subject}
              </span>
            </div>
          </div>
        </div>
      ))
    )
  }

  toggleBooksHandler(id){
    // $('.books-' + id).stop().slideToggle(800);
  }

  render() {
    var isSafari = /constructor/i.test(window.HTMLElement);
    const that = this;
    let isPreview = this.state.isPreview;
    return (
      <div className="app-wrap">
        <header className="header">
          {/*<div className="">AMIQ 邏輯教具租借 (90本)(共六階，每一階15本)</div>*/}
          <span className="site-title">
            {/*<img className="site-logo" src="img/site-logo.png" /> */}
            邏輯教具 AMIQ  {isSafari ? <div className="dontUseSafari">Hi～您目前使用的瀏覽器為 Safari ， 建議您使用 Chrome 瀏覽唷 (*´∀`)~♥</div> : ''}
          </span>

          <div>
          <span className="list-type-menu">
            <a className="rent-rule">租借</a>
            <a className="rent-rule">如何玩</a>
            <a onClick={() => this.switchListToGrid()}>
              {/*模式*/} 
              {this.state.listTypeGrid ?
                <i className="fa fa-list-ul" aria-hidden="true"></i>
                :
                <i className="fa fa-th" aria-hidden="true"></i>
              }
            </a>
            <a onClick={() => this.switchFilterPanel()}><i className="fa fa-filter" aria-hidden="true"></i></a>
          </span>
          </div>
        </header>
        <div className="grid">

          {/*
          <img className="amiq" src="img/amiq.jpg" />
          <iframe className="video" src="https://www.youtube.com/embed/5MqM41gZGOM" frameborder="0" allowfullscreen></iframe>
          */}

          <div className={this.state.filterOpen ? 'filter open' : 'filter'}>
            <input type="checkbox" value="1" id="type1" className="filter" onChange={() => this.filterTypes()} /><label htmlFor="type1">分類測試 1</label>
            <input type="checkbox" value="2" id="type2" className="filter" onChange={() => this.filterTypes()} /><label htmlFor="type2">分類測試 2</label>
            <input type="checkbox" value="3" id="type3" className="filter" onChange={() => this.filterTypes()} /><label htmlFor="type3">分類測試 3</label>
          </div>

          <div className={this.state.filterOpen ? 'gridBook small' : 'gridBook'}>

            {this.state.data.map(stage => (
              <section key={stage.stage} className={`section section-${stage.stage}`}>
                <a className={`stage-bg stage-bg-${stage.stage}`} onClick={() => this.toggleBooksHandler(stage.stage)}>
                  <h2>AMIQ 第 {stage.stage} 階（{stage.stageName}）</h2>
                  <p>{stage.content}</p>
                </a>            
                {this.state.listTypeGrid ? this.renderBooksGrid(stage.books) : this.renderBooksList(stage.books)}
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
        {this.state.showLoading ? <div className="loading-small"><Loading /></div> : ''} 

      </div>
    )
  }
}

window.App.App = App;
