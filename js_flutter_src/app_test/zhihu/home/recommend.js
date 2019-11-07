//VSCode Run support=====================================================================================
//为便于在JS IDE如VSCode，webStorm里脱离APP环境执行JS，以快速验证JS代码正确性
//用g_isNativeEnvironment检查是否在App环境，
//如果不在App环境，Native接口重定向到JS同名函数打印调用
//jsFlutterRequire 转调Node运行环境中的require
//如果不能运行，核对下js_ide_node_run_support.js文件中jsFlutterLibDir 相对路径
//新建文件拷贝这个头
let g_isNativeEnvironment = typeof JSAPI_require != "undefined" ? true : false;
function jsFlutterRequire(file) {
  if (!g_isNativeEnvironment) {
    console.log("[JS]-MXJSFlutter:: jsFlutterRequire", ...arguments);
    let { calcJSFrameworkFilePath } = require("./js_ide_node_run_support.js");
    return require(calcJSFrameworkFilePath(file));
  }
    return mxRequire(file);
}
//VSCode Run support end ================================================================================

//recommend.js 正式开始，😝

let {
    runApp,
    MXJSFlutterApp,
    MXJSWidget,
    Container,
    Row,
    FlatButton,
    Text,
    Expanded,
    TextStyle,
    Colors,
    AspectRatio,
    BoxDecoration,
    DecorationImage,
    NetworkImage,
    Rect,
    BorderRadius,
    Radius,
    Icon,
    IconData,
    EdgeInsets,
    Column,
    FontWeight,
    SingleChildScrollView,
    Alignment
  
} = jsFlutterRequire("js_flutter_ui.js");

let {GlobalConfig} = jsFlutterRequire("./zhihu/global_config.js");
let {articleList} = jsFlutterRequire("./zhihu/home/article.js");
let {ReplyPage} = jsFlutterRequire("./zhihu/home/reply_page.js");

class Recommend extends MXJSWidget {
    constructor(){
        super("Recommend", {key: "Recommend"});
    }

    commonCard(article){
        let markWidget;
        if (article.imgUrl == null) {
            markWidget = new Text(
                article.user + " :  " + article.mark,{
                style: new TextStyle({
                    height: 1.3, 
                    color: GlobalConfig.fontColor
                })
            });
        } else {
            markWidget = new Row({
                children: [
                    new Expanded({
                        flex: 2,
                        child: new Container({
                            child: new Text(
                                article.user + " :  " + article.mark,{
                                style: new TextStyle({height: 1.3, color: GlobalConfig.fontColor})
                            })
                        })
                    }),
                    new Expanded({
                        flex: 1,
                        child: new AspectRatio({
                            aspectRatio: 3.0 / 2.0,
                            child:new Container({
                                foregroundDecoration:new BoxDecoration({
                                    image: new DecorationImage({
                                        image: new NetworkImage(article.imgUrl),
                                        centerSlice: Rect.fromLTRB(270.0, 180.0, 1360.0, 730.0)
                                    }),
                                    borderRadius: BorderRadius.all(Radius.circular(6.0))
                                })
                            })
                        })
                    })
                ]
            });
        }
        return new Container({
            color: GlobalConfig.cardBackgroundColor,
            margin: EdgeInsets.only({top: 5.0, bottom: 5.0}),
            child: new FlatButton({
                onPressed:function(){
                    this.navigatorPush(new ReplyPage);
                },
                child: new Column({
                    children: [
                        new Container({
                            child: new Text(
                                article.title,{
                                style: new TextStyle({fontWeight: FontWeight.bold, fontSize: 16.0, height: 1.3, color: Colors.black()})
                            }),
                            margin: EdgeInsets.only({top: 6.0, bottom: 2.0}),
                            alignment: Alignment.topLeft
                        }),
                        new Container({
                            child: markWidget,
                            margin: EdgeInsets.only({top: 6.0, bottom: 14.0}),
                            alignment: Alignment.topLeft
                        }),
                        new Container({
                            child: new Row({
                                children: [
                                    new Expanded({
                                            child: new Text(article.agreeNum.toString() + " 赞同 · " + article.commentNum.toString() + "评论",{
                                            style: new TextStyle({color: GlobalConfig.fontColor})
                                            })
                                    }),
                                    new Icon(new IconData(0xe260, {fontFamily: 'MaterialIcons'}), {color: GlobalConfig.fontColor})
                                ]
                            }),
                            padding: EdgeInsets.only({bottom: 10.0})
                        })
                    ]
                })
            })
        });
    }

    build(context){
        let widget = new SingleChildScrollView({
            child: new Container({
                margin: EdgeInsets.only({top: 5.0}),
                child: new Column({
                    children: [
                        this.commonCard(articleList[0]),
                        this.commonCard(articleList[1])
                    ]
                })
            })
        });
        return widget;
    }
}

module.exports = { Recommend };


//测试代码，修改Widget name
//在VSCode 直接运行测试JS代码正确性,在app无任何效果
IDERunFileTestWidget(Recommend);

//拷贝一份到目标文件
function IDERunFileTestWidget(TestPage) {
    if (g_isNativeEnvironment) {
        return;
    }
    class AppTest extends MXJSFlutterApp {
        constructor() {
            super("app_test", "initRouteName");
        }

        //子类重写
        //flutter->js 用于路由跳转
        //return MXJSWidget subclass
        createJSWidgetWithName(pageName) {
            let w = new TestPage;
            return w;
        }
    }

    let app = new AppTest;
    runApp(app);

    app.runWithPageName();
};