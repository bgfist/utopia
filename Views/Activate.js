'use strict';

var React =require('react-native');
var TouchableBounce =require('TouchableBounce');
var {
	Text,
	TouchableHighlight,
	ToastAndroid,
	View,
	StyleSheet,
    TouchableOpacity,
    Alert
	

}=React;


var Dice =require('../Components/Dice');
var SearchBox =require('../Components/SearchBox');
var EnergyBar =require('../Components/EnergyBar');



var num =0,before=0;

class Activate extends React.Component{
    dice1:any;
    dice2:any;
    total:number;
   

   
    hasFilledUp:boolean;
    hasFilledBottom:boolean;
    isFirst:boolean;

    hasNoChance:boolean;



	 constructor(props:{}){
        super(props);

        this.dice1 =null;
        this.dice2 =null;
        this.hasNoChance=false;
        this.total =0;

        global.commonArgs.scene =this;
        
        this.hasFilledUp=true;
        this.hasFilledBottom=true;


        //转瞬即逝的幻象是否起作用
        var energynum =4;
        if(global.hasEvent(global.regions[global.find(this.props.passProps.id).regionId].events,2))
         {

                ToastAndroid.show('转瞬即逝的幻象起作用了',ToastAndroid.SHORT);
                energynum -=1;

         }
        this.state={            
        	data: [],
        	result:[],
        	activate:false,
          energynum:energynum        	
        }
	 }

      render(){

      	
      	return (
      		<View style={{flex:1}}>          

             

             <View style={styles.dice}>
                <Dice ref2={(dice)=>{this.dice1 =dice;}} />
                <Dice ref2={(dice)=>{this.dice2 =dice;}} />
                <TouchableOpacity onPress={this._onPressButton2.bind(this)} >
                   <View style={styles.text}><Text style={{fontSize:15}}>掷骰子</Text></View>
                </TouchableOpacity>

             </View>


             <Text style={{alignSelf:'center',marginVertical:10,color:this.state.activate?'green':'red'}}>状态: {this.state.activate? '已激活':'未激活'}</Text>

             <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'flex-end'}}>
	             <View  style={styles.panel}>
	                <SearchBox rows={2} cols={4}  data={this.state.data} changeData={this._changeData.bind(this)} />
	                <SearchBox rows={1} cols={4}  data={this.state.result} changeData={()=>{}}/>                
	             </View>
	             <EnergyBar ref2={(energybar)=>global.commonArgs.energybar=energybar} reverse={true} ref={'energybar'} direction={'column'} total={this.state.energynum}/>
	          </View>
            

           
            <TouchableOpacity  onPress={this.restart.bind(this)}>
             <View style={styles.restart}>
               <Text style={{fontSize:20}}>继续激活</Text>
             </View>
           </TouchableOpacity>
           

           
        


