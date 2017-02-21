function LogTable(props) {
  return (
    <div>
      <div className="relative">
        <table className="fixed fixedTop">
          <caption>Log</caption>
          <thead>
            <tr>
              <th className="colOrder"></th>
              <th className="colTime">Time</th>
              <th className="colOrder">ID</th>
              <th className="colType">Type</th>
              <th>Log</th>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        <table>
          <caption>Log</caption>
          <thead>
            <tr>
              <th className="colOrder"></th>
              <th className="colTime">Time</th>
              <th className="colOrder">#</th>
              <th className="colType">Type</th>
              <th>Log</th>
            </tr>
          </thead>
          <tbody>
            {props.children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

window.App.LogTable = LogTable;
