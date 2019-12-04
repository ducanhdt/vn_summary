import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input_value: 'Hello, world',
    option_value: 'tfidf',
    output_value: 'output'
    };
    this.handleChange = this.handleChange.bind(this);
    this.optionChange = this.optionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({ input_value: event.target.value });
  }
  optionChange(event) {
    this.setState({ option_value: event.target.value});
  }
  handleSubmit(event) {
    alert('text:' + this.state.input_value +"\n option: "+this.state.option_value);
    event.preventDefault();
  }
  // getRawMarkup() {
  //   const md = new Remarkable();
  //   return { __html: md.render(this.state.value) };
  // }

  render() {
    return (
      <div class = "container">
        <form onSubmit={this.handleSubmit}>
        <div>
          <div class = "col-50-left"><h3>Input</h3></div>
          <div class = "col-50-right"><h3>Output</h3></div>
        </div>

        <div>
        <label htmlFor="markdown-content">
          Enter your document
        </label>

        </div >
        <div class = "row">
        <textarea class = "input"
          id="input-content"
          onChange={this.handleChange}
          defaultValue={this.state.input_value}
        />
        <textarea class = "output"
          id="output-content"
          defaultValue={this.state.output_value}
        />
        
        </div>
        {/* <div>
           <select class = "select " value={this.state.option_value} onChange={this.optionChange}>
            <option value="tf-idf">Tf-idf</option>
            <option value="word2vec">Word2Vec</option>
            <option value="doc2vec">Doc2Vec</option>
         </select>
        </div> */}

        <div>
        <input class = "button button2" type="submit" value="Rút gọn"S />
        </div>
        </form>
      </div>
    );
  }
}

export default App;
