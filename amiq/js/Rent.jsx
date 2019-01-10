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


  rentTermsView() {
    return(
      <div>
        <div className="rent-process">
        <ol>
          <li className="active"><a onClick={()=> this.showRentTermsHandler()} >詳閱租借辦法</a></li>
            <li><a onClick={()=> this.showRentFormHandler()} >登記租借</a></li>
            <li><a onClick={()=> this.showRentNotifyHandler()}>通知已登記</a></li>
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
            <li className="checked"><a onClick={()=> this.showRentTermsHandler()} >詳閱租借辦法</a></li>
            <li className="active"><a onClick={()=> this.showRentFormHandler()} >登記租借</a></li>
            <li><a onClick={()=> this.showRentNotifyHandler()}>通知已登記</a></li>
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
            <li className="checked"><a onClick={()=> this.showRentTermsHandler()} >同意租借辦法</a></li>
            <li className="checked"><a onClick={()=> this.showRentFormHandler()} >登記租借</a></li>
            <li className="active"><a onClick={()=> this.showRentNotifyHandler()} >通知已登記</a></li>
          </ol>
        </div>
        <div className="rent-notify">
          <div className="rent-notify-msg">
            <img src="img/facebook-messenger.svg" alt="Messenger" width="120" />
            <p>若您已提交登記租借表單，請務必透過 Messenger 通知已完成登記。</p>
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
  }
  showRentNotifyHandler(){
    this.setState({
      showLoading: true,
      step: 3
    })
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
