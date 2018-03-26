//注意：设置全局变量时，最好先声明，以免出现undefined错误




//以下为全局信息
global.drawer =null;
global.bloodbar =null;
global.daybar =null;
global.energybar =null;
global.refresh =null;
global.navigator =null;
global.regionIndex=0;
global.home =null;
global.things =[];
global.region={};
global.events=[];

global.dustbin =[];


global.commonArgs ={};


global.getLevelByResult=function(result){


      return Math.abs(Math.floor(result/100));

}

global.testIn =function(num,arr) {
      if(num>=arr[0]&&num<=arr[1])
        return true;
      return false;
}

global.hasMysteriousThing =false;

global.diceMysteriousThing =function(){     

      var id =Math.ceil(Math.random()*6);
      return id+9;

}



//操作道具集合一定要根据id来
global.find =function(id){
  for(var i=0;i<global.things.length;i++)
    if(global.things[i].id==id)
      return global.things[i];
};


var id =16;

global.add =function(newObj:{}){
       global.things.push({id:id++,...newObj});
};



var  things =[  
   
    {  
       id:1,
       cart:1,      
       name:'黄金罗盘',
       period:2,
       buff:true,
       state:1,
       require:false,            
       img: require('./Images/huangjinluopan.png'),
       description:'当黄金罗盘激活后，与灵能生物战斗时，每个骰子都获得+1的修正，灵能生物在生物表上有额外的（s）标注。',
       regionId:4
       
    },
     {  
      id:2,
       cart:1,      
       name:'水晶电池',
       period:0,
       state:1,
       
      
       img: require('./Images/shuijingdianchi.png'),
       description:'使用背包中任意三个零件恢复某个已经使用过的工具，整轮游戏只能使用一次.',
       regionId:6
       
    },
     {  
      id:3,
       cart:1,      
       name:'虚空之门',
       buff:true,
       period:5,
       state:1,
       require:true,
       func:()=>{},       
       img: require('./Images/xukongzhimen.png'),
       description:'激活虚空之门以后，虚弱恢复时间缩短至三天，恢复的体力仍为六点.',
       regionId:3
       
    },
    {  
      id:4,
       cart:1,      
       name:'水晶球',
       period:1,
       buff:true,
       state:1,      
       img: require('./Images/shuijingqiu.png'),
       description:'激活水晶球后，在Glassrock Canyon 与 Root Strangled Marshes 探索结果 -10（最多），可与好天气叠加',
       regionId:5
       
    },
     {  
      id:5,
       cart:1,      
       name:'密闭镜',
       buff:true,
       period:1,
       state:1,       
       img: require('./Images/mibijing.png'),
       description:'激活密闭镜后，在Helabeart Peak 与 The Fiery Maw 探索结果 -10（最多），可与好天气叠加',
       regionId:2
       
    },
     {  
      id:6,
       cart:1,      
       name:'平衡印章',
       period:0,
       state:1,
       require:true,
       func:()=>{global.regions[global.regionIndex].events=[];},       
       img: require('./Images/pinghengyinzhang.png'),
       description:'将你停留区域的所有事件一直取消，直到你离开，整轮游戏只可以使用一次。',
       regionId:1
       
    },
     {  
      id:7,
       cart:2,      
       name:'探索手杖',
       period:1,
       state:3,       
       img: require('./Images/tansuoshouzhang.png'),
       description:'探索结果 -100（最多），但是用探索手杖后结果不能低于1（探索手杖不能获得完美零解，如果探索手杖和水晶球，密闭镜，好运气事件同时生效，结果依然不能低于1，可理解成一旦用了探索手杖，就无法获得完美零解）'
       
    },
    {
      id:8,
       cart:2,
       name:'麻痹手杖',
       period:2,
       state:3,      
       img: require('./Images/mabishouzhang.png'),
       description:'将一次战斗中的两颗战斗骰结果各 +2，你可以在战斗中任何时间使用麻痹权杖，哪怕是已经掷出结果后'

    },
    {
      id:9,
       cart:2,
       name:'专注眼镜',
       period:3,
       state:3,
       require:true,
       func:function(){
          global.commonArgs.scene.addEnergyFromTool(2);
       },      
       img: require('./Images/zhuanzhuyanjing.png'),
       description:'某次激活零件时 +2能量，此效果在此次激活过程中全程有效，超出部分能量正常送到上帝之手。'

    },   
    {
      id:10,
    	cart:4,
    	name:'伊利斯的手镯',
    	buff:true,
    	period:3,
    	state:1,
    	require:true,
    	func:()=>{},     
    	img: require('./Images/yilisideshouzhuo.png'),
    	description: '每激活一个神之部件就在上帝之手上加一点能量'
    },
     {
      id:11,
    	cart:4,
    	name:'冰盘',
    	buff:true,
    	period:2,
    	state:1, 
    	require:true,
    	func:()=>{},     
    	img: require('./Images/bingpan.png'),
    	description: '将怪物的攻击骰阈 -1，如1-3变成1-2，攻击阈值至少是1'
    }
    ,
     {
      id:12,
    	cart:4,
    	name:'月光蕾丝',
    	buff:true,
    	period:1,
    	state:1,
      
    	img: require('./Images/yueguangleisi.png'),
    	description: '你可以无视遭遇战\n(按:我还没有实现这个功能，这个游戏强制性的东西不好弄)'
    }
    ,
     {
      id:13,
    	cart:4,
    	name:'炎龙之麟',
    	buff:true,
    	period:0,
        require:true,
    	state:1,
    	func:()=>{},
    	img: require('./Images/yanlongzhiling.png'),
    	description: '每划掉一天恢复一点生命值'
    }
    ,
     {
      id:14,
    	cart:4,
    	name:'熔岩碎片',
    	buff:true,
    	period:2,
    	state:1,     
        require:true,
        func:()=>{},
    	img: require('./Images/rongyansuipian.png'),
    	description: '你的命中阈值 +1，比如5-6变成4-6'
    }
    ,
     {
      id:15,
    	cart:4,
    	name:'远古记忆',  
    	period:4,  	
    	state:1,
        require:false,
        func:null,
    	img: require('./Images/yuangujiyi.png'),
    	description: '直接成功链接，在链接格（Link Box）内直接写1'
    },
    //  {
    //   id:16,
    // 	cart:3,
    // 	name:'Silica',  
    // 	period:4,  	
    // 	state:3,
     
    // 	img: require('./Images/daoju.png'),
    // 	description: '直接成功链接，在链接格（Link Box）内直接写1'
    // },
    //  {
    //   id:17,
    // 	cart:3,
    // 	name:'道具',  
    // 	period:4,  	
    // 	state:3,
     
    // 	img: require('./Images/daoju.png'),
    // 	description: '直接成功链接，在链接格（Link Box）内直接写1'
    // },
    //  {
    //   id:18,
    // 	cart:3,
    // 	name:'道具',  
    // 	period:4,  	
    // 	state:3,
     
    // 	img: require('./Images/daoju.png'),
    // 	description: '直接成功链接，在链接格（Link Box）内直接写1'
    // },
  
    





   


];



