'use strict';


var React =require('react-native');

var {
	Component,
	View,
	Text,
	StyleSheet,
	Switch,
	TouchableOpacity,
	ToastAndroid,
	Alert
}=React;

var Dice =require('../Components/Dice');
var rules =[
   {name:'Rogue Thief', atk: [1,2], hit:[5,6]},
   {name:'Rogue Thief', atk: [1,2], hit:[5,6]},
   {name:'Rogue Thief', atk: [1,2], hit:[5,6]},
   {name:'Rogue Thief', atk: [1,2], hit:[5,6]},
   {name:'Rogue Thief', atk: [1,2], hit:[5,6]},
];


var weekAtk =function(arr){
    

     arr[1] =arr[1]-1 <1? 1: arr[1]-1;

}


var strongHit =function(arr){
     arr[0] -=1;
}



function clone(obj) {  
    var o;  
    if (typeof obj == "object") {  
        if (obj === null) {  
            o = null;  
        } else {  
            if (obj instanceof Array) {  
                o = [];  
                for (var i = 0, len = obj.length; i < len; i++) {  
                    o.push(clone(obj[i]));  
                }  
            } else {  
                o = {};  
                for (var j in obj) {  
                    o[j] = clone(obj[j]);  
                }  
            }  
        }  
    } else {  
        o = obj;  
    }  
    return o;  
}  
 


class Battle extends Component{

       constructor(props:{}){
           super(props);

           this.total1 =0;
           this.total2 =0;
           this.diaobao =false;

        
          

           var result =this.props.passProps.result;

           var level =this.level =global.getLevelByResult(result);


           //活跃的怪物起作用了
           if(global.hasEvent(global.regions[global.regionIndex].events,1)){
                ToastAndroid.show('活跃的怪物起作用了',ToastAndroid.SHORT);
                level =this.level =(level+2)>5? 5: level+2;
           }

          

           this.monsterInfo =clone(global.regions[global.regionIndex].battleTable.filter((info)=>info.level==level)[0]);
           
            //冰盘起作用了
           if(global.find(11).state==3){
                ToastAndroid.show('冰盘起作用了',ToastAndroid.SHORT);
                weekAtk(this.monsterInfo.atk);
                
           }

            //熔岩碎片起作用了
           if(global.find(14).state==3){
                ToastAndroid.show('熔岩碎片起作用了',ToastAndroid.SHORT);
                strongHit(this.monsterInfo.hit);
                
           }
           
       }



       componentWillUnmount(){
            this.stopFunctions2();
            this.stopFunctions();
       }


       componentDidMount(){

       }



       triggerFunctions2(){
              
              global.find(1).require = true;
              global.find(1).func = this.func.bind(this);
       }

       func(){
            this.dice1.plusone();
            this.dice2.plusone();
       }

       stopFunctions2(){
            global.find(1).require= false;
       }

      render(){


              return (

                   <View>

                         <View style={styles.title}>
                              <Text style={{fontSize:40,fontStyle:'italic'}}>对战 {this.monsterInfo.monster}</Text>                                  
	                     </View>

                         <View style={styles.info}>
                            <Text>怪物等级:{this.level}</Text>
                            <Text>类型:{this.monsterInfo.spirit?'灵能':'普通'}</Text>
                            <Text>攻击力: {this.monsterInfo.atk[0]}-{this.monsterInfo.atk[1]}</Text>
                            <Text>生命值: {this.monsterInfo.hit[0]==this.monsterInfo.hit[1]? this.monsterInfo.hit[0]: this.monsterInfo.hit[0]+'-'+this.monsterInfo.hit[1]}</Text>
                         </View>

	                     <View style={styles.h}>
                             <Text>战斗之骰</Text>
                         </View>
	              	     <View style={styles.dice}>
				                <Dice ref2={(dice)=>{this.dice1 =dice;}} />
				                <Dice ref2={(dice)=>{this.dice2 =dice;}} />
				                <TouchableOpacity onPress={this._onPressButton2.bind(this)} >
				                   <View style={styles.text}><Text style={{fontSize:15}}>掷骰子</Text></View>
				                </TouchableOpacity>
                        </View>


                        <View style={styles.h}>
                             <Text>运气之骰</Text>
                         </View>


	                     <View style={styles.dice}>
				                <Dice ref2={(dice)=>{this.dice3 =dice;}} />				                
				                <TouchableOpacity onPress={this._onPressButton.bind(this)} >
				                   <View style={styles.text}><Text style={{fontSize:15}}>掷骰子</Text></View>
				                </TouchableOpacity>

                        </View>
                       
                   </View>


              	);


      }


