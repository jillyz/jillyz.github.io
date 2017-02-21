
class FormItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      oldValue: '',
      editable: false,
      isEditing: false
    }
    this.textChanged = this.textChanged.bind(this);
    this.saveOldItem = this.saveOldItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleEditable = this.toggleEditable.bind(this);
  }

  textChanged(e){
    this.setState({
      value: e.target.value,
      isEditing: true
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
      editable: false,
      isEditing: false
    })
  }

  handleKeyDown(e){
    if(e.keyCode === 13 ) { 
      this.updateItem(e);
      this.toggleEditable(e);
    }
  }

  handleBlur(e){    
    this.refs.editInput.blur();
  }

  toggleEditable(e){
    this.setState({editable: !this.state.editable});
    if(this.state.editable) {
      this.refs.editInput.select();
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
      <tr onDoubleClick={this.toggleEditable}>
        <td className="colOrder"> 
            {this.props.id} 
        </td>
        {this.renderEditView()}
        <td>
          {this.props.date}
        </td>
      </tr>
    );
  }

  renderEditView(){
    return(
      this.state.editable ? 
        this.renderEditMode() :
        this.renderViewMode()
    )
  }

  renderEditMode(){
    return (
      <td>         
        <input type="text" 
          ref="editInput"
          autoFocus 
          onChange={this.textChanged}
          onKeyDown={this.handleKeyDown}
          onFocus={this.saveOldItem}
          onBlur={this.handleBlur}
          placeholder="請輸入" 
          defaultValue={this.props.value}
          className={this.state.isEditing ? 'isEdit' : ''}
          />
        <button className="btnDelete" onClick={this.deleteItem}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </td>
    );
  }

  renderViewMode(){
    return (
      <td>         
        {this.props.value}
      </td>

    );
  }
}


window.App.FormItem = FormItem;
