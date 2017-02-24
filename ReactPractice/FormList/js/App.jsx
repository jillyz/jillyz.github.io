const {
  Form,
  Log,
  Timer,
  Loading
} = window.App;


class App extends React.Component {
  constructor(props) {
    super(props);

    let d = localStorage.getItem('data');
    let l = localStorage.getItem('log')

    this.state = {
      items: JSON.parse(d),
      log: JSON.parse(l).reverse(),
      showLoading: false,
    }
    this.fetchHistory = this.fetchHistory.bind(this);
  }

  componentDidMount() {
    this.fetchHistory(0);
  }

  fetchHistory (countDownSec){

    if(countDownSec === 0) {

      //取資料
      let d = localStorage.getItem('data')
      let l = localStorage.getItem('log')

      //取到資料後
      this.setState({ 
        items: JSON.parse(d),
        log: JSON.parse(l).reverse(),
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
        <div className="col form"><div className="wrap list" id="form"><Form dataForm={this.state.items} /></div></div>
        <div className="col form"><div className="wrap list" id="log"><Log dataLog={this.state.log} /></div></div>
        <Timer sec={this.fetchHistory} />
        {this.state.showLoading ? <Loading /> : ''} 
      </div>
    )
  } 

}

// <div className="col"><div className="wrap list" id="log"><Log dataLog={this.state.log} /></div></div>

window.App.App = App;
