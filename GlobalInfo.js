'use strict';


var React =require('react-native');

var BloodBar =require('./Components/BloodBar');
var DayBar =require('./Components/DayBar');

var EnergyBar =require('./Components/EnergyBar');



var {
	Component,
	Text,
	View,
	TouchableHighlight,
	StyleSheet,
	TouchableOpacity,
  Alert
} =React;







var AllThings =require('./Components/AllThings');

class GlobalInfo extends Component{


     render(){


     	return (
     		     <View style={{flex:1,backgroundColor:'gray'}}>
     		         <Text style={[styles.appname,{textShadowOffset: {width: 2, height: 2},textShadowRadius: 1, textShadowColor: '#00cccc',}]}>
     		               Utopia Engine
     		         </Text>

     		         <View style={styles.title}><Text style={styles.text}>血量</Text></View>
	                 <BloodBar count={6}  
	                   ref2={(_bloodbar)=>{bloodbar=_bloodbar;}}/>

	                 <View style={styles.title}><Text style={styles.text}>天数</Text></View>
	                 <DayBar ref2={(_daybar)=>{daybar =_daybar;}}/>


	                 <View style={styles.title}>
	                     <Text style={styles.text}>上帝之手</Text>
	                     <TouchableOpacity onPress={this.useHands.bind(this)}><View style={styles.button}><Text style={{fontSize:18}}>使用</Text></View></TouchableOpacity>
	                 </View>
	                 <EnergyBar ref2={(_energybar)=>{energybar =_energybar;}}  direction={'row'} total={6}/>
	                 <View style={[styles.title,{marginBottom:0,}]}>
	                      <Text style={styles.text}>我的装备<Text style={{fontSize:10}}>(滑动刷新)</Text></Text>
                          <TouchableOpacity onPress={this.seeThings.bind(this)}><View style={styles.button}><Text style={{fontSize:18}}>浏览</Text></View></TouchableOpacity>
	                 </View>
                     <AllThings/>
	             </View>

     		);
     }


     seeThings(){
     	global.drawer.closeDrawer();
     	global.navigator.push(
            {
            	index: 5,
            	title:'我的工作室'
            }

        );
     }

     useHands(){
         var num =Math.floor(global.energybar.num()/3);

         if(num==0){
            Alert.alert('上帝之手',
              '每三点上帝之手推迟世界末日一天。\n'+'您的上帝之手不足！',
            [      
              {text: 'OK'},
            ]);
           }
         else if(num==1){
              Alert.alert('上帝之手',
              '每三点上帝之手推迟世界末日一天。\n'+'您可推迟一天',
            [      
              {text: '推迟一天',onPress:()=>{
                   global.energybar.getEnergy(-3);
                   global.daybar.removeEnd(1);
              }},
              {text: '算了'},
            ]);
          }
         
         else{
                  Alert.alert('上帝之手',
                    '每三点上帝之手推迟世界末日一天。\n'+'您最多可推迟两天',
                  [      
                    {text: '推迟一天',onPress:()=>{
                         global.energybar.getEnergy(-3);
                         global.daybar.removeEnd(1);
                    }},
                    {text: '推迟两天',onPress:()=>{
                         global.energybar.getEnergy(-6);
                         global.daybar.removeEnd(2);
                    }},
                    {text: '算了'},
                  ]);

         }




     }


}

var styles = StyleSheet.create({
	title:{
		marginTop:10,
		marginBottom: 10,
		backgroundColor: 'darkgray',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
	text:{
		fontSize: 20,
	},
	button:
	{
		backgroundColor:'#88fadc',
		borderRadius:5,
		marginRight:5,
		width:100,
		justifyContent:'center',
		alignItems:'center'
	},
	appname:
	{
		fontStyle:'italic',
		fontSize:30,
		marginLeft:15,
		fontWeight:'500',
		
	}
});




module.exports =GlobalInfo;