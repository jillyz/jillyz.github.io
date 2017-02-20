//----------------------------------------
// FORM
//----------------------------------------

class Form extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: data,
      text: '',
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.clearItem = this.clearItem.bind(this);
  }

  handleTextChange(e){
    this.setState({
      text: e.target.value
    });
  }

  handleEnterAddItem(e){
    this.handleAddItem();
  }

  handleAddItem(e){
    if( e.keyCode === 13) {
      //tip when empty
      if(this.state.text === '') {
        alert('請輸入資料')
        return;
      }
      
      //add item
      var newItem = {
        id: ( this.state.items.length > 0 ? this.state.items[this.state.items.length - 1].id + 1 : 1 ), 
        value: this.state.text,
        date: this.getDateTime(),
      };

      this.setState((prevState) => ({
        items: prevState.items.concat(newItem),
        text: ''
      }));

      data = this.state.items.concat(newItem);
      localStorage.setItem('data', JSON.stringify(data));

      //add log
      var jsonLog = JSON.parse(localStorage.getItem('log'))
      var newLog = {
        guid: new Date().getTime(),
        id: ( this.state.items.length > 0 ? this.state.items[this.state.items.length - 1].id + 1 : 1 ),
        value: this.state.text,
        date: this.getDateTime(),
        type: 'Add',
        typeId: 1,
        order: jsonLog[0] !== undefined ? jsonLog[jsonLog.length - 1].order + 1 : 1
      };

      log = log.concat(newLog);
      localStorage.setItem('log', JSON.stringify(log));
      //console.table(JSON.parse(localStorage.getItem('log'))); 

      //clear input value
      this.refs.addInput.value = '';

      scrollToBottom('form');
     
    }
  }

  handleUpdateItem(itemId, value, oldValue){

    // update item
    var updateItem = {
      id: itemId, 

      value: value,
      date: this.getDateTime(),
    };
    var updatedItems = this.state.items.filter(item => {
      if( item.id === itemId ){
        for (var key in data) {
          if(data[key].id == itemId) {
            data[key] = updateItem;
            this.setState({
              items: data
            });
            localStorage.setItem('data', JSON.stringify(data));
          }
        }
      }
    });

    // update log
    var jsonLog = JSON.parse(localStorage.getItem('log'))
    var newLog = {
      guid: new Date().getTime(), 
      id: itemId,
      value: value,
      oldValue: oldValue,
      date: this.getDateTime(),
      type: 'Update',
      typeId: 2,
      order: jsonLog[0] !== undefined ? jsonLog[jsonLog.length - 1].order + 1 : 1
    };
    log = log.concat(newLog);
    localStorage.setItem('log', JSON.stringify(log));
    //console.table(JSON.parse(localStorage.getItem('log'))); 
  }
  
  handleDeleteItem(itemId, value) {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });
    
    this.setState({
      items: [].concat(updatedItems),
    });

    data = [].concat(updatedItems);
    localStorage.setItem('data', JSON.stringify(data));

    // delete log
    var jsonLog = JSON.parse(localStorage.getItem('log'))
    var newLog = {
      guid: new Date().getTime(), 
      id: itemId,
      value: value,
      date: this.getDateTime(),
      type: 'Delete',
      typeId: 3,
      order: jsonLog[0] !== undefined ? jsonLog[jsonLog.length - 1].order + 1 : 1
    };
    log = log.concat(newLog);
    localStorage.setItem('log', JSON.stringify(log));
    //console.table(JSON.parse(localStorage.getItem('log')));   

  }

  clearItem(){
    data = [];
    this.setState({
      items: []
    });
    localStorage.setItem('data', JSON.stringify(data));
  }

  clearLog(){
    log = []
    localStorage.setItem('log', JSON.stringify(log));
  }

  getDateTime(){
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds ();
    let date = year + '/' + this.formatDateTime(month) + '/' + this.formatDateTime(day);
    let time = this.formatDateTime(hh) + ':' + this.formatDateTime(mm) + ':' + this.formatDateTime(ss);
    return date + ' ' + time;
  }
  
  formatDateTime(val) {
    const n = val.toString();
    return n.length == 2 ? n : '0' + n;
  }

  componentDidMount() {
    scrollToBottom('form');
    this.refs.addInput.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.items.length === 0) {
      this.refs.addInput.focus();
    }
  }

  render() {  
    return (  
      <div>
        <div className="fixed fixedTop">
          <table>
            <caption>管理項目</caption>
            <thead>
              <tr>
                <th className="colOrder">#</th>
                <th>Item</th>
                <th>Time</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="fixed fixedBottom">
          <table>
            <tfoot>
              <tr>
                <td className="colOrder"></td>
                <td>
                  <input 
                    type="text" 
                    autofocus
                    ref="addInput"
                    onKeyDown={this.handleAddItem}
                    onChange={this.handleTextChange} 
                    placeholder="新增..." />                
                </td>
                <td className="textRight">
                  <button className="btnDelete" onClick={this.clearItem}>
                    清除項目
                  </button>
                  <button className="btnDelete" onClick={this.clearLog}>
                    清除Log
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div>
          <table className="mb">
            <caption>管理項目</caption>
            <thead>
              <tr>
                <th className="colOrder">#</th>
                <th>Item</th>
                <th>Time</th>
              </tr>
            </thead>
            <FormList 
              items={this.state.items} 
              onDeleteItem={this.handleDeleteItem} 
              onUpdateItem={this.handleUpdateItem} 
            />
          </table>
        </div>
      </div>
    )
  }
}

