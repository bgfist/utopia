'use strict';


var React =require('react-native');

var ProgressBar = require('ProgressBarAndroid');
var Dimensions =require('Dimensions');
var {
	Component,
	View,
	Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid

} =React;

var LinkCircle = require('../Components/LinkCircle');

var Dice =require('../Components/Dice');
var SearchBox =require('../Components/SearchBox');




class DustBin extends Component{




	constructor(props){
        super(props);

       

        this.contents =global.dustbin;

	}




	add(num){
        if(this.num>=this.contents.length){
        	Alert.alert('Error','垃圾桶已满',[{text:'OK'}]);
        	return false;
        }

        this.contents.push(num);        
        this.setState({});

        return true;

	}

	render(){


		var nodes =[];
		for(var i=0;i<10;i++){
			nodes.push(

                      <View  style={[styles.circle,{backgroundColor:this.contents[i]? 'darkgray': 'gray'}]}>
                        <Text>{this.contents[i]?this.contents[i]: '' }</Text>
                     </View>

				);
		}






		return (
                <View style={styles.row}>
                  {nodes}
                </View>
			);
	}
}

class Link extends Component{




     constructor(props){

             super(props);

             var noEnoughThings = false;
             [1,2,3,4,5,6].map((id)=>{
                if(global.find(id).state!==3)
                  noEnoughThings =true;
             });


             global.regions.map((region)=>{
                if(region.componentNum==0)
                  noEnoughThings =true;
             });

            
            if(noEnoughThings)
               ToastAndroid.show('你还没有收集齐道具,链接可能会中止。',ToastAndroid.LONG);


           this.regionId =0;

              this.total =0;


       
		        this.hasFilledUp=true;
		        this.hasFilledBottom=true;
		        this.state={            
		        	data: [],
		        	result:[],
		        	       	
		        }









     }

     componentWillUnmount(){
        this.stopFunctions();
     }
	


    onSelect(thingId,regionId){


      

    	if(regionId==this.regionId)
    		return true;

      this.regionId =regionId;

      this.thingId =thingId;

    	var thing =global.find(thingId);


      

    	if(thing.state!==3){
    		ToastAndroid.show(thing.name+'还不能用',ToastAndroid.SHORT);
        this.canLink =false;
        this.stopFunctions();


      this.restore();

      this.setState({});

    		return false;
    	}

    	var region =global.regions[regionId];

    	if(global.things.filter((thing)=>thing.name==global.regions[regionId].componentName).filter((thing)=>thing.state==3).length<=0)
    	{
    		ToastAndroid.show('还没有道具'+region.componentName,ToastAndroid.SHORT);
        this.canLink =false;
        this.stopFunctions();


      this.restore();

      this.setState({});
    		return false;
    	}


    	this.canLink =true;
      

      //远古记忆闪动
      this.triggerFunctions();
     

    	this.restore();

    	this.setState({});


      return true;


      



    }


    triggerFunctions(){

        global.find(15).require =true;
        global.find(15).func =this.activate.bind(this);

    }


    activate(){
      //链接成功
            this.linkCircle.activate(this.thingId);
            this.result =1;
            global.result+=this.result;
            this.setState({});
            ToastAndroid.show('此部件链接成功',ToastAndroid.SHORT);
    }


    stopFunctions(){
       global.find(15).require =false;
    }


    fetchATool(){
    	 //取一个道具出来
    	if(global.things.filter((thing)=>thing.name==global.regions[this.regionId].componentName).filter((thing)=>thing.state==3).length==0){
              
              Alert.alert('Error','道具不足，快去探索',[]);  
              this.regionId =0; 
		      this.restore();
		      this.setState({});

		      
		      return false;
    	}

        var id =global.things.filter((thing)=>thing.name==global.regions[this.regionId].componentName).filter((thing)=>thing.state==3)[0].id;
        global.find(id).state=4;
        global.toolsbar.refresh();

        ToastAndroid.show('你拿出了一个道具。。',ToastAndroid.SHORT);
        return true;
    	
    }

    restore(){

    	       this.total =0;
            

       
		        this.hasFilledUp=true;
		        this.hasFilledBottom=true;
		        this.state={            
		        	data: [],
		        	result:[],
		        	       	
		        }


    }

