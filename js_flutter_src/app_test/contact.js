//VSCode Run support=====================================================================================
//为便于在JS IDE如VSCode，webStorm里脱离APP环境执行JS，以快速验证JS代码正确性
//用g_isNativeEnvironment检查是否在App环境，
//如果不在App环境，Native接口重定向到JS同名函数打印调用
//jsFlutterRequire 转调Node运行环境中的require
//真是为了JS菜鸟就是我 操碎了心
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

//contact.js 正式开始，😝

let {
    MXJSLog,
    runApp,
    MXJSFlutterApp,
    MXJSWidget,
    Scaffold,
    Container,
    Color,
    Text,
    Icon,
    IconData,
    Theme,
    ThemeData,
    CustomScrollView,
    SliverAppBar,
    SliverChildListDelegate,
    EdgeInsets,
    Expanded,
    Column,
    Image,
    BoxFit,
    Row,
    BorderSide,
    BoxDecoration,
    Border,
    MergeSemantics,
    SizedBox,
    IconButton,
    PopupMenuButton,
    PopupMenuItem,
    FlexibleSpaceBar,
    Stack,
    StackFit,
    AnnotatedRegion,
    DecoratedBox,
    LinearGradient,
    Alignment,
    SliverList,
    SystemUiOverlayStyle,
    Padding,
    DefaultTextStyle,
    MXJSStatelessWidget,
    SafeArea,
    Colors
  } = jsFlutterRequire("js_flutter_ui.js");

let _kGalleryAssetsPackage = 'js_flutter_src/app_test/flutter_gallery_assets/';

class ContactCategory extends MXJSWidget {
    constructor({icon, children} = {}) {
      super('ContactCategory');

      this.icon = icon;
      this.children = children;
    }

    build(context) {
        let themeData = Theme.of(context);
        let widget = new Container({
            padding: EdgeInsets.symmetric({
                vertical: 16.0
            }),
            decoration: new BoxDecoration({
                border: new Border({
                    bottom: new BorderSide({
                        color: themeData.dividerColor
                    })
                })
            }),
            child: new DefaultTextStyle({
                style: themeData.textTheme.subhead,
                child: new SafeArea({
                    top: false,
                    bottom: false,
                    child: new Row({
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                            new Container({
                                padding: EdgeInsets.symmetric({
                                    vertical: 24.0
                                }),
                                width: 72.0,
                                child: new Icon(this.icon, {
                                    color: themeData.primaryColor
                                })
                            }),
                            new Expanded({
                                child: new Column({
                                    children: this.children
                                })
                            })
                        ]
                    })
                })
            })
        });

        return widget;
    }
}

class ContactItem extends MXJSStatelessWidget {
    constructor({icon, lines, tooltip, onPressed} = {}) {
        super('ContactItem');

        this.icon = icon;
        this.lines = lines;
        this.tooltip = tooltip;
        this.onPressed = onPressed;
    }
    
    build(context) {
        let themeData = Theme.of(context);
        let columnChildren = [];
        let rowChildren = [];

        let length = this.lines.length;
        for(let i = 0; i < length; i++) {
            if (i != length -1) {
                columnChildren.push(new Text(this.lines[i]));
            }
            else {
                columnChildren.push(new Text(this.lines[i], {style: themeData.textTheme.caption}));
            }
        }
        rowChildren = [
            new Expanded({
                child: new Column({
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: columnChildren,
                }),
            }),
        ];

        if (this.icon != null) {
            rowChildren.push(
                new SizedBox({
                    width: 72.0,
                    child: new IconButton({
                        icon: new Icon(this.icon),
                        color: themeData.primaryColor,
                        onPressed: this.onPressed ,
                    }),
                })
            );
        }

        let widget = new MergeSemantics({
            child: new Padding({
                padding: EdgeInsets.symmetric({
                    vertical: 16.0,
                }),
                child: new Row({
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: rowChildren,
                }),
            }),
        });
    
        return widget;
    }
}