//事件都与区域有关

global.events =[
     {},
     {
        index:1,
        name:'活跃的怪物',
        img:require('./Images/huoyuedeguaiwu.png'),
        func:()=>null,
        description:'此区域的遭遇战 +2 怪物等级（最高为5）',
        period:2,  
     },
      {
        index:2,
        name:'转瞬即逝的幻象',
        img:require('./Images/huanxiang.png'),
        func:()=>{

        },
        description:'激活本区域的零件时 -1 能量需求（由4变为3）',
        period:3,  
     },
     {
        index:3,
        name:'好运气',
        img:require('./Images/haoyunqi.png'),
        func:()=>null,
        description:'本区域的探索结果拥有最多-10的修正（获得完美零解的利器）',
        period:1,  
     },
     {
        index:4,
        name:'恶劣天气',
        img:require('./Images/elietianqi.png'),
        func:()=>null,
        description:'本区域时日表上的-1，会造成倒计时表上两天的延误（即使两天中有事件使得Foul weather离开了本区域',
        period:1,  
     },






];


var names =['','十指峰','枯草原','精灵山','矮人国','狮子岭','魔法谷'];




var periods ={0:'all',1:'search',2:'battle',3:'activate',4:'link',5:'recovery'};






//全局的区域和装备信息
global.things=things;



