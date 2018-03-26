
'use strict';
var React =require('react-native');

var {
	Component,
	Text,
	View,
	StyleSheet,
	Alert,
	TouchableOpacity,
  TouchableHighlight,
  Image
} =React;








class Event extends Component{

   constructor(props:{}){
        super(props);


       
       
     
   }

  



  




	render(){


        var event =global.events[this.props.index];

        var mini =this.props.mini;
        var marginTop =5;
        if(mini)
            marginTop=0;

		return (
                <TouchableOpacity onPress={this.alert.bind(this)}>
                 <View>
                 <Image style={{width:this.props.dimension.width,height:this.props.dimension.height,borderRadius:30,marginTop:marginTop}} 
                    source={event.img}>	

	                </Image>
                 </View>
                 </TouchableOpacity>
			);
	}



    alert(){
        var event =global.events[this.props.index];
         Alert.alert(event.name,
         event.description,
          [        
            {text: 'OK'},
          ]);
    }
}


class EventBox extends Component{

        constructor(props){
            super(props);

            
          
        }

     

       




        render(){

            var events =global.regions[this.props.index].events;
             
            var dimension ={width:30,height:30};

            var height =80;
            var mini =false;
            if(this.props.toolbar){
                height= 60;
                mini =true;
            }else{
                dimension =events.length==1? {width:60,height:60}: {width:30,height:30} ;
            }

               

            var nodes =events.map((index)=>{
                return <Event dimension={dimension} index={index} mini={mini}/>

            });

           
           return(  <View style={{flexDirection:'row',flexWrap:'wrap',width:75,height:height,backgroundColor:'transparent',justifyContent:'space-around',alignItems:'center'}}>
                 
                 {nodes}
             </View>
             );

        }






}


var times =0,times1=0;
module.exports = EventBox;