class MemorySpel extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        memory_bilder: ['ninja','dator','trollkarl','mobil','bil','playstation'],
        duplicera_bilder: [],
        slumpa_bilder: [],
        finalisera_bilder: [],
        oppnade_bilder: []
      }
      this.start()
    }
    handleClick(name,index){
      if(this.state.oppnade_bilder.length == 2){
        setTimeout(() => {
          this.check()
        },750)
      }else {
        let memory_bilder = {
          name,
          index
        }
        let finalisera_bilder = this.state.finalisera_bilder
        let memory_bilder = this.state.oppnade_bilder
        finalisera_bilder[index].close = false
        memory_bilder.push(memory_bilder)
        this.setState({
          oppnade_bilder: memory_bilder,
          finalisera_bilder: finalisera_bilder
        })
        if(this.state.oppnade_bilder.length == 2){
          setTimeout(() => {
            this.check()
          },750)
        }
      }
    } 
    check(){
      let finalisera_bilder = this.state.finalisera_bilder
      if((this.state.oppnade_bilder[0].name == this.state.oppnade_bilder[1].name) && (this.state.oppnade_bilder[0].index != this.state.oppnade_bilder[1].index)){
        finalisera_bilder[this.state.oppnade_bilder[0].index].complete = true
        finalisera_bilder[this.state.oppnade_bilder[1].index].complete = true
      }else {
        finalisera_bilder[this.state.oppnade_bilder[0].index].close = true
        finalisera_bilder[this.state.oppnade_bilder[1].index].close = true
      }
      this.setState({
        finalisera_bilder,
        oppnade_bilder: []
      })
    }
    start(){
      let finalisera_bilder = [];
      this.state.duplicera_bilder = this.state.memory_bilder.concat(this.state.memory_bilder)
      this.state.slumpa_bilder = this.shuffle(this.state.duplicera_bilder)
      this.state.slumpa_bilder.map((name,index) => {
        finalisera_bilder.push({
          name,
          close: true,
          complete: false,
          fail: false
        })
      })
      this.state.finalisera_bilder = finalisera_bilder
    }
    shuffle(array){
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array
    }
    render(){
      
      return (
        <div className="MemorySpel">
            {
              this.state.finalisera_bilder.map((memory_bilder, index) => {
                return <kort memory_bilder={memory_bilder.name} click={() => {this.handleClick(memory_bilder.name,index)}} close={memory_bilder.close} complete={memory_bilder.complete}/>
              })
            }
        </div>
      )
    }
}

class Kort extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
      
      }
    }
  clicked(memory_bilder){
    this.props.click(memory_bilder)
  }
  render(){
    return (
      <div className={"kort" + (!this.props.close ? ' oppnad' : '') + (this.props.complete ? ' matchning' : '')} onClick={() => this.clicked(this.props.memory_bilder)}>
        <div className="framsida">
          ?
        </div>
        <div className="baksida">
          <img src={"henry/index/memory-images/" + this.props.memory_bilder + ".png"}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render( <MemorySpel/>, document.getElementById('app'))