const {
  Preview,
  Loading
} = window.App;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      listTypeGrid: true,
      showGridImage: false,
      isPreview: false,
      book: '',
      bookId: '',
      bookGuid: '',
      bookContent: '',
      isFilter: false,
      filterOpen: false,
      filterTypes: [],
      filterData: [],
      showLoading: false
    }
    this.switchListToGrid = this.switchListToGrid.bind(this);
    this.switchFilterPanel = this.switchFilterPanel.bind(this);
    this.filterIfOverlayThenHideDrift = this. filterIfOverlayThenHideDrift.bind(this);
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
    
    this.onError();
    this.filterIfOverlayThenHideDrift();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('app go ', this.state.book, this.state.bookGuid)
    console.log('app update')
    console.log(this.state)

    drift.on('ready',function(api){
      drift.on('sidebarClose',function(e){
        if(e.data.widgetVisible){
          this.setState({
            filterOpen: false
          })
        }
      })
    })

    // if(this.state.filterOpen === true) {
    //   $('.gridBook').fadeIn();
    // }

    this.onError();
    this.filterIfOverlayThenHideDrift();  
  }


  filterIfOverlayThenHideDrift(){

    const filterOpen = this.state.filterOpen;
    const winW = $(window).width();

    if(winW <= 1366) {
      if(filterOpen === true) {
        drift.on('ready',function(api, payload) {
          api.widget.hide();
          //api.sidebar.close()
        })
      } 
      else {
        drift.on('ready',function(api, payload) {
          api.widget.show();
        })
      }
    }
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
    this.filterIfOverlayThenHideDrift();
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
    var top = $('.book-guid-' + guid).offset().top - 50;
    $('body').scrollTop( top );
  }

  filterTypes(){

    this.refs.tags_all.checked = false;

    // console.log('!!! filterTypes')

    var arr = $('.filter:checked').map(function() {
      return parseInt(this.value);
    }).get();
    console.log(arr)

    if(arr.length > 0) {

      var showTypes = [];
      var hideTypes = [];
      arr.map(id => {
        showTypes.push('.books.isType_' + id);
        hideTypes.push('.books:not(.isType_' + id + ')');
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

  clearFilterTypes(){
    $('.filter.tag').prop('checked', false);
    this.filterTypes();
    this.refs.tags_all.checked = true;
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


    drift.on('ready',function(api, payload) {
      api.widget.hide();
      api.sidebar.close()
    })

    console.log('previewShow', book, this.state)
  }

  previewHide(){
    document.body.style.overflow = 'auto';
    this.setState({
      isPreview: false,
      book: ''
    })

    drift.on('ready',function(api, payload) {
      api.widget.show();
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
        classNames = classNames + ' isType_' + id;
      })      
    }
    return classNames;
  }

  onError(){
    $("img").error(function(){
        $(this).unbind("error").attr("src", "img/content/none.jpg");
    });
  }

  renderBooksGrid(data){
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
              <img src={`img/content/amiq${book.id}.jpg`} />
            </div>
            {book.types ? 
              <div className="types">
                {book.types.map(tagId => ( 
                  window.tags.map(tag => {
                    if (tag.id == tagId) {
                      return tag.name + ' / ';
                    }
                  })
                ))}
              </div>
              : ''
            }
            <div className="rent-info">
            {book.id == 101 ? <div className="rent-state already"><span className="state">已借出</span>2017/4/1 ~ 2017/4/8</div> : '' }
            {book.id == 102 || book.id == 101 ? <div className="rent-state reserve"><span className="state">已預約</span>2017/4/1 ~ 2017/4/8</div> : '' }
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
              {book.types ? 
                <span className="types">
                  {book.types.map(tagId => ( 
                    window.tags.map(tag => {
                      if (tag.id == tagId) {
                        return tag.name + ' / ';
                      }
                    })
                  ))}
                </span>
                : ''
              }
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
            邏輯教具 AMIQ  {isSafari ? <div className="dontUseSafari">Hi～您目前使用的瀏覽器為 Safari ， 建議您使用 Chrome 瀏覽唷 </div> : ''}
          </span>

          <div>
          <span className="list-type-menu">
            {/*
            <a className="rent-rule">租借</a>
            <a className="rent-rule">如何玩</a>
            */}
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
            <input type="checkbox" ref="tags_all" id="tags_all" className="filter" onChange={() => this.clearFilterTypes()} /><label htmlFor="tags_all">全部</label>
            {window.tags.map(item => (
              <span>
                <input type="checkbox" value={item.id} id={`tag_${item.id}`} className="filter tag" onChange={() => this.filterTypes()} /><label htmlFor={`tag_${item.id}`}>{item.name}</label>
              </span>
            ))}
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
                 />
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
