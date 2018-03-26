var React =require('react-native');

var {
	Component,
	Text,
	View,
	StyleSheet,
	Alert,
	TouchableHighlight,
  Image
} =React;

var RegionBar =require('./RegionBar');
var EventBox =require('./EventBox');

class Region extends Component{



	constructor(props:{}){
		super(props);

		
	}



     render(){

        var region =global.regions[this.props.index];
     	return(

            <TouchableHighlight 
             onPress={this.props.onEnter}
             style={{flex:1,backgroundColor:this.props.bgcolor,margin:2,justifyContent:'space-around'}}
             onShowUnderlay={()=>null}
             onHideUnderlay={()=>null} 
             underlayColor={'blue'}>
     		<View>

	     		<View style={{flexDirection:'row',justifyContent:'space-between'}}>
	                
	                <View style={{justifyContent:'center',alignItems:'center'}}>
	                   <RegionBar texts={region.daybar} ref={'regionbar'}/>
                      <View>
                       <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                               <Text>{'剩余\n机会'}
                               </Text>
                               <Text style={{fontSize:30,fontWeight:'300',marginLeft:10}}>{region.chances}
                               </Text>
                       </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={{width:20,height:20,borderRadius:10}} source={global.find(region.artifactId).img}/>
                            <Text style={{marginLeft:10}}>{region.componentName}</Text>
                        </View>
                      </View>
	                </View>	                
	                <EventBox index={this.props.index}/>
                 
	     		</View>

	     		


                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                   <Text style={{fontStyle:'italic',fontSize:20}}>{this.props.index}</Text>
	     		   <Text>{region.name}</Text>
	     		</View>
             </View>

          </TouchableHighlight>

     	);
     }

  



    


}



module.exports =Region;