AppBarBehavior = {
    normal: 0, 
    pinned: 1, 
    floating: 2, 
    snapping: 3, 
};

class JSContactPage extends MXJSWidget { 
    constructor() {
        super('JSContactPage');
    }

    build(context) {
        let widget = new Theme({
            data: new ThemeData({
                brightness: Brightness.light,
                primarySwatch: Colors.indigo,
                platform: Theme.of(context).platform
            }),
            child: new Scaffold({
                body: new CustomScrollView({
                  slivers: this.buildBody(context)
                })
            })
        });
        return widget;
    }

    buildBody(context) {
        let appBarHeight = 256.0;
        let appBarBehavior = AppBarBehavior.pinned;
        let themeData = Theme.of(context);
        let widget = [
            new SliverAppBar({
                backgroundColor: themeData.primaryColor,
                expandedHeight: appBarHeight,
                pinned: appBarBehavior == AppBarBehavior.pinned,
                floating: appBarBehavior == AppBarBehavior.floating || appBarBehavior == AppBarBehavior.snapping,
                snap: appBarBehavior == AppBarBehavior.snapping,
                actions: [
                    new IconButton({
                        icon: new Icon(new IconData(0xe150, {fontFamily:'MaterialIcons'})),
                        tooltip: 'Edit',
                        onPressed: function () {
                            MXJSLog.log('edit button pressed');
                        }
                    }),
                    new PopupMenuButton({
                        onSelected: function(args) {
                            MXJSLog.log('more button pressed, index ' + args);
                        },
                        itemBuilder: function(context) {
                            let list = [
                                new PopupMenuItem({
                                    value: AppBarBehavior.normal,
                                    child: new Text('App bar scrolls away'),
                                }),
                                new PopupMenuItem({
                                    value: AppBarBehavior.pinned,
                                    child: new Text('App bar stays away'),
                                }),
                                new PopupMenuItem({
                                    value: AppBarBehavior.floating,
                                    child: new Text('App bar floats'),
                                }),
                                new PopupMenuItem({
                                    value: AppBarBehavior.snapping,
                                    child: new Text('App bar snaps'),
                                }),
                            ];
                            return list;
                        }
                    })
                ],
                flexibleSpace: new FlexibleSpaceBar({
                    title: new Text('Ali Connors'),
                    background: new Stack({
                        fit: StackFit.expand,
                        children: [
                            Image.asset(_kGalleryAssetsPackage + 'people/ali_landscape.png', {
                                package: 'flutter_gallery_assets',
                                fit: BoxFit.cover,
                                height: appBarHeight
                            }),
                            new DecoratedBox({
                                decoration: new BoxDecoration({
                                    gradient: new LinearGradient({
                                        begin: new Alignment(0.0, -1.0),
                                        end: new Alignment(0.0, -0.4),
                                        colors: [
                                            new Color(0x60000000), 
                                            new Color(0x00000000),
                                        ]
                                    })
                                })
                            })
                        ]
                    })
                })
            }),
            new SliverList({
                delegate: new SliverChildListDelegate([
                    new AnnotatedRegion({
                        value: new SystemUiOverlayStyle({
                            systemNavigationBarColor: new Color(0xFF000000),
                            systemNavigationBarDividerColor: null,
                            statusBarColor: null,
                            systemNavigationBarIconBrightness: Brightness.light,
                            statusBarIconBrightness: Brightness.light,
                            statusBarBrightness:Brightness.dark
                        }),
                        child: new ContactCategory({
                            icon: new IconData(0xe0b0, {fontFamily:'MaterialIcons'}),
                            children:[
                                new ContactItem({
                                    icon: new IconData(0xe0c9, {fontFamily:'MaterialIcons'}),
                                    tooltip: 'Send message',
                                    onPressed: function() {
                                        MXJSLog.log('Send message');
                                    },
                                    lines: [
                                        '(650) 555-1234',
                                        'Mobile'
                                    ]
                                }),
                                new ContactItem({
                                    icon: new IconData(0xe0c9, {fontFamily:'MaterialIcons'}),
                                    tooltip: 'Send message',
                                    onPressed: function () {
                                        MXJSLog.log('Send message');
                                    },
                                    lines: [
                                        '(323) 555-6789',
                                        'Work'
                                    ]
                                }),
                                new ContactItem({
                                    icon: new IconData(0xe0c9, {fontFamily:'MaterialIcons'}),
                                    tooltip: 'Send message',
                                    onPressed: function () {
                                        MXJSLog.log('Send message');
                                    },
                                    lines: [
                                        '(650) 555-6789',
                                        'Home'
                                    ]
                                })
                            ]
                        })
                    }),
                    new ContactCategory({
                        icon: new IconData(0xe0d0, {fontFamily:'MaterialIcons'}),
                        children:[
                            new ContactItem({
                                icon: new IconData(0xe0be, {fontFamily:'MaterialIcons'}),
                                tooltip: 'Send personal e-mail',
                                onPressed: function () {
                                    MXJSLog.log('Send personal e-mail');
                                },
                                lines: [
                                    'ali_connors@example.com',
                                    'Personal'
                                ]
                            }),
                            new ContactItem({
                                icon: new IconData(0xe0be, {fontFamily:'MaterialIcons'}),
                                tooltip: 'Send personal e-mail',
                                onPressed: function () {
                                    MXJSLog.log('Send personal e-mail');
                                },
                                lines: [
                                    'aliconnors@example.com',
                                    'Work'
                                ]
                            })
                        ]
                    }),
                    new ContactCategory({
                        icon: new IconData(0xe0c8, {fontFamily:'MaterialIcons'}),
                        children:[
                            new ContactItem({
                                icon: new IconData(0xe55b, {fontFamily:'MaterialIcons'}),
                                tooltip: 'Open map',
                                onPressed: function () {
                                    MXJSLog.log('Open map');
                                },
                                lines: [
                                    '2000 Main Street',
                                    'San Francisco, CA',
                                    'Home'
                                ]
                            }),
                            new ContactItem({
                                icon: new IconData(0xe55b, {fontFamily:'MaterialIcons'}),
                                tooltip: 'Open map',
                                onPressed: function () {
                                    MXJSLog.log('Open map');
                                },
                                lines: [
                                    '1600 Amphitheater Parkway',
                                    'Mountain View, CA',
                                    'Work'
                                ]
                            }),
                            new ContactItem({
                                icon: new IconData(0xe55b, {fontFamily:'MaterialIcons'}),
                                tooltip: 'Open map',
                                onPressed: function () {
                                    MXJSLog.log('Open map');
                                },
                                lines: [
                                    '126 Severyns Ave',
                                    'Mountain View, CA',
                                    'Jet Travel'
                                ]
                            })
                        ]
                    }),
                    new ContactCategory({
                        icon: new IconData(0xe8df, {fontFamily:'MaterialIcons'}),
                        children:[
                            new ContactItem({
                                lines: [
                                    'Birthday',
                                    'January 9th, 1989'
                                ]
                            }),
                            new ContactItem({
                                lines: [
                                    'Wedding anniversary',
                                    'June 21st, 2014'
                                ]
                            }),
                            new ContactItem({
                                lines: [
                                    'First day in office',
                                    'January 20th, 2015'
                                ]
                            }),
                            new ContactItem({
                                lines: [
                                    'Last day in office',
                                    'August 9th, 2018'
                                ]
                            })
                        ]
                    })
                ])
            })
        ];
        return widget;
    }
}

module.exports = {JSContactPage};

//测试代码，修改Widget name
//在VSCode 直接运行测试JS代码正确性,在app无任何效果
IDERunFileTestWidget(JSContactPage);

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