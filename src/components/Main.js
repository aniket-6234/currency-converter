
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';

function Main() {

// Initializing all the state variables
const [info, setInfo] = useState([]);
const [input, setInput] = useState(0);
const [from, setFrom] = useState("usd");
const [to, setTo] = useState("inr");
const [options, setOptions] = useState([]);
const [output, setOutput] = useState(0);

// Calling the api whenever the dependency changes
useEffect(() => {
	Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
.then((res) => {
	setInfo(res.data[from]);
	})
}, [from]);

// Calling the convert function whenever
// a user switches the currency
useEffect(() => {
	setOptions(Object.keys(info));
	convert();
}, [info])
	
// Function to convert the currency
function convert() {
	var rate = info[to];
	setOutput(input * rate);
}

// Function to switch between two currency
function flip() {
	var temp = from;
	setFrom(to);
	setTo(temp);
}

return (
	
	   <div>

	    	<h2 className="amount-head">Enter Amount :</h2>

        <div className="box">

          <div className="input">
          <input type="number"
              className="input-value"
              onChange={(e) => setInput(e.target.value)} 
              autofocus/>
        
            <div className="line-2"></div>
          </div>

          <div className="from-to">
              <div className="convert-from">
                  <h3>From</h3>
                  <Dropdown options={options}
                        className="convert"
                        onChange={(e) => { setFrom(e.value) }}
                  value={from} placeholder="From" />
              </div>
   
              <div className="responsive-switch">
                  <div className="switch">
                    <HiSwitchHorizontal size="30px"
                            onClick={() => { flip()}}/>
                  </div>
              </div>

              <div className="convert-from">
                  <h3>To</h3>
                  <Dropdown options={options}
                  className="convert"
                        onChange={(e) => {setTo(e.value)}}
                  value={to} placeholder="To" />
              </div>
          </div>

        </div>
        

        <div className="btn-convert">
          <button className="btn" onClick={()=>{convert()}}>Convert</button>
        </div>
        <div>
          <h3 className="converted-amount">Converted Amount :</h3>
        </div>

        <div>
          <p className="final-result">{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
        </div>  
          
        </div>
        
);
}

export default Main;

