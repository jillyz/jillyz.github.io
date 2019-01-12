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
      showPlayIntro: true,
      showCatalog: false,
      showRent: false,
      showMessenger: false,
      showMessengerTip: true,
    }
    this.showPlayIntro = this.showPlayIntro.bind(this);
    this.showCatalog = this.showCatalog.bind(this);
    this.showRent = this.showRent.bind(this);
    this.scrollHeader = this.scrollHeader.bind(this);
    this.hideMessengerTipHandler = this.hideMessengerTipHandler.bind(this);
  }

  componentDidMount() {
    this.bodyOverflow();
    this.setRouter();
    setScrollIntoView();

    setTimeout(() => {
      this.setState({
        showMessenger: true,
        showMessengerTip: true,
      })
    }, 500); 

    setTimeout(() => {
      this.setState({
        showMessengerTip: false,
      })
    }, 12000); 


    // this.showMessengerHandler('messenger');
    // this.showMessengerHandler('messengerTip');

    // setTimeout(() => {
    //   var element = document.getElementById('messengerTip');
    //   element.classList.remove("show");
    // }, 10000);

  }

  componentDidUpdate(prevProps, prevState) {
    this.bodyOverflow();
    setScrollIntoView();
  }

  showMessengerHandler(htmlId){
    setTimeout(() => {
      var element = document.getElementById(htmlId);
      element.classList.add("show");
    }, 2000);
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
            showPlayIntro: true,
            showCatalog: false,
            showRent: false
          })
          break;
        case 'rent-terms':
        case 'rent-form':
        case 'rent-notify':
          this.setState({
            showPlayIntro: false,
            showCatalog: false,
            showRent: true
          })
          break;
        case 'catalog':
          this.setState({
            showPlayIntro: false,
            showCatalog: true,
            showRent: false
          })
          break;
        default:
          break;
      }
    }
    if (!page) {
      location.hash = 'index';
    }
  }

  bodyOverflow() {
    const inHome = this.state.showPlayIntro;
    const inRent = this.state.showRent;
    const inCatalog = this.state.showCatalog;
    if ( inHome || inCatalog ) {
      $('body').css({'overflow-y' : 'auto'})
    }
  }

  hideMessengerTipHandler(){
    this.setState({
      showMessengerTip: false,
    })
  }

  showPlayIntro(){
    return(
      <div>
        <div className="banner"><i className="fa fa-play-circle" aria-hidden="true"></i></div>
      </div>
    )
  }
  showMessenger (){
    return(     
      <a id="messenger" className={this.state.showMessenger ? 'messenger show' : 'messenger' } href="https://m.me/AMIQ.RENT" target="_blank">聯絡我</a>
    )
  }
  showMessengerTip (){
    return(     
      <div id="messengerTip" 
        className={this.state.showMessengerTip ? 'messenger-tip show' : 'messenger-tip' } 
        onClick={()=> this.hideMessengerTipHandler()}
        >
        <i className="close fa fa-times" aria-hidden="true"></i>
        嗨！若您有任何問題詢問，或是通知已登記租借，請透過 Messenger 聯絡我。
        想收到更多消息請至
        <a href="https://www.facebook.com/AMIQ.RENT/" target="_blank">粉絲專頁</a>
        按讚
      </div>
    )
  }
  showPlayIntro() {
    this.setState({
      showPlayIntro: true,
      showCatalog: false,
      showRent: false
    })
    location.hash = 'index';
  }

  showCatalog() {
    this.setState({
      showPlayIntro: false,
      showCatalog: true,
      showRent: false
    })
    location.hash = 'catalog';
  }

  showRent() {
    this.setState({
      showPlayIntro: false,
      showCatalog: false,
      showRent: true
    })
    location.hash = 'rent-terms';
  }

  render() {
    var isSafari = /constructor/i.test(window.HTMLElement);
    const inHome = this.state.showPlayIntro;
    const inRent = this.state.showRent;
    const inCatalog = this.state.showCatalog;
    const indicatorClassName = () => {
      if(inHome) return 'indicator home';
      if(inRent) return 'indicator rent';
      if(inCatalog) return 'indicator catalog';
    }
    return (
      <div id="appWrap" className="app-wrap">
        <header id="header" className="header">
          <a className={inHome ? 'link active' : 'link'} onClick={()=> this.showPlayIntro()} data-value="Index"><i className="icon fa fa-home" aria-hidden="true"></i> 邏輯教具AMIQ</a>
          <a className={inCatalog ? 'link active' : 'link'} onClick={()=> this.showCatalog()} data-value="Catalog">目錄</a>
          <a className={inRent ? 'link active' : 'link'} onClick={()=> this.showRent()} data-value="Rent">租借及費用</a>
          <span className="indicator-bar"></span>
          <span className={indicatorClassName()}></span>
        </header>
        { this.showMessenger() } 
        { this.showMessengerTip() } 
        <div id="pageContent">
          {this.state.showPlayIntro ?  <PlayIntro goRent={()=> this.showRent() }/> : ''}
          {this.state.showRent ? <Rent showMessenger="false"/> : ''}
          {this.state.showCatalog ? <Catalog /> : ''}
          {/*{isSafari ? <div className="dontUseSafari">Hi～您目前使用的瀏覽器為 Safari ， 建議您使用 Chrome 瀏覽唷 </div> : ''}*/}
        </div>
      </div>
    )
  }
}

window.App.App = App;
