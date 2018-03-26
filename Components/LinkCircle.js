
'use strict';

var React =require('react-native');

var Dimensions =require('Dimensions');
var ProgressBar = require('ProgressBarAndroid');
var {
	Component,
	View,
	StyleSheet,
	Image,
	Text,
	PanResponder,
	ToastAndroid,
  Alert
}=React;

class LinkCircle extends Component{

      constructor(props){
          super(props);

          this._panResponder = PanResponder.create({
		      onStartShouldSetPanResponder:()=>true,
		      onMoveShouldSetPanResponder:()=>true,
		      onPanResponderStart: this._handlePanResponderStart.bind(this),
		      onPanResponderMove: this._handlePanResponderMove.bind(this),
		      onPanResponderRelease: this._handlePanResponderRelease.bind(this),
		    
		    });

          this.previousX =0;
          this.previousY =0;

          this.centerX =0;
          this.centerY =0;

          this.state={
              rotate:0,
          };

          this.bars =global.link;
          this.scales =[1,1,1,1,1,1];

      }



      activate(thingId){

            var id;
            switch(thingId){
               case 1:
                  id =2;
                  break;
              case 2:
                  id =1;
                  break;
              case 3:
                  id =0;
                  break;
              case 4:
                  id =4;
                  break;
              case 5:
                  id =3;
                  break;
              case 6:
                  id =5;
                  break;  
                 


            }


            this.bars[id]=true;


            this.setState({});



        
           


      }


      select(id){

          this.scales =[1,1,1,1,1,1];
          this.scales[id] =1.3;
          this.setState({});

      }


      update(rotateD){

          var rotate =this.state.rotate+rotateD;
          if(rotate>2*Math.PI)
          	 rotate =rotate-2*Math.PI;
          if(rotate<0)
          	 rotate =2*Math.PI+rotate;

          this.setState({
          	rotate: rotate,
          });
      }


      square(x){
          return x*x;
      }

     calculateAngle(x0,y0,x1,y1,down){

     	  var a =this.square(x0-this.centerX)+this.square(y0-this.centerY);
     	  var b =this.square(x1-this.centerX)+this.square(y1-this.centerY);
     	  var c =this.square(x0-x1)+this.square(y0-y1);



     	  var result =(a+b-c)/(2*Math.sqrt(b)*Math.sqrt(a));





     	  var rotateD = Math.acos(result);

     	  // ToastAndroid.show(rotateD+'',ToastAndroid.SHORT);


           if(rotateD){
           	   if(down)
                 this.update(rotateD);
               else
               	 this.update(-rotateD);
           }


     }

     calculateVelocity(velocity,down){

           this.velocity =velocity;


     	  
           this.clock =setInterval(this.afterRelease.bind(this,down),50);


     }


     afterRelease(down){
           	      if(this.velocity<0)
           	      	clearInterval(this.clock);
           	      if(down)
           	        this.update(this.velocity);
           	      else
           	      	this.update(-this.velocity);
           	      this.velocity-=0.1;
     }

    _handlePanResponderStart(evt,gesture){

    	  this.previousX =evt.nativeEvent.locationX;
          this.previousY =evt.nativeEvent.locationX;
    }

    _handlePanResponderMove(evt,gesture){

    	  var x =this.previousX +gesture.dx;
    	  var y =this.previousY+gesture.dy;

    	  this.calculateAngle(this.previousX,this.previousY,x,y,gesture.dy>0);

    	  this.previousX =x;
    	  this.previousY =y;
    }

    _handlePanResponderRelease(evt,gesture){

    	
          this.calculateVelocity(0.6,gesture.dy>0);
    	 
    }

