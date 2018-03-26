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
    Alert,
    TextInput
	

}=React;


var Dice =require('../Components/Dice');
var SearchBox =require('../Components/SearchBox');

class Search extends React.Component{
    dice1:any;
    dice2:any;
    total:number;



    nextStep: number;
    goToNextStep:  any;

   
    hasFilledUp:boolean;
    hasFilledBottom:boolean;
    isFirst:boolean;


     //此功能对外提供
      triggerFunctions(){
         
          
            global.find(7).require=true;
            global.find(7).func = this.prepare.bind(this);
               

      }

       triggerFunctions2(){

           if(global.hasEvent([1,6],global.regionIndex))
           {
                global.find(5).require=true;
                global.find(5).func = this.prepare2.bind(this);

           }

           if(global.hasEvent([3,4],global.regionIndex))
           {
                global.find(4).require=true;
                global.find(4).func = this.prepare2.bind(this);

           }
         
          
           
               

      }


      stopFunctions(){
           global.find(7).require=false;
      }

      stopFunctions2(){
           if(global.hasEvent([1,6],global.regionIndex))
           {
                global.find(5).require=false;
           }

           if(global.hasEvent([3,4],global.regionIndex))
           {
                global.find(4).require=false;   
           }
      

      }


      prepare2(){

         this.optimaze =true;

          this.diff =10;

       

          this.setState({});
      }


      prepare(){
          this.optimaze =true;

          this.diff =100;

          this.noZero =true;

          this.setState({});


      }


      restore(){

         this.stopFunctions();
         this.stopFunctions2();

        this.goToNextStep =function(){};
        
        this.nextStep =0;
        this.hasFilledUp=true;
        this.hasFilledBottom=true;
        this.setState({                    
            data: [],
            result:'?',
            text:0,
        });

      }

	 constructor(props:{}){
        super(props);

        this.dice1 =null;
        this.dice2 =null;
        this.total =0;

        this.goToNextStep =function(){};
        
        
        this.hasFilledUp=true;
        this.hasFilledBottom=true;
        this.state={                    
        	data: [],
        	result:'?'
        }
	 }


    componentWillUnmount(){
           this.stopFunctions2();
           this.stopFunctions();
       }




   renderInput(){

       if(this.optimaze){
        
         return (

              <View style={{flexDirection:'row',marginVertical:10,justifyContent:'space-between',alignItems:'center'}}>                
                 <TextInput  placeholder={'请输入要校正的值(0-'+this.diff+')'}  style={{height: 40, width:200,borderColor: 'gray', borderWidth: 1}} keyboardType={'numeric'}
                  onChangeText={(text) => this.setState({text:text})}
                  value={this.state.text}/>
                
                 <TouchableOpacity onPress={this.betterResult.bind(this)} style={{marginHorizontal:30,width:50,height:40,borderRadius:10,backgroundColor:'skyblue',alignItems:'center',justifyContent:'center'}}>
                 <View>
                    <Text>提交</Text>
                 </View>
                 </TouchableOpacity>
              </View>

          );
       }
   }

      render(){

      	var text='按左边的格子，上面两个\n骰子的值将依次填入';
      	return (
      		<View style={{flex:1}}>          

             

             <View style={styles.dice}>
                <Dice ref2={(dice)=>{this.dice1 =dice;}} />
                <Dice ref2={(dice)=>{this.dice2 =dice;}} />
                <TouchableOpacity onPress={this._onPressButton2.bind(this)} >
                   <View style={styles.text}><Text style={{fontSize:15}}>掷骰子</Text></View>
                </TouchableOpacity>

             </View>
             <View  style={styles.panel}>
                <SearchBox rows={2} cols={3}  data={this.state.data} changeData={this._changeData.bind(this)}/>
                <Text  style={{textAlign:'center'}}>{text}</Text>
             </View>



             {this.renderInput()}

             <View style={styles.result} >
                 <Text >Result:  </Text>                
                 <Text >{this.state.result}</Text>                       
             </View>

              <View style={styles.result}>
                     <View>
                         <Text>{this.judgeResult()}</Text>
                     </View>
                     <TouchableOpacity onPress={()=>{this.goToNextStep.bind(this)();}} style={styles.button}>
                          <View>
                              <Text style={{fontSize:25,fontFamily:'NotoSerif Bold',textAlign:'center'}}>{!this.nextStep? '   ' : (this.nextStep>3 ? '前往':'领取')}</Text>
                          </View>
                     </TouchableOpacity>
              </View>

           
           <TouchableOpacity  onPress={this.restart.bind(this)}>
             <View style={styles.restart}>
               <Text style={{fontSize:20}}>继续探索:{'+'+global.regions[global.regionIndex].chances}</Text>
             </View>
           </TouchableOpacity>
            


	        </View>

     		);
     }


