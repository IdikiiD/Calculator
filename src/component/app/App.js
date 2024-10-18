
import './App.css';
import  AppCalculator from "../calculator/calculator";
import {Component} from "react";
import AppScreen from "../screen/screen";
import AppButton from "../button/button";

class App extends Component{
  runningTotal = 0;
  previousOperator = null;


  constructor(props) {
    super(props);

    this.state = {
      buffer: "0",
      calculatorData: [

      ],

    }

  }

    handleButtonClick = (value) => {
        if (!isNaN(value)) {
            this.handleNumber(value);
        } else {
            this.handleSymbol(value);
        }
    };

    handleNumber = (number) => {
        this.setState((prevState)=>({
            buffer: prevState.buffer === "0" ? number : prevState.buffer + number
        }))

}


    handleSymbol= (symbol) => {
        // eslint-disable-next-line default-case
        switch (symbol) {
            case 'C':
                this.setState({ buffer: "0" });
                this.runningTotal = 0;
                this.previousOperator = null;
                break;
            case "=":
                if (this.previousOperator !== null) {
                    this.flushOperation(parseInt(this.state.buffer));
                    this.setState({ buffer: String(this.runningTotal) });
                    this.runningTotal = 0;
                    this.previousOperator = null;
                }
                break;
            case "←":
                this.setState((prevState) => ({
                    buffer: prevState.buffer.length > 1 ? prevState.buffer.slice(0, -1) : "0"
                }));
                break;

            case "−":
            case "×":
            case "÷":
            case "+":
               this.handleMath(symbol);
                break;
        }
    }

    handleMath = (symbol) => {
        const intBuffer = parseInt(this.state.buffer);
        if (this.runningTotal === 0) {
            this.runningTotal = intBuffer;
        } else {
            this.flushOperation(intBuffer);
        }
        this.previousOperator = symbol;
        this.setState({ buffer: "0" });
    };

    flushOperation = (intBuffer) => {
        if (this.previousOperator === '+') {
            this.runningTotal += intBuffer;
        } else if (this.previousOperator === '−') {
            this.runningTotal -= intBuffer;
        } else if (this.previousOperator === '×') {
            this.runningTotal *= intBuffer;
        } else if (this.previousOperator === '÷') {
            this.runningTotal /= intBuffer;
        }
    };



  render() {
    const {buffer} = this.state

    return(
        <div className="wrapper">

          <AppScreen buffer={buffer}/>
          <AppCalculator />
          <AppButton onClick={this.handleButtonClick}/>


        </div>
    )
  }

}



export default App;
