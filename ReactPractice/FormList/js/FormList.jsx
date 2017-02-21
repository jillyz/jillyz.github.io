const {
  FormItem
} = window.App;

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

window.App.FormList = FormList;
