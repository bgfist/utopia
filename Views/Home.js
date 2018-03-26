var React =require('react-native');

var {
	Component,
	Text,
	View,
	StyleSheet,
	Alert,
	TouchableOpacity,
  TouchableHighlight,
  ToastAndroid
} =React;


var Region =require('../Components/Region');

var times =0;

class Home extends Component{



	constructor(props:any){
		super(props);
       

	
    

   
   

    global.diceEvents =this.diceEvents.bind(this);
    global.relax =this.relax.bind(this);

	}


  diceEvents(){


       for(var i=1;i<global.regions.length;i++)
          global.regions[i].events=[];
       
       var regions=[];
       for(var i=0;i<4;i++)
          regions.push(Math.ceil(Math.random()*6));


      

    
       for(var i=0;i<regions.length;i++)
              global.regions[regions[i]].events.push(i+1);
                
           
        

        this.setState({

        });

        global.toolsbar.refresh();

  }


	render(){

         
         
		return (

             <View  style={{flex:2}}>
                 <View style={{flexDirection:'row',flex:1}}>
                    <Region ref={1} index={1} bgcolor={'#eeeeee'}  onEnter={()=>{this.onEnter(1)}}/>
                    <Region ref={2} index={2} bgcolor={'#ff8888'}   onEnter={()=>{this.onEnter(2)}}/>
                 </View>
                 <View style={{flexDirection:'row',flex:1}}>
                     <Region ref={3} index={3}  bgcolor={'#abcdef'}  onEnter={()=>{this.onEnter(3)}}/>
                     <Region ref={4} index={4}  bgcolor={'#fedcba'}   onEnter={()=>{this.onEnter(4)}}/>
                 </View>
                 <View style={{flexDirection:'row',flex:1}}>
                     <Region ref={5} index={5}  bgcolor={'#88ffff'}   onEnter={()=>{this.onEnter(5)}}/>
                     <Region ref={6} index={6} bgcolor={'#88ff88'}   onEnter={()=>{this.onEnter(6)}}/>
                 </View>


                 <View>
                    <Text>点击上面一个区域进行探索</Text>
                 </View>

                 <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10,backgroundColor:'lightgreen'}}>

                    <TouchableOpacity style={styles.button} onPress={this.activate.bind(this)}>
                       <View style={styles.text}>
                          <Text>激活零件</Text>
                       </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={this.relax.bind(this)}>
                       <View style={styles.text}>
                          <Text>休息一天</Text>
                       </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={this.link.bind(this)}>
                       <View style={styles.text}>
                          <Text>链接零件</Text>
                       </View>
                    </TouchableOpacity>

                 </View>
             </View>






			);
	}


  relax(){
         global.daybar.pass();

        if(global.find(3).state==3)
        {
            global.bloodbar.recoveryBlood(2);
        }
        else{
            global.bloodbar.recoveryBlood(1);
        }

  }

  activate(){
    //转到零件选择界面
    //
    //
    this.props.navigator.push({
      index:5,
      title:'选择激活',    
    });

  }



  link(){
         this.props.navigator.push({
            index:4,
            title:'链接零件',    
          });
  }



  

	onEnter(index){
    if(global.regions[index].chances<=0)
       {
           Alert.alert('Error','这个区域没有探索机会了',[{text:'OK'}]);
           return;
       }


       global.regionbar =this.refs[index].refs.regionbar;

       global.regionIndex =index;

       //恶劣天气是否起作用
       if(global.hasEvent(global.regions[global.regionIndex].events,4))
       {
          global.elietianqi = true;              

       }             
       global.regionbar.pass();


       global.regions[index].chances-=1;

   
		this.props.navigator.push({
			index:1,
      title:'探索'+global.regions[index].name+'!',     
		});
             
	}
}



var styles =StyleSheet.create({
	text: {
		backgroundColor:'#486fda',
		alignItems:'center',
		justifyContent:'center',
		height:40,
		borderRadius:5
	},
	button:{
		flex:1,
		margin:10,
		
	}
});


module.exports =Home;