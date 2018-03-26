'use strict';


var React =require('react-native');


var {
	Component,
	View,
	Image,
	StyleSheet,
	Animated,
	TouchableWithoutFeedback
} =React;


 var sources =[require('../Images/dice1.png'),require('../Images/dice2.png'),require('../Images/dice3.png'),require('../Images/dice4.png'),require('../Images/dice5.png'),require('../Images/dice6.png')];
   

class Dice extends Component{


 

 constructor(props: {}) {
    super(props);

    if(this.props.ref2)
       this.props.ref2(this);

    this.state = {
      value: 0,
      source: require('../Images/dice.png'),
      opacity: new Animated.Value(1),
    };

    


  }
     

  render(){


        return (
          
        	<TouchableWithoutFeedback onPress={this.roll.bind(this)}>
        	<View  style={styles.dice}> 
        	 <Animated.Image                         // Base: Image, Text, View
			        source={this.state.source}
			        style={{			          
			          opacity: this.state.opacity,
                borderRadius:10,
			        }}
                    
			       
               />
              </View>
             </TouchableWithoutFeedback>
           
        	);
   }

  
   

   roll(){
     
    var value =Math.ceil(Math.random()*6);
   
     this.setState({
     	value:value,
     	source:sources[value-1],
     	opacity: new Animated.Value(0.2)
     }); 
    Animated.timing(                          // Base: spring, decay, timing
      this.state.opacity,                 // Animate `bounceValue`
      {
        toValue: 1,                         // Animate to smaller size
        duration: 1000,                          // Bouncier spring
      }
    ).start(); 
                                   // Start the animation
  }


  plustwo(){



      var value =this.state.value+2;
      value =value >6 ? 6 :value;
    this.setState({
         value: value,
         source: sources[value-1]
    });
  }

  plusone(){



      var value =this.state.value+1;
      value =value >6 ? 6 :value;
    this.setState({
         value: value,
         source: sources[value-1]
    });
  }


 





}


var styles =StyleSheet.create({
      
     dice:{
     	width:90,
     	height:90,

       
     }


	});

module.exports =Dice;