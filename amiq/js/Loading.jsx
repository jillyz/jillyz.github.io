
class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="spinner">
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>
    )
  }
}

window.App.Loading = Loading;
