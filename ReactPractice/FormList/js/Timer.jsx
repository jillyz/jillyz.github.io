
class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      time: 0,
      canFetch: true,
      showLoading: false,
      updateList: false
    }
    this.manualUpdate = this.manualUpdate.bind(this);
  }

  fetchHistory (){
    let d = localStorage.getItem('data')
    this.setState({ 
      items: JSON.parse(d),
      canFetch: false,
      showLoading: true
    });

    setTimeout( () => 
      this.setState({ 
        canFetch: true,
      })
      ,1000
    )

    //模擬取資料
    setTimeout( () => 
      this.setState({ 
        showLoading: false,
        updateList: true
      })
      ,300
    )

  }

  handleUpdateList(){
    if( this.state.updateList === true ) {
      this.setState({updateList: false})
    }
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.fetchHistory();
    this.handleUpdateList();

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.time === 0) {
      this.fetchHistory();
      
      setInterval(
        this.setState({time: initSec}),
        1000
      )   
    }  
  }

  tick(){
    this.setState({time: this.state.time - 1});
  }

  manualUpdate(){
    if ( this.state.canFetch === true) {
      this.setState({time: 0});
    }
  }

  renderLoading(){
    return (
      <div className="spinner">
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>
    )
  }

  render(){
    const {
      toUpdate
    } = this.props
    return(
      <div>
        <a className="btnUpdateList" onClick={this.manualUpdate}>{this.state.time}</a> 
        {this.state.showLoading ? this.renderLoading() : ''}
      </div>
    )
  }

}

window.App.Timer = Timer;
