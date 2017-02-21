const {
  Form,
  Log,
  Timer
} = window.App;


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grid">
        <div className="col form"><div className="wrap list" id="form"><Form fetch="false" /></div></div>
        <div className="col"><div className="wrap list" id="log"><Log fetch="false" /></div></div>
        <Timer />
      </div>
    )
  } 

}


window.App.App = App;
