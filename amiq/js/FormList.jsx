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

            value={item.value} 
            date={item.date} 
          />
        ))}
    </tbody>
    )
  }
}

window.App.FormList = FormList;
