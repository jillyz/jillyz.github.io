
class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: 0,
      canFetch: true,
      showLoading: false,
      updateList: false
    }
    this.tolUpdate = this.tolUpdate.bind(this);
  }

  // handleUpdateList(){
  //   if( this.state.updateList === true ) {
  //     this.setState({updateList: false})
  //   }
  // }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  componentDidMount() {
    //this.fetchHistory();
    //this.handleUpdateList();

    this.tolUpdate()

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.time === 0) {
      //this.fetchHistory();

      //this.tolUpdate()
      
      setInterval(
        this.setState({time: initSec}),
        1000
      )
      this.props.sec(0);
    }  
  }

  tick(){
    this.setState({time: this.state.time - 1});
  }

  tolUpdate(){
    if ( this.state.canFetch === true) {
      //this.setState({time: 0});

      const countDownSec = 0;
      this.props.sec(countDownSec);

      this.setState({
        time: 0
      })
    }
  }

  render(){
    const {
      sec
    } = this.props
    return(
      <div>
        <a className="btnUpdateList" onClick={this.tolUpdate}>{this.state.time}</a> 
      </div>
    )
  }

}

window.App.Timer = Timer;
