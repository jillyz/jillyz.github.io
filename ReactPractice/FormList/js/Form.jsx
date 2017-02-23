const {
  FormList,
  Log,
  Timer
} = window.App;

class Form extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
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
        date: getDateTime(),
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
        date: getDateTime(),
        type: 'Add',
        typeId: 1,
        order: jsonLog[0] !== undefined ? jsonLog[jsonLog.length - 1].order + 1 : 1
      };

      log = log.concat(newLog);
      localStorage.setItem('log', JSON.stringify(log));

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
      date: getDateTime(),
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
      date: getDateTime(),
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
      date: getDateTime(),
      type: 'Delete',
      typeId: 3,
      order: jsonLog[0] !== undefined ? jsonLog[jsonLog.length - 1].order + 1 : 1
    };
    log = log.concat(newLog);
    localStorage.setItem('log', JSON.stringify(log));

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

  

  componentDidMount() {
    this.refs.addInput.focus();
    this.setState({
      items: this.props.dataForm
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        items: nextProps.dataForm
    })
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
            <caption>項目</caption>
            <thead>
              <tr>
                <th className="colOrder">ID</th>
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
                    placeholder="新增項目..." />                
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
                <th className="colOrder">ID</th>
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
window.App.Form = Form;
