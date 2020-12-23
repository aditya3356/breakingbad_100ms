import React, { Component } from 'react';
import classes from './Home.css';
import axios from 'axios';
import config from '../../config.json';
import ListItems from '../../components/ListItems/ListItems';

class Layout extends Component {

    state = {
        characters: [],
        page: 1,
        inputValue: "",
        filteredCharacters: [],
        availableFilters: ["Better Call Saul", "Breaking Bad"],
        appliedFilters: []
    }

    componentDidMount () {
        axios.get(config.END_POINT+"characters")
        .then(response => {
            console.log(response);
            
            this.setState({characters: response.data, filteredCharacters: response.data});
        })
        .catch(error => {
            console.log(error);
        })
    } 
    
    prevClickedHandler = () => {
        let currentPage = this.state.page;
        this.setState ({page: currentPage-1});
    }

    nextClickedHandler = () => {
        let currentPage = this.state.page;
        this.setState ({page: currentPage+1});
    }

    rowClickedHandler = (index) => {
        
        // console.log(((this.state.page-1)*10) + index);

        let updatedIndex = (this.state.page-1)*10 + index;
        const queryParams = [];
        const nameString = this.state.filteredCharacters[updatedIndex].name.split(' ').join('_');

        queryParams.push(encodeURIComponent('name') + "=" + encodeURIComponent(nameString));
        const queryString = queryParams.join('&');

        this.props.history.push ({
            pathname: '/character',
            search: '?' + queryString,
            state: this.state.filteredCharacters[updatedIndex]
        });
    }

    onNameChangeHandler = (event) => {
        let inputValue = event.target.value;

        let newFilteredCharacters = this.state.characters;
        
        if (this.state.appliedFilters.length)
        {
            newFilteredCharacters = [];
            this.state.characters.forEach(character => {
                for (let i=0;i<this.state.appliedFilters.length;i++)
                {
                    // console.log (appliedFilters[i]);
                    if (character.category.includes(this.state.appliedFilters[i]))
                    {
                        newFilteredCharacters.push(character);
                        break;
                    }
                }
            })
        }
        
        let filteredCharacters = [];

        newFilteredCharacters.forEach(character => {
            if (character.name.toLowerCase().includes(inputValue.toLowerCase()))
            {
                // console.log(character);
                filteredCharacters.push(character);
            }
        });

        console.log(filteredCharacters);
        
        if (inputValue!="")
            this.setState({inputValue: inputValue, filteredCharacters: filteredCharacters, page: 1});
        else
        {
            this.setState({inputValue: inputValue, filteredCharacters: newFilteredCharacters, page: 1});
            // this.removeFilterHandler(null);
        }
    }

    clearSearchClickedName = () => {
        // this.removeFilterHandler(null);

        let newFilteredCharacters = this.state.characters;
        
        if (this.state.appliedFilters.length)
        {
            newFilteredCharacters = [];
            this.state.characters.forEach(character => {
                for (let i=0;i<this.state.appliedFilters.length;i++)
                {
                    // console.log (appliedFilters[i]);
                    if (character.category.includes(this.state.appliedFilters[i]))
                    {
                        newFilteredCharacters.push(character);
                        break;
                    }
                }
            })
        }

        this.setState({inputValue: "", filteredCharacters: newFilteredCharacters, page: 1});
        
    }

    // searchCharacterClickedName = () => {
        
    //     let filteredCharacters = [];

    //     this.state.filteredCharacters.forEach(character => {
    //         if (character.name.toLowerCase().includes(this.state.inputValue.toLowerCase()))
    //         {
    //             // console.log(company);
    //             filteredCharacters.push(character);
    //         }
    //     });

    //     this.setState ({filteredCharacters: filteredCharacters, page: 1});
    // }

    addFilterHandler = (filter) => {
        let availableFilters = [...this.state.availableFilters];
        let appliedFilters = [...this.state.appliedFilters];
        
        availableFilters.splice (availableFilters.indexOf(filter), 1);
        appliedFilters.push (filter);
        availableFilters.sort();
        appliedFilters.sort();
        
        let filteredCharacters = [];

        this.state.characters.forEach(character => {
            for (let i=0;i<appliedFilters.length;i++)
            {
                console.log (appliedFilters[i]);
                if (character.category.includes(appliedFilters[i]))
                {
                    filteredCharacters.push(character);
                    break;
                }
            }
        })

        this.setState({filteredCharacters: filteredCharacters, availableFilters: availableFilters, appliedFilters: appliedFilters, page: 1, inputValue: ""});
        // if (this.state.inputValue!="")
        // {
        //     const filteredCharacters = [];
        
        //     this.state.filteredCharacters.forEach(character => {
        //         if (character.name.toLowerCase().includes(this.state.inputValue.toLowerCase()))
        //         {
        //             // console.log(character);
        //             filteredCharacters.push(character);
        //         }
        //     });

        //     console.log(filteredCharacters);

        //     this.setState({page: 1});
        // }
    }
    
