const {
    Loading
} = window.App;


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [
                '106_1',
                '106_6'
            ],
            currentTopic: '',
        }
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

    renderGameOptionList() {
        render(

        )
    }
    renderLiList() {
        let Li = []

        for (let i = 0; i < 12; i++) {
            Li.push(
                <li>{i + 1}</li>
            );
        }
        return Li;
    }

    render() {
        const topic = this.state.currentTopic;
        return (
            <div className="game-wrap">
                <div>
                    <img className="game-topic-img" src={`./img/game/topic/${topic}.jpg`} alt="題目" />
                    <div className="game-option">
                        <ul>
                            {this.renderLiList()}
                        </ul>
                    </div>
                </div>
                <div className="game-card">
                    <ul>
                        {this.renderLiList()}
                    </ul>
                </div>
            </div>
        )

    }
}

window.App.Game = Game;
