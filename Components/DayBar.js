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

             <View style={[styles.view, this.props.pass? styles.day: null, this.props.end? styles.end: null]}>
                 <Text style={styles.text}>{this.renderText()}</Text>
             </View>

			);
	}

	renderText(){
		if(this.props.hasEvent){
			return 'E';
		}
		else{
			return '';
		}
	}
}


class DayBar  extends Component{

    constructor(props:{}){
    	super(props);

    	this.props.ref2(this);

    	this.state ={
    		day:0,
    		end:15,
    	}
    }


	render(){
          var texts =[false,true,false,false,true,false,false,true,false,false,true,false,false,true,false,false,true,false,false,true,false,false];
          this.events =texts;
          
          var day =this.state.day;

          var dayNodes =texts.map((hasEvent,index)=>{
                
          	    if(day>0)
          	    {
          	    	day--;
          	        return <Day key={Math.random()} hasEvent={hasEvent} pass={true} end={ index >=this.state.end-1}/>

          	    }
          	    else{
          	    	return <Day key={Math.random()} hasEvent={hasEvent} end={ index >=this.state.end-1} />
          	    }
          });

          return (

                  <View  style={styles.container}>
                    {dayNodes}
                  </View>

          	);




	}


	pass(){


		if(this.state.day+1 >= this.state.end)
         {
         	Alert.alert(
			  '游戏结束!',
			  '世界末日来了，你输了，要重新开始游戏就重进程序。',
			  [			   
			    {text: 'OK',},
			  ]
			);
			return;
         }
        


		this.setState({
			day: this.state.day+1,
		});

		//遇到事件
		if(this.events[this.state.day-1])
        {

        	Alert.alert(
			  'Event!',
			  'You have occured an event, hope you good luck.',
			  [			   
			    {text: 'OK',},
			  ]
			);
            global.diceEvents();
        }


       //炎龙之麟起作用
       if(global.find(13).state==3){
          global.bloodbar.recoveryBlood(1);
          ToastAndroid.show('炎龙之麟起作用了',ToastAndroid.SHORT);
       }

	}

    removeEnd(num){
        var end =this.state+num;
        end =end>22? 22: end;

    	this.setState({
    		end:end,
    	});
    }


}


var styles =StyleSheet.create({
	view:{
		width: 15,
		height:15,
		borderRadius:15,
		backgroundColor:'yellow',
		marginLeft:5,
		marginBottom:5

	},
	text:{
		textAlign:'center',
		fontSize:10,
		color:'gray'
	},
	container:{
		flexWrap:'wrap',
		flexDirection:"row",

	},
	day:{
		backgroundColor:'black'
	},
	end:{
	    backgroundColor:'red'
	}
});


module.exports =DayBar;