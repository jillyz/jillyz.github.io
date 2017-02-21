const {
  LogTable
} = window.App;


class Log extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      log: [],
      time: 0,
    }
  }

  fetchHistory (){
    let d = localStorage.getItem('log')
    this.setState({ 
      log: JSON.parse(d).reverse(),
    });
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.fetchHistory();

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
    //this.scrollToBottom();

  }

  // scrollToBottom(){
  //   const arr = ['log'];
  //   arr.map( domId => {
  //     var element = document.getElementById(domId);
  //     scrollTo(element, element.scrollHeight, 300);
  //   })
  // }

  tick(){
    this.setState({time: this.state.time - 1});
  }

  renderTrItem() {
    return (
      <div>
        <LogTable log={this.state.log} time={this.state.time}>
          {this.state.log.map(content =>
            <tr key={content.guid}>
              <td className="small gray">{content.order}</td>
              <td>{content.date}</td>
              <td># {content.id}</td>
              <td>
                {(() => {
                  switch (content.typeId) {
                    case 1: return <span className="typeAdd">{content.type}</span>;
                    case 2: return <span className="typeUpdate">{content.type}</span>;
                    default: return <span className="typeDelete">{content.type}</span>;
                  }
                })()}
              </td>
              <td>
                {(() => {
                  switch (content.typeId) {
                    case 1: return <span className="typeAdd">{content.value}</span>;
                    case 2: return <span><span className="gray strike">{content.oldValue}</span> <i className="fa fa-long-arrow-right gray" aria-hidden="true"></i> <br/><span className="typeUpdate">{content.value}</span></span>;
                    case 3: return <span className="typeDelete strike">{content.value}</span>;
                    default: return content.value;
                  }
                })()}
              </td>
            </tr>
          )}
        </LogTable>
      </div>
    )
  }

  renderTrEmpty() {
    return (
      <div>
         <LogTable log={this.state.log} time={this.state.time}>
          <tr>
            <td></td>
            <td>尚無操作紀錄</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
          </tr>
        </LogTable>
      </div>
    )
  }

  render() {
    return (
    this.state.log.length > 0 ?
      this.renderTrItem() :
      this.renderTrEmpty()
    )
  }

}

window.App.Log = Log;
