
//Root or main component.
class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption=this.handleAddOption.bind(this)
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this)
        this.handleDeleteOption=this.handleDeleteOption.bind(this)
        this.state = {
            options : []
        }
    }
    componentDidMount(){
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
        if(options){
            this.setState(()=>({
                options 
            }))
        }
        }catch(e){
            //do nothing if valid inputs.
        }
    }
    //order of the attributes important.
    componentDidUpdate(prevProps,prevState ) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }
    //as props dont flow upstream , we forma  func and make the child call it when needed.
    handleDeleteOptions() {
        this.setState(()=>( 
            { options: [] } 
            ))}
    handleDeleteOption(input) {
        this.setState((prevState)=>({
            options: prevState.options.filter(e => e !== input)
        }))
    }
    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomNum])
    }
    handleAddOption(input){
        this.setState((prevState)=>{
            return {
                options: prevState.options.concat(input)
            }
        })
    }
    render(){
        const title = 'Indecision App'
        return (
            <div>
            <Header title={title} />
            <Action 
            hasOptions={this.state.options.length>0}
            handlePick = {this.handlePick}
            />
            <Options 
            option={this.state.options}
            handleDeleteOption = {this.handleDeleteOption} 
            handleDeleteOptions = {this.handleDeleteOptions}
            />
            <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

//stateless functional components
const Header = (props)=>{
    return (
                    <div>
                    <h1>{props.title}</h1>
                    <h4>put your life in the hands of a computer</h4>
                    </div>
                );
}
const Action = (props)=>{
    return (
                    <div>
                    <button onClick={props.handlePick} disabled={!props.hasOptions}>What do I do?</button>
                    </div>
                );
}
const Option =(props) => {
    return (
                    <div>
                    <li>{props.optionText}&nbsp;&nbsp;
                        <button 
                        onClick={()=>{props.handleDeleteOption(props.optionText)}}
                        >
                            Remove
                        </button>
                    </li>
                    </div>
                    );
}

//this bind magangement using the constructor and bind method.
const Options =(props)=> {
        return (
            <div>
            <button onClick={props.handleDeleteOptions}>Remove all</button>
            <ol>
            {
                props.option.map(e=>(
                    <Option 
                    key={e} 
                    optionText={e} 
                    handleDeleteOption={props.handleDeleteOption}
                    />
                    ))
            }
            </ol>
            </div>
        );
    }


class AddOption extends React.Component {
    constructor(props){
        super(props)
        this.addOption = this.addOption.bind(this)
    }
    addOption(e){
        e.preventDefault();
        const input = e.target.elements.inputBox.value.trim();
        if(input){
            this.props.handleAddOption(input)
            e.target.elements.inputBox.value='';
        }
    }
    render(){
        return (
            <form onSubmit={this.addOption}>
            <input type='text' name='inputBox'></input>
            <button>Add Option</button>
            </form>
            );
    }
}
    
ReactDOM.render(<IndecisionApp/>,document.getElementById('app'))