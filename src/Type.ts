
class Type extends egret.Sprite {
	public constructor(color:string,text:string) {
    	super();
        var label: egret.TextField = new egret.TextField();
        this.addChild(label);
        label.text = text;
        label.size = 12;
        label.textColor = color;
        label.border = true;
        label.borderColor = color;
        label.width = 80;
        label.height = 20;
        label.background=0x000000;      
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
    	
	}
}
