const {

} = window.App;


class PlayIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false
    }
    this.showVideo = this.showVideo.bind(this);
  }

  componentDidMount() {
 
  }

  componentDidUpdate(prevProps, prevState) {

  }

  showVideo(){


  }

  render() {
    return (
      <div>
        <div className="banner">
          <div className="slogan">
            <h1>
              <strong className="bigger">
                <small className="text-amiq">AMIQ</small>
                租
              </strong>
              <div className="cheap">比買更划算</div>
            </h1>
            <h2>充滿樂趣的邏輯思考遊戲<br/>大小朋友都愛玩</h2>
          </div>
          {/*<a><i className="fa fa-play-circle icon-play" aria-hidden="true"></i></a>*/}
        </div>
      </div>
    )
  }
}

window.App.PlayIntro = PlayIntro;
