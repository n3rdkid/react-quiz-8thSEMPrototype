import React from 'react';
import './App.css';
import Quiz from './components/QuizQuestion';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import '../node_modules/codemirror/lib/codemirror.css';
import '../node_modules/codemirror/theme/material.css';
let currentValue=null;
class App extends React.Component {
  state={
    questionList: [{
          id: "#234",
          title: "What primitive type is the variable result ?",
          code: "const result = NaN",
          answers: {
            a: "Symbol",
            b: "String",
            c: "Number",
            d: "Boolean"
          },
          correctAnswer: "c",
          time: 50
        },
        {
          id: "#123",
          title: "Given the following code snippet ?",
          code: "let foo =5;function addTwo(){foo=foo+2;}addTwo(foo);console.log(foo)",
          answers: {
            a: "12",
            b: "7",
            c: "5",
            d: "Reference Error"
          },
          correctAnswer: "c",
          time: 60
        }
      ],
      score: 0,
      nextQuestion:0
  }
  clickHandler = (e) => {
    let score=this.state.score;
    let nextQuestion=this.state.nextQuestion;
    if (e.target.id === this.state.questionList[this.state.nextQuestion].correctAnswer) {
      e.target.classList.add('bg-success', 'text-white');
      score+=5;
     } else {
      e.target.classList.add('bg-danger', 'text-white');
    }
    nextQuestion++;
    setTimeout(()=>{      
      this.setState({score:score,nextQuestion:nextQuestion})
    },1000)
  }
  javaScriptHandler()
  {
    const iframe=document.querySelector("#myFrame");
    let iframe_doc=iframe.contentDocument;
    let temp=new Function(currentValue);
    iframe_doc.open();
		iframe_doc.write(temp());
		iframe_doc.close();
  }
  render() {
    let quiz;
    if(this.state.nextQuestion<this.state.questionList.length){
    quiz= <Quiz clicked={this.clickHandler} question={this.state.questionList[this.state.nextQuestion]}/>
    }
    else{
      quiz=<div className="container-fluid bg-primary align-items-center" style={{height:"100vh",width:"100vw"}}>
      <h1 className="text-center">Thank You for Your Participation</h1>
      </div>
    }
    return (
    <>
    <div>
     {quiz}
     <div class="row"> 
     <CodeMirror className="col-md-8" 
  options={{ 
    theme: 'material',
    lineNumbers: true,
    mode:  'jsx',
    tabSize: 2,
    autofocus: true,
    foldGutter: false,
    gutters: [],
    styleSelectedText: true,
  }}  onChange={(editor, data, value) => {
    currentValue=value;
  }}/>
<iframe title="myFrame" id="myFrame" className="col-md-4"></iframe>
  </div>
  <button onClick={this.javaScriptHandler} class="btn btn-outline-success">Run</button>
  </div>
</> 
   );
  }
}

export default App;