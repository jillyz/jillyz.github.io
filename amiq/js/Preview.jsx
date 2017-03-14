const {
    Loading,
} = window.App;

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewGuid: this.props.previewGuid,
      book: this.props.book,
      content: this.props.bookContent,
      topics: [],
      style: {
        'backgroundImage': 'url(img/content/amiq' + this.props.book.id + '.jpg)'
      },
      titleFixed: false,
      showLoading: false,
    }
    this.seeTopicDetail = this.seeTopicDetail.bind(this);
    this.goTop = this.goTop.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  onError(){
    this.setState({

    })
  }

  componentWillMount(){
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      $('#preview').on('swipeleft', function(e){this.goNext()});
      $('#preview').on('swiperight', function(e){this.goPrev()});
  }


  componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown.bind(this));
      $('#preview').off('swipeleft', function(e){this.goNext()});
      $('#preview').off('swiperight', function(e){this.goPrev()});
  }

  handleKeyDown(e) {
    console.log('>>> press <<< ', e.keyCode)
    if(e.keyCode == 39) { this.goNext(); }
    if(e.keyCode == 37) { this.goPrev(); }    
  }

  componentDidMount() {
    const guid = this.state.previewGuid;

    console.log('~~~mount', guid, this.state)

    // fetch('data/' + id +'.json')
    // .then((response) => {
    //   return response.json();
    // }).then((res) => {
    //   this.setState({
    //     content: res[0]['content'],
    //     topics: res[0]['topics']
    //   })
    //   console.log(res)
    // }).catch((err) => {
    //   console.log(err);
    // });

    this.fetch(guid);

    $('#bookInfoFixed').hide();

    $('#preview').scroll(function(){
      var that = this;
      var isExitBookInfo = $('#preview').scrollTop() > $('#bookInfo').height();
      if(isExitBookInfo) { 
        $('#bookInfoFixed').fadeIn(100);
      } 
      else {
        $('#bookInfoFixed').fadeOut(50);
      }

    })
  }

  componentDidUpdate(prevProps, prevState) {
    const guid = this.state.previewGuid;
    console.log('~~~update', guid)

    this.fetch(guid);
  }

  searchBook(guid){
    window.bookData.forEach(stage => {
      stage.books.forEach(book => {
        if(book.guid == guid) {
          console.log(book)
          return book;
        }
      })
    })
  }

  fetch(guid){

    var that = this;
    const url = 'data/' + guid +'.json';
    const id =bookKeys.getId[guid];

    if(guid < 0) { guid = 1; }
    if(guid > 90) { guid = 90; }


    that.setState({
      previewGuid: guid,
      book: this.searchBook(guid),
      content: '',
      topics:[],
      style: {
        'backgroundImage': 'url(img/content/amiq' + id + '.jpg)'
      },
      showLoading: true,
    })

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: (res) => {
        this.setState({
          content: res.content,
          topics: res.topics ? res.topics : [],          
          showLoading: false
        })

        console.log('//----------------------')
        console.log('preview: ' , guid, 'content: ')
        console.log(this.state.content)
        console.log('preview topics: ')
        console.table(this.state.topics)
        console.log('preview previewGuid: ')
        console.table(this.state.previewGuid)
        console.log('preview style: ')
        console.table(this.state.style)
        console.log('//----------------------')
      },
      complete: () => {
        this.setState({
          showLoading: false
        })
      }
      // error: function(){
      //   that.setState({
      //     content: '',
      //     topics: []
      //   })
      // }
    });
  }

  componentDidUpdate() {
    console.log('render')
    console.table(this.state)
    // console.log('preview :', this.state.topics, this.state.content);
  }

  seeTopicDetail(posId) {
    $('.preview').animate({
        scrollTop: $('#topic_' + posId).offset().top - 32 + $('.preview').scrollTop() -15
    }, 300);
  }

  goTop() {
    $('.preview').animate({
        scrollTop: 0
    }, 300);
  }

  goNext(){
    // const previewGuid = this.state.previewGuid;
    // const guid = previewGuid == 90 ? 1 : parseInt(previewGuid) + 1;
    const guid = parseInt(this.state.previewGuid) + 1;
    if (guid > 60) {
      this.fetch(1);
      this.props.bookGoNav(1);
      this.scrollTop();
      return;
    }
    else {
      this.fetch(guid);
      this.props.bookGoNav(guid);
      this.scrollTop();
    }
  }

  goPrev(){
    // const previewGuid = this.state.previewGuid;
    // const guid = previewGuid == 1 ? 90 : parseInt(previewGuid) - 1;
    const guid = parseInt(this.state.previewGuid) - 1;

    if (guid < 1) {
      this.fetch(60);
      this.props.bookGoNav(60);
      this.scrollTop();
      return;
    } 
    else {
      this.fetch(guid);
      this.props.bookGoNav(guid);
      this.scrollTop();
    }

  }

  scrollTop(){
    var element = document.getElementById('preview');
    scrollTo(element, 0, 100);
  }

  render() {
    const topics = this.state.topics;
    const content = this.state.content;
    const stageId = this.props.book.stage;

   

    const titleFixed = this.state.titleFixed
    const bookClassName = (
      titleFixed ? 
      'book-info fixed stage stage-' + stageId
      :
      'book-info stage stage-' + stageId
    )
    return (
      <div className="">
        <div id="bookInfo" className={`book-info stage stage-${stageId}`}>
          <div className="title-wrap">
            <span className="id">{this.props.book.id}</span> 
            <span className="title ch">{this.props.book.title}</span>
            <span className="en">{this.props.book['title-en']}</span>
            <span className={`subject book-subject fixed`}>
              {this.props.book.subject}
            </span>
          </div>        
          <span className={`subject book-subject`}>
            {this.props.book.subject}
          </span>
          {content ? <span className="book-content">{content}</span> : ''}
        </div>

        <div id="bookInfoFixed" className={`book-info fixed stage stage-${stageId}`}>
          <div className="title-wrap">
            <span className="id">{this.props.book.id}</span> 
            <span className="title">{this.props.book.title}</span>
            <span className={`subject book-subject fixed`}>
              {this.props.book.subject}
            </span>
          </div>
        </div>

        <div className="topics">

          <img className="topics-img" src={`img/content/amiq${this.props.book.id}.jpg`} />

          <a className="pos pos0" onClick={() => this.seeTopicDetail(0)}>
            {/*
            <span className="title">
              <span>{this.props.book.id}</span> 
              <span className="ch">{this.props.book.title}</span>
              <span className="en">{this.props.book['title-en']}</span>
            </span>
            <span className="subject">
              {this.props.book.subject}
            </span>
            {content ? content : ''}
            */}
            <i className="fa fa-plus-circle zoom-in" aria-hidden="true"></i>
          </a>

          {topics.map(item => (
            <a key={item.pos} className={`pos pos${item.pos}`} onClick={() => this.seeTopicDetail(item.pos)}>
              {/*
              <div className="topic-info">
                <div className="title">
                  <strong>#{item.pos} {item.topic}</strong>
                  <small>{item.topicLong ? item.topicLong : ''}</small>
                </div>
                <div className="">
                  <ul>
                    {item.point ? <li><span>訓練要點：</span>{item.point}</li> : ''}
                    {item.skill ? <li><span>能力培養：</span>{item.skill}</li> : ''}
                  </ul>

                  {item.ans ? 
                    <ul>
                      <li className="ans">
                        <span>解答說明：</span>
                        <ol>
                        {
                          item.ans.map( (text, index) =>(
                            <li key={index} className="ans">
                              {(index + 1) < 10 ? '0' + (index + 1 ): index + 1 }. {text}
                            </li>
                          ))
                        }
                        </ol>
                      </li>
                    </ul>
                  : ''}

                </div>
              </div>
              */}
              <i className="fa fa-plus-circle zoom-in" aria-hidden="true"></i>
            </a>
          ))}

        </div>

        <div className="seeTopicItem">
          <div id="topic_0" className="topic-cover">
            <div className="topic-title">封面</div>
            <div className={`seeTopic see0`} style={this.state.style} onClick={() => this.goTop()}></div>{/*img*/}
          </div>
          {topics.map(item => (
            <div key={item.pos} id={`topic_${item.pos}`}>
              <div className="topic-title">
                <strong>#{item.pos} {item.topic}</strong>
                <small>{item.topicLong ? item.topicLong : ''}</small>
              </div>
              <div className={`seeTopic see${item.pos}`} style={this.state.style} onClick={() => this.goTop()}></div>{/*img*/}
              <div className="see-info">
                <ul>
                  {item.point ? <li><span>訓練要點：</span>{item.point}</li> : ''}
                  {item.skill ? <li><span>能力培養：</span>{item.skill}</li> : ''}
                </ul>

                {item.ans ? 
                  <ul>
                    <li className="ans">
                      <span>解答說明：</span>
                      <ol>
                      {
                        item.ans.map( (text, index) =>(
                          <li key={index} className="ans">
                            {(index + 1) < 10 ? '0' + (index + 1 ): index + 1 }. {text}
                          </li>
                        ))
                      }
                      </ol>
                    </li>
                  </ul>
                : ''}

              </div>
            </div>
          ))}
        </div>

        <div className="close"></div>

        <div className="preview-jump">
          <a onClick={() => this.goPrev()}><i className="fa fa-arrow-left" aria-hidden="true"></i></a>
          <span className="preview-current">{this.state.previewGuid}</span>
          <a onClick={() => this.goNext()}><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
        </div>

        {this.state.showLoading ? <div className="loading-small"><Loading /></div> : ''} 

      </div>
    )
  } 

}

window.App.Preview = Preview;
