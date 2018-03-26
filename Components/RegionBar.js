'use strict';


var React =require('react-native');

var {
	Component,
	Text,
	View,
	StyleSheet,
	Alert,
	ToastAndroid
} =React;


class Day extends Component{
	


	render(){
		return (

             <View style={[styles.view, this.props.pass? styles.day: null]}>
                 <Text style={styles.text}>{this.renderText()}</Text>
             </View>

			);
	}

	renderText(){
		if(this.props.hasEvent){
			return '-1';
		}
		else{
			return '';
		}
	}
}


class RegionBar  extends Component{

    constructor(props:{}){
    	super(props);

    	this.state ={
    		day:0,
    	}
    }


	render(){
          var texts =this.props.texts;
         
          
          var day =this.state.day;

          var dayNodes =texts.map((hasEvent)=>{
          	    if(day>0)
          	    {
          	    	day--;
          	        return <Day key={Math.random()} hasEvent={hasEvent} pass={true}/>

          	    }
          	    else{
          	    	return <Day key={Math.random()} hasEvent={hasEvent} />
          	    }
          });

          return (

                  <View  style={styles.container}>
                    {dayNodes}
                  </View>

          	);




	}


	pass(){

	    
           

		this.setState({
			day:this.state.day+1,
		});
        if(this.props.texts[this.state.day-1]){
		    global.daybar.pass();
		    if(global.elietianqi)
			{
				 global.daybar.pass();
			     ToastAndroid.show('恶劣天气起作用了',ToastAndroid.SHORT);
			     global.elietianqi =false;
			}
        }
		
	}
}


var styles =StyleSheet.create({
	view:{
		width: 12,
		height:12,
		borderRadius:15,
		backgroundColor:'yellow',
		justifyContent:'center',
		alignItems:'center',
		marginLeft:3,
		marginBottom:3

	},
	text:{
		textAlign:'center',
		fontSize:8,
		color:'gray'
	},
	container:{
		flexWrap:'wrap',
		flexDirection:"row",

	},
	day:{
		backgroundColor:'black'
	}
});


module.exports =RegionBar;