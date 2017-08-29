var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var Tree = (function (_super) {
    __extends(Tree, _super);
    function Tree(_width, _height, rotation, _name, _color) {
        var _this = _super.call(this) || this;
        _this.fish_color = common.fishColor;
        _this.fish_line = 1;
        _this.fish_fontfamily = "微软雅黑";
        _this._visible = true;
        _this.sprcon = new egret.Sprite();
        _this._height = _height;
        _this._width = _width;
        _this._rotation = rotation;
        _this._name = _name;
        _this._color = _color;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Tree.prototype.onAddToStage = function (event) {
        var shp = new egret.Shape();
        shp.graphics.lineStyle(this.fish_line, this.fish_color);
        shp.graphics.moveTo(0, 0);
        shp.graphics.lineTo(30 * this._height, 0);
        shp.rotation = this._rotation;
        shp.graphics.endFill();
        this.addChild(shp);
        //知识点标题
        var responseLabel2 = new egret.TextField();
        responseLabel2.size = 13;
        responseLabel2.textColor = common.fishColor;
        responseLabel2.text = this._name;
        this.addChild(responseLabel2);
        if (this._width % 2 == 0) {
            responseLabel2.x = -15;
            responseLabel2.y = -30;
        }
        else {
            responseLabel2.x = -5;
            responseLabel2.y = 30;
        }
        responseLabel2.rotation = this._rotation;
        //        //圆点
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x73dcff, 1);
        circle.graphics.drawCircle(0, 0, 4);
        circle.graphics.endFill();
        this.addChild(circle);
        if (this._width % 2 == 0) {
            circle.y = -20;
            circle.x = -10;
        }
        else {
            circle.y = 20;
            circle.x = -15;
        }
        //开启点击事件
        circle.touchEnabled = true;
        circle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    Tree.prototype.onTouch = function (evt) {
        //上面鱼刺
        if (this._width % 2 == 0) {
            var test = common.allTree[this._width / 2 + 1];
        }
        else {
            var test = common.allTree2[(this._width - 1) / 2 + 1];
        }
        if (this.sprcon.visible == false) {
            this.sprcon.visible = true;
            if (test == undefined)
                return false;
            test.x = test.x + 70;
        }
        else {
            this.sprcon.visible = false;
            if (test == undefined)
                return false;
            test.x = test.x - 70;
        }
    };
    Tree.prototype.len = function (txt) {
        var len = 0;
        for (var i = 0; i < txt.length; i++) {
            if (txt.charCodeAt(i) > 127 || txt.charCodeAt(i) == 94) {
                len += 2;
            }
            else {
                len++;
            }
        }
        return len;
    };
    Tree.prototype.drawLine = function (lesson, _number, _url, _color) {
        var box;
        var _length = this.len(lesson);
        this.shp3 = new egret.Shape();
        this.shp3.graphics.lineStyle(this.fish_line, this.fish_color);
        this.shp3.graphics.moveTo(0, 0);
        this.shp3.graphics.lineTo(_length * 7, 0);
        this.shp3.graphics.endFill();
        this.sprcon.addChild(this.shp3);
        this.tx = new egret.TextField;
        this.tx.textFlow = new Array({ text: lesson, style: { "href": _url } });
        this.tx.visible = this._visible;
        this.tx.size = 12;
        var txtclolr = _color || 0xffffff;
        this.tx.textColor = txtclolr;
        this.tx.touchEnabled = true;
        this.sprcon.addChild(this.tx);
        this.addChild(this.sprcon);
        if (this._width % 2 == 0) {
            this.shp3.x = 6 + 5 * _number;
            this.shp3.y = -27 + _number * -30;
            this.tx.x = 15 + 5 * _number;
            this.tx.y = -42 + _number * -30;
        }
        else {
            this.shp3.x = 7 + 5 * _number;
            this.shp3.y = 28 + _number * 30;
            this.tx.x = 15 + 5 * _number;
            this.tx.y = 15 + _number * 30;
        }
    };
    return Tree;
}(egret.Sprite));
__reflect(Tree.prototype, "Tree");