class FormList extends React.Component {
  render() {
    return (
      <tbody>
      {this.props.items.map(item => (
          <FormItem 
            key={item.id} 
            id={item.id} 
            onChange={this.props.onChangeItem} 
            onDeleteItem={this.props.onDeleteItem} 
            onUpdateItem={this.props.onUpdateItem} 
            value={item.value} 
            date={item.date} 
          />
        ))}
    </tbody>
    )
  }
}

class FormItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      oldValue: '',
      isEdit: false
    }
    this.textChanged = this.textChanged.bind(this);
    this.saveOldItem = this.saveOldItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  textChanged(e){
    this.setState({
      value: e.target.value,
      isEdit: true
    })
  }

  saveOldItem() {
    this.setState({
      oldValue: this.props.value
    })
  }

  deleteItem(e) {
    this.props.onDeleteItem(this.props.id, this.refs.editInput.value);
  }

  updateItem(e) { 
    this.props.onUpdateItem(this.props.id, this.refs.editInput.value, this.state.oldValue)
    this.setState({
      isEdit: false
    })
  }

  handleKeyDown(e){
    if(e.keyCode === 13 ) { 
      this.refs.editInput.blur();
    }
  }

  render() {
    const {
      value,
      id,
      date,
      onDeleteItem,
      onUpdateItem
    } = this.props;

    return (
      <tr>
        <td className="colOrder"> 
          {this.props.id} 
        </td>
        <td>         
          <input type="text" 
            ref="editInput"
            autofocus 
            onClick={this.toggleEditable}
            onChange={this.textChanged}
            onKeyDown={this.handleKeyDown}
            onFocus={this.saveOldItem}
            onBlur={this.updateItem}
            placeholder="請輸入" 
            defaultValue={this.props.value}
            className={this.state.isEdit ? 'isEdit' : ''}
            />
          <button className="btnDelete" onClick={this.deleteItem}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </td>
        <td>
          {this.props.date}
        </td>
      </tr>
    );
  }

}

//----------------------------------------
// LIST
//----------------------------------------

class List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      time: 0,
      canFetch: true,
      showLoading: false
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
        showLoading: false
      })
      ,300
    )

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

    scrollToBottom('list');
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.time === 0) {
      this.fetchHistory();
      
      setInterval(
        this.setState({time: initSec}),
        1000
      )   
    }

    scrollToBottom('list');
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

  renderTrItem() {
    return (
      <div>
        <ListTable items={this.state.items} time={this.state.time}>
          {this.state.items.map(item =>
            <tr key={item.id}>
              <td className="colOrder">{item.id}</td>
              <td>{item.value}</td>
              <td>{item.date}</td>
            </tr>
          )}
        </ListTable>
        <a className="btnUpdateList" onClick={this.manualUpdate}>{this.state.time}</a> 
        {this.state.showLoading ? this.renderLoading() : ''}
      </div>
    )
  }

  renderTrEmpty() {
    return (
      <div>
         <ListTable items={this.state.items} time={this.state.time}>
          <tr>
            <td></td>
            <td>尚無資料</td>
            <td>--</td>
          </tr>
        </ListTable>
        <a className="btnUpdateList" onClick={this.manualUpdate}>{this.state.time}</a>     
        {this.state.showLoading ? this.renderLoading() : ''}  
      </div>
    )
  }

  render() {
    return (
    this.state.items.length > 0 ?
      this.renderTrItem() :
      this.renderTrEmpty()
    )
  }

}

function ListTable(props) {
  return (
    <div>
      <div className="relative">
        <table className="fixed fixedTop">
          <caption>檢視項目</caption>
          <thead>
            <tr>
              <th className="colOrder">#</th>
              <th>Item</th>
              <th>Time</th>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        <table className="mb">
          <caption>項目</caption>
          <thead>
            <tr>
              <th className="colOrder">#</th>
              <th>Item</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {props.children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//----------------------------------------
// LOG
//----------------------------------------

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
              <td>#{content.id}</td>
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

function LogTable(props) {
  return (
    <div>
      <div className="relative">
        <table className="fixed fixedTop">
          <caption>Log</caption>
          <thead>
            <tr>
              <th className="colOrder"></th>
              <th className="colTime">Time</th>
              <th className="colOrder">#</th>
              <th className="colType">Type</th>
              <th>Log</th>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        <table>
          <caption>Log</caption>
          <thead>
            <tr>
              <th className="colOrder"></th>
              <th className="colTime">Time</th>
              <th className="colOrder">#</th>
              <th className="colType">Type</th>
              <th>Log</th>
            </tr>
          </thead>
          <tbody>
            {props.children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//----------------------------------------

window.App.Form = Form;
window.App.FormList = FormList;
window.App.FormItem = FormItem;
window.App.List = List;
window.App.ListTable = ListTable;
window.App.Log = Log;
window.App.LogTable = LogTable;

//----------------------------------------
// SCROLLTO
//----------------------------------------

function scrollToBottom(domId){
  var element = document.getElementById(domId);
  scrollTo(element, element.scrollHeight, 300);
}

//----------------------------------------
// ANIMATION
//----------------------------------------

function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;
        
    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = (t, b, c, d) => {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
}