var regions=[
  {events:[]},
   {
      index:1,
      name:names[1],
      chances:6,
      events:[],
      battleTable:[
      {level:1,monster:'ICE BEAR',atk:[1,1], hit:[5,6]},
      {level:2,monster:'ICE BEAR',atk:[1,1], hit:[6,6]},
      {level:3,monster:'ICE BEAR',atk:[1,2], hit:[6,6]},
      {level:4,monster:'ICE BEAR',atk:[1,3], hit:[6,6]},
      {level:5,monster:'ICE BEAR',atk:[1,4], hit:[6,6]},
      ],
      artifactId:6,
      componentNum:0,
      componentName:'Silver',
      daybar:[-1,-1,0,-1,0,0]

   },
    {
      index:2,
      name:names[2],
      chances:6,
      events:[],
      battleTable:[
       {level:1,monster:'ICE BEAR',atk:[1,2], hit:[5,6]},
      {level:2,monster:'ICE BEAR',atk:[1,1], hit:[6,6]},
      {level:3,monster:'ICE BEAR',atk:[1,1], hit:[6,6]},
      {level:4,monster:'ICE BEAR',atk:[1,3], hit:[5,6]},
      {level:5,monster:'ICE BEAR',atk:[1,4], hit:[6,6],spirit:true},

      ],
      artifactId:5,
      componentNum:0,
      componentName:'Quarz',
      daybar:[-1,0,0,-1,0,0]

   },
    {
      index:3,
      name:names[3],
      chances:6,
      events:[],
      battleTable:[
       {level:1,monster:'ICE BEAR',atk:[1,1], hit:[5,6]},
      {level:2,monster:'ICE BEAR',atk:[1,2], hit:[6,6]},
      {level:3,monster:'ICE BEAR',atk:[1,2], hit:[6,6]},
      {level:4,monster:'ICE BEAR',atk:[1,3], hit:[6,6]},
      {level:5,monster:'ICE BEAR',atk:[1,4], hit:[6,6]},
      ],
      artifactId:3,
      componentNum:0,
      componentName:'Gum',
      daybar:[-1,0,-1,0,-1,0]

   },
    {
      index:4,
      name:names[4],
      chances:6,
      events:[],
      battleTable:[
       {level:1,monster:'ICE BEAR',atk:[1,1], hit:[5,6]},
      {level:2,monster:'ICE BEAR',atk:[1,1], hit:[6,6]},
      {level:3,monster:'ICE BEAR',atk:[1,2], hit:[6,6],spirit:true},
      {level:4,monster:'ICE BEAR',atk:[1,3], hit:[6,6]},
      {level:5,monster:'ICE BEAR',atk:[1,4], hit:[6,6]},
      ],
      artifactId:1,
      componentNum:0,
      componentName:'Silica',
       daybar:[-1,0,-1,0,-1,0]

   },
    {
      index:5,
      name:names[5],
      chances:6,
      events:[],
      battleTable:[
       {level:1,monster:'ICE BEAR',atk:[1,1], hit:[5,6]},
      {level:2,monster:'ICE BEAR',atk:[1,1], hit:[6,6],spirit:true},
      {level:3,monster:'ICE BEAR',atk:[1,2], hit:[6,6],spirit:true},
      {level:4,monster:'ICE BEAR',atk:[1,3], hit:[6,6]},
      {level:5,monster:'ICE BEAR',atk:[1,4], hit:[6,6],spirit:true},
      ],
      artifactId:4,
      componentNum:0,
      componentName:'Wax',
       daybar:[-1,0,0,-1,0,0]

   },
    {
      index:6,
      name:names[6],
      chances:6,
      events:[],
      battleTable:[
       {level:1,monster:'ICE BEAR',atk:[1,1], hit:[5,6]},
      {level:2,monster:'ICE BEAR',atk:[1,2], hit:[5,6]},
      {level:3,monster:'ICE BEAR',atk:[1,3], hit:[5,6]},
      {level:4,monster:'ICE BEAR',atk:[1,3], hit:[6,6],spirit:true},
      {level:5,monster:'ICE BEAR',atk:[1,4], hit:[6,6],spirit:true},
      ],
      artifactId:2,
      componentNum:0,
      componentName:'Lead',
       daybar:[-1,-1,0,-1,0,0]

   }];

global.regions =regions;



global.link=[false,false,false,false,false,false];
//global.link=[true,true,true,true,true,true];


global.result =0;



global.success =function(){



}



global.fail =function(){


}



global.hasEvent =function(events,event){
     var hasEvent =false;
     events.map((e)=>{
        if(e==event)
          hasEvent =true;
     });

     return hasEvent;
}

