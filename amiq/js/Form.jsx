const {
  FormList,
} = window.App;

class Form extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      text: '',
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

        <div>
          <table className="table">
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
              
            />
          </table>
        </div>
      </div>
    )
  }
}

window.App.Form = Form;
