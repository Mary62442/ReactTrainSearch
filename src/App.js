import React, { Component } from 'react';
import './App.css';

class App extends Component {

  /* 
  https://www.lefrecce.it/msite/api/solutions?
  origin=[STAZIONEPARTENZA]&
  destination=[STAZIONEARRIVO]&
  arflag=[AR]&
  adate=[DATA]&
  atime=[ORA]&
  adultno=[ADULTI]&
  childno=[BAMBINI]&
  direction=[DIREZIONE]&
  frecce=[FRECCE]&
  onlyRegional=[REGIONALI]&
  rdate=[DATARITORNO]&
  rtime=[ORARITORNO]&
  codeList=[CODICE_CARTAFRECCIA]
  */
  constructor(props) {
    super(props);
    this.origin = "";
    this.destination = "";
    this.adate = "";
    this.atime = "";
    this.adultno = "";
    this.childno = "";
    this.direction = "";
    this.frecce = false;
    this.onlyRegional = false;
    this.rdate = "";
    this.rtime = "";
    this.codeList = "";
    this.state = {
      ar : "A",
      frecce : false,
      regional : false,
      direction : "A"
    }
  }

  componentDidMount() {
    console.log(this.refs.partenza.value)
  };

  handleAFlag = () => {
    this.setState({ar : "A"});
  };

  handleRFlag = () => {
    this.setState({ar : "R"});
  };

  handleFrecce = () => {
    this.setState({frecce:true, regional:false})
  };

  handleRegional = () => {
    this.setState({frecce:false, regional:true})
  }

  checkAFields = () => {
    return this.refs.partenza.value !== "" &&
    this.refs.arrivo.value !== "" &&
    this.refs.aData.value !== "" &&
    this.refs.aOra.value !== "" &&
    this.refs.adulti.value !== "" &&
    this.refs.bambini.value !== "";
  }

  checkRFields = () => {
    return this.refs.partenza.value !== "" &&
    this.refs.arrivo.value !== "" &&
    this.refs.aData.value !== "" &&
    this.refs.rOra.value !== "" &&
    this.refs.rData.value !== "" &&
    this.refs.aOra.value !== "" &&
    this.refs.adulti.value !== "" &&
    this.refs.bambini.value !== "";
  }

  assignVariablesA = () => {
    this.origin = this.refs.partenza.value;
    this.destination = this.refs.arrivo.value;
    this.adate = this.refs.aData.value;
    this.atime = this.refs.aOra.value;
    this.adultno = this.refs.adulti.value;
    this.childno = this.refs.bambini.value;

    return {
      origin :this.origin,
      destination : this.destination,
      arflag : this.state.ar,
      adate : this.adate,
      atime : this.atime,
      adultno : this.adultno,
      childno : this.childno,
      codeList : this.codeList,
      frecce : this.state.frecce,
      onlyRegional : this.state.regional,
      direction : this.state.direction
    }
  }

  assignVariablesR = () => {
    this.origin = this.refs.partenza.value;
    this.destination = this.refs.arrivo.value;
    this.adate = this.refs.aData.value;
    this.atime = this.refs.aOra.value;
    this.rdate = this.refs.rData.value;
    this.rtime = this.refs.rOra.value;
    this.adultno = this.refs.adulti.value;
    this.childno = this.refs.bambini.value ;

    return {
      origin :this.origin,
      destination : this.destination,
      arflag : this.state.ar,
      adate : this.adate,
      atime : this.atime,
      rdate : this.rdate,
      rtime : this.rtime,
      adultno : this.adultno,
      childno : this.childno,
      codeList : this.codeList,
      frecce : this.state.frecce,
      onlyRegional : this.state.regional,
      direction : this.state.direction
    }
  }


  searchTrains = () => {
    if (this.state.ar === "A") {
      if (!this.checkAFields()) {
        console.log('Invalid input');
        return;
      }
      console.log(this.assignVariablesA());
      return;
    }

    else {
      if (!this.checkRFields()) {
        console.log('Invalid input');
        return;
      }
      console.log(this.assignVariablesR());
      return;
    }
  }
  
  render() {
    return (
      <div className="app-container">

      <div className = "train-form">
          <div className = "ar-radio"> 
            <label htmlFor="andata">Solo andata</label>
            <input type="radio" id="andata" checked = {this.state.ar === "A"} onChange={this.handleAFlag} />
            <label htmlFor="ritorno">Andata e Ritorno</label>
            <input type="radio" id="ritorno" checked = {this.state.ar === "R"} onChange = {this.handleRFlag} />        
          </div>
          
          <div className = "stazioni">
            <label htmlFor = "partenza">Partenza</label>
            <input type="text" id="partenza" ref = "partenza"/>
            <br/>
            <label htmlFor = "arrivo">Arrivo</label>
            <input type="text" id="arrivo" ref = "arrivo"/>
          </div>
          
          <div className = "a-date-time">
            <label htmlFor = "aData" >Data andata</label>           
            <input type="text" id="aData" ref = "aData" placeholder = "DD/MM/YYYY"/>
            <label htmlFor = "aOra">Ora andata</label>
            <input id="aOra" ref = "aOra" type="number" min="0" max="23" defaultValue="10"/> 
          </div>
          
          <div className = "r-date-time" style={{display: this.state.ar === "R" ? 'block' : 'none' }}>
            <label htmlFor = "rData" >Data ritorno</label>
            <input type="text" id="rData" ref = "rData" placeholder = "DD/MM/YYYY"/>
            <label htmlFor = "rOra">Ora ritorno</label>
            <input id="rOra" ref = "rOra" type="number" min="0" max="23" defaultValue="10"/>
          </div>
          
          <div className = "adulti-bambini">
            <label htmlFor = "adulti">Adulti</label>
            <input type="number" id="adulti" ref = "adulti" min="0" max="5" defaultValue="1"/>
          
            <label htmlFor = "bambini">Bambini</label>
            <input type="number" id="bambini" ref = "bambini" min="0" max="5" defaultValue="0"/>
          
          </div>
          
          <div className = "frecce-regionali">
            <label htmlFor="frecce">Solo freccie</label>
            <input type="radio" id="frecce" checked = {this.state.frecce} onChange={this.handleFrecce}/>
            <label htmlFor="regionali">Solo Regionali</label>
            <input type="radio" id="regionali" checked = {this.state.regional} onChange={this.handleRegional}/> 
          </div>
          
          <div className = "option-cartafreccia">
            <label htmlFor ="cartafreccia">Codice cartafreccia (opzionale)</label>
            <input type ="text" id = "cartafreccia" ref = "cartafreccia"/>
          </div>
          
          <button onClick = {this.searchTrains} >Cerca treni</button>
          
        </div>
       
      </div>
    );
  }
}

export default App;
