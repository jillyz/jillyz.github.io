const {
  Form,
  Log,
  Timer,
  Loading
} = window.App;


class App extends React.Component {
  constructor(props) {
    super(props);

    let items = getData('items');
    let log = getData('log');
    this.state = {
      items: items,
      log: log.reverse(),
      showLoading: false,
    }
    this.fetchHistory = this.fetchHistory.bind(this);
  }

  componentDidMount() {
    this.fetchHistory(0);
  }

  fetchHistory(countDownSec){

    if(countDownSec === 0) {

      //取資料
      let items = getData('items');
      let log = getData('log');

      //取到資料後
      this.setState({ 
        items: items,
        log: log.reverse(),
        showLoading: true
      });

      //模擬取到資料的時間差
      setTimeout( () => 
        this.setState({ 
          showLoading: false,
        })
        ,300
      )
    }

  }

  render() {
    return (
      <div className="grid">
        <div className="col"><div className="wrap list pt pb" id="form"><Form dataItem={this.state.items} /></div></div>
        <div className="col"><div className="wrap list pt" id="log"><Log dataLog={this.state.log} /></div></div>
        <Timer sec={this.fetchHistory} />
        {this.state.showLoading ? <Loading /> : ''} 
      </div>
    )
  } 

}

window.App.App = App;
