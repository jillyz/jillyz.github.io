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
              <a onClick={this.props.goRent}>
              <strong className="bigger">
                <small className="text-amiq">AMIQ</small>
                租
              </strong>
              </a>
              <div className="cheap">比買更划算</div>
            </h1>
            <h2>充滿樂趣的邏輯思考遊戲<br/>大小朋友都愛玩</h2>
          </div>
          {/*<a><i className="fa fa-play-circle icon-play" aria-hidden="true"></i></a>*/}
        </div>

        <div className="intro">
          <div className="intro-content">
            <img src="img/amiq_all.png" className="forDesktop" />
            <h2 className="intro-title"><big>AMIQ</big> <br/>最完整的左右腦思維薰陶訓練</h2>
            <p className="col">
              AMIQ 遊戲本中活潑好玩的遊戲方式及逗趣可愛的畫風，讓幼兒在學習上更增添多元趣味性，
              不但誘發孩子主動學習慾望，也激起他們大腦無限的創造力及想像力，加以發揮幼兒的五大邏輯智能：生活、數理、空間、因果、圖像邏輯。
            </p>
            <img src="img/amiq_all.png" className="forMobile margin" />
            <p className="col">
              AMIQ 全套分為六階三系列，由淺入深及主題系統式的教學內容，
              配合操作簡單易上手的遊戲版，引導幼兒進入好玩有趣的思考領域，
              在學習上一步一步奠定良好的基礎。<br/>
              適用年齡：
              初階 2-5 歲／
              中階 3-7 歲／
              高階 5-12 歲
            </p>
          </div>
        </div>
        <div className="intro-skill">
          <div className="intro-content">
            <h2 className="intro-title">培養孩子多元能力</h2>
            <br/>
            <ol>
              <li><i className="icon fa fa-eye" aria-hidden="true"></i> 增進觀察辨識的應用能力</li>
              <li><i className="icon fa fa-american-sign-language-interpreting" aria-hidden="true"></i> 提升後設認知能力</li>
              <li><i className="icon fa fa-lightbulb-o" aria-hidden="true"></i> 培養及奠定良好的邏輯思考基礎</li>
              <li><i className="icon fa fa-leanpub" aria-hidden="true"></i> 藉由實際操作的啟蒙教育</li>
            </ol>
        </div>
        </div>
        <div className="intro-play">
          <div className="intro-content">
            <h2 className="intro-title">玩法介紹</h2>
            <iframe className="video" width="560" height="315" src="https://www.youtube.com/embed/xbVJLBwxArQ" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>

        <div className="intro-rent">
          <div className="intro-content">
          <h2 className="intro-title">租比買划算</h2>

          <p className="center">
            <strong>也許您有過以下疑慮</strong><br/>
            一套教具動輒好幾萬，買了也不知道小朋友喜不喜歡，常不常用<br/>
            看起來很棒，可是我的小朋友還小...擔心長大了就用不到了，似乎有點浪費<br/>
            我好心動，想再多了解看看，但我還沒打算真的要買<br/>
            <br/>
            <strong>別猶豫！<br/>租，是您最好的選擇！<br/>快來吧～</strong>
          </p>
          <a onClick={this.props.goRent} className="go-rent">我要租</a>
          </div>
        </div>

      </div>
    )
  }
}

window.App.PlayIntro = PlayIntro;