        _onPressButton2(){
     	 
     	  if(this.total1==1)
     	  {
            ToastAndroid.show('你已经试过了', ToastAndroid.SHORT);
     	  	return;
     	  }
          this.dice1.roll();
          this.dice2.roll();

         
          //黄金罗盘起作用
            if(this.monsterInfo.spirit){
               
               this.triggerFunctions2();
            }

          this.total1++;


          this.triggerFunctions();



          this.judgeResult();

     
     }


      triggerFunctions(){
         
            if(global.find(8).state==3)
            	this.pendExecute=true;
            global.find(8).require=true;
            global.find(8).func =this.betterResult.bind(this);
               

      }





      stopFunctions(){
           global.find(8).require=false;
      }


      betterResult(){

            	this.dice1.plustwo();
              this.dice2.plustwo();
              //  this.dice1.roll();
            	this.pendExecute =false;
            	if(this.excuted){
		               return;
                }
                 clearTimeout(this.clock);
		            	this.judgeResult();
          
      }

     judgeResult(){

     	     //处理战斗结果
          var hit=this.hit=false;
          var atk =this.atk=false;
          var value1 =this.dice1.state.value;
          var value2 =this.dice2.state.value;
          var atkarr   =this.monsterInfo.atk;
          var hitarr   =this.monsterInfo.hit;
          if( global.testIn(value1,atkarr) ||  global.testIn(value2,atkarr))
          	   atk =this.atk =true;
          if( global.testIn(value1,hitarr) ||  global.testIn(value2,hitarr))
          	   hit=this.hit =true;

          if(!this.pendExecute){
             this.executeResult();
            
          }
          else{          	 
          	 this.clock =setTimeout(this.executeResult.bind(this),8000);
          	 ToastAndroid.show('战斗预判(尚未执行,你有8秒的时间考虑是否使用道具)：受伤：'+atk+'  杀死怪物可掉宝：'+hit, ToastAndroid.SHORT);
          }
        
     }


     executeResult(){

     	   this.excuted =true;
            if(this.atk){
          	//处理被怪物击中
          	   global.bloodbar.dropBlood(1);
          }

          if(this.hit){
          	//处理杀死了怪物,掉宝
          	  
          	  this.diaobao =true;
          	   
          }

           this.stopFunctions();

           ToastAndroid.show('战斗结果：受伤：'+this.atk+'  杀死怪物可掉宝：'+this.hit, ToastAndroid.SHORT);

     }

        _onPressButton(){

        	if(!this.diaobao)
     	        return;
     	  if(this.total2==1)
     	  {
            ToastAndroid.show('你已经试过了', ToastAndroid.SHORT);
     	  	return;
     	  }
          this.dice3.roll();
        
          this.total2++;

          if(this.dice3.state.value >=this.level){
          	  Alert.alert('。。。','很遗憾，您没有获得宝物。',[{text:'OK'}]);
              return;
          }

          //处理掉包结果
          if(this.level==5){
              if(global.hasMysteriousThing){
                Alert.alert('很遗憾！','你已有了传奇物品，不能再掉一个',[{text:'OK'}]);
                return;
              }

              var thing =global.find(global.diceMysteriousThing());
              thing.state =3;
              Alert.alert('获得传奇物品！',thing.name,[{text:'OK'}]);
                global.hasMysteriousThing =true;
              return;
          }

           this.getATool();

        
     }


      getATool(){

            var component ={
                cart:3,
                name:global.regions[global.regionIndex].componentName,
                state:3,
                period:4,
                img: require('../Images/daoju.png'),
                description: '道具可用来链接神之零件。'
            };
            global.add(component);

            Alert.alert('获得道具','你已获得'+global.regions[global.regionIndex].componentName+'\n链接就靠它了。',


               [{text:'OK'}]
                );

      }


}

var  styles =StyleSheet.create({
	two:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		padding:10
	},
	one:{
		alignItems:'center',

	},
	dice:{
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
        paddingTop:5,
		backgroundColor:'white',
		marginTop:10
	},
	title:{
		justifyContent:'center',
		marginVertical:10,
		flexDirection:'row'
	},
	h:{
		marginVertical:5
	}
	,
	info:{
		marginTop:5,
		marginBottom:10,
		justifyContent: 'space-around',
		flexDirection:'row',


	},
	text:{
		backgroundColor:'lightblue',
		borderRadius:5,
		borderColor: 'blue',
		borderWidth:5,
		
	},
});
    
module.exports =Battle;