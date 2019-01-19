const {
    Loading
} = window.App;


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [
                {
                    'id': '106_1',
                    'no': 'rdjov',
                    'opening': '早安！起床準備上學囉～',
                    'question': '找出符合的睡衣和襪子唷',
                },
                {
                    'id': '106_6',
                    'no': 'csgrm',
                    'opening': '彼得畫了這張美麗的圖',
                    'question': '他用了哪些顏色呢？請指出來',
                },
                {
                    'id': '106_7',
                    'no': 'sbjkw',
                    'opening': '這些好玩的拼圖，每個都少了一片',
                    'question': '找出少掉的一片',
                },
            ],
            currentTopic: '',
        }
        this.goTop = this.goTop.bind(this);
    }

    componentDidMount() {
        this.getRandomTopic();

        window.onload = maxWindow;

        function maxWindow() {
            window.moveTo(0, 0);


            if (document.all) {
                top.window.resizeTo(screen.availWidth, screen.availHeight);
            }

            else if (document.layers || document.getElementById) {
                if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
                    top.window.outerHeight = screen.availHeight;
                    top.window.outerWidth = screen.availWidth;
                }
            }
        }

        var currentCard = 0;

        $('.game-card a').not('.active').click(function(){
            currentCard = parseInt($(this).attr('data-card'));
            $(this).addClass('active');

            setScrollIntoView('questionImg');

            console.log('currentCard',currentCard);
        });

        $('.game-option a').click(function(){
            if(currentCard > 0) {
                $(this).attr('data-showoption',currentCard );
                currentCard = 0;
            }
        });
        
        $('.game-card a.active').click(function(){
            $(this).removeClass('active');
            var removeCard = parseInt($(this).attr('data-card'));
            console.log('removeCard',removeCard);
            $('.game-option a[data-showoption="' + removeCard + '"]').attr('data-showoption' , 0);
        });

        $('.game-question-img').click(function(){
            setScrollIntoView('questionImg');
        })

        $('.show-ans button').click(function(){
            $('.game-option a[data-showoption]').addClass('ans');
            $(this).addClass('ans');
            console.log('ans!')
        })

    }
    componentDidUpdate(prevProps, prevState) {
    }

    getRandomTopic() {
        const topics = this.state.topics;
        var topic = topics[Math.floor(Math.random() * topics.length)];
        this.setState({
            currentTopic: topic
        })
    }

    goTop() {
        var top = $('.game-question-img').height() + 24;
        $('#app').animate({
            scrollTop: top
        }, 300);
      }

    renderGameOptionList() {
        render(

        )
    }
    renderCardList() {
        let Li = []

        for (let i = 0; i < 12; i++) {
            Li.push(
                <li><a data-card={i + 1}>{i + 1}</a></li>
            );
        }
        return Li;
    }
    renderOptionList() {
        let Li = []

        for (let i = 0; i < 12; i++) {
            Li.push(
                <li><a></a></li>
            );
        }
        return Li;
    }

    render() {
        const topic = this.state.currentTopic;
        const style = {
            backgroundImage: `url(./img/game/topic/${topic.id}_${topic.no}.jpg`,
            backgroundRepeat: 'no-repeat'
        };
        return (
            <div className="game-wrap">
                <div className="game-question-sample">
                    <div className="game-question-text">
                        <p>{topic.opening}</p>
                        <p>{topic.question}</p>
                    </div>
                    <div className="game-answer-sample" style={style}></div>
                </div>
                <div id="questionImg" className="game-question-img" style={style}></div>
                <div className="game-card game-list">
                    <ul>
                        {this.renderCardList()}
                    </ul>
                </div>
                <div className="game-option-img" style={style}>
                    <div className="game-option game-list">
                        <ul>
                            {this.renderOptionList()}
                        </ul>
                    </div>
                </div>
                {/* <div>
                    <img width="100%" className="game-topic-img" src={`./img/game/topic/${topic.id}.jpg`} alt="題目" />
                </div> */}
                <div className="show-ans">
                    <button style={style}></button>
                </div>             
            </div>
        )

    }
}

window.App.Game = Game;
