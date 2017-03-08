class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: this.props.src
    }
  }
  render() {
    return (
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Slide_in_Parque.jpg"/>
        <img src={this.state.src} onError={() => this.onError() }/>
      </div>
    );
  }
  onError(){
      console.log('Image onError');
        this.setState(
      { imgUrl: '/img/content/none.jpg' }
    );
  }
}

window.App.Images = Image;