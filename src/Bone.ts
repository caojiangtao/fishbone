/**
 *
 * @author 
 *
 */
class Bone extends egret.DisplayObjectContainer {
    private fish_color: string = common.fishColor;
    private fish_line: number = 3;
    private fish_fontfamily: string = "微软雅黑"；
		private fish_length: number; //鱼的长度
		private fish_split: number = common.fish_split; //鱼刺间隔距离
		private Tree: Tree;
		private fish_txt_split: Array = [];
		private fish_txt_split2: Array = [];
		private fishLength: number; //鱼的长度
		private zhishidian: number = 0; //知识点数量
		private dalei: number = 0; //大的分类数量
		private listH: Array = []; //上面知识数量
		private listB: Array = []; //下面知识数量
		private fishHeight: number //鱼骨的高度

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			//生成约会事件对象      
		}
		//请求网络数据
		private onAddToStage(event: egret.Event) {
			let stageW: number = common.viewWidth;
			let stageH: number = common.viewHeight;
			//鱼头
			var shp: egret.Shape = new egret.Shape();
			shp.graphics.lineStyle(this.fish_line, this.fish_color);
			shp.graphics.moveTo(20, stageH / 2);
			shp.graphics.curveTo(100, stageH / 2 - 50, 160, stageH / 2 - 50);
			shp.graphics.moveTo(20, stageH / 2);
			shp.graphics.curveTo(100, stageH / 2 + 50, 160, stageH / 2 + 40);
			shp.graphics.moveTo(160, stageH / 2 - 50);
			shp.graphics.lineTo(160, stageH / 2 + 40);
			shp.graphics.endFill();
			this.addChild(shp);

			var request = new egret.HttpRequest();
			request.responseType = egret.HttpResponseType.TEXT;
			request.open(common.jsonUrl, egret.HttpMethod.GET);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.send();
			request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
			request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
			request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);

		}

		private onGetComplete(event: egret.Event): void {
    	    var request = <egret.HttpRequest>event.currentTarget;
            //获取数据
            var data:Array = JSON.parse(request.response);
            let stageW: number = common.viewWidth;
            let stageH: number = common.viewHeight;  
            this.dalei = data["list"].length;
            common.dalei = data["list"].length;
            //鱼头标题
            var _name = new egret.TextField();
            _name.size = 13;
            _name.text = data["name"];
            this.addChild(_name);
            _name.textColor=common.fishTitleColor;
            
            _name.x = 46;
            _name.y = stageH/2-10;
            var odd_fish: Array;
            for(var i: number = 0;i < data["list"].length;i++){     
                this.zhishidian += data["list"][i]["lesson"].length;
                common.zhishidian += data["list"][i]["lesson"].length;
        
               //上面鱼刺
                if(i%2 == 0){     
                    var j: number = data["list"][i]["lesson"].length;
                    var name: string = data["list"][i]["name"];  
                    var level: string = common.textColor[data["list"][i]["level"]-1];
                    this.Tree = new Tree(i,j,-80,name,level);
                    this.addChild(this.Tree);
                    this.Tree.y = stageH/2;
                    common.allTree.push(this.Tree);  
                    var txtLengthList: Array = [];    
                    this.listH.push(data["list"][i]["lesson"].length);
                    for(var j: number = 0;j < data["list"][i]["lesson"].length;j++) {    
                        var len = data["list"][i]["lesson"][j]["level"]-1;     
                        this.Tree.drawLine(data["list"][i]["lesson"][j]["title"],j,data["list"][i]["lesson"][j]["url"],common.textColor[len]);
                        var _length: number = this.len(data["list"][i]["lesson"][j]["title"]);
                        txtLengthList.push(_length);  
                        
                    } 
                         
                    txtLengthList.sort(function(a,b){ return a-b});
                    var splitLength:number = txtLengthList[txtLengthList.length-1];
                    if(splitLength<10){ splitLength = 10}
                    this.fish_txt_split.push(splitLength);
                
                    if(i==0){
                        this.Tree.x = 246;     
                    }else{
                        this.Tree.x =common.allTree[i / 2 - 1].x + this.fish_txt_split[i/2-1]*10;
                
                    }
                 
                //下面鱼刺   
                }else{ 
                           
                    var level: string = common.textColor[data["list"][i]["level"]-1];
                    var j: number    = data["list"][i]["lesson"].length;
                    var name: string = data["list"][i]["name"];
                    var url:string   = data["list"][i]["url"];
                    this.Tree = new Tree(i,j,80,name,level);
                    this.addChild(this.Tree);
                    this.Tree.y = stageH/2;
                    common.allTree2.push(this.Tree);  
                    var txtLengthList2: Array = [];
                    this.listB.push(data["list"][i]["lesson"].length);
                    for(var j: number = 0;j < data["list"][i]["lesson"].length;j++) {
                        var len = data["list"][i]["lesson"][j]["level"]-1;
                        this.Tree.drawLine(data["list"][i]["lesson"][j]["title"],j,data["list"][i]["lesson"][j]["url"],common.textColor[len]);
    //                    var _length: number = data["list"][i]["lesson"][j]["title"].length;
                        var _length: number = this.len(data["list"][i]["lesson"][j]["title"]);
                        txtLengthList2.push(_length);  
                    } 
                   
                    if(i == 1) {
                        this.Tree.x = 230;
                    } else {
                        this.Tree.x = common.allTree2[(i+1)/2-2].x + this.fish_txt_split2[(i+1)/2-2 ] * 10;
                    }
                    txtLengthList2.sort(function(a,b) { return a - b });
                    var splitLength2: number = txtLengthList2[txtLengthList2.length - 1];
                    if(splitLength2 < 10) { splitLength2 = 10 }
                    this.fish_txt_split2.push(splitLength2);
               } 
                
           /////上下结束
           
           
                this.listH.sort(function(a,b) { return a - b });
                this.listB.sort(function(a,b) { return a - b });
                this.fishHeight = this.listH[this.listH.length - 1] * 30 + this.listB[this.listB.length - 1]* 30 //鱼骨的实际高度
                this.touchEnabled = true;
                this.height = this.fishHeight+300;
                this.addEventListener(egret.TouchEvent.TOUCH_MOVE,function() {
                 var tw = egret.Tween.get(this);
                tw.to({ y: this.listH[this.listH.length - 1] * 30 },500);},this);


                if(i == data["list"].length - 1) {   
                    if(common.allTree2[common.allTree2.length - 1] == undefined){
                        this.fishLength = 230;
                        this.darwfish();
                        return false;
                    }
                    if(common.allTree2[common.allTree2.length - 1].x > common.allTree[common.allTree.length - 1].x){
                        this.fishLength = common.allTree2[common.allTree2.length - 1].x || 230;
                    }else{
                        this.fishLength = common.allTree[common.allTree.length - 1].x || 230；
                    }

                
                    
                    this.darwfish();

                } 
            
        }

 
    }
    
    private darwfish():void{
        var top: number;
        //黑色背景做为滚动触摸
        if(this.fishHeight > common.viewHeight) {
            top = -(this.fishHeight - common.viewHeight) / 2;
        } else {
            top = 0;
        }
        var toplength: number = this.listH[this.listH.length - 1] * 30 
        var background: egret.Shape = new egret.Shape();
        background.graphics.beginFill(common.bcColor,1);
        background.graphics.drawRect(0,0,this.fishLength,this.fishHeight);
        background.graphics.endFill();
        background.x = 0;
        background.alpha = 0;
        background.y = top;
        this.addChildAt(background,0); 
                    
        //绘制鱼的身体
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(this.fish_color,this.fish_line);
        shp.graphics.drawRect(160,common.viewHeight / 2 - 5,this.fishLength,5);
        shp.graphics.endFill();
        this.addChild(shp)
                    //绘制鱼尾
        var shp2: egret.Shape = new egret.Shape();
        shp2.graphics.lineStyle(this.fish_line,this.fish_color);
        shp2.graphics.moveTo(this.fishLength + 160,common.viewHeight / 2 - 5);
        shp2.graphics.lineTo(this.fishLength + 200,common.viewHeight / 2 - 36);
        shp2.graphics.lineTo(this.fishLength + 180,common.viewHeight / 2 - 3);
        shp2.graphics.lineTo(this.fishLength + 200,common.viewHeight / 2 + 21);
        shp2.graphics.lineTo(this.fishLength + 160,common.viewHeight / 2);
        this.addChild(shp2);
    }
    
    private len(txt:string):void{
    
            var len = 0;
            for(var i = 0;i < txt.length;i++) {
                if(txt.charCodeAt(i) > 127 || txt.charCodeAt(i) == 94) {
                    len += 2;
                } else {
                    len++;
                }
            }
            return len; 
    
    }

    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("get error : " + event);
    }
    private onGetProgress(event: egret.ProgressEvent): void {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }
}