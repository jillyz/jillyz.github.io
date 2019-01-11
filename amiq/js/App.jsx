﻿const {
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
      showMessenger: true,
    }
    this.showPlayIntro = this.showPlayIntro.bind(this);
    this.showCatalog = this.showCatalog.bind(this);
    this.showRent = this.showRent.bind(this);
    this.scrollHeader = this.scrollHeader.bind(this);
  }

  componentDidMount() {
    this.bodyOverflow();
    this.setRouter();
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

    var element = document.getElementById('top');
    // scrollTo(element, 0, 0);
    element.scrollIntoView();
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
      <a className="messenger" href="https://m.me/AMIQ.RENT" target="_blank">聯絡我</a>
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
          <a className={inRent ? 'link active' : 'link'} onClick={()=> this.showRent()} data-value="Rent">租借</a>
          <span className="indicator-bar"></span>
          <span className={indicatorClassName()}></span>
        </header>
        {this.state.showMessenger ? this.showMessenger() : ''}   
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
