import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectRegion,
  selectSubRegion,
  generateCountryList,
  resetPosition
 } from '../actions/index';

import { bindActionCreators } from 'redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export class TopNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  getRandomRegionIdx(regionsLength){
    return Math.floor(Math.random() * Math.floor(regionsLength));
  }

  getRandomSubRegionIdx(subregionsLength){
    return Math.floor(Math.random() * Math.floor(subregionsLength));
  }

  renderRegionList() {
    return this.props.regions.map((region) => {
      return (
        <DropdownItem
          key={ region.name }
          onClick={() => {
            this.props.selectRegion(region);
            let indexOfRandomSubregion = this.getRandomSubRegionIdx(region.subRegions.length);
            let randomSubRegion = region.subRegions[indexOfRandomSubregion];
            this.handleSubRegionClick(randomSubRegion)
          }}
          className="list-group-item">
          { region.name }
        </DropdownItem>
      )
    });
  }

  getCountryList(activeSubRegion){
    let countries = [];

    if (activeSubRegion){
      countries = activeSubRegion.countries.map(country => {
        return country.name;
      })
    }

    let shuffled_countries = this.props.shuffle(countries);
    return shuffled_countries;
  }

  handleSubRegionClick(subRegion){
    this.props.selectSubRegion(subRegion);
    let countryList = this.getCountryList(subRegion);
    this.props.generateCountryList(countryList);
    this.props.resetPosition();
  }


  renderSubRegionList() {
    if (!this.props.activeRegion){
      return [];
    } else {
      return this.props.activeRegion.subRegions.map((subRegion) => {

        return (
          <DropdownItem
            key={ subRegion.name }
            onClick={() => {
              this.handleSubRegionClick(subRegion);
            }}
            className="list-group-item">
            { subRegion.name }
          </DropdownItem>
        )
      });
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentWillMount(){

    let randomRegion = null;

    if (!this.props.ActiveRegion){
        let randomRegionIdx = this.getRandomRegionIdx(this.props.regions.length);
        randomRegion = this.props.regions[randomRegionIdx];
        this.props.selectRegion(randomRegion);
     }

    if (!this.props.ActiveSubRegion){
      let randomSubRegionIdx = this.getRandomSubRegionIdx(randomRegion.subRegions.length);
      let randomSubRegion = randomRegion.subRegions[randomSubRegionIdx];
      this.handleSubRegionClick(randomSubRegion);
    }
  }

  render() {

      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Learn Flags</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>



              <Nav className="ml-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    { this.props.activeRegion ? this.props.activeRegion.name : ""}
                  </DropdownToggle>
                  <DropdownMenu right>
                    { this.renderRegionList() }
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    { this.props.activeSubRegion ? this.props.activeSubRegion.name : 'Subregion' }
                  </DropdownToggle>
                  <DropdownMenu right>
                    { this.renderSubRegionList() }
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>

            </Collapse>
          </Navbar>
        </div>
      )
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props
  //inside of BookList
  return {
    regions: state.Regions,
    activeRegion: state.ActiveRegion,
    activeSubRegion: state.ActiveSubRegion,
    countryList: state.CountryList,
    positionInQueue: state.PositionInQueue
  }
}

//Anything returned from this function will
//end up as props from the BookList container
function mapDispatchToProps(dispatch){
  //whenever selectBook is called, the result should be
  //passed to all of our reducers
  return bindActionCreators({
    selectRegion,
    selectSubRegion,
    generateCountryList,
    resetPosition
   }, dispatch)
}

//Promote BookList from a component to a container - it
//needs to know about this new dispatch method, selectBook.
//Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar);