	render(){
           var width= Dimensions.get('window').width;
          


           var marginVertical =10;
           var marginHorizontal =50;

           width=width-marginHorizontal*2;
           
          
          var barHeight = 16;

          var e = barHeight/2;
          //测量逻辑
          var mLenght = 2*width/5;

		  var radian30 = Math.PI/6;
	      var a = mLenght * Math.sin(radian30);
		  var b = mLenght * Math.cos(radian30);
		  var c = (width - 2 * b) / 2;

          var d =mLenght/2;
          
          var imgWidth =50;

          var f =imgWidth/2;

          var positionArr =[
              [(width-mLenght)/2-f,c-f],
              [(width+mLenght)/2-f,c-f],
              [(width-mLenght)/2-f-a,c-f+b],
              [(width+mLenght)/2-f+a,c-f+b],
              [(width-mLenght)/2-f,c-f+2*b],
              [(width+mLenght)/2-f,c-f+2*b],
          ];


          this.centerX =this.centerY =width/2;


        return(

            <View {...this._panResponder.panHandlers} style={{height:width,width:width,marginHorizontal:marginHorizontal,marginVertical:marginVertical,backgroundColor:'transparent',transform:[{rotate:this.state.rotate+'rad'}]}}>
            
                 
                     <ProgressBar indeterminate={this.bars[0]}  styleAttr="Horizontal"  style={[styles.bar,{width:mLenght,marginTop:c-e,alignSelf:'center'}]}/> 
                
                     <View  style={{flexDirection:'row',justifyContent:'center',marginTop:b/2-2*e,marginBottom:b/2-e}}>
                               <ProgressBar indeterminate={this.bars[1]}  styleAttr="Horizontal" style={[styles.bar,{width:mLenght,transform:[{rotate:'-60deg'}]}]}/>
                               <ProgressBar indeterminate={this.bars[2]}  styleAttr="Horizontal"  style={[styles.bar,{width:mLenght,marginLeft:d,transform:[{rotate:'60deg'}]}]}/>
                     </View>


                     <View  style={{flexDirection:'row',justifyContent:'center',marginBottom:b/2-2*e,marginTop:b/2-e}}>
                               <ProgressBar indeterminate={this.bars[3]}  styleAttr="Horizontal" style={[styles.bar,{width:mLenght,transform:[{rotate:'240deg'}]}]}/>
                                <ProgressBar indeterminate={this.bars[4]}  styleAttr="Horizontal" style={[styles.bar,{width:mLenght,marginLeft:d,transform:[{rotate:'120deg'}]}]}/>
                     </View>

                     <ProgressBar indeterminate={this.bars[5]}  styleAttr="Horizontal" style={[styles.bar,{width:mLenght,alignSelf:'center',transform:[{rotate:'180deg'}]} ]}/> 
                
                     
                     <Image onTouchEnd={()=>{if(this.props.onSelect(3,3))this.select(0);}} source={require('../Images/xukongzhimen.png')} style={{transform:[{scale:this.scales[0]}],position:'absolute',width:imgWidth,height:imgWidth,borderRadius:f,left:positionArr[0][0],top:positionArr[0][1],}}></Image>
                     <Image onTouchEnd={()=>{if(this.props.onSelect(1,4))this.select(1);}} source={require('../Images/huangjinluopan.png')} style={{transform:[{scale:this.scales[1]}],position:'absolute',width:imgWidth,height:imgWidth,borderRadius:f,left:positionArr[1][0],top:positionArr[1][1],}}></Image>
                     <Image onTouchEnd={()=>{if(this.props.onSelect(2,6))this.select(2);}} source={require('../Images/shuijingdianchi.png')} style={{transform:[{scale:this.scales[2]}],position:'absolute',width:imgWidth,height:imgWidth,borderRadius:f,left:positionArr[2][0],top:positionArr[2][1],}}></Image>
                     <Image onTouchEnd={()=>{if(this.props.onSelect(4,5))this.select(3);}} source={require('../Images/shuijingqiu.png')} style={{transform:[{scale:this.scales[3]}],position:'absolute',width:imgWidth,height:imgWidth,borderRadius:f,left:positionArr[3][0],top:positionArr[3][1],}}></Image>
                     <Image onTouchEnd={()=>{if(this.props.onSelect(5,2))this.select(4);}} source={require('../Images/mibijing.png')} style={{transform:[{scale:this.scales[4]}],position:'absolute',width:imgWidth,height:imgWidth,borderRadius:f,left:positionArr[4][0],top:positionArr[4][1],}}></Image>
                     <Image onTouchEnd={()=>{if(this.props.onSelect(6,1))this.select(5);}} source={require('../Images/pinghengyinzhang.png')} style={{transform:[{scale:this.scales[5]}],position:'absolute',width:imgWidth,height:imgWidth,borderRadius:f,left:positionArr[5][0],top:positionArr[5][1],}}></Image>


          </View>
        	);

	}



}



var styles =StyleSheet.create({
     bar:{
     
     },



});


module.exports =LinkCircle;