    render(){

         var width= Dimensions.get('window').width;



         


       return (
            <View style={{flex:1}}>
                <Image style={{flex:1,width:width}} resizeMode={'stretch'} source={require('../Images/bg1.png')}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                   <LinkCircle onSelect={this.onSelect.bind(this)} ref={(linkCircle)=>this.linkCircle =linkCircle}/>

                   <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                          <DustBin ref={'dustbin'}/>
                           <View style={{width:40,height:40,borderRadius:20,backgroundColor:'#aaaaaa',alignItems:'center',justifyContent:'center'}}>
				                           <Text>{global.result}</Text> 
			               </View>
                         {this.renderStart()}
                   </View>

		             
                   {this.renderSelect()}
                        
                   {this.renderDice()}
                  </ScrollView>
                   
                </Image>                
            </View>

       );
           
    }



    renderStart(){

    	var activated =global.link.filter((e)=>e==true).length;


    	if(activated==6)
    	{
    		return (
                     <TouchableOpacity style={{width:50,height:40,borderRadius:10,backgroundColor:'skyblue',alignItems:'center',justifyContent:'center'}} onPress={this.qidong.bind(this)}>
				                           <View>
				                              <Text>启动</Text>
				                           </View>
				     </TouchableOpacity>	                                    

    			);
    	}

    		  
    }


    qidong(){
        
          Alert.alert('最终的启动！',
          	'一旦完成了所有零件的六个链接，你要开始启动它了。\n'+
          	'所有链接Link Box里面的数字加总起来就是最终启动的难度。\n'+
          	'如果距离末日的到来还有些日子，你可以先休息，一旦开始启动Utopia Engine,直到它启动它或者你挂掉之前都无法停止。\n '+
          	'当你决定要开始启动时，你可以把剩下的生命值扣至零，以此抵消相同数量的难度等级。但这次，你不会因此而昏迷.\n'+
          	'拿起骰子投出去，得到的点数加总起来要是不小于抵消后的难度等级，就算成功启动；反之则失败，\n'+
          	'立刻受到一点伤害，失去一天时间，如果你还活着，那就继续尝试启动.',
          	[
          	{text:'先休息',onPress:()=>{global.navigator.pop();}},
          	{text:'扣血',onPress:()=>{global.result-=global.bloodbar.state.current;this.setState({});global.bloodbar.dropToZero();}},
          	{text:'直接启动',onPress:()=>{

                   
			    	var result =Math.ceil(Math.random()*6);

			    	
			        var success = (result >=global.result);

			        var text =success?'成功！':'失败！';
                   

                    Alert.alert('直接启动','你的启动值为'+result+'\n '+text
                    	,
                    	[{text:'OK'}]);
			        

			        if(!success){
                         global.bloodbar.dropBlood(1);
                         global.daybar.pass();
			        }
			        else{
			        	global.success();
			        }

          	}}]);

    }





