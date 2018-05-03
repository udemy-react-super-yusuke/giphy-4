import React from "react";
import { render } from "react-dom";

import axios from "axios";

// addTodo を再利用したコンポーネント
import { Search } from "./components/Search";

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  renderImageList(list) {
    const imageList = list.map(url => {
      return (
        <li>
          <img src={url} />
        </li>
      );
    });

    return <ul>{imageList}</ul>;
  }

  render() {
    // Search コンポーネントにメソッドを渡す
    return (
      <div>
        <Search search={this.giphyApi} />
        {this.renderImageList(this.state.gifUrlList)}
      </div>
    );
  }

  // 検索対象を target という引数で受けて使用する
  giphyApi = target => {
    const search = target;
    const key = "V6AU97qCSCYVmbIC5UDppEiVM1xnuO9E";
    const limit = 50;
    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then(res => {
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });
    });
  };
}

render(<App />, document.getElementById("root"));
