'use strict';

// //==============================================================================
// //normal js stuff
//
// const chkConnect = document.getElementById('chkConnect');
// const txtSend = document.getElementById('txtSend');
// const btnSend = document.getElementById('btnSend');
// const btnSendJSON = document.getElementById('btnSendJSON');
//
// const testJSON = [{name:"James",age:23,likesCherries:true},{name:"Barney",age:50,likesCherries:false}];
//
// //==============================================================================
// //websocket stuff
//
// const socket = io('http://localhost:4200');
//
// socket.on('connect', function(data) {
//   console.log("connected to server");
//   txtSend.removeAttribute("disabled", "");
//   btnSend.removeAttribute("disabled", "");
//   btnSendJSON.removeAttribute("disabled", "");
// });
//
// socket.on('disconnect', function(data) {
//   console.log("disconnected from server");
//   txtSend.setAttribute("disabled", "");
//   btnSend.setAttribute("disabled", "");
//   btnSendJSON.setAttribute("disabled", "");
// });
//
// socket.on('msg', function(data) {
//   console.log("received message: " + data);
// });
//
// socket.on('json', function(data) {
//   console.log("received object:\n" + JSON.stringify(data));
// });
//
// function toggleConnection() {
//   if (chkConnect.checked){
//     socket.open();
//   }
//   else{
//     socket.close();
//   }
// }
//
// function sendMessage(){
//   if (txtSend.value) {
//     socket.emit('msg', txtSend.value);
//   }
//   txtSend.value = '';
// }
//
// function sendJSON(){
//   socket.emit('json', testJSON);
// }

//==============================================================================
//react stuff

const exampleObject = [{pk: 1, name:"James", age:23, grapes:true},
                       {pk: 2, name:"Nathan", age:24, grapes:false},
                       {pk: 4, name:"Edie", age:22, grapes:true}];

function PureTable(props){
  let headerNames = Object.keys(props.grid[0]);
  let grid = props.grid.map(x => Object.values(x));

  return(
    <table className="table">
      <PureHead headerNames={headerNames}/>
      <PureBody grid={grid}/>
    </table>
  );
}

function PureHead(props){
  return(
    <thead className="thead-dark">
      <PureRow row={props.headerNames} isHeader={true}/>
    </thead>
  );
}

function PureBody(props){
  //make rows
  let rows = [];
  for (let i = 0; i < props.grid.length; i++){
    rows.push(<PureRow key={i} row={props.grid[i]} isHeader={false}/>);
  }

  return(
    <tbody>{rows}</tbody>
  );
}

function PureRow(props){
  //make cells
  let cells = [];
  for (let i = 0; i < props.row.length; i++){
    if (props.isHeader){
      cells.push(<PureHeader key={i} headerName={props.row[i]}/>);
    }
    else{
      cells.push(<PureCell key={i} cellValue={props.row[i]}/>);
    }
  }

  return(<tr>{cells}</tr>);
}

function PureHeader(props){
  return(<th scope="col">{props.headerName.toString()}</th>);
}

function PureCell(props){
  return(<td contentEditable suppressContentEditableWarning>{props.cellValue.toString()}</td>);
}

function App(props){
  return(
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-4">
          <PureTable grid={exampleObject}/>
        </div>
      </div>
    </div>
  );
}

//render the above app in the react entry point in the html file
var domContainer = document.querySelector('#newworld_entry');
ReactDOM.render(<App/>, domContainer);
