
class FormItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      oldValue: '',
      editable: false,
      isEditing: false
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

          placeholder="請輸入" 
          defaultValue={this.props.value}
          className={this.state.isEditing ? 'isEdit' : ''}
          />

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
