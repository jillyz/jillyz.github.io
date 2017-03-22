const {
  Loading
} = window.App;


class Terms extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="terms-wrap">
        <div className="terms-banner"></div>
        <div className="terms-content-wrap">
          <div className="terms-content">
            <section>
              <h3 className="terms-title">租借辦法</h3>
              <p>
                <strong>
                  每本租金 100元，基本借期 3天，若多本則累加。<br/>
                  借期若須延長，延長的每本則每一天加收10元。
                </strong>
                <br/>
              </p>
              <table className="table">
                <thead>
                  <tr>
                    <th>數量</th>
                    <th>租金</th>
                    <th>借期</th>
                    <th>延長每日加收</th>
                    <th>押金</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1本</td>
                    <td>100元</td>
                    <td>3天</td>
                    <td>10元</td>
                    <td>500元</td>
                  </tr>
                  <tr>
                    <td>2本</td>
                    <td>200元</td>
                    <td>6天</td>
                    <td>20元</td>
                    <td>1000元</td>
                  </tr>
                  <tr>
                    <td>3本</td>
                    <td>300元</td>
                    <td>9天</td>
                    <td>30元</td>
                    <td>1500元</td>
                  </tr>
                  <tr>
                    <td>4本</td>
                    <td>400元</td>
                    <td>12天</td>
                    <td>40元</td>
                    <td>2000元</td>
                  </tr>
                  <tr>
                    <td>5本</td>
                    <td>500元</td>
                    <td>15天</td>
                    <td>50元</td>
                    <td>2500元</td>
                  </tr>
                </tbody>
              </table>
              <ul>
                <li>數量：一次最多借閱5本</li>
                <li>借期：今天借，隔日為借期第 1 天。當日歸還的遊戲本需隔日才可再借出。</li>
                <li>歸還：經過借期天數，隔日再還</li>
                <li>租借項目：本出租內容物為：遊戲板 1 片，及您所租借的遊戲本數量。（註：出租內容物不含點讀筆）</li>
              </ul>
            </section>
            <hr/>
            <section>
              <h3 className="terms-title">特殊情況</h3>
              <h4>【遺失】</h4>
              <ul>
                <li>遺失遊戲本，遺失每本扣除500元，從押金扣除。</li>
                <li>遊戲板子若遺失、或遊戲板內任意數字塊遺失，須扣除550元，從押金扣除，若押金不夠扣除，須另補足賠償金額。</li>
              </ul>
              <h4>【破損、污損、折損】按比例賠償</h4>
              <ul>
                <li>遊戲板子若有破損，若不影響遊戲進行及遊戲安全，則按50%比例賠償；若會影響遊戲進行或影響遊戲安全，則按100％比例賠償。<br/>從押金扣除，若押金不夠扣除，須另補足賠償金額。</li>
                <li>遊戲本若有任一頁，污損或破損涵蓋至內容部分，需照100%比例賠償，從押金扣除。</li>
                <li>戲本若有任一頁，折損涵蓋至內容部分，若不影響遊戲進行，則按75%比例賠償；若會影響遊戲進行，則按100％比例賠償，從押金扣除。</li>
                <li>遊戲本若有任一頁，污損或破損、但不涵蓋至內容部分，則按50%比例賠償，從押金扣除。</li>
                <li>遊戲本若有任一頁，折損、但不涵蓋至內容部分，則按25%比例賠償。</li>
                <li>備註：內容部分指的是，上頁題目區描述及12格、下頁作答區12格、下頁之左上方作答範例、下頁之右上方解答</li>
              </ul>
           </section>
          </div>
        </div>
      </div>
    )
  }
}

window.App.Terms = Terms;
