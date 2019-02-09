const {
  RentTerms,
  Loading
} = window.App;


class Rent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: true,
      step: 1,
    }
    this.showRentTermsHandler = this.showRentTermsHandler.bind(this);
  }

  componentDidMount() {
    this.setState({showLoading: false});
    this.setRouter();
    // $("#rentForm").contents().find(".quantumWizButtonPaperbuttonEl").click(()=>{
    //   alert('send');
    // });

  }

  componentDidUpdate(prevProps, prevState) {
    const isAgree = this.state.step  == 2;
    if(isAgree) 
    { 
      $('body').css({'overflow':'hidden'})
    }
    else
    { 
      $('body').css({'overflow':'auto'})
    }
    setScrollIntoView();
  }

  setRouter(){
    var page = location.href.split('#')[1];
    if(page) {
      switch(page){
        case 'rent/terms':
          this.setState({
            showLoading: true,
            step: 1
          })
          break;
        case 'rent/form':
          this.setState({
            showLoading: true,
            step: 2
          })
          break;
        case 'rent/notify':
          this.setState({
            showLoading: true,
            step: 3
          })
          break;
        default:
          break;
      }
    }
    if (!page) {
      location.hash = 'rent/terms';
    }
  }
  renderRentProcess(){
    return(
      <div className="rent-process">
        <div>
          <ol>
            <li className={this.state.step == 1 ? 'active': 'checked'} onClick={()=> this.showRentTermsHandler()}><a data-value="RentTerms">詳閱租借說明</a></li>
            <li className={this.state.step == 2 ? 'active': (this.state.step == 1 ? '' : 'checked' )} onClick={()=> this.showRentFormHandler()}><a data-value="RentForm">登記租借</a></li>
            <li className={this.state.step == 3 ? 'active': ''} onClick={()=> this.showRentNotifyHandler()}><a data-value="RentNotify">通知已登記</a></li>
          </ol>
        </div>
      </div>
    )
  }
  rentTermsView() {
    return(
      <div>
        {this.renderRentProcess() }
        <RentTerms/>
        <div className="terms-mask"></div>
        <div className="terms-agree-wrap">
          <a className="btn-agree" onClick={()=> this.showRentFormHandler() }> 我瞭解了，前往登記租借</a>
        </div>
      </div>
    )
  }
  rentFormView() {
    return(
      <div>
        {this.renderRentProcess() }
        <iframe title="登記租借(Google表單)" id="rentForm" className="rent-form" 
          src="https://docs.google.com/forms/d/e/1FAIpQLSdypAzaM8glHVhTUP9I4wNG1M-E9aUAujoAsB5qwiuAMCDEcQ/viewform">
        </iframe>
        <div onClick={()=> this.showRentNotifyHandler()} className="continue-after-form">提交表單後，請點我繼續</div>
      </div>
    )
  }
  rentNotifyView() {
    return(
      <div>
        {this.renderRentProcess() }
        <div className="rent-notify">
          <div className="rent-notify-msg">
            <img src="img/facebook-messenger.svg" alt="Messenger" />
            <p>若您已提交登記租借表單，請務必透過 Messenger 通知已完成登記預約。</p>
            <a className="go-notify" href="https://m.me/AMIQ.RENT" target="_blank">通知已登記</a>
          </div>
        </div>
      </div>
    )
  }

  showRentTermsHandler(){
    this.setState({
      showLoading: true,
      step: 1
    })
    location.hash = 'rent/terms';
  }
  showRentFormHandler(){
    // window.open('https://docs.google.com/forms/d/e/1FAIpQLSdypAzaM8glHVhTUP9I4wNG1M-E9aUAujoAsB5qwiuAMCDEcQ/viewform' , '_blank');
    // var element = document.getElementById('body');
    // scrollTo(element, 0, 100);
    this.setState({
      showLoading: true,
      step: 2
    })
    $('iframe').on("load", () => {
      this.setState({
        showLoading: false
      })
    })
    location.hash = 'rent/form';
  }
  showRentNotifyHandler(){
    this.setState({
      showLoading: true,
      step: 3
    })
    location.hash = 'rent/notify';
  }

  render() {
    return (
      <div className="rent app-wrap">
        {this.state.step == 1 ? this.rentTermsView() : '' }
        {this.state.step == 2 ? this.rentFormView() : ''} 
        {this.state.step == 3 ? this.rentNotifyView() : ''} 
      </div> 
    )
  }
}

window.App.Rent = Rent;
