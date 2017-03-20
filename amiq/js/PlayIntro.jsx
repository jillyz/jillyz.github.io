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
          <a><i className="fa fa-play-circle icon-play" aria-hidden="true"></i></a>
        </div>
      </div>
    )
  }
}

window.App.PlayIntro = PlayIntro;
