const {
  Image
} = window.App;

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      topics: []
    }
  }

  onError(){
    this.setState({

    })
  }

  componentDidMount() {
    const id = this.props.book.id;
    fetch('data/' + id +'.json')
    .then((response) => {
      return response.json();
    }).then((res) => {
      this.setState({
        content: res[0]['content'],
        topics: res[0]['topics']
      })
      console.log(res)
    }).catch((err) => {
      console.log(err);
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
          <div className="pos0">
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

          {topics.map(item => (
            <div className={`pos pos${item.pos}`}>
              <div className="topic-info">
                <ul>
                  <li><span>題目：</span>{item.topic}</li>
                  <li><span>訓練要點：</span>{item.point}</li>
                  <li><span>能力培養：</span>{item.skill}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <img src={`/img/content/amiq${this.props.book.id}.jpg`} />

        <div className="close"></div>

      </div>
    )
  } 

}

window.App.Preview = Preview;