    removeFilterHandler = (filter) => {
        let availableFilters = [...this.state.availableFilters];
        let appliedFilters = [...this.state.appliedFilters];
        
        if (filter)
        {
            appliedFilters.splice (appliedFilters.indexOf(filter), 1);
            availableFilters.push (filter);
            availableFilters.sort();
            appliedFilters.sort();
        }

        let filteredCharacters = [];

        this.state.characters.forEach(character => {
            for (let i=0;i<appliedFilters.length;i++)
            {
                console.log (appliedFilters[i]);
                if (character.category.includes(appliedFilters[i]))
                {
                    filteredCharacters.push(character);
                    break;
                }
            }
        })
        
        if (filteredCharacters.length==0)
            filteredCharacters = [...this.state.characters];

        this.setState({filteredCharacters: filteredCharacters, availableFilters: availableFilters, appliedFilters: appliedFilters, page: 1, inputValue: ""});
        // if (this.state.inputValue!="")
        // {
        //     const filteredCharacters = [];
        
        //     this.state.filteredCharacters.forEach(character => {
        //         if (character.name.toLowerCase().includes(this.state.inputValue.toLowerCase()))
        //         {
        //             // console.log(character);
        //             filteredCharacters.push(character);
        //         }
        //     });

        //     console.log(filteredCharacters);
            
        //     this.setState({filteredCharacters: filteredCharacters, page: 1});
        // }
    }

    render(){
        // console.log(this.state.characters);
        
        let categories = [];

        if (this.state.characters.length)
        {
            this.state.characters.forEach (character => {
                if (character.category)
                    categories.push (character.category);
            })
        }

        console.log(categories);

        let si = (this.state.page-1)*10;
        let ei = si+10;

        let rows = this.state.filteredCharacters.slice(si, ei);

        return(
            <div>
                <div className={classes.ContainerFilters}>
                    
                    <div className={classes.FilterType}>
                        <div className={classes.FilterHeading}><strong>Add Category Filter: </strong></div>
                        <div className={classes.Filters}>
                            {this.state.availableFilters.map(filter => {
                                return (
                                    <div onClick={() => this.addFilterHandler(filter)} className={classes.AvailableFilter} key={filter}>{filter}</div>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className={classes.FilterType}>
                        <div className={classes.FilterHeading}><strong>Remove Category Filter: </strong></div>
                        <div className={classes.Filters}>
                            {this.state.appliedFilters.map(filter => {
                                return (
                                    <div onClick={() => this.removeFilterHandler(filter)} className={classes.AppliedFilter} key={filter}>{filter}</div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                <div className={classes.ContainerSearchBar}>

                    <input 
                        className={classes.Searchbar}
                        placeholder="Search by name of character"
                        value={this.state.inputValue}
                        onChange={this.onNameChangeHandler}
                    />  
                    
                    <div className = {classes.Icons}>
                        <svg className={classes.CrossIcon} onClick = {this.clearSearchClickedName} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.87555 10L0.439987 2.56443C-0.146662 1.97778 -0.146662 1.02664 0.439987 0.439987C1.02664 -0.146662 1.97778 -0.146662 2.56443 0.439987L10 7.87555L17.4356 0.439987C18.0222 -0.146662 18.9734 -0.146662 19.56 0.439987C20.1467 1.02664 20.1467 1.97778 19.56 2.56443L12.1244 10L19.56 17.4356C20.1467 18.0222 20.1467 18.9734 19.56 19.56C18.9734 20.1467 18.0222 20.1467 17.4356 19.56L10 12.1244L2.56443 19.56C1.97778 20.1467 1.02664 20.1467 0.439987 19.56C-0.146662 18.9734 -0.146662 18.0222 0.439987 17.4356L7.87555 10Z" fill="#AE42C9"/>
                        </svg>
                        
                        <div className={classes.Bar}></div>
                        
                        <svg className = {classes.SearchIcon} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.6576 26.008L19.6953 18.0457C21.2376 16.1405 22.1662 13.7197 22.1662 11.0831C22.1662 4.97226 17.194 0 11.0831 0C4.9722 0 0 4.9722 0 11.0831C0 17.194 4.97226 22.1662 11.0831 22.1662C13.7197 22.1662 16.1405 21.2376 18.0457 19.6953L26.008 27.6576C26.2355 27.8851 26.5341 27.9995 26.8328 27.9995C27.1315 27.9995 27.4302 27.8851 27.6577 27.6576C28.1138 27.2015 28.1138 26.4641 27.6576 26.008ZM11.0831 19.8329C6.25788 19.8329 2.33331 15.9083 2.33331 11.0831C2.33331 6.25783 6.25788 2.33325 11.0831 2.33325C15.9084 2.33325 19.833 6.25783 19.833 11.0831C19.833 15.9083 15.9083 19.8329 11.0831 19.8329Z" fill="#AE42C9"/>
                        </svg>
                    </div>

                </div>

                <ListItems 
                    heading = "Characters" 
                    page = {this.state.page} 
                    rows = {rows} 
                    totalCharacters = {this.state.filteredCharacters}
                    prevClicked = {this.prevClickedHandler}
                    nextClicked = {this.nextClickedHandler} 
                    rowClicked = {this.rowClickedHandler}
                />

            </div>
        );
    }
}

export default Layout;