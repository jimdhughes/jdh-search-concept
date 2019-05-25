import * as React from 'react';
import { getTrafficProvider } from '../../../providers/TrafficProvider';
import { getPropertyValueProvider } from '../../../providers/PropertyValueProvider';

export interface ISearchResult {
  businessUnit: string;
  type: string;
  result: any;
}

export interface ISearchProvider {
  command: (x: string) => Promise<ISearchResult[]>;
  renderer: (x: ISearchResult) => JSX.Element;
}

interface IState {
  term: string;
  providers: ISearchProvider[];
  results: IResult[];
}

interface IResult {
  element: JSX.Element;
  result: ISearchResult;
}

interface IProps {}

const style: React.CSSProperties = {
  height: '100vh',
  overflowY: 'scroll'
};

class SearchListComponent extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state);
    this.state = {
      term: '',
      results: [],
      providers: [getTrafficProvider(), getPropertyValueProvider()]
    };
  }

  onTermChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      term: e.currentTarget.value
    });
  };

  onSearch = async () => {
    let results: IResult[] = [];
    for (let i = 0; i < this.state.providers.length; i++) {
      let x = this.state.providers[i];
      let res = await x.command(this.state.term);
      for (let j = 0; j < res.length; j++) {
        results.push({ result: res[j], element: await x.renderer(res[j]) });
      }
    }
    results.sort((a, b) => (a.result.businessUnit < b.result.businessUnit ? 1 : -1));
    this.setState({ results });
  };

  render() {
    const { results } = this.state;
    return (
      <div>
        <input type="text" onChange={this.onTermChange} />
        <button onClick={this.onSearch}>Search</button>
        <div style={style}>{results.map(x => x.element)}</div>
      </div>
    );
  }
}

export default SearchListComponent;
