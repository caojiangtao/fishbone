
class Main extends egret.DisplayObjectContainer {
    private type: Type;   //类型
    private textlist: Array = common.textlist; //知识点
    private textColor: Array = common.textColor; //知识点对应的颜色
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    //初始化
    private onAddToStage(event: egret.Event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    } 
    
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.loadGroup("preload");
    }
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if(event.groupName == "preload") {
           RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
           this.createGameScene();
        }
    }
    private createGameScene() {

        let stageW: number = common.viewWidth;
        let stageH: number = common.viewHeight;
        //加入鱼到可滚动窗口
        common.fish = new Bone();  
        
        let myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(common.fish);
        myscrollView.width = common.viewWidth;
        myscrollView.height = common.viewHeight;
        myscrollView.x = 0;
        myscrollView.y = 0;
        myscrollView.bounces = false;
        myscrollView.anchorOffsetX = 0;
        myscrollView.anchorOffsetY = 0;
        myscrollView.verticalScrollPolicy = "auto";
        myscrollView.horizontalScrollPolicy = "auto";
        //背景图，用来展现ScrollView 的边界
 
        var  bgJpg = common.createBitmapByName("bg_jpg");  
        bgJpg.x = 0;
        bgJpg.y =0;
        bgJpg.width = common.viewWidth;
        bgJpg.height = common.viewHeight;
        
        this.addChild(bgJpg);
        var label: egret.TextField = new egret.TextField();
   
        label.size = 12;
        setTimeout(function(){
            label.text = "*本职业包含" + common.dalei + "个大类" + common.zhishidian + "个小类(持续完善...)";
            },1000)   
        label.textColor = 0x9099a2;
        label.background = true;
        label.backgroundColor = 0x002341;
        label.height = 14;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.x = 300;
        label.y = 370;
       
        this.addChild(myscrollView);
        this.addChild(label);
       
        
    }
    private onTouchTap(evt: egret.TouchEvent) {

    }
}


