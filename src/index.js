import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './components/Loader';
import './styles/styles.css';
import logo from './assets/images/logo.png';

function CharacterCard(props) {
    const { character } = props;
    return (
        <div className="CharacterCard" style={{ backgroundImage: `url(${character.image})` }}>
            <div className="CharacterCard__name-container text-truncate">
                {character.name}
            </div>
        </div>
    );
}

class App extends React.Component {
    state = {
        nextPage: 1,
        loading: true,
        error: null,
        data: {
            results:[],
        }
    }
    componentDidMount() {
        this.fetchCharacters()
    }

    fetchCharacters = async () => {
        this.setState({
            loading:true,
            error: null
        });
        try{
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${this.state.nextPage}`);
            const data = await response.json();
    
            this.setState({ data: {
                info: data.info,
                results:[].concat(this.state.data.results, data.results)
            }, loading:false, nextPage: this.state.nextPage +1 });
        }
        catch(error){
            this.setState({loading:false, error: error})
        }

    }

    render() {
        if(this.state.error){
            return `Error: ${this.state.error.message}`;
        }
        return (
            <div className="container">
                <div className="App">
                    <img className="Logo" src={logo} alt="Rick y Morty" />
                    <ul className="row">
                        {this.state.data.results.map(character => (
                            <li className="col-6 col-md-3" key={character.id}>
                                <CharacterCard character={character}></CharacterCard>
                            </li>
                        ))}
                    </ul>
                    {this.state.loading && (
                        <div className="loader">
                            <Loader />
                        </div>
                    )}
                    {!this.state.loading && (
                        <button onClick={()=> this.fetchCharacters()}>Load More</button>
                    )}
                </div>
            </div>
        );
    }
}

export default App;

const container = document.getElementById("root");

ReactDOM.render(<App />, container);
