const {
  LogTable
} = window.App;


class Log extends React.Component {
  constructor(props){
    super(props);
  }

  renderTrItem() {
    return (
      <div>
        <LogTable>
          {this.props.dataLog.map(content =>
            <tr key={content.guid}>
              <td className="colOrder small gray">{content.order}</td>
              <td className="colTime">{content.date}</td>
              <td className="colOrder"># {content.id}</td>
              <td className="colType">
                {(() => {
                  switch (content.typeId) {
                    case 1: return <span className="typeAdd">{content.type}</span>;
                    case 2: return <span className="typeUpdate">{content.type}</span>;
                    default: return <span className="typeDelete">{content.type}</span>;
                  }
                })()}
              </td>
              <td>
                {(() => {
                  switch (content.typeId) {
                    case 1: return <span className="typeAdd">{content.value}</span>;
                    case 2: return <span><span className="gray strike">{content.oldValue}</span> <i className="fa fa-long-arrow-right gray" aria-hidden="true"></i> <br/><span className="typeUpdate">{content.value}</span></span>;
                    case 3: return <span className="typeDelete strike">{content.value}</span>;
                    default: return content.value;
                  }
                })()}
              </td>
            </tr>
          )}
        </LogTable>
      </div>
    )
  }

  renderTrEmpty() {
    return (
      <div>
         <LogTable>
          <tr>
            <td className="colOrder"></td>
            <td className="colTime">尚無操作紀錄</td>
            <td className="colOrder">--</td>
            <td className="colType">--</td>
            <td>--</td>
          </tr>
        </LogTable>
      </div>
    )
  }

  render() {
    return (
    this.props.dataLog.length > 0 ?
      this.renderTrItem() :
      this.renderTrEmpty()
    )
  }

}

window.App.Log = Log;
