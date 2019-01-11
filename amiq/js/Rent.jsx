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

    $("#rentForm").contents().find(".quantumWizButtonPaperbuttonEl").click(()=>{
      alert('send');
    });

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
  }

  setRouter(){
    var page = location.href.split('#')[1];
    if(page) {
      switch(page){
        case 'rent-terms':
          this.setState({
            showLoading: true,
            step: 1
          })
          break;
        case 'rent-form':
          this.setState({
            showLoading: true,
            step: 2
          })
          break;
        case 'rent-notify':
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
      location.hash = 'rent-terms';
    }
  }

  rentTermsView() {
    return(
      <div>
        <div className="rent-process">
        <ol>
          <li onClick={()=> this.showRentTermsHandler()} className="active"><a data-value="RentTerms">詳閱租借辦法</a></li>
          <li onClick={()=> this.showRentFormHandler()} ><a data-value="RentForm">登記租借</a></li>
          <li onClick={()=> this.showRentNotifyHandler()}><a data-value="RentNotify">通知已登記</a></li>
          </ol>
        </div>
        <RentTerms/>
        <div className="terms-mask"></div>
        <div className="terms-agree-wrap">
          <a className="btn-agree" onClick={()=> this.showRentFormHandler() }> 已詳閱，前往登記租借</a>
        </div>
      </div>
    )
  }
  rentFormView() {
    return(
      <div>
        <div className="rent-process">
          <ol>
            <li onClick={()=> this.showRentTermsHandler()} className="checked"><a data-value="RentTerms">詳閱租借辦法</a></li>
            <li onClick={()=> this.showRentFormHandler()} className="active"><a data-value="RentForm">登記租借</a></li>
            <li onClick={()=> this.showRentNotifyHandler()}><a data-value="RentNotify">通知已登記</a></li>
          </ol>
        </div>
        <iframe id="rentForm" className="rent-form" 
          src="https://docs.google.com/forms/d/e/1FAIpQLSdypAzaM8glHVhTUP9I4wNG1M-E9aUAujoAsB5qwiuAMCDEcQ/viewform">
        </iframe>
        <div onClick={()=> this.showRentNotifyHandler()} className="continue-after-form">提交表單後，請點我繼續</div>
      </div>
    )
  }
  rentNotifyView() {
    return(
      <div>
        <div className="rent-process">
          <ol>
            <li className="checked" onClick={()=> this.showRentTermsHandler()}><a data-value="RentTerms">同意租借辦法</a></li>
            <li className="checked" onClick={()=> this.showRentFormHandler()}><a data-value="RentForm">登記租借</a></li>
            <li className="active" onClick={()=> this.showRentNotifyHandler()}><a data-value="RentNotify">通知已登記</a></li>
          </ol>
        </div>
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
    location.hash = 'rent-terms';
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
    location.hash = 'rent-form';
  }
  showRentNotifyHandler(){
    this.setState({
      showLoading: true,
      step: 3
    })
    location.hash = 'rent-notify';
  }

  render() {
    return (
      <div className="app-wrap">
        {this.state.step == 1 ? this.rentTermsView() : '' }
        {this.state.step == 2 ? this.rentFormView() : ''} 
        {this.state.step == 3 ? this.rentNotifyView() : ''} 
      </div> 
    )
  }
}

window.App.Rent = Rent;
