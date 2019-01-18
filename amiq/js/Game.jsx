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
    renderGameOptionList() {

    }

    render() {
        const topic = this.state.currentTopic;
        return (
            <div className="game-wrap">
                <div>
                    <img className="game-topic-img" src={`./img/game/topic/${topic}.jpg`} alt="題目" />
                    <div className="game-option">

                    </div>
                </div>
                <div className="game-card">

                </div>
            </div>
        )

    }
}

window.App.Game = Game;
