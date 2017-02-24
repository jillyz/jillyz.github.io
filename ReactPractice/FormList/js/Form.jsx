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
      var prevItems = getData('data');
      data.item = prevItems;

      var newItem = {
        id: ( prevItems.length > 0 ? prevItems[prevItems.length - 1].id + 1 : 1 ), 
        value: this.state.text,
        date: getDateTime(),
      };
      data.item = prevItems.concat(newItem);
      setData('data', JSON.stringify(data.item));

      this.setState((prevState) => ({
        items: data.item,
        text: ''
      }));

      //add log
      var prevLog = getData('log');
      var newLog = {
        guid: new Date().getTime(),
        id: ( prevLog.length > 0 ? prevLog[prevLog.length - 1].id + 1 : 1 ),
        value: this.state.text,
        date: getDateTime(),
        type: 'Add',
        typeId: 1,
        order: prevLog[0] !== undefined ? prevLog[prevLog.length - 1].order + 1 : 1
      };
      data.log = prevLog.concat(newLog);
      setData('log', JSON.stringify(data.log));

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

    data.item = getData('data');
    var updatedItems = data.item.filter(item => {
      if( item.id === itemId ){
        for (var key in data.item) {
          if(data.item[key].id == itemId) {
            data.item[key] = updateItem;
            this.setState({
              items: data.item
            });
            setData('data', JSON.stringify(data.item));
          }
        }
      }
    });

    // update log
    var prevLog = getData('log');
    var newLog = {
      guid: new Date().getTime(), 
      id: itemId,
      value: value,
      oldValue: oldValue,
      date: getDateTime(),
      type: 'Update',
      typeId: 2,
      order: prevLog[0] !== undefined ? prevLog[prevLog.length - 1].order + 1 : 1
    };
    data.log = prevLog.concat(newLog);
    setData('log', JSON.stringify(data.log));
  }
  
  handleDeleteItem(itemId, value) {

    data.item = getData('data');

    var updatedItems = data.item.filter(item => {
      return item.id !== itemId;
    });
    
    this.setState({
      items: [].concat(updatedItems),
    });

    data.item = [].concat(updatedItems);
    setData('data', JSON.stringify(data.item));

    // delete log
    var prevLog = getData('log');
    var newLog = {
      guid: new Date().getTime(), 
      id: itemId,
      value: value,
      date: getDateTime(),
      type: 'Delete',
      typeId: 3,
      order: prevLog[0] !== undefined ? prevLog[prevLog.length - 1].order + 1 : 1
    };
    data.log = prevLog.concat(newLog);
    setData('log', JSON.stringify(data.log));

  }

  clearItem(){
    data.item = [];
    this.setState({
      items: []
    });
    setData('data', JSON.stringify(data.item));
  }

  clearLog(){
    data.log = []
    setData('log', JSON.stringify(data.log));
  }

  componentDidMount() {
    this.refs.addInput.focus();
    this.setState({
      items: this.props.dataItem
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        items: nextProps.dataItem
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
