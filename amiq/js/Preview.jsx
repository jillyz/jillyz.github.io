const {
} = window.App;

var style = {
  'backgroundImage': 'url(img/content/amiq101.jpg)'
}

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewId: this.props.previewId,
      content: '',
      topics: [],
      pos: 0,
    }
    this.see = this.see.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }

  onError(){
    this.setState({

    })
  }

  componentDidMount() {
    const id = this.props.book.id;

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

    this.fetch(id);
  }

  see(pos){
    this.setState({
      pos: pos
    })
    console.log(pos)
  }

  goNext(){
    const id = parseInt(this.state.previewId) + 1;
    this.fetch(id);
    this.setState({
      previewId: id
    })
  }
  goPrev(){
    const id = parseInt(this.state.previewId) - 1;
    this.fetch(id);
    this.setState({
      previewId: id
    })
  }

  fetch(id){
    var that = this;
    $.ajax({
      url: 'data/' + id +'.json',
      dataType: 'json',
      type: 'GET',
      success: function(res) {
        that.setState({
          content: res.content,
          topics: res.topics
        })
        console.log(res)
      }
    });
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

          {/*
          {topics.map(item => (
            <div key={item.pos} className={`pos pos${item.pos}`} onClick={() => this.see(item.pos)}>
              <div className="topic-info">
                <ul>
                  <li><span>題目：</span>{item.topic}</li>
                  <li><span>訓練要點：</span>{item.point}</li>
                  <li><span>能力培養：</span>{item.skill}</li>
                </ul>
              </div>
            </div>
          ))}
          */}
          <img className="topics-img" src={`img/content/amiq${this.props.book.id}.jpg`} />
          

        </div>

        <div className="seeTopicItem">
          <div className="topic-cover">
            <div className="topic-title">封面</div>
            <div className={`seeTopic see0`} style={style}></div>
          </div>
          {topics.map(item => (
            <div key={item.pos}>
              <div className="topic-title">
                <strong>#{item.pos} {item.topic}</strong>
                <small>這些物品都是為了生日派對準備的，請找出相同的物件。</small>
              </div>
              <div className={`seeTopic see${item.pos}`} style={style}></div>
              <div className="see-info">
                <ul>
                  {item.topicLong ? <li><span>題目：</span>{item.point}</li> : ''}
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
          {/*<div className={`seeTopic see${this.state.pos}`} style={style}></div>*/}
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
