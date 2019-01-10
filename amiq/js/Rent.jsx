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


  agreeView() {
    return(
      <div>
        <div className="terms-mask"></div>
        <div className="terms-agree-wrap">
          <a className="btn-agree" onClick={()=> this.agreeHandler() }> 我同意，前往登記租借</a>
        </div>
      </div>
    )
  }

  agreeHandler(){
    // window.open('https://docs.google.com/forms/d/e/1FAIpQLSdypAzaM8glHVhTUP9I4wNG1M-E9aUAujoAsB5qwiuAMCDEcQ/viewform' , '_blank');
    var element = document.getElementById('body');
    scrollTo(element, 0, 100);
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
        {/* <div className="rent-step">
          1. 閱讀租借服務說明，瞭解並同意 2.登記租借 3.聯絡我已登記
        </div> */}
        {this.state.agree == false ? <RentTerms/> : '' }
        {this.state.agree == false ? this.agreeView() : '' }
        {this.state.agree ? <iframe id="rentForm" className="rent-form" src="https://docs.google.com/forms/d/e/1FAIpQLSdypAzaM8glHVhTUP9I4wNG1M-E9aUAujoAsB5qwiuAMCDEcQ/viewform"></iframe> : ''}         
      </div>
    )
  }
}

window.App.Rent = Rent;
