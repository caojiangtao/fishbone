var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.textlist = common.textlist; //知识点
        _this.textColor = common.textColor; //知识点对应的颜色
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    //初始化
    Main.prototype.onAddToStage = function (event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.createGameScene();
        }
    };
    Main.prototype.createGameScene = function () {
        var stageW = common.viewWidth;
        var stageH = common.viewHeight;
        //加入鱼到可滚动窗口
        common.fish = new Bone();
        var myscrollView = new egret.ScrollView();
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
        var bgJpg = common.createBitmapByName("bg_jpg");
        bgJpg.x = 0;
        bgJpg.y = 0;
        bgJpg.width = common.viewWidth;
        bgJpg.height = common.viewHeight;
        this.addChild(bgJpg);
        var label = new egret.TextField();
        label.size = 12;
        setTimeout(function () {
            label.text = "*本职业包含" + common.dalei + "个大类" + common.zhishidian + "个小类(持续完善...)";
        }, 1000);
        label.textColor = 0x9099a2;
        label.background = true;
        label.backgroundColor = 0x002341;
        label.height = 14;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.x = 300;
        label.y = 370;
        this.addChild(myscrollView);
        this.addChild(label);
    };
    Main.prototype.onTouchTap = function (evt) {
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
