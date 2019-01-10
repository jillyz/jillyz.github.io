const {
  RentTerms,
  Loading
} = window.App;


class Rent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: true,
      agree: false,
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
    const isAgree = this.state.agree;
    if(isAgree) { $('body').css({'overflow':'hidden'})};
    if(!isAgree) { $('body').css({'overflow':'auto'})};    
  }


  rentTermsView() {
    return(
      <div>
        <div className="rent-process">
        <ol>
            <li className="active"><a onClick={()=> this.showRentTermsHandler()} ><strong>同意租借辦法</strong></a></li>
            <li><a onClick={()=> this.showRentFormHandler()} ><strong>登記租借</strong> 
                {/* <img src="../img/facebook-messenger.svg" alt="Mesenger" className="ic-messenger" /> */}
                </a>
            </li>
          </ol>
        </div>
        <RentTerms/>
        <div className="terms-mask"></div>
        <div className="terms-agree-wrap">
          <a className="btn-agree" onClick={()=> this.showRentFormHandler() }> 我同意，前往登記租借</a>
        </div>
      </div>
    )
  }
  rentFormView() {
    return(
      <div>
        <div className="rent-process">
          <ol>
            <li className="active"><a onClick={()=> this.showRentTermsHandler()} ><strong>同意租借辦法</strong></a></li>
            <li className="active"><a onClick={()=> this.showRentFormHandler()} ><strong>登記租借</strong> 
                {/* <img src="../img/facebook-messenger.svg" alt="Mesenger" className="ic-messenger" /> */}
                </a>
            </li>
          </ol>
        </div>
        <iframe id="rentForm" className="rent-form" 
          src="https://docs.google.com/forms/d/e/1FAIpQLSdypAzaM8glHVhTUP9I4wNG1M-E9aUAujoAsB5qwiuAMCDEcQ/viewform">
        </iframe>
        <div className="contact-after-form">登記完成後，請務必透過 Messenger 通知已完成登記</div>
      </div>
    )
  }

  showRentTermsHandler(){
    this.setState({
      showLoading: true,
      agree: false
    })
  }
  showRentFormHandler(){
    // window.open('https://docs.google.com/forms/d/e/1FAIpQLSdypAzaM8glHVhTUP9I4wNG1M-E9aUAujoAsB5qwiuAMCDEcQ/viewform' , '_blank');
    // var element = document.getElementById('body');
    // scrollTo(element, 0, 100);
    this.setState({
      showLoading: true,
      agree: true
    })
    $('iframe').on("load", () => {
      this.setState({
        showLoading: false
      })
    })
  }

  render() {
    return (
      <div className="app-wrap">
        {this.state.agree == false ? this.rentTermsView() : '' }
        {this.state.agree ? this.rentFormView() : ''}         
      </div> 
    )
  }
}

window.App.Rent = Rent;
