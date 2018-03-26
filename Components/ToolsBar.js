'use strict';


var React =require('react-native');





var {
	Component,
	Text,
	View,
	TouchableHighlight,
	StyleSheet,
	TouchableOpacity,
	Animated,
	ScrollView,
	Image,
	Alert
} =React;


var EventBox =require('./EventBox');
class Badge extends Component{

    clock1:number;
    clock2:number;

    constructor(props:{}){
             super(props);
          

         this.state={
             opacity: new Animated.Value(1),
             scale: new Animated.Value(1),
             rotateY:0
          };


       

    }




    twinkle(){   

         this.state.scale.setValue(1.2);

         Animated.parallel([


         Animated.spring(                         
            this.state.scale,            
            {
              toValue: 1,                     
              friction: 1,                      
            }
          ),
         
         Animated.sequence([          	
             Animated.timing(                         
            this.state.opacity,                 
            {
              toValue: 0.1,                        
              duration: 1000,                         
            }
          ),
             
           Animated.timing( this.state.opacity,                 
            {
              toValue: 1,                        
              duration: 1000,                         
            }
          ),   
           ]),


         ]).start(); 

      

       }




    componentDidMount(){
        this.startService();

        //水晶电池
        if(this.props.id==2){         
          this.startService2();
        }
    		
    }


    startService2(){

        this.clock3 =setInterval(()=>{
             if(global.things.filter((thing)=>thing.cart==3).length>=3 && global.things.filter((thing)=>thing.cart==2&& thing.state==4).length>0){
                 
                
                 global.find(2).require=true;
                 global.find(2).func =()=>{

                    global.navigator.push({index:6,title:'恢复工具'});

                };
              }
              else
              {
                 
                  global.find(2).require=false;
              }
        },100);
    }

    componentWillUnmount(){
    	clearInterval(this.clock1);
        clearInterval(this.clock2);
        clearInterval(this.clock3);
    }

	render(){

    var thing =this.props.thing;

		

      //buff型的道具新开一个线程去检测是否需要时机，并直接后台工作
		  return(
                
                <View onTouchEnd={this.alert.bind(this)} style={styles.tool}>
                 <Animated.Image style={[styles.thumb,{opacity:this.state.opacity,transform:[{scale:this.state.scale},{rotateY:this.state.rotateY+'deg'}]}]} source={thing.img}>  
                         
                 </Animated.Image>    
                  
                </View>

			);
		
	}



  startService(){
      

       var id =this.props.id;
       var thing =global.find(id);
     

       var hasTwinkled =false;

      this.clock1=setInterval(()=>{

             
             	  if(!global.find(id).require){
             	  	  clearInterval(this.clock2); 
             	  	  hasTwinkled =false; 
             	  	  return;           	  	          	     
             	  }else{
             	  	      if(hasTwinkled)
             	  	      	 return;
		                  if(!thing.buff){

		                             this.twinkle();this.clock2=setInterval(this.twinkle.bind(this),2400); 
		                             
		                  }
		                  else{
				                     this.clock2=setInterval(()=>{
				                            if(this.state.rotateY>360)
				                               this.state.rotateY=0;
				                            this.state.rotateY+=10;
				                            this.setState({});
				                        },17);
		                  }
		                  hasTwinkled =true;
		          }
                                
                          

      },100);

       

  }



	alert(){
		    var id =this.props.id;
			var thing = global.find(id);
           
		if(!thing.require){

               Alert.alert(thing.name+'正在等待时机。。',
                            thing.description,   
                            [      
                              {text: 'OK'},
                            ]);
             
    }
	 else{

              if(thing.buff)
              {
                            Alert.alert(thing.name+'持续运行中。。。',
                            thing.description,                            
                            [      
                               {text: '使用',onPress:()=>{
                                thing.func();
                               }},
                            ]);
              }else{
                             Alert.alert(thing.name,
                                  '你确定要使用'+thing.name+'? 只有一次使用机会.\n'+'功能：'+thing.description,
                            [      
                              {text: 'OK',onPress:()=>{
                                 thing.func();
                                global.find(id).require=false;
                                global.find(id).state=4;
                                this.props.parent.refresh();

                              }},
                              {text: 'Cancel'}
                            ]);
                      
               
              }
	    	
	    }

	}
}



class ToolsBar extends Component{


   constructor(props:{}){
       super(props);


      
  
   }


   refresh(){
      
       
      

         this.setState({
           
         });

   }






	render(){

       
       if(this.props.period==-1){
            var things =[];
       }
       else{
           var things =global.things.filter((thing)=>thing.state==3).filter((thing)=>thing.period==this.props.period||thing.period==0);
       }

       

		var nodes =things.map((thing)=>

		          (<Badge key={Math.random()} parent={this} id={thing.id} thing={thing}/>)

			);

		 return (
             <View style={styles.bar}>
              <ScrollView style={styles.scroll} contentContainerStyle={styles.content} horizontal={true} showsHorizontalScrollIndicator={false}>
                  {nodes}
              </ScrollView>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Image source={require('../Images/location.png')}/>
                   <Text>{global.regions[global.regionIndex].name}</Text>
              </View>
              <EventBox index={global.regionIndex} toolbar={true}/>
             </View>

		 	);
	}
}

var styles =StyleSheet.create({
	 thumb: {
    width: 50,
    height:50,
    borderRadius:40
  },
  scroll:{
    
  },
  bar:{
     height:60,
     
     backgroundColor:'6F5944',
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center'
     
  },
  content:{
  	 paddingLeft:8, 
  },
  tool:{
  	marginTop:5,
  	marginBottom:5,
  	marginRight:8,  	
  }

});

module.exports =ToolsBar;