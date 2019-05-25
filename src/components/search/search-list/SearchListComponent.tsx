import * as React from 'react';
import { getCoinProvider } from '../../../providers/CoinProvider';
import { getCurrencyProvider } from '../../../providers/CurrencyProvider';

export interface ISearchResult {
  businessUnit: string;
  type: string;
  results: any[];
}

export interface ISearchProvider {
  command: (x: string) => Promise<ISearchResult[]>;
  renderer: (x: ISearchResult) => JSX.Element;
}

interface IState {
  term: string;
  providers: ISearchProvider[];
  results: JSX.Element[];
}

interface IProps {}

class SearchListComponent extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state);
    this.state = {
      term: '',
      results: [],
      providers: [getCoinProvider(), getCurrencyProvider()]
    };
  }

  onTermChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      term: e.currentTarget.value
    });
  };

  onSearch = async () => {
    let results: JSX.Element[] = [];
    for (let i = 0; i < this.state.providers.length; i++) {
      let x = this.state.providers[i];
      let res = await x.command(this.state.term);
      let elements = await Promise.all(res.map(x.renderer));
      results = [...results, ...elements];
    }
    console.log(results);
    this.setState({ results });
  };

  render() {
    const { results } = this.state;
    return (
      <div>
        <input type="text" onChange={this.onTermChange} />
        <button onClick={this.onSearch} />
        {results}
      </div>
    );
  }
}

export default SearchListComponent;
