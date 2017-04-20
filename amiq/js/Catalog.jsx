const {
  Preview,
  Loading
} = window.App;


class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      listTypeGrid: false,
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
      showLoading: true,
      showSmallLoading: false,
    }

    this.renderCatalog = this.renderCatalog.bind(this);

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
    // console.log('app mount')
    // console.log(this.state)

    this.setState({showLoading: true});

    var that = this;
    if(window.bookData == undefined) {
      $.ajax({
        url: 'data/data.json',
        dataType: 'json',
        type: 'GET',
        success: function(response) {
          setTimeout( () => {
            that.setState({
              data: response,
              showLoading: false
            });
            window.bookData = response;
          }, 500);
        }
      });
    } 
    else {
      setTimeout( () => {
        this.setState({
          data: window.bookData,
        });
      },0);
      setTimeout( () => {
        this.setState({
          showLoading: false
        });
      },500);
    }
    
    // this.onError();
    this.filterIfOverlayThenHideDrift();

    $('#tags_all').prop('checked', false);
    
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('app go ', this.state.book, this.state.bookGuid)
    // console.log('app update')
    // console.log(this.state)

    // drift.on('ready',function(api){
    //   drift.on('sidebarClose',function(e){
    //     if(e.data.widgetVisible){
    //       this.setState({
    //         filterOpen: false
    //       })
    //     }
    //   })
    // })

    // if(this.state.filterOpen === true) {
    //   $('.gridBook').fadeIn();
    // }

    this.onError();
    this.filterIfOverlayThenHideDrift();
  }

  filterIfOverlayThenHideDrift(){
    const filterOpen = this.state.filterOpen;
    const isPreview = this.state.isPreview;
    const winW = $(window).width();

    if(isPreview) {
      drift.on('ready',function(api, payload) {
        api.widget.hide();
        //api.sidebar.close()
      })
    } 
    else {
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
  }

  switchListToGrid() {
    // var element = document.getElementById('body');
    // scrollTo(element, 0, 1000);

    this.setState({
      listTypeGrid: !this.state.listTypeGrid
    })
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
        }
      })

      this.scrollToBook(guid);

    })

  }

  scrollToBook(guid){
    var top = $('.book-guid-' + guid).offset().top - 50;
    $('body').scrollTop( top );
  }

  filterTypes(){

    $('#tags_all').prop('checked', false);

    var arr = $('.filter:checked').map(function() {
      return parseInt(this.value);
    }).get();
    // console.log(arr)

    if(arr.length > 0) {

      var showTypes = [];
      var hideTypes = [];
      arr.map(id => {
        showTypes.push('.books.isType_' + id);
        hideTypes.push('.books:not(.isType_' + id + ')');
      })

      var elem = showTypes.toString();
      var noElem = hideTypes.toString();

      // console.log(elem)
      // console.log(noElem)

      // $('.books, .stage-bg').hide();
      $(noElem + ', .stage-bg').hide();
      $(elem).show();

    } else {
      $('.books, .stage-bg').show();
    }

    $('body').animate({
        scrollTop: 0
    }, 250);

    this.setState({showSmallLoading: true});
    setTimeout(() => {
      this.setState({showSmallLoading: false});
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

    setTimeout( () => {
      this.setState({
        isFilter: false,
        filterOpen: false,
        filterTypes: [],
        filterData: [],
      });
      // window.bookData = response;
    }, 1000);

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
      api.sidebar.close();
    })

    // console.log('previewShow', book, this.state)
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
    // console.log('keydown')
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

  renderBookRentInfo(rentBook){
    const bookId = rentBook.bookId;
    const fromTime = rentBook.fromTime;
    const toTime = rentBook.toTime;
    const isRented = Date.parse(rentBook.fromTime) < Date.parse(new Date());
    const isPassed= Date.parse(rentBook.toTime) < Date.parse(new Date());
    if(!isRented) {
      return(
        <div className="rent-state reserve" key={`rent_state_reserve_${bookId}`}><span className="state">已預約</span><span className="rent-date">{this.formatDateStr(fromTime)} 借 ~ {this.formatDateStr(toTime)} 還</span></div>
      )
    } 
    else if (isRented && !isPassed) {
      return(
        <div className="rent-state already" key={`rent_state_already_${bookId}`}><span className="state">已借出</span><span className="rent-date">{this.formatDateStr(fromTime)} 借 ~ {this.formatDateStr(toTime)} 還</span></div>
      )
    }
  }

  formatDateStr(dateStr) {
    var arr = [];
    arr = dateStr.split('/');
    arr[1] = ( arr[1].length > 1 ? arr[1] : '0' + arr[1] );
    arr[2] = ( arr[2].length > 1 ? arr[2] : '0' + arr[2] );
    var str = arr.join('/');
    return str;
  }

  onError(){
    $('img').error(function(){
        $(this).unbind('error').attr('src', 'img/content/none.jpg');
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
              <img src={`img/content_s/amiq${book.id}.jpg`} />
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
            {
              rentBookTimeRagne.map(rentBook => (
                (book.id == rentBook.bookId ? this.renderBookRentInfo(rentBook) : '')
              ))
            }
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
                <span className="ch">{book.title}</span><br/>
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
              <span className="rent-info">
              {
                rentBookTimeRagne.map(rentBook => (
                  (book.id == rentBook.bookId ? this.renderBookRentInfo(rentBook) : '')
                ))
              }
              </span>
            </div>
          </div>
        </div>
      ))
    )
  }

  renderTags(tags) {
    return(
      <div>
        <div>
          <input type="checkbox" ref="tags_all" id="tags_all" className="filter" onChange={() => this.clearFilterTypes()} />
          <label htmlFor="tags_all">全部</label>
        </div>
        <hr/>
        <div>
          {tags.map(tag => this.renderTags_main(tag))}
        </div>
        <hr/>
        <div>
          {tags.map(tag => this.renderTags_sub1(tag))}
        </div>
        <hr/>
        <div>
          {tags.map(tag => this.renderTags_sub2(tag))}
        </div>
      </div>
    )
  }

  renderTags_main(tag) {
    const tagId = tag.id;
    if(tagId.toString().length == 1) {
        return(
          <span key={tagId}>
            <input type="checkbox" value={tagId} id={`tag_${tagId}`} className="filter tag" onChange={() => this.filterTypes()} />
            <label htmlFor={`tag_${tagId}`}>{tag.name}</label>
          </span>
        )
    }   
  }

  renderTags_sub1(tag) {
    const tagId = tag.id;
    if(tagId.toString().length == 3) {
        return(
          <span key={tagId}>
            <input type="checkbox" value={tagId} id={`tag_${tagId}`} className="filter tag" onChange={() => this.filterTypes()} />
            <label htmlFor={`tag_${tagId}`}>{tag.name}</label>
          </span>
        )
    }   
  }

  renderTags_sub2(tag) {
    const tagId = tag.id;
    if(tagId.toString().length >= 4) {
        return(
          <span key={tagId}>
            <input type="checkbox" value={tagId} id={`tag_${tagId}`} className="filter tag" onChange={() => this.filterTypes()} />
            <label htmlFor={`tag_${tagId}`}>{tag.name}</label>
          </span>
        )
    }   
  }

  toggleBooksHandler(id){
    // $('.books-' + id).stop().slideToggle(800);
  }
 
  renderCatalog() {

    console.log('renderCatalog',this)
    var isSafari = /constructor/i.test(window.HTMLElement);
    const that = this;
    const isFilterOpen = this.state.filterOpen;
    const isPreview = this.state.isPreview;
    return (
      <div>

        {/* btn in header: grid/list , filter */}
        <span className="list-type-menu">
            <span>
            <a onClick={() => this.switchListToGrid()}>
              {this.state.listTypeGrid ?
                <i className="fa fa-list-ul" aria-hidden="true"></i>
                :
                <i className="fa fa-th" aria-hidden="true"></i>
              }
            </a>
            <a onClick={() => this.switchFilterPanel()} className={isFilterOpen ? 'btn-filter on' : 'btn-filter off'}><i className="fa fa-filter" aria-hidden="true"></i></a>
            </span>
        </span>


        <div className="grid">

          <div className={this.state.filterOpen ? 'filter open' : 'filter'}>           
            {this.renderTags(window.tags)}
          </div>

          <div className={this.state.filterOpen ? 'gridBook small' : 'gridBook'}>

            {this.state.data.map(stage => (
              <section id={`stage_${stage.stage}`} key={stage.stage} className={`section section-${stage.stage}`}>
                <a className={`stage-bg stage-bg-${stage.stage}`} onClick={() => this.toggleBooksHandler(stage.stage)}>
                  <h2>AMIQ 第 {stage.stage} 階（{stage.stageName}）</h2>
                  <p>{stage.content}</p>
                </a>            
                {this.state.listTypeGrid ? this.renderBooksGrid(stage.books) : this.renderBooksList(stage.books)}
              </section>
            ))}

          </div>
            
          {isPreview ? 
            <Preview 
              ref="preview" 
              book={that.state.book} 
              previewGuid={that.state.book.guid} 
              bookGoNav={that.bookGoNav} 
              bookContent={that.state.bookContent}
              isPreviewHide={that.previewHide} 
              />
            : ''       
          }

        </div>
        {this.state.showSmallLoading ? <div className="loading-small"><Loading /></div> : ''} 

      </div>
    )
  }

  render() {

    return(
      <div>
        {this.state.showLoading ? <Loading /> : this.renderCatalog() }
      </div>
    )
  }
}

window.App.Catalog = Catalog;
