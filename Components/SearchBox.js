'use strict';

var React =require('react-native');

var {
	Component,
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	ListView,
  Animated
} =React;









class SearchBox extends Component{


       constructor(props:{}){
       	  super(props);


          this.state={
             bounceValue: [new Animated.Value(1),new Animated.Value(1),new Animated.Value(1),new Animated.Value(1),new Animated.Value(1),new Animated.Value(1),new Animated.Value(1),new Animated.Value(1)]
          };
         
       }





       render(){   

          var rows =this.props.rows;
          var cols =this.props.cols;
          var count =rows*cols;
          var nodes =[];

          for(var i=0;i<count;i++){
             nodes.push(this.renderCell(i));
            
          }    	  
       	   

       	   return (
               <View style={[styles.searchbox,{width:50*this.props.cols+10}]}>
                  {nodes}
               </View>

       	   	);
       }


       renderCell(id){
           return (
              
                <Animated.View  key={id} style={[styles.cell,{ transform: [{scale: this.state.bounceValue[id]}]}]} 
                  onTouchStart={() => 
                    {
                      this.changeStyle(id);
                      this.props.changeData(id);

                    }
                  }>
                 <Text style={styles.text}>{this.props.data[id]==null? '?': this.props.data[id] }</Text>
               </Animated.View>
              
            );
       }


       changeStyle(id){

         this.state.bounceValue[id].setValue(1.2);     // Start large
          Animated.spring(                          // Base: spring, decay, timing
            this.state.bounceValue[id],                 // Animate `bounceValue`
            {
              toValue: 1,                         // Animate to smaller size
              friction: 1,                          // Bouncier spring
            }
          ).start(); 

       }

       







}



var styles =StyleSheet.create({
	cell:{
		backgroundColor:'white',
		width:50,
		height:50,
		borderWidth:1,
		justifyContent:'center',
		borderColor:'gray'
	},
	searchbox:{
		flexDirection:'row',
		flexWrap:'wrap',      
		backgroundColor:'lightgreen',		
		justifyContent:'center',
		alignItems:'center'
	},
	text:{
		textAlign:'center',
    fontSize: 15,
    fontWeight:'500',
		color:'green',
	}
});





module.exports =SearchBox;