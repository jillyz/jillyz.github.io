const {
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
      }
    }
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }

  onError(){
    this.setState({

    })
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
  }

  componentDidUpdate(prevProps, prevState) {
    const guid = this.state.previewGuid;
    console.log('~~~update', guid)

    this.fetch(guid);
  }

  fetch(guid){
    var that = this;

    var url = 'data/' + guid +'.json';
    console.log('url', guid, url);

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: (res) => {
        this.setState({
          content: res.content,
          topics: res.topics ? res.topics : [],
          previewGuid: res.guid,
          style: {
            'backgroundImage': 'url(img/content/amiq' + res.id + '.jpg)'
          }
        })
        // console.log('app: ', res)
        console.log('//----------------------')
        console.log('preview: ' , guid, 'content: ')
        console.log(that.state.content)
        // console.log('app: ' , guid, 'bookTopics: ')
        console.log('preview topics: ')
        console.table(that.state.topics)
        console.log('preview previewGuid: ')
        console.table(that.state.previewGuid)
        console.log('preview style: ')
        console.table(that.state.style)
        console.log('//----------------------')
      },
      // error: function(){
      //   that.setState({
      //     content: '',
      //     topics: []
      //   })
      // }
    });
  }

  componentDidUpdate() {

    // console.log('preview :', this.state.topics, this.state.content);
  }

  goNext(){
    const guid = parseInt(this.state.previewGuid) + 1;
    this.fetch(guid);
    this.props.bookGoNav(1);
  }

  goPrev(){
    const guid = parseInt(this.state.previewGuid) - 1;
    this.fetch(guid);
    this.props.bookGoNav(-1);
  }

  render() {
    const topics = this.state.topics;
    const content = this.state.content;
    return (
      <div className="">

        <div className={`book-info stage stage-${this.props.book.stage}`}>
          <span className="title">
            <span className="id">{this.props.book.id}</span> 
            <span className="title">{this.props.book.title}</span>
            <span className="en">{this.props.book['title-en']}</span>
          </span>        
          <span className={`subject book-subject`}>
            {this.props.book.subject}
          </span>
          <small>{content}</small>
        </div>

        <div className="topics">
          {/*
          <div className="pos pos0">
            <span className="title">
              <span>{this.props.book.id}</span> 
              {this.props.book.title}
              <span className="en">{this.props.book['title-en']}</span>
            </span>        
            <span className="subject">
              {this.props.book.subject}
            </span>
            {this.state.content}
          </div>
          */}

          <img className="topics-img" src={`img/content/amiq${this.props.book.id}.jpg`} />
          

        </div>

        <div className="seeTopicItem">
          <div className="topic-cover">
            <div className="topic-title">封面</div>
            <div className={`seeTopic see0`} style={this.state.style}></div>
          </div>
          {topics.map(item => (
            <div key={item.pos}>
              <div className="topic-title">
                <strong>#{item.pos} {item.topic}</strong>
                <small>{item.topicLong ? item.topicLong : ''}</small>
              </div>
              <div className={`seeTopic see${item.pos}`} style={this.state.style}></div>
              <div className="see-info">
                <ul>
                  {item.point ? <li><span>訓練要點：</span>{item.point}</li> : ''}
                  {item.skill ? <li><span>能力培養：</span>{item.skill}</li> : ''}
                </ul>

                {item.ans ? 
                  <ul>
                    <li>
                      <span>解答說明：</span>
                      {
                        item.ans.map(id =>(
                          <em key={id} className="ans">
                            {id}
                          </em>
                        ))
                      }
                    </li>
                  </ul>
                : ''}

              </div>
            </div>
          ))}
        </div>

        <div className="close"></div>

        <div className="preview-jump">
          <a onClick={() => this.goPrev()}>prev</a>
          <a onClick={() => this.goNext()}>next</a>
        </div>

      </div>
    )
  } 

}

window.App.Preview = Preview;
