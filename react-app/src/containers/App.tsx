import * as React from 'react';
import ProductsList from '../components/ProductsList/ProductsList';
import ProductsWrapper from '../components/ProductsList/ProductsWrapper/ProductsWrapper';
import Searchfield from '../components/Header/Searchfield/Searchfield';
import Dropdown from '../components/Footer/Dropdown/Dropdown';
import Pagination from '../components/Footer/Pagination/Pagination';
import { hot } from 'react-hot-loader';

import '../styles/app.css';

export interface IProduct {
	name: string;
	colour: string;
	price: number;
  imgOne: string;
  imgTwo: string;
  imgThree: string;
  imgFour: string;
  id: number;
}

interface IAppProps {
}

interface IAppState {
	numProductShow: number;
	error: boolean;
  products: Array<IProduct>;
  searchfieldVal: string;
  subheaderVal: string;
  currentPage: number;
}

class App extends React.Component<IAppProps, IAppState> {
  // 5 products per page seems fair
  // current page shouldn't be 1 since it's an aliase for an array key
  // products are populated by the request
  // searchvalue should be empty on start
  // subheader should be Lista de Produtos on start
	constructor(props: IAppProps) {
    super(props)
    
		this.state = {
      numProductShow: 5,
      currentPage: 0,
    	error: false,
      products: [],
      searchfieldVal: '',
      subheaderVal: 'Lista de Produtos'
		}
	}

  // I didn't use async since the page should be populated on mount
  // plus we have a retainer hehe
  componentDidMount() {
		fetch('/api/')
      .then(res => res.json())
      .then(fetchedProducts => this.setState({products: fetchedProducts.express}))
			.catch(error => {
				console.log(error);
				this.setState({ error: true });
      });
  }

  // i'm pretty sure this would be problematic in Angular
  // 2 way data binding is scary
  // .value on target node returns a string
  onSearchChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ searchfieldVal: event.currentTarget.value });
  }

  onDropdownSelect = (event: React.SyntheticEvent<HTMLSelectElement>): void => {
    this.setState({ numProductShow: Number(event.currentTarget.value) });
    this.setState({ currentPage: 0 });
  }

  onPageChange = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
    this.setState({ currentPage: Number(event.currentTarget.value) });
  }
  
  render() { 
    // destructuring for best practices
    const { numProductShow, currentPage, products, searchfieldVal } = this.state;

    let subText = "Lista de Produtos";

    // why use jQuery when it's 2018
    // don't use mutable vars for mission critical components
    let searchQuery = products.filter(product => {
      return product.name.toLowerCase().includes(searchfieldVal.toLowerCase());
    })

    // i'll handle it to change on submit
    if (searchfieldVal !== "") {
      subText = searchfieldVal;
    }

    // this is.... bodge
    // allow me to elaborate
    // chunkArray takes 2 params -> this.state.products array & this.state.numProductShow
    // while index < length of products[], index = index + numProductShow
    // products.slice returns new array object, starting from index and ending in index + numProductShow
    // we push that new array to our tempArray and return the array
    // SO WHY DID I DO IT?
    // the result var now holds perfectly sized arrays, making pagination ez
    function chunkArray(myArray, bitSize){
      let index = 0;
      let arrayLength = myArray.length;
      let tempArray: any[] = [];
      
      for (index = 0; index < arrayLength; index += bitSize) {
          let myChunk = myArray.slice(index, index + bitSize);
          console.log(myChunk);
          tempArray.push(myChunk);
      }
      
      return tempArray;
    }

    if (searchQuery.length == 0) {
      searchQuery = products;
      subText = "Nenhum produto encontrado"
    }

    //let result = chunkArray(products, numProductShow);
    let result = chunkArray(searchQuery, numProductShow);
    
    // since var result can be indexed by "page", we should make something to access said pages
    // if you don't ceil, you get a float and I've never seen 1/4 of a post
    // push the i so it acts as an index
    const pageNumbers: number[] = [];
    for (let i = 0; i < Math.ceil(products.length / numProductShow); i++) {
      pageNumbers.push(i);
    }

    // thank god for ES6 and native array iteration
    // a native for loop is still faster than map/slice/splice
    // returns a button for each "page"
    // add a click listener to them
    // when executing onPageChange, "this" is refering to the btn's value
    const pagBtns = pageNumbers.map(btns => {
      return (
        <Pagination
          btnCreator={btns}
          crumbSelect={this.onPageChange}/>
      );
    }) 

    // showMe is typed as IProduct interface so TSLint doesn't scream at me and webpack is happy
    // remember that result can be accessed as result[foo][bar]
    // we just want the first index, the "page"
    // since ProductsWrapper will map the entries
    let showMe: IProduct[] = result[currentPage];

    // having 0 products is the same as getting a fetch err
    return !products.length ? <h1>Carregando produtos...</h1> : (
      <div className="Body">
        <Searchfield
          searchChange={this.onSearchChange} />
        <div className="Subheader">
          <h1>{subText}</h1>
        </div>
        <div className="Found">
          <h4>{searchQuery.length} Produtos Encontrados.</h4>
        </div>
        <ProductsList>
          <ProductsWrapper
            products={showMe} />
        </ProductsList>
        <div className="Footer">
          <hr style={{margin: '35px 0', border: '0', height: '0', borderTop: '1px solid rgba(0, 0, 0, 0.1)', borderBottom:'1px solid rgba(255, 255, 255, 0.3)'}}/>
          <div className="FooterWrap">
            <Dropdown
              dropdownSelect={this.onDropdownSelect} />
            <div className="Pagination">
              {pagBtns}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);