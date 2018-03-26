'use strict';


var React =require('react-native');

var {
	Component,
	Text,
	View,
	StyleSheet,
	Alert
} =React;


class Energy extends Component{
	


	render(){
		return (

             <View  style={[styles.view, this.props.pass? styles.day: null]}>
                 
             </View>

			);
	}

	
}


class EnergyBar  extends Component{

    constructor(props:{}){
    	super(props);

       if(this.props.ref2)
    	this.props.ref2(this);


    	

    	

    	this.state ={
    		num:0,
    		
    	}
    	
    }


	render(){

		  var nodes=[]; 

          for(var i=0;i<this.props.total;i++)
		  	 nodes.push(<Energy key={Math.random()} pass={i<=this.state.num-1}/>);
		  


		  var reverseStyle =this.props.reverse? {transform:[{rotateX:'180deg'}]} :{};
         
          return (

                  <View  style={[{flexDirection:this.props.direction},reverseStyle]}>
                    {nodes}
                  </View>

          	);




	}

	full(){
		return this.state.num==this.props.total;
	}

    num(){
    	return this.state.num;
    }

    total(){
    	return this.props.total;
    }

	getEnergy(num){

       var newNum=this.state.num+num;
		
		this.setState({
			num:newNum>this.props.total? this.props.total: newNum,
			
		});
		
	}
}


var styles =StyleSheet.create({
	view:{
		width: 30,
		height:30,
		borderRadius:15,
		backgroundColor:'lightblue',
		margin:5,

	},
	day:{
		backgroundColor:'green',
	}
	
});


module.exports =EnergyBar;