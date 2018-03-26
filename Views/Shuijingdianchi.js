'use strict';


var React =require('react-native');


var {
	Component,
	Alert,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight

}=React;


var remove =function(arr,id){

	  var result =100;

       for(var i=0;i<arr.length;i++)
       {
       	   if(arr[i]==id)
       	   {
               result=i;
       	   }
       }

       // //
       // Alert.alert(''+id);

       arr.splice(result,1);
}




var CircleCheckBox =require('react-native-circle-checkbox');

class Shuijingdianchi  extends  Component{
         constructor(props:{}){
            super(props);





            this.state={

               check:[]

            }





         }


       hasChecked(id){

       	    if(this.state.check.filter((c)=>c==id).length==1)
       	    	return true;
       	    return false;

       }



         check(checked,id){
            if(checked){
            	this.state.check.push(id);
            }
            //取消选中
            else{
                remove(this.state.check,id);
            }

            
            this.setState({});


         }


         
         render(){

                var things =global.things.filter((thing)=>thing.cart==2&& thing.state==4);




                var tools =global.things.filter((thing)=>thing.cart==3 && thing.state==3);


                var tnodes =tools.map((thing)=>{
                     return (
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                <CircleCheckBox
								  checked={this.hasChecked(thing.id)}
								  onToggle={(checked)=>this.check(checked,thing.id)}
								/>

								 <Image style={styles.thumb} source={thing.img} />

                                
					             <Text style={styles.text}>
				                    {thing.name}
				                </Text>

                            </View>




                     	);
                });


                var nodes =things.map((thing)=>{
                	  return( 

                	  	<TouchableHighlight onPress={()=>this._pressRow(thing.id)}>       
					          <View style={styles.row}>
					            <Image style={styles.thumb} source={thing.img} />

                                
					             <Text style={styles.text}>
				                    {thing.name}
				                </Text>
				               </View>
				         </TouchableHighlight> 
					            );
                });

         	return (
                <View>

                      <Text>选择要使用的道具</Text>
                            {tnodes}



                      <Text>选择要恢复的工具</Text>
                      
                   
                      {nodes}


                </View>
         		);
         }



         _pressRow(id){

         	   if(this.state.check.length!==3)
         	   {
         	   	Alert.alert('Error','必须选择三个道具',[{text:'Ok'}]);
         	   	return;

         	   }

               global.find(id).state=3;
               this.state.check.map((t)=>{
               	//Alert.alert(t+'');
               	global.find(t).state =4;
               });
               Alert.alert('成功','你成功恢复了工具'+global.find(id).name,[{text:'Ok'}]);
               global.navigator.pop();
         }



}







var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'EAF8FD',
    alignItems:'center'
  },
 
  thumb: {
    width: 64,
    height: 64,
    borderRadius:40
  },
   
   

  text: {
  	
  	fontWeight:'500',
    textAlign:'center'
    
  },
});



module.exports =Shuijingdianchi;