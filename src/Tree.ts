/**
 *
 * @author 
 *
 */
class Tree extends egret.Sprite {
    private fish_color: string = common.fishColor;
    private fish_line: number = 1;
    private fish_fontfamily: string = "微软雅黑"；
    private  fish_length:number; //鱼的长度
    private  _width:number;   //线终点宽度
    private _height:number;   //线终点高度
    private _rotation:number; //旋转角度
    private _name:string;   //分类名称
    private _lesson:string; //课程名称
    private _color:any;
    private shp3: egret.Shape;
    private tx: egret.TextField;
    private _visible:Boolean = true;
    private sprcon:egret.Sprite = new egret.Sprite();
    
    public constructor(_width:number,_height:number,rotation:number,_name:string,_color:string) {
        super();
        this._height = _height;
        this._width = _width;
        this._rotation = rotation;
        this._name = _name;
        this._color = _color;

      this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event: egret.Event) {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(this.fish_line,this.fish_color);
        shp.graphics.moveTo(0,0);
        shp.graphics.lineTo(30 * this._height,0);
        shp.rotation = this._rotation;
        shp.graphics.endFill();
        this.addChild(shp);
        //知识点标题
        var responseLabel2 = new egret.TextField();
        responseLabel2.size = 13;
        responseLabel2.textColor = common.fishColor;
        responseLabel2.text = this._name;
        this.addChild(responseLabel2);
        if(this._width % 2 == 0){
            responseLabel2.x = -15;
            responseLabel2.y = -30;
        }else{
            responseLabel2.x = -5;
            responseLabel2.y = 30;
        } 
   
        responseLabel2.rotation = this._rotation; 
        
//        //圆点
       var circle: egret.Shape = new egret.Shape();
       circle.graphics.beginFill(0x73dcff,1);
        circle.graphics.drawCircle(0,0,4);
        circle.graphics.endFill();
       this.addChild(circle);
       if(this._width % 2 == 0) {
           circle.y = -20;
            circle.x = -10;
        } else {
            circle.y = 20;
            circle.x = -15;
        }
       //开启点击事件
        circle.touchEnabled = true;
        circle.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this); 
             
    }
    private onTouch(evt: egret.TouchEvent){
        
        //上面鱼刺
        if(this._width % 2 == 0) {  
            var test = common.allTree[this._width / 2 + 1];
        }else{
            var test = common.allTree2[(this._width-1)/2+1];
        }
           
     
        if(this.sprcon.visible == false){
            this.sprcon.visible = true; 
           
            if(test == undefined) return false;
            test.x = test.x + 70;
        }else{
            this.sprcon.visible = false; 

            if(test == undefined) return false;
           test.x = test.x - 70;
        }
        
    }
    private len(txt: string): void {

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
    private drawLine(lesson:string,_number:number,_url:string,_color:string):void{
        var box:egret.Sprite;
        var _length:number = this.len(lesson);
        this.shp3 = new egret.Shape();
        this.shp3.graphics.lineStyle(this.fish_line,this.fish_color);
        this.shp3.graphics.moveTo(0,0);
        this.shp3.graphics.lineTo(_length * 7,0);
        this.shp3.graphics.endFill();
        this.sprcon.addChild(this.shp3);
        
        this.tx = new egret.TextField;
        this.tx.textFlow = new Array<egret.ITextElement>(
            { text:lesson,style: { "href": _url} }
        ); 
        this.tx.visible = this._visible;
        this.tx.size=12;
        var txtclolr: string = _color || 0xffffff;
        this.tx.textColor = txtclolr;
        this.tx.touchEnabled = true;
        this.sprcon.addChild(this.tx);
        this.addChild(this.sprcon);
        
        if(this._width % 2 == 0) {
            this.shp3.x = 6 + 5 * _number;
            this.shp3.y = -27 + _number * -30;
            this.tx.x = 15 + 5 * _number;
            this.tx.y = -42 + _number * -30;
        
        }else{
            this.shp3.x = 7+ 5 * _number;
            this.shp3.y = 28 + _number * 30;
            this.tx.x = 15 + 5 * _number;
            this.tx.y = 15 + _number * 30;
            
        } 
        
  
        
    }

}
