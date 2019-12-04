import React from 'react';
import './App.css';
import  Requests from 'superagent'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input_value: '',
    option_value: 'd2v',
    output_value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.optionChange = this.optionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.outputChange = this.outputChange.bind(this)
  }
  outputChange(event){
    this.setState({ output_value: event.target.value });
  }
  handleChange(event) {
    this.setState({ input_value: event.target.value });
  }
  optionChange(event) {
    this.setState({ option_value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    var url = "http://localhost:5000/text_summary";
    console.log(url);
    var json = {mytext : this.state.input_value, mode : this.state.option_value};
    json = JSON.stringify(json);

    console.log(json);    
    fetch(url,{
        method: 'POST',
        body: json,
        crossDomain:true,
        headers: {'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"}
    }).then(res => res.json()).then(result => {
        console.log('done !');
        this.setState({output_value : result.content})

    })
}

  render() {
    return (
      <div className = "container">
        <h1 className = "App  ">Text Summary Demo</h1>
        <form onSubmit={this.handleSubmit}>
        <div>
          <div className = "col-50-left"><h3>Input</h3></div>
          <div className = "col-50-right"><h3>Output</h3></div>
        </div>

        <div>
        <label htmlFor="markdown-content">
          Enter your document
        </label>
        {/* <label htmlFor="markdown-content" class = "">
          Your summary here
        </label> */}
        </div >
        <div className = "row">
        <textarea className = "input"
          id="input-content"
          onChange={this.handleChange}
          defaultValue={this.state.input_value}
          placeholder = 'Your Document'
        />
        <textarea className = "output"
          id="output-content"
          onChange = {this.outputChange}
          defaultValue={this.state.output_value}
          placeholder = 'Your summary'
        />
        
        </div>
           <select className = "select" value={this.state.option_value} onChange={this.optionChange}>
            <option value="d2v">Doc2Vec</option>
            <option value="t2v">Tf-idf</option>
            <option value="w2v">Word2Vec</option>
            <option value="all">Concat_all</option>
         </select>
        

        
        <input className = "button button2" type="submit" value="Rút gọn" />
        
        </form>
      </div>
    );
  }
}

export default App;

// var formData = new FormData();
// console.log('props',this.props);
// formData.append('file',this.props.file);
// formData.append('fileLanguage', this.props.fileLanguage);
// formData.append('multiSpeaker', this.props.multiSpeaker);
// console.log(...formData);
// fetch(SERVER_URL + 'recognition',{
//     method: 'POST',
//     body: formData,
// }).then(res => res.json()).then(result => {
//     console.log('recognize done !')
//     clearInterval(this.interval);
//     this.props.handleDoneRecognize(result['tranData']);
// })