import React, { Component } from "react";
import PlanetList from '../components/PlanetList'
import Search from '../components/Search';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../redux/actions'

class PlanetSearch extends Component {
    constructor() {
        super();
        this.state = {
            filterText: '',
            data: [],
            showPlanetCard: false,
        }
        this.onLogOut = this.onLogOut.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onPlantClick = this.onPlantClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        let { searchInfo } = newProps;
        if (searchInfo.success) {
            this.setState({ data: searchInfo.results });
        } else if (!searchInfo.success && searchInfo.showAlert) {
            this.setState({ showAlert: true, alertText: searchInfo.alertText });
        }
    }

    componentDidMount() {
        this.props.searchPlanet('');
    }

    onPlantClick(info) {
        console.log("here ....", info);
        this.setState({ isOpen: true, plantInfo: info, showPlanetCard: !this.state.showPlanetCard });
    }

    getPlanets(text) {
        this.props.searchPlanet(text);
    }

    filterUpdate(e) {
        this.getPlanets(e);
    }

    onLogOut() {
        this.props.history.push('/login')
    }

    closeModal() {
        this.setState({ showPlanetCard: false});
    }

    render() {
        const { showPlanetCard } = this.state;
        return (
            <div>
                <header>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <h2 className="heading">STAR WARS</h2>
                            <ul className="nav navbar-nav navbar-right">
                                <button type="button" className="btn btn-default navbar-btn " onClick={this.onLogOut}>Log out</button>
                            </ul>
                        </div>
                    </nav>
                </header>
                <main>
                    <Search
                        filterVal={this.state.filterText}
                        filterUpdate={this.filterUpdate.bind(this)}
                    />
{/* {
    showPlanetCard && <div>data: </div>
} */}

                    {!showPlanetCard && <PlanetList
                        data={this.state.data}
                        filter={this.state.filterText}
                        handleClick={this.onPlantClick}
                    />}
                </main>
                {
                    this.state.showPlanetCard &&
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="myModalLabel">{"Planet Info"}</h4>
                                <button className="close" onClick={this.closeModal}>
                                    <span className="closeIcon">X</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ul class="list-group">
                                            <li class="list-group-item">Name - {this.state.plantInfo.name}</li>
                                            <li class="list-group-item">Rotation Period - {this.state.plantInfo.rotation_period}</li>
                                            <li class="list-group-item">Orbital Period - {this.state.plantInfo.orbital_period}</li>
                                            <li class="list-group-item">Diameter - {this.state.plantInfo.diameter}</li>
                                            <li class="list-group-item">Climate - {this.state.plantInfo.climate}</li>
                                            <li class="list-group-item">Gravity - {this.state.plantInfo.gravity}</li>
                                            <li class="list-group-item">Terrain - {this.state.plantInfo.terrain}</li>
                                            <li class="list-group-item">Population - {this.state.plantInfo.population}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

let mapStateToProps = function (state) {
    return { searchInfo: state.search };
}

export default connect(mapStateToProps, action)(withRouter(PlanetSearch));