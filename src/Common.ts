module common {
  //export var jsonUrl: string = '/zhiye/api/fish?slug=' + $('#slug').data('slug'); //网络数据请求；
   export var jsonUrl: string = 'src/fish.json';
    export var textlist: Array   = ["入门知识点","进阶知识点","深入知识点","不授课知识点"]; //知识点
    export var textColor: Array = ["0x11c780","0x109ac0","0x9c76ff","0xff9f14","0xdf5142"]; //知识点对应的颜色
    export var viewWidth:number  = 770;  //canvas宽
    export var viewHeight:number = 400; //canvas高
    export var fishColor: any = 0x73dcff; //鱼身体颜色
    export var fishTitleColor:any = 0x00ff00  //鱼头标题颜色
    export var bcColor: any = 0x404040； //背景颜色
    export var fish_split: number = 90; //鱼刺间隔距离
    export var allTree: Array = [];
    export var allTree2: Array = [];
    export var zhishidian:number =0;
    export var dalei:number=0;
    export var fish:Object;
    
    /**
 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
 */
    export function createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}