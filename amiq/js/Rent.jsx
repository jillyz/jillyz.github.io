const {
  Terms,
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
    this.setState({showLoading: false})
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
        {this.state.agree == false ? <Terms/> : '' }
        {this.state.agree == false ? this.agreeView() : '' }
        {this.state.agree ? <iframe className="rent-form" src="https://docs.google.com/forms/d/e/1FAIpQLSdypAzaM8glHVhTUP9I4wNG1M-E9aUAujoAsB5qwiuAMCDEcQ/viewform"></iframe> : ''}        
        {this.state.showLoading ? <div className="loading-small_xx"><Loading /></div> : ''} 
      </div>
    )
  }
}

window.App.Rent = Rent;
