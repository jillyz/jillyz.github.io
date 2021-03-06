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
            <h2 className="terms-header">詳閱租借說明</h2>

            <section>
              <h4>【關於本服務】</h4> 
              <p>本服務緣起於一位台中的上班族媽媽，因緣際會之下，入手了 AMIQ 邏輯遊戲 90 本套書。推出租借服務的初衷，是希望可以推廣這套超棒的 AMIQ 邏輯遊戲教具給更多家長認識。</p>

              <h4>【費用及借期】</h4>
              <p className="text-highlight">
                  每本租金 100元，基本借期 3天
                  ，若多本則累加。<br/>
                  借期若須延長，延長的每本則每一天加收 10 元。
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
              <ul className="no-list-style">
                <li>
                  <span className="text-highlight">借期：</span><br/>今天借，隔日為借期第 1 天。借期天數（如上表）到期後的隔日再還。歸還的遊戲本必須隔日才可再借出。<br/>
                  <small className="text-highlight-sample">【範例】：以租借一本為例：1/10 借出，1/11-13 為租期，1/14 須歸還。</small>
                </li>
                <li>
                  <span className="text-highlight">續借：</span><br/>續借每本一天加收 10 元（費用請參考上表的「延長每日加收」金額），費用從押金扣除。<br />
                  <small className="text-highlight-sample">【範例】：以租借 2 本和 1/14 須歸還為例，若續借延長至 1/16 再歸還，則為延長 2 天，2 本延長 2 天總共加收 40 元。</small>
                </li>
                <li>
                  <span className="text-highlight">出租內容物：</span><br/>遊戲公車板 1 片 ，<br/>遊戲本（一次最多借閱 5 本）（題目為英文，每本 10 題，每題都有上下頁，共 20 頁），<br/>不含點讀筆。
                </li>
              </ul>
            
              <h4>【取件方式】</h4>
              <ul className="no-list-style">
                {/* <li>本出租服務以【台中市】【面交】為主。<br/>若外縣市的您仍有租借需求，對於支付運費也可接受，可再至 Messenger 洽談租借數量及運費。</li> */}
                <li>台中市優先採用面交，亦可寄送。外縣市一律寄送。</li>
                <li><span className="pickup">【面交】</span>地點為
                  <a className="address" target="_blank" href="https://www.google.com.tw/maps/place/7-ELEVEN+%E6%A1%82%E5%86%A0%E9%96%80%E5%B8%82/@24.1623719,120.6515811,17z/data=!3m1!4b1!4m5!3m4!1s0x34693d8589fe853d:0x7850c53f3db52e06!8m2!3d24.1623719!4d120.6537698">
                  7-ELEVEN 桂冠門市
                  </a>（臺灣大道及文心路附近），或是台中市政府後方的
                  <a className="address" target="_blank" href="https://www.google.com.tw/maps/place/407,+Taichung+City,+Xitun+District,+%E5%BA%9C%E6%9C%83%E5%9C%92%E9%81%93179%E8%99%9F%E5%85%A8%E7%90%83%E9%81%8B%E7%B1%8C%E4%B8%AD%E5%BF%83/@24.1613408,120.6434616,17z/data=!3m1!4b1!4m5!3m4!1s0x34693d8d75cc5a0b:0x4613f8504c24b5bf!8m2!3d24.1613408!4d120.6456503?hl=en&authuser=0">
                  府會園道
                  </a>
                  。
                </li>
                <li><span className="pickup">【郵寄】</span>運費 60 元（1~5本遊戲本及1片遊戲板）。</li>
                <li><span className="pickup">【掌櫃服務】</span>費用50元，若您社區有掌櫃可在社區掌櫃取件，或是至超商掌櫃取件。<a href="https://www.palmbox.com.tw/" target="_blank">>>瞭解掌櫃>></a></li>
                <li className="text-highlight">寄送取件，若有必須於指定日期收到的需求，請您務必提前預約。</li>
              </ul>

              <div className="other-terms">
                <div className="other-terms-item">
                  <input id="rentFaceToFace" type="checkbox"/>
                  <label htmlFor="rentFaceToFace">
                    <h4>【面交租借】詳細流程</h4> 
                  </label>
                  <div className="other-terms-item-content">
                    <p>
                      請預約登記，並用 Messenger 通知已登記 → 告知您費用，雙方約面交 → 面交當天為您的租借日 → 隔天開始您的借閱期間（天數參考上表）→ 借期結束的隔天為歸還日，再次雙方面交，確認物品狀況後會現場退還押金給您
                    </p>
                  </div>
                </div>

                <div className="other-terms-item">
                  <input id="rentMailing" type="checkbox"/>
                  <label htmlFor="rentMailing">
                    <h4>【郵寄租借】詳細流程及須知</h4> 
                  </label>
                  <div className="other-terms-item-content">
                    <p>
                      請預約登記，並用 Messenger 通知已登記 → 告知您費用及銀行帳號，請您提供收件人姓名及地址 → 確認收到費用後為您寄出 → 您收到的當天為租借日 → 隔天開始您的借閱期間（天數參考上表）→ 借期結束的隔天為歸還日，再請您自行寄回（以郵寄收據日期為依據） → 我收到後會確認物品狀況，並退還押金給您
                    </p>
                    <ul>
                      <li>付款後的隔日早上會寄出物品。如果急需隔天收到，請於中午12點前完成付款，當天中午會盡快為您寄出。</li>
                      <li>若是週一到週四寄出，通常隔日可收到。</li>
                      <li>若是週五寄出、或遇國定假日，則不保證隔日能收到，會以收到物品的當天為租借日（請再告知收到日期），借期和歸還日也整個往後順延。</li>
                      <li>歸還日若遇假日，您可以選擇延長借期，或是多借一本跨過假日，或是前後調整您的租借日及借期。</li>
                      <li>轉帳銀行若非玉山銀行，會跟您酌收 15 元轉帳費。</li>
                    </ul>
                  </div>
                </div>

              </div>

              <h4>【敬請愛惜物品】</h4> 
              <p>因為自己家裡小朋友仍在使用這套教具，所以希望各位爸爸媽媽在租借後，也能如同自己的東西般愛惜它們唷！也請各位爸爸媽媽提醒小朋友們要愛惜這些物品唷！非常感謝您！</p>

            </section>

            <section className="other-terms">
              <div className="other-terms-item">
                <input id="rentLost" type="checkbox"/>
                <label htmlFor="rentLost">
                  <h4>【遺失】遺失遊戲本扣除押金 500 元、遺失公車板扣除押金 550 元</h4> 
                </label>
                <div className="other-terms-item-content">
                  <ul>
                    <li>遺失遊戲本，遺失每本扣除 500 元，從押金扣除。</li>
                    <li>遊戲板若遺失、或遊戲板內任意數字塊遺失，須扣除 550 元，從押金扣除，若押金不夠扣除，須另補足賠償金額。（本出租押金僅預收遊戲本部分，不預收遊戲板押金，惟萬一有需賠償遊戲板的部分，須再請您支付此一賠償費用）</li>
                  </ul>
                  <p className="text-highlight">若有遺失之情況，之後無法再租借，望您能愛惜出租品唷！</p>
               </div>
              </div>

              <div className="other-terms-item">
                <input id="rentBreak" type="checkbox"/>
                <label htmlFor="rentBreak">
                  <h4>【破損、污損、折損】按比例賠償</h4> 
                </label>
                <div className="other-terms-item-content">
                  <ul>
                    <li>遊戲板子若有破損，若不影響遊戲進行及遊戲安全，則按 50% 比例賠償；若會影響遊戲進行或影響遊戲安全，則按 100％ 比例賠償。<br/>從押金扣除，若押金不夠扣除，須另補足賠償金額。</li>
                    <li>遊戲本若有任一頁，污損或破損涵蓋至內容部分，需照 100% 比例賠償，從押金扣除。</li>
                    <li>戲本若有任一頁，折損涵蓋至內容部分，若不影響遊戲進行，則按 75% 比例賠償；若會影響遊戲進行，則按 100％ 比例賠償，從押金扣除。</li>
                    <li>遊戲本若有任一頁，污損或破損、但不涵蓋至內容部分，則按 50% 比例賠償，從押金扣除。</li>
                    <li>遊戲本若有任一頁，折損、但不涵蓋至內容部分，則按 25% 比例賠償。</li>
                    <li>備註：內容部分指的是，上頁題目區描述及 12 格、下頁作答區 12 格、下頁之左上方作答範例、下頁之右上方解答</li>
                  </ul>
                  <p className="text-highlight">若有損壞嚴重者，之後無法再租借，望您能愛惜出租品唷！</p>

                </div>
              </div>

              <div className="other-terms-item">
                <input id="rentOverTime" type="checkbox"/>
                <label htmlFor="rentOverTime">
                  <h4>【逾期歸還】扣除延長日加收金額</h4> 
                </label>
                <div className="other-terms-item-content">
                  <ul>
                    <li>扣除金額，參考上表之數量及「延長每日加收」費用。</li>
                    <li>
                      郵寄：<br/>
                      如歸還日為 2/14（以郵寄日期為依據）<br/>
                      若 2/15 才寄出則每本扣押 10 元、<br/>
                      若 2/16 才寄出則每本扣押 20 元，以下類推，<br/>
                      費用從押金扣除，押金餘額會歸還給您。
                    </li>
                    <li>
                      面交：<br/>
                      如歸還日為 2/14，<br/>
                      若 2/15 才面交歸還則每本扣押 10 元、<br/>
                      若 2/16 才面交歸還則每本扣押 20 元，以下類推，<br/>
                      費用從押金扣除，押金餘額會歸還給您。
                    </li>
                  </ul>
                </div>
              </div>
            
              {/* <div className="other-terms-item">
                <input id="rentService" type="checkbox"/>
                <label htmlFor="rentService">
                  <h4>【關於租借服務】</h4> 
                </label>
                <div className="other-terms-item-content">
                  <p>也許您對於 AMIQ 很心動，但礙於套書費用動輒數萬元、及使用時間的考量，而未購入；也許您才剛認識這套好玩的教具，希望可以有更進一步的接觸瞭解。本租借服務是為您而生！可針對您感興趣的部分遊戲本、且有花時間使用，才有所花費支出。</p>
                  <p>若您購買一整套，往往是耗費鉅資、擺在家多時、卻無法每本都真的玩過，租借絕對比購買整套要更划算唷！使用率也更高！</p>
                </div>
              </div> */}

              {/* <div className="other-terms-item">
                <input id="retmLost" type="checkbox"/>
                <label htmlFor="retmLost">
                  <h4>【敬請愛惜物品】</h4> 
                </label>
                <div className="other-terms-item-content">
                  <p>因為自己家裡小朋友仍在使用這套教具，所以希望各位爸爸媽媽在租借後，也能如同自己的東西般愛惜它們唷！也請各位爸爸媽媽提醒小朋友們要愛惜這些物品唷！非常感謝您！</p>
                </div>
              </div> */}

            </section>

          </div>
        </div>
      </div>
    )
  }
}

window.App.RentTerms = RentTerms;
