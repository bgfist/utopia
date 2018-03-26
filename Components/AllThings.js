'use strict';


var React  =require('react-native');

var {
	Component,
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView
}=React;


var cartnames =['','神之零件','我的工具','道具','传奇物品'];

class MyThing extends Component{
    constructor(props:{}){
         super(props);
    	

    }
    render(){


    	return (
    		  

               <View style={styles.row}>
                 
                  <Image style={styles.img} source={this.props.image}/>
                 
                  <Text style={{marginLeft:10}}>{this.props.name}</Text>

                  <View style={{borderRadius:10,width:20,height:20,marginRight:10,backgroundColor:this.props.state==2? 'red': 'green'}}>
                     <Text style={{fontSize:7,textAlign:'center'}}>{this.props.state==2? '未\n激活' :'可\n使用'}</Text>
                  </View>
               </View>
                
         

    		);
    }



}


var styles =StyleSheet.create({
    row:{
    	 flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
       marginLeft:10   	
    },
    img:{
    	width:50,
    	height:50,
      borderRadius:30
    	
    },
    view:{
    	backgroundColor:'lightskyblue'
    }

});



class AllThings extends Component{



	constructor(props:{}){
		super(props);


    global.refresh = this.refresh.bind(this);

    this.state ={
        things:global.things,
    };

		
	}



  refresh(){      
       this.setState({
          things:global.things,
       });
  }
     

    render(){

      var map={},dest=[];
      this.state.things.filter((thing)=>thing.state==2||thing.state==3).map((thing)=>{
          if(!map[thing.cart]){          
                dest.push({
                    cart: thing.cart,               
                    data: [thing],
                });
                map[thing.cart] = true;
          }
          else{
              for(var i=0;i<dest.length;i++){
                 if(dest[i].cart == thing.cart){
                     dest[i].data.push(thing);
                     break;
                 }
                 
              }
        
          }
      });
    	var nodes = dest.map((group)=>{

                     var contents =group.data.map((content)=>{
                          return (<MyThing key={Math.random()} name={content.name} image={content.img} state={content.state}/>);
                     });

                return  (
                  <View style={{marginLeft:3}}>
                     <Text style={{color:'darkgray',marginVertical:5}}>{cartnames[group.cart]}</Text>
                     {contents}
                  </View>
                  );      

          });

    	
    

    	return (
    		   
    		    <ScrollView style={{flex:1}} 
                showsHorizontalScrollIndicator={false}
                 onTouchMove={this.refresh.bind(this)}>                
                 {nodes}  
                </ScrollView>
               

    		);
    }

}




module.exports =AllThings;