	        </View>

     		);
     }


    

   

    
     _onPressButton2(){
     	  if(!(this.hasFilledUp &&this.hasFilledBottom))
     	  {
     	  	ToastAndroid.show('You must use all the values you diced before.', ToastAndroid.SHORT);
     	  	return;
     	  }
     	 
          this.dice1.roll();
          this.dice2.roll();
          this.total++;
          this.isFirst =true;
           //下面是成功掷出了骰子后
     	 this.hasFilledUp =false;
     	 this.hasFilledBottom =false;
     }

     _changeData(id){

     	 if(this.state.data[id])
     	 {
     	    ToastAndroid.show('You have filled this cell.', ToastAndroid.SHORT);
     	  	return;	
     	 }
     	 if(this.total==0){
     	 	 ToastAndroid.show('You haven\'t diced.', ToastAndroid.SHORT);
     	  	 return;
     	 }    	

     	 if(id>3)
     	 {
     	 	if(this.hasFilledBottom)
     	 	{
     	 		ToastAndroid.show('You have filled Lower Cell.', ToastAndroid.SHORT);
     	  	    return;
     	 	}
     	 	this.hasFilledBottom =true;

     	 }
     	 else{
     	 	if(this.hasFilledUp)
     	 	{
     	 		ToastAndroid.show('You have filled Upper Cell.', ToastAndroid.SHORT);
     	  	    return;
     	 	}
     	 	this.hasFilledUp =true;
     	 }
     	 
          
          if(this.isFirst){
             this.state.data[id] =this.dice1.state.value;
             this.isFirst =false;
          }
          else{
          	  this.state.data[id] =this.dice2.state.value;
          }

          this.renderResult(id);

          
          
         
          this.setState({
          	 data:this.state.data,
          	 result:this.state.result,

          });
     }


     renderResult(id){
     	var temp;
     	if(id>3)
     	{
     		temp =id-4;
     		if(this.state.data[id]&&this.state.data[temp])
     			this.processResult(this.state.data[temp]-this.state.data[id],temp,id);
     	}
     	else{
     		temp =id+4;
     		if(this.state.data[id]&&this.state.data[temp])
     			this.processResult(this.state.data[id]-this.state.data[temp],id,temp);
     	}

      }


      processResult(result,lower,higher){
      	 if(result==3){
             this.state.result[lower] ='|';
             this.addEnergy(1);
            
      	 }else if(result==4){
          	 	this.state.result[lower] ='||';
          	 	this.addEnergy(2);
              
      	 }else if(result==0){
          	 	this.state.data[lower]=null;
          	 	this.state.data[higher]=null;
      	 }else if(result<0){
          	 	this.state.result[lower] ='X';
          	 	global.bloodbar.dropBlood(1);

      	 }else{
      	 	this.state.result[lower] ='O';
      	 }





            this.energyLogic();



      }


      activate(){

           if(global.find(10).state==3)
           {
              Alert.alert('恭喜','伊利斯的手镯起作用了',[{text:'Ok'}]);
              global.energybar.getEnergy(1);
           }

           global.find(this.props.passProps.id).state=3;

           this.state.activate =true;
            this.setState({});
           

      }




      energyLogic(){



         if(this.refs['energybar'].full() && !this.state.activate){
            
            this.activate();
           
         }
          if(this.state.activate)
          {
            if(before>=this.refs['energybar'].total())
                global.energybar.getEnergy(num-before);
            else
                global.energybar.getEnergy(num-this.refs['energybar'].total());
          }          
          before =num;
        
      }


      addEnergyFromTool(num2){
           this.addEnergy(num2);
           this.energyLogic();

      }



      addEnergy(num2){
         num+=num2;

      	this.refs['energybar'].getEnergy(num2);

      }


      restart(){


       

      	if(this.hasNoChance){
                		Alert.alert(
          			  '。。。。。',
          			  '每个神之零件只有两次激活机会, 是否强行激活？强行激活又需要划掉一天',
          			  [			   
          			    {text: 'OK',onPress:()=>{global.daybar.pass();this.activate();}},
          			    {text: 'Cancel'}
          			  ]
          			);
          			return;
      	}


        global.daybar.pass();

      	this.total =0; 
      	this.hasNoChance =true;  
        
        this.hasFilledUp=true;
        this.hasFilledBottom=true;
        this.setState({            
        	data: [],
        	result:[]        	
        });
      }


  
     
  


}


var styles =StyleSheet.create({
	dice:{
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
		backgroundColor:'white',
		marginTop:10
	},
	text:{
		backgroundColor:'lightblue',
		borderRadius:5,
		borderColor: 'blue',
		borderWidth:5,
		
	},
	panel:{
		flexDirection:'column',
		padding:10,
		alignItems:'center',
		justifyContent:'space-between'
	},
	 restart:{
        backgroundColor:'red',
        height:50,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        transform:[{rotateY:'0deg'}]
    }
	

});






module.exports =Activate;