     restart(){
            if(global.regions[global.regionIndex].chances<=0)
               {
                   Alert.alert('Error','这个区域没有探索机会了',[{text:'OK'}]);
                   return;
               }

            global.regions[global.regionIndex].chances-=1;

             //恶劣天气是否起作用
             if(global.hasEvent(global.regions[global.regionIndex].events,4))
             {
                global.elietianqi = true;              

             }             
             global.regionbar.pass();
            


            this.total =0;

            
            this.restore();


     }

     clearResult(){

           this.restore();

     }

   

    
     _onPressButton2(){
     	  if(!(this.hasFilledUp &&this.hasFilledBottom))
     	  {
     	  	ToastAndroid.show('You must use all the values you diced before.', ToastAndroid.SHORT);
     	  	return;
     	  }
     	  if(this.total==3)
     	  {
            ToastAndroid.show('You have used 3 chances.', ToastAndroid.SHORT);
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
          	  this.state.data[id] =this.dice2.state.value;
          }

          this.renderResult();
     	
          this.setState({
          	 data:this.state.data,
          	 result:this.state.result,

          });
     }

     renderResult(){
     	if(this.total==3 && this.hasFilledUp && this.hasFilledBottom)
        {


            this.state.result =this.state.data[0]*100+this.state.data[1]*10+this.state.data[2]
                        -this.state.data[3]*100-this.state.data[4]*10-this.state.data[5];
            

             
              //优化结果
              //
              //
              //1. 好运气是否生效
              if(global.hasEvent(global.regions[global.regionIndex].events,3)){
                  this.optimaze =true;
                  this.diff =10;
                  ToastAndroid.show('好运气生效了',ToastAndroid.SHORT);
              }

              //2.探索手杖是否生效
              this.triggerFunctions();

              //3.密闭镜和水晶球是否生效
              this.triggerFunctions2();
        }
        
     }
     
     betterResult(){
           this.optimaze =false;




           var diff =this.state.text;
           
           //如何判断输入的是数字
           if(diff<0)
            diff=0;
           if(diff>this.diff)
             diff =this.diff;
           this.state.result =this.state.result-diff;

           if(this.noZero && this.state.result<1)
             this.state.result = 1; 

           this.setState({});
           
     }


     forward(){
        var result =this.state.result;
         this.restore();
        this.props.navigator.push({index:2,title:'遭遇战！',passProps:{result:result}});
        
     }
     
      judgeResult(){

           var result =this.state.result;
           if(result=='?'){

              return '  ';
           }


           if(result==0){
               this.nextStep =1;
               this.goToNextStep=this.getZero;
              return '完美零解';
           }
           else if(result>0&& result<11){
               this.nextStep =2;
                this.goToNextStep=this.getArtifact;
              return '得到神之部件';
           }
           else if(result>=11 && result<=99){
               this.nextStep =3;
               this.goToNextStep=this.getATool;
              return '获得零件';
           }
           else{
               this.nextStep =4;
               this.goToNextStep =this.forward;
               return '遭遇战';
           }
      }

      getArtifact(){
             this.restore();
            if(global.find(global.regions[global.regionIndex].artifactId).state !==1){
                 Alert.alert('。。。','每个区域只有一个神之部件,您之前已经有了'+global.find(global.regions[global.regionIndex].artifactId).name,


                  [{text:'OK'}]
                );
                 return;
             }

            global.find(global.regions[global.regionIndex].artifactId).state =2;

            Alert.alert('获得神之部件','你已获得'+global.find(global.regions[global.regionIndex].artifactId).name+'\n记得去激活哦。',


               [{text:'OK'}]
                );


      }

      getATool(){
             this.restore();
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

      getZero(){
               this.restore();
             if(global.find(global.regions[global.regionIndex].artifactId).state !==1){
                 Alert.alert('完美零解','您获得了两个道具'+global.find(global.regions[global.regionIndex].artifactId).name
                    ,


                  [{text:'OK'}]
                );
                var component ={
                cart:3,
                name:global.regions[global.regionIndex].componentName,
                state:3,
                period:4,
                img: require('../Images/daoju.png'),
                description: '道具可用来链接神之零件。'
            };
            global.add(component);
            global.add(component);

                 return;
             }

            global.find(global.regions[global.regionIndex].artifactId).state =3;
            global.energybar.getEnergy(5);

            Alert.alert('完美零解','恭喜！你已获得'+global.find(global.regions[global.regionIndex].artifactId).name+
                ',已经激活了的哦。'+'\n并且获得了五点上帝之手',


               [{text:'OK'}]
                );


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
	result:{
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',		
		height:40,		
		backgroundColor:'lightgreen',
        marginBottom:10
	},
	text2:{
		width:60
	},
    restart:{
        backgroundColor:'red',
        height:50,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
    button:{
        width:80,
        borderRadius:5,
        backgroundColor:'red',
       
    }

});






module.exports =Search;