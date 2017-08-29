var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Type = (function (_super) {
    __extends(Type, _super);
    function Type(color, text) {
        var _this = _super.call(this) || this;
        var label = new egret.TextField();
        _this.addChild(label);
        label.text = text;
        label.size = 12;
        label.textColor = color;
        label.border = true;
        label.borderColor = color;
        label.width = 80;
        label.height = 20;
        label.background = 0x000000;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        return _this;
    }
    return Type;
}(egret.Sprite));
__reflect(Type.prototype, "Type");
