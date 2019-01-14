const {
  Rent,
  Catalog,
  PlayIntro,
  Loading
} = window.App;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlayIntroView: true,
      showCatalogView: false,
      showRentView: false,
      showMessenger: false,
      showMessengerTip: false,
    }
    this.showPlayIntroView = this.showPlayIntroView.bind(this);
    this.showCatalogView = this.showCatalogView.bind(this);
    this.showRentView = this.showRentView.bind(this);
    this.scrollHeader = this.scrollHeader.bind(this);
    this.hideMessengerTipHandler = this.hideMessengerTipHandler.bind(this);
  }

  componentDidMount() {
    this.bodyOverflow();
    this.setRouter();

    setTimeout(() => {
      this.setState({
        showMessenger: true,
      })
    }, 1000);

    setTimeout(() => {
      this.setState({
        showMessengerTip: true,
      })
    }, 1000); 

    setTimeout(() => {
      var element = document.getElementById('messengerTip');
      element.classList.add("show");
      window.onscroll = function() {
        var tip = document.getElementById('messengerTip');
        tip.classList.remove("show");
        var messenger = document.getElementById('messenger');
        messenger.classList.remove("put-front");
      }
    }, 1500);

  }

  componentDidUpdate(prevProps, prevState) {
    this.bodyOverflow();
    
  }

  scrollHeader() {
    var header = new Headroom(document.querySelector("#header, .list-type-menu, .indicator-bar"), {
        tolerance: 5,
        offset : 0,
        classes: {
          initial: "animated",
          pinned: "slideDown",
          unpinned: "slideUp"
        }
    });
    header.init();

  }

  setRouter(){
    var page = location.href.split('#')[1];
    if(page) {
      switch(page){
        case 'index':
          this.setState({
            showPlayIntroView: true,
            showCatalogView: false,
            showRentView: false
          })
          break;
        case 'rent-terms':
        case 'rent-form':
        case 'rent-notify':
          this.setState({
            showPlayIntroView: false,
            showCatalogView: false,
            showRentView: true
          })
          break;
        case 'catalog':
          this.setState({
            showPlayIntroView: false,
            showCatalogView: true,
            showRentView: false
          })
          break;
        default:
          break;
      }
    }
    if (!page) {
      location.hash = 'index';
    }
    setScrollIntoView();
  }

  bodyOverflow() {
    const inHome = this.state.showPlayIntroView;
    const inRent = this.state.showRentView;
    const inCatalog = this.state.showCatalogView;
    if ( inHome || inCatalog ) {
      $('body').css({'overflow-y' : 'auto'})
    }
  }

  hideMessengerTipHandler(){
    this.setState({
      showMessenger: false,
      showMessengerTip: false,
    })
    setTimeout(() => {
      this.setState({
        showMessenger: true,
      })
    }, 500);

    var element = document.getElementById('messenger');
    element.classList.remove("put-front");
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
      showRentView: false
    })
    location.hash = 'index';
    setScrollIntoView();
  }

  showCatalogView() {
    this.setState({
      showPlayIntroView: false,
      showCatalogView: true,
      showRentView: false
    })
    location.hash = 'catalog';
    setScrollIntoView();
  }

  showRentView() {
    this.setState({
      showPlayIntroView: false,
      showCatalogView: false,
      showRentView: true
    })
    location.hash = 'rent-terms';
    setScrollIntoView();
  }

  render() {
    var isSafari = /constructor/i.test(window.HTMLElement);
    const inHome = this.state.showPlayIntroView;
    const inRent = this.state.showRentView;
    const inCatalog = this.state.showCatalogView;
    const indicatorClassName = () => {
      if(inHome) return 'indicator home';
      if(inRent) return 'indicator rent';
      if(inCatalog) return 'indicator catalog';
    }
    return (
      <div id="appWrap" className="app-wrap">
        <header id="header" className="header">
          <a className={inHome ? 'link active' : 'link'} onClick={()=> this.showPlayIntroView()} data-value="Index"><i className="icon fa fa-home" aria-hidden="true"></i> 邏輯教具AMIQ</a>
          <a className={inCatalog ? 'link active' : 'link'} onClick={()=> this.showCatalogView()} data-value="Catalog">目錄</a>
          <a className={inRent ? 'link active' : 'link'} onClick={()=> this.showRentView()} data-value="Rent">租借及費用</a>
          <span className="indicator-bar"></span>
          <span className={indicatorClassName()}></span>
        </header>
        { this.showMessenger() } 
        { this.showMessengerTip() } 
        <div id="pageContent">
          {this.state.showPlayIntroView ?  <PlayIntro goRent={()=> this.showRentView() }/> : ''}
          {this.state.showRentView ? <Rent showMessenger="false"/> : ''}
          {this.state.showCatalogView ? <Catalog /> : ''}
          {/*{isSafari ? <div className="dontUseSafari">Hi～您目前使用的瀏覽器為 Safari ， 建議您使用 Chrome 瀏覽唷 </div> : ''}*/}
        </div>
      </div>
    )
  }
}

window.App.App = App;
