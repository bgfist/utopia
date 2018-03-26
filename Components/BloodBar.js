'use strict';


var React =require('react-native');

var {
	Component,
	View,
	StyleSheet,
	Image,
  Alert

} =React;

class Blood extends Component{

      constructor(props: {}) {
          super(props);

          
      }


      render(){
      	  var source = this.props.id <= this.props.current? require('../Images/blood.png'): require('../Images/noblood.png');
      	 return (
      	 	<View  style={styles.style}>
      	 	    <Image  source={source} />
            </View>
      	 	);
      }
}


var styles =StyleSheet.create({
   
   style:{
   	   width: 20,
   	   height: 30,
   	   marginLeft: 5,
       
   },
   
   bloodbar:{
   	   flexDirection:'row',
   	   alignItems: 'center',
   	   justifyContent:'flex-start',

   	   height: 30,
   	   backgroundColor: 'white'

   }

});



class  BloodBar extends Component{
	constructor(props:{}){
		super(props);


        this.props.ref2(this);

        this.state ={
        	current: 6,
        };
	}



	dropBlood(num){
         this.state.current-=num;
         this.setState({
         	current: this.state.current,
         });

         if(this.state.current==0){
           //昏迷
            Alert.alert('你已进入昏迷状态','你必须连续休息以将生命值补满',[{text:'OK'}]);
            while(this.state.current!=6){
              global.relax();             
            }
            return;
          }

        if(this.state.current<0){
              global.fail();
              Alert.alert('你死了','游戏结束',[{text:'重新开始'}]);
        }
           
	}


  dropToZero(){
       this.state.current =0;
       this.setState({});
  }


	recoveryBlood(num){
		this.state.current+=num;
    this.state.current = this.state.current>6? 6: this.state.current;
		 this.setState({
         	current: this.state.current,
         });
	}

	render(){
         var  count = this.props.count;
         var  current =this.state.current;
         var id =1;

         var bloodNodes =Array();

         while(count>0){
         	count--;
            bloodNodes.push(<Blood key={id} id={id++} current={current}/>);
         }

         return(
              <View style={styles.bloodbar}>
                 { bloodNodes }
              </View>


         	);




	}

}


module.exports =BloodBar;

