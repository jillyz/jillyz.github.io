const {
  
} = window.App;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('data/data2.json')
    .then((response) => {
      return response.json();
    }).then((res) => {
      this.setState({
        data: res
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  onError(){
    this.setState({

    })
  }

  render() {
    return (
      <div className="grid">
        {this.state.showLoading ? <Loading /> : ''} 
        {this.state.data.map(item => (
          <div className={`item stage stage-${item.stage}`} key={item.id}>
            <div className="info">
              <span className="title">
                <span className="id">{item.id}</span> 
                {item.title}
                <span className="en">{item['title-en']}</span>
              </span>        
              <span className="subject">
                {item.subject}
              </span>
            </div>
            <div ref="preview" className="topics">
              <img src={`/img/content/amiq${item.id}.jpg`} onError="this.src='/img/content/none.jpg'" />
            </div>
          </div>
        ))}
        <div ref="preview" className="preview">
          <img src="/img/content/106.jpg" />
        </div>
      </div>
    )
  } 

}

window.App.App = App;
