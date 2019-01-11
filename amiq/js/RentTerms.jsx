const {
  Loading
} = window.App;


class RentTerms extends React.Component {
  constructor(props) {
    super(props);
    this.giveMessage = this.giveMessage.bind(this);
  }

  giveMessage() {
    drift.on('ready',function(api, payload) {
      api.sidebar.open();
    })
  }

  render() {
    return (
      <div className="terms-wrap">
        {/* <div className="terms-banner"></div> */}
        <div className="terms-content-wrap">
          <div className="terms-content">
            <h2 className="terms-header">租借說明（請詳閱）</h2>

            <section className="text-highlight">
              {/* <h3 className="terms-title">費用、借期、服務範圍</h3> */}
              <h4>【費用及借期】</h4>
              <p>
                  每本租金 100元，基本借期 3天，若多本則累加。<br/>
                  借期若須延長，延長的每本則每一天加收10元。
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
                <li>數量：一次最多借閱 5 本</li>
                <li>借期：今天借，隔日為借期第 1 天。歸還的遊戲本必須隔日才可再借出。</li>
                <li>歸還：經過借期天數，隔日再還</li>
                <li>租借項目：本出租內容物為：遊戲板 1 片，及您所租借的遊戲本數量。（註：出租內容物不含點讀筆）</li>
              </ul>
            
              <h4>【服務範圍】</h4>
              <ul>
                <li>本出租服務以【台中市】【面交】為主。<br/>若外縣市的您仍有租借需求，對於支付運費也可接受，可再至 Messenger 洽談租借數量及運費。</li>
                <li>台中市優先採用面交，亦可郵寄；外縣市一律郵寄。（郵寄需支付運費，視您租借數量而定）</li>
              </ul>
            </section>
            <hr/>
            <section>
              {/* <h3 className="terms-title">特殊情況</h3> */}
              <h4>【遺失】</h4>
              <ul>
                <li>遺失遊戲本，遺失每本扣除500元，從押金扣除。</li>
                <li>遊戲板若遺失、或遊戲板內任意數字塊遺失，須扣除550元，從押金扣除，若押金不夠扣除，須另補足賠償金額。（本出租押金僅預收遊戲本部分，不預收遊戲板押金，惟萬一有需賠償遊戲板的部分，須再請您支付此一賠償費用）</li>
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
              <p>若有以上情況發生，遺失或損壞嚴重者，之後無法再租借，望您能愛惜出租品唷！</p>
            </section>
            <hr/>

            <section>
              {/* <h3 className="terms-title">關於本服務</h3> */}
              <h4>【租比買 更划算】</h4>
              <p>本服務緣起於一位台中的上班族媽媽，因緣際會之下，入手了 AMIQ 邏輯遊戲 90 本套書。初衷本是希望可以推廣這套超棒的 AMIQ 邏輯遊戲教具給更多家長認識。</p>
              <p>也許您對於 AMIQ 很心動，但礙於套書費用動輒數萬元、及使用時間的考量，而未購入；也許您才剛認識這套好玩的教具，希望可以有更進一步的接觸瞭解。本租借服務是為您而生！可針對您感興趣的部分遊戲本、且有花時間使用，才有所花費支出。</p>
              <p>若您購買一整套，往往是耗費鉅資、擺在家多時、卻無法每本都真的玩過，租借絕對比購買整套要更划算唷！使用率也更高！</p>
              <h4>【敬請愛惜物品】</h4>
              <p>因為自己家裡小朋友仍在使用這套教具，所以希望各位爸爸媽媽在租借後，也能如同自己的東西般愛惜它們唷！也請各位爸爸媽媽提醒小朋友們要愛惜這些物品唷！非常感謝您！</p>
            </section>

          </div>
        </div>
      </div>
    )
  }
}

window.App.RentTerms = RentTerms;
