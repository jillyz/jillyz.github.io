const {
  Rent,
  Catalog,
  PlayIntro,
  Game,
  Loading
} = window.App;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlayIntroView: true,
      showCatalogView: false,
      showRentView: false,
      showGameView: false,
      showMessenger: false,
      showMessengerTip: false,
    }
    this.showPlayIntroView = this.showPlayIntroView.bind(this);
    this.showCatalogView = this.showCatalogView.bind(this);
    this.showRentView = this.showRentView.bind(this);
    this.showGameView = this.showGameView.bind(this);
    this.scrollPageHeaderSize = this.scrollPageHeaderSize.bind(this);
    // this.scrollHeader = this.scrollHeader.bind(this);
    this.hideMessengerTipHandler = this.hideMessengerTipHandler.bind(this);
  }

  componentDidMount() {
    this.bodyOverflow();
    // this.scrollHeader();
    this.setRouter();

    const inGame = this.state.showGameView;

    if(!inGame) {

      setTimeout(() => {
        this.setState({
          showMessenger: true,
        })
      }, 1000);

      setTimeout(() => {
        // this.setState({
        //   showMessengerTip: true,
        // })
        var tip = document.getElementById('messengerTip');
            tip.classList.add("show");
            tip.classList.add("put-front");

        setTimeout(() => {
          var element = document.getElementById('messengerTip');
          element.classList.add("show");

          window.onscroll = function() {
            var tip = document.getElementById('messengerTip');
            tip.classList.remove("show");
            tip.classList.remove('put-front');
            var messenger = document.getElementById('messenger');
            messenger.classList.remove("put-front");  
          }
        }, 3000);

      }, 12000); 
    }

    this.scrollPageHeaderSize();

  }

  componentDidUpdate(prevProps, prevState) {
    this.bodyOverflow(); 
  }

  scrollPageHeaderSize() {
    let previous = window.scrollY;
    window.addEventListener('scroll', function(){
        if(window.scrollY > previous)
        { 
          console.log('down') 
          document.querySelector('body').classList.add('fix-menu');
        }
        else 
        {
          console.log('up')
          document.querySelector('body').classList.remove('fix-menu');
        }
        previous = window.scrollY;
    });
  }

  // scrollHeader() {
  //   var header = new Headroom(document.querySelector("#header, .list-type-menu, .indicator-bar"), {
  //       tolerance: 5,
  //       offset : 0,
  //       classes: {
  //         initial: "animated",
  //         pinned: "slideDown",
  //         unpinned: "slideUp"
  //       }
  //   });
  //   header.init();
  // }

  setRouter(){
    var page = location.href.split('#')[1];
    if(page) {
      switch(page){
        case 'index':
          this.setState({
            showPlayIntroView: true,
            showCatalogView: false,
            showRentView: false,
            showGameView: false
          })
          break;
        case 'rent-terms':
        case 'rent-form':
        case 'rent-notify':
          this.setState({
            showPlayIntroView: false,
            showCatalogView: false,
            showRentView: true,
            showGameView: false
          })
          break;
        case 'catalog':
          this.setState({
            showPlayIntroView: false,
            showCatalogView: true,
            showRentView: false,
            showGameView: false
          })
          break;
        case 'game':
          this.setState({
            showPlayIntroView: false,
            showCatalogView: false,
            showRentView: false,
            showGameView: true
          })
          break;
        default:
          break;
      }
    }
    if (!page) {
      location.hash = 'index';
    }
    // setScrollIntoView();
  }

  bodyOverflow() {
    const inHome = this.state.showPlayIntroView;
    const inRent = this.state.showRentView;
    const inCatalog = this.state.showCatalogView;
    const inGame = this.state.showGameView;
    if ( inHome || inCatalog || inRent ) {
      $('body').css({'overflow-y' : 'auto'})
    }
    if ( inGame  ) {
      $('body').css({'overflow' : 'hidden'})
    }
  }

  hideMessengerTipHandler(){
    var tip = document.getElementById('messengerTip');
    tip.classList.remove("show");
    tip.classList.remove('put-front');
    var messenger = document.getElementById('messenger');
    messenger.classList.remove("put-front"); 

    setTimeout(() => {
      this.setState({
        showMessenger: true,
      })
    }, 500);
  }

  showPlayIntroView(){
    return(
      <div>
        <div className="banner"><i className="fa fa-play-circle" aria-hidden="true"></i></div>
      </div>
    )
  }
  showMessenger (){
    return(     
      <a id="messenger" className={this.state.showMessenger ? 'messenger show put-front' : 'messenger' } href="https://m.me/AMIQ.RENT" target="_blank">聯絡我</a>
    )
  }
  showMessengerTip (){
    return(     
      <div id="messengerTip" 
        className={this.state.showMessengerTip ? 'messenger-tip show put-front' : 'messenger-tip' } 
        onClick={()=> this.hideMessengerTipHandler()}
        >
        <i className="close fa fa-times" aria-hidden="true"></i>
        <span className="text">
          嗨！若您有任何問題詢問，或是通知已登記租借，請透過 Messenger 聯絡我。<br/>
          想收到更多消息請至
          <a href="https://www.facebook.com/AMIQ.RENT/" target="_blank">粉絲專頁</a>
          按讚！
        </span>
      </div>
    )
  }
  showPlayIntroView() {
    this.setState({
      showPlayIntroView: true,
      showCatalogView: false,
      showRentView: false,
      showGameView: false
    })
    location.hash = 'index';
    setScrollIntoView();
  }

  showCatalogView() {
    this.setState({
      showPlayIntroView: false,
      showCatalogView: true,
      showRentView: false,
      showGameView: false
    })
    location.hash = 'catalog';
    setScrollIntoView();
  }

  showRentView() {
    this.setState({
      showPlayIntroView: false,
      showCatalogView: false,
      showRentView: true,
      showGameView: false
    })
    location.hash = 'rent-terms';
    setScrollIntoView();
  }

  showGameView() {
    this.setState({
      showPlayIntroView: false,
      showCatalogView: false,
      showRentView: false,
      showGameView: true
    })
    location.hash = 'game';
    setScrollIntoView();
  }

  render() {
    var isSafari = /constructor/i.test(window.HTMLElement);
    const inHome = this.state.showPlayIntroView;
    const inRent = this.state.showRentView;
    const inCatalog = this.state.showCatalogView;
    const inGame = this.state.showGameView;
    const indicatorClassName = () => {
      if(inHome) return 'indicator home';
      if(inRent) return 'indicator rent';
      if(inCatalog) return 'indicator catalog';
      if(inGame) return 'indicator game';
    }
    return (
      <div id="appWrap" className="app-wrap">
        <header id="header" className="header">
          <a href="#index" className={inHome ? 'link active' : 'link'} onClick={()=> this.showPlayIntroView()} data-value="Index"><i className="icon fa fa-home" aria-hidden="true"></i> 邏輯教具AMIQ</a>
          <a href="#catalog" className={inCatalog ? 'link active' : 'link'} onClick={()=> this.showCatalogView()} data-value="Catalog">目錄</a>
          <a href="#rent-terms" className={inRent ? 'link active' : 'link'} onClick={()=> this.showRentView()} data-value="Rent">租借及費用</a>
          <a href="#game" className={inGame ? 'link active' : 'link'} onClick={()=> this.showGameView()} data-value="Game">遊戲</a>
          <span className="indicator-bar"></span>
          <span className={indicatorClassName()}></span>
        </header>
        { !inGame ? this.showMessenger() : '' } 
        {/* { this.state.showMessengerTip ? this.showMessengerTip() : '' }  */}
        { !inGame ? this.showMessengerTip() : '' } 
        <div id="pageContent">
          {inHome ?  <PlayIntro goRent={()=> this.showRentView() }/> : ''}
          {inRent ? <Rent showMessenger="false"/> : ''}
          {inCatalog ? <Catalog /> : ''}
          {inGame ? <Game /> : ''}
          {/*{isSafari ? <div className="dontUseSafari">Hi～您目前使用的瀏覽器為 Safari ， 建議您使用 Chrome 瀏覽唷 </div> : ''}*/}
        </div>
      </div>
    )
  }
}

window.App.App = App;