    renderDice(){

      if(this.canLink)
      {

    	return (

                <View>
                        <View style={[styles.dice,{backgroundColor:'transparent'}]}>
				                            <Dice ref2={(dice)=>{this.dice1 =dice;}} />
				                            <Dice ref2={(dice)=>{this.dice2 =dice;}} />
				                            <TouchableOpacity onPress={this._onPressButton2.bind(this)} >
				                               <View style={styles.text}><Text style={{fontSize:15}}>掷骰子</Text></View>
				                          </TouchableOpacity>
				                 </View>


				              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:15}}>


                                    
			                        <View>
				                        <SearchBox rows={2} cols={3}  data={this.state.data} changeData={this._changeData.bind(this)} />
				                        <SearchBox rows={1} cols={3}  data={this.state.result} changeData={()=>{}}/>  

	                                </View>

	                               <View style={{marginHorizontal:45,justifyContent:'center',alignItems:'center'}}>
				                        <TouchableOpacity style={{width:50,height:40,borderRadius:10,backgroundColor:'skyblue',alignItems:'center',justifyContent:'center'}} onPress={this.diuqi.bind(this)}>
				                           <View>
				                              <Text>丢弃</Text>
				                           </View>
				                        </TouchableOpacity>
	                                    
	                                    <View style={{marginTop:20,width:40,height:40,borderRadius:20,backgroundColor:'#aaaaaa',alignItems:'center',justifyContent:'center'}}>
				                           <Text>{this.result}</Text> 
				                        </View>
			                       </View>


				              </View>



                </View>



    		);

       }
    }

    renderSelect(){




		    	 return(


		    	 	  <View>
                                <Text>所需道具:{global.regions[this.regionId].componentName}</Text>                    
                      </View> 
		             );           
                        
    }



    diuqi(){
    	    if(this.hasFilledUp&&this.hasFilledBottom){
    	    	ToastAndroid.show('你的值都填了，不能丢', ToastAndroid.SHORT);
     	     	return;
    	    }

    	    // if(this.diuqiTimes>=2){
    	    // 	ToastAndroid.show('丢光了，不能再丢了', ToastAndroid.SHORT);
     	   //   	return;
    	    // }


    	    if(this.isFirst){
    	    	if(this.refs.dustbin.add(this.dice1.state.value))    	    	  
    	    	  this.isFirst =false;
    	    	 
            }else if(!this.used){
            	if(this.refs.dustbin.add(this.dice2.state.value))            	  
            	  this.used =true;
            	  
            }
    	   


           

    }



     _onPressButton2(){


        if(this.total ==0)
           this.fetchATool();


     	  if(!(this.hasFilledUp &&this.hasFilledBottom)&&!this.used)
     	  {
     	  	ToastAndroid.show('You must use all the values you diced before.', ToastAndroid.SHORT);
     	  	return;
     	  }
     	 
          this.dice1.roll();
          this.dice2.roll();
          this.total++;
          this.isFirst =true;
          this.used =false;
         
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

     	 if(id>2)
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
          	  if(this.used)
          	  {
          	  	ToastAndroid.show('You have no value to fill.', ToastAndroid.SHORT);
     	  	    return;
          	  }

          	  this.state.data[id] =this.dice2.state.value;
          	  this.used =true;
          }

          this.renderResult(id);

          
          
         
          this.setState({
          	 data:this.state.data,
          	 result:this.state.result,

          });
     }


       renderResult(id){
     	var temp;
     	if(id>2)
     	{
     		temp =id-3;
     		if(this.state.data[id]&&this.state.data[temp])
     			this.processResult(this.state.data[temp]-this.state.data[id],temp,id);
     	}
     	else{
     		temp =id+3;
     		if(this.state.data[id]&&this.state.data[temp])
     			this.processResult(this.state.data[id]-this.state.data[temp],id,temp);
     	}

      }


      processResult(result,lower,higher){
      	 if(result<0){
      	 	//零件爆炸
      	 	bloodbar.dropBlood(1);
      	 	if(this.fetchATool())
      	 	  this.state.result[lower] =2;
           else{
             Alert.alert('Error','小伙子，你的道具不够，先去探索吧',[{text:'Ok'}]);
           }	
      	 }else{
      	 	this.state.result[lower] =result;
      	 }



      	 if(this.state.result[0]!==undefined && this.state.result[1]!==undefined && this.state.result[2]!==undefined){
	      	 	//链接成功
	      	 	this.linkCircle.activate(this.thingId);
	      	 	this.result =this.state.result[0]+this.state.result[1]+this.state.result[2];
	      	 	global.result+=this.result;
	      	 	this.setState({});
	      	 	ToastAndroid.show('此部件链接成功',ToastAndroid.SHORT);

          }

     }





}


var styles =StyleSheet.create({
  dice:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
        paddingTop:5,
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
    flexDirection:'row',
    padding:10,
    alignItems:'center',
    justifyContent:'space-between'
  },
  row:{
  	flexDirection:'row',
  	justifyContent:'space-around',
  	flexWrap:'wrap',
  	width:180,
  	backgroundColor:'skyblue',
  	borderRadius:10
  },
  circle:{
  	marginHorizontal:3,
  	marginVertical:2,
  	width:30,
  	height:30,
  	borderRadius:15,
  	justifyContent:'center',
  	alignItems:'center'
  }
});

module.exports =Link;