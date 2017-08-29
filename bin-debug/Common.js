var common;
(function (common) {
    //export var jsonUrl: string = '/zhiye/api/fish?slug=' + $('#slug').data('slug'); //网络数据请求；
    common.jsonUrl = 'src/fish.json';
    common.textlist = ["入门知识点", "进阶知识点", "深入知识点", "不授课知识点"]; //知识点
    common.textColor = ["0x11c780", "0x109ac0", "0x9c76ff", "0xff9f14", "0xdf5142"]; //知识点对应的颜色
    common.viewWidth = 770; //canvas宽
    common.viewHeight = 400; //canvas高
    common.fishColor = 0x73dcff; //鱼身体颜色
    common.fishTitleColor = 0x00ff00; //鱼头标题颜色
    common.bcColor = 0x404040; //背景颜色
    common.fish_split = 90; //鱼刺间隔距离
    common.allTree = [];
    common.allTree2 = [];
    common.zhishidian = 0;
    common.dalei = 0;
    /**
 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
 */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    common.createBitmapByName = createBitmapByName;
})(common || (common = {}));
