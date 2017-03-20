const {
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
      showRent: false
    }
    this.showPlayIntro = this.showPlayIntro.bind(this);
    this.showCatalog = this.showCatalog.bind(this);
    this.showRent = this.showRent.bind(this);
  }

  componentDidMount() {
 
  }

  componentDidUpdate(prevProps, prevState) {

  }

  showPlayIntro(){
    return(
      <div>
        <div className="banner"><i className="fa fa-play-circle" aria-hidden="true"></i></div>
      </div>
    )
  }

  showPlayIntro() {
    this.setState({
      showPlayIntro: true,
      showCatalog: false,
      showRent: false
    })
  }

  showCatalog() {
    this.setState({
      showPlayIntro: false,
      showCatalog: true,
      showRent: false
    })
  }

  showRent() {
    this.setState({
      showPlayIntro: false,
      showCatalog: false,
      showRent: true
    })
  }

  render() {
    var isSafari = /constructor/i.test(window.HTMLElement);
    const that = this;
    let isPreview = this.state.isPreview;
    return (
      <div className="app-wrap">
        <header className="header">
          <span className="site-title--2">
            {/*<img className="site-logo" src="img/site-logo.png" /> */}
            <a className="link" onClick={()=> this.showPlayIntro()}>邏輯教具 AMIQ</a>  
          </span>
          <a className="link" onClick={()=> this.showRent()}>租借</a>
          <a className="link" onClick={()=> this.showCatalog()}>目錄</a>

        </header>

        {this.state.showPlayIntro ?  <PlayIntro/> : ''}
        {this.state.showRent ? <iframe className="rent-form" src="https://docs.google.com/forms/d/e/1FAIpQLSdypAzaM8glHVhTUP9I4wNG1M-E9aUAujoAsB5qwiuAMCDEcQ/viewform"></iframe> : ''}
        {this.state.showCatalog ? <Catalog /> : ''}
        {isSafari ? <div className="dontUseSafari">Hi～您目前使用的瀏覽器為 Safari ， 建議您使用 Chrome 瀏覽唷 </div> : ''}
      </div>
    )
  }
}

window.App.App = App;
