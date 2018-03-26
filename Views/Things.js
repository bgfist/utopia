'use strict';

var React =require('react-native');
var TouchableBounce =require('TouchableBounce');

var SwitchAndroid =require('SwitchAndroid'); 

var {
	Text,
	TouchableHighlight,
	ToastAndroid,
	View,
	StyleSheet,
    TouchableOpacity,
    Component,
    ListView,
    Image,
    Alert,
    Switch
	

}=React;


var cartnames =['','神之\n零件','我的\n工具','道具','传奇\n物品'];
var states =['','未拥有','去激活','可使用一次','用完了^_^'];


class Things extends Component{

    constructor(props:{}){

    	super(props);

     var ds =new ListView.DataSource({
                  rowHasChanged: (row1, row2) =>row1!==row2,
                });
        
    	

		  this.state = {
		  	    
		  	    
			      dataSource:ds,
			      
			    };
    }


    componentDidMount(){

    	setTimeout(()=>this.setState({
    	
          dataSource: this.state.dataSource.cloneWithRows(global.things),
         
        }),300);
    	
    }

    switch(rowID,value){
    	 var newDs = [];
		    newDs =global.things.slice();

       newDs[rowID] ={
        ...newDs[rowID],
         open:value
       };
       global.things =newDs;
		    
		    this.setState({
		      dataSource: this.state.dataSource.cloneWithRows(newDs)
		    })
    

    }
  


	render(){
		return(
               
         
		        <ListView
		          dataSource={this.state.dataSource}
		          renderRow={this._renderRow.bind(this)}		          
		          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
		        />
		     


			);
	}


	_renderRow(rowData, sectionID: number, rowID: number) {


	
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowData)}>       
          <View style={styles.row}>


            <Image style={styles.thumb} source={rowData.img} />
           
            <View style={{width:100}}>               
	            <View style={[styles.thumb2,this.renderCart(rowData.cart)]}>
	              <Text style={{fontSize:10,backgroundColor:'transparent'}}>
	               {cartnames[rowData.cart]}
	               </Text>
	            </View>          
		        
	             <Text style={styles.text}>
                    {rowData.name}
                </Text> 
            </View>
             <TouchableOpacity onPress={()=>this._renderPress(rowID,rowData.id)}>
                  <View style={[this._renderState(rowData.state),styles.button]}>
                       <Text style={styles.text}>
                          {rowData.state==3&&rowData.buff? '生效中...'  :  states[rowData.state]}
                      </Text>           
                  </View>
              </TouchableOpacity>


          </View>        
      </TouchableHighlight>
    );
  }

  


  

  _pressRow(rowData) {
  	  Alert.alert( rowData.name,
        rowData.description,
		  [		   
		    {text: 'OK'},
		  ]);
		  
    
  }


  _renderState(state){
  	switch(state){
  		case 1:
  		   return {backgroundColor:'gray'};
  		case 2:
  		   return {backgroundColor:'red'};
  		case 3:

  		   return {backgroundColor:'green'};
  		case 4:
  		   return {backgroundColor:'272822'};
  		default:
  		   return {backgroundColor:'gray'};

  	}

  	return {};
  }


  renderCart(cart){
  	switch(cart){
  		case 1:
  		   return {backgroundColor:'EAE4E5'};
  		case 2:
  		   return {backgroundColor:'672413'};
  		case 3:
  		   return {backgroundColor:'8FC048'};
  		case 4:
  		   return {backgroundColor:'BB560E'};
  		default:
  		   return {backgroundColor:'gray'};

  	}

  }


  _renderPress(rowID,id){
  	switch(global.things[rowID].state){
  		case 1:
          ToastAndroid.show('你尚未拥有该物品,努力探索吧.', ToastAndroid.SHORT);
          
  		    return;
  		case 2:
  		    global.navigator.push(
  		    	{
  		    		index:3,
  		    		title:'激活'+ global.things[rowID].name,
              passProps:{id:id}
  		    	});
  		    return;
  		case 3:
          if(global.things[rowID].buff)
  		        ToastAndroid.show('该物品给您一个永久buff,冒险打怪倍省力！', ToastAndroid.SHORT);
          else
             ToastAndroid.show('该物品只能使用一次，在相应场景中会有标志.', ToastAndroid.SHORT);
  		     return;
  		case 4:
            ToastAndroid.show('您已经用过了o^o ', ToastAndroid.SHORT); 
             return;
  	}

  }

 


}








var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'EAF8FD',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius:40
  },
   thumb2: {
    width: 30,
    height: 30,
    borderRadius:20,
    
    justifyContent:'center',
    alignItems:'center',
    marginBottom:15
   

    
  },
  button:{
  	width: 80,
    height: 40,
    borderRadius:10,
   
    justifyContent:'center',
    alignItems:'center',
    

  },
  switch:{
  	width: 80,
    justifyContent:'center',
    alignItems:'center',
  },
  text: {
  	
  	fontWeight:'500',
    textAlign:'center'
    
  },
});







module.exports =Things;






//三点重要发现
//1.   lambda表达式如果只有一行那就不要打{} 表示返回后面的表达式的值，且此表达式不用加分号；
//     如果加了{ }，则 必须自己返回值
//     
//2.    datasource的bug：
//     最好是这样处理：
//      首先， datasource必须在外面new出来，再赋值给state；
//      其次， 必须从源数据拷贝一份出来，并且只能对这个新数组的一行元素整体改变，再把新数据克隆给datasource。
//      如此就能完成数据的改变。
//      
//      
//      
//      
//      
//3.   setState方法只要调用就会重新render,而不用给他传参.
//     render方法会对里面引用的所有变量重新求值，也就是说整个代码再走一遍。
//     
//     
//     setstate会调用当前组件及其子组件的render方法。
//     
//     
//     所以要注意： 
//       你可以通过传props或者控制子组件内部的state来控制信息，
//       如果某信息两者都能改变，那就会出错，因为props是只能父亲来控制，不能赋值，所以确保
//       props不会变，然后才能将其设为初始state，如果其可变，那么不能将其设为state
//     