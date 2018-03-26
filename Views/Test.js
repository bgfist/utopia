var React =require('react-native');

var {
	Component,
	Text,
	View,
	StyleSheet,
	Alert,
	TouchableOpacity
} =React;



var Test =React.createClass({
	


	render:function(){


	     var nodes =[1,2,3,4,5].map((row,index)=>{

	              return (

                      <Text>{row}-{index}</Text>
	              );
	     });
        return (


           <View>
              {nodes}
           </View>

        );
	},
});


module.exports =Test;