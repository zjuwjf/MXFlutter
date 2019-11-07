//VSCode Run support=====================================================================================
//为便于在JS IDE如VSCode，webStorm里脱离APP环境执行JS，以快速验证JS代码正确性
//如果不在App环境，Native接口重定向到JS同名函数打印调用
//jsFlutterRequire 转调Node运行环境中的require
//只有js_framework_lib中的文件，才能用这个头
let jsFlutterRequire = typeof mxRequire != "undefined" ? mxRequire : require;
//VSCode Run support end ================================================================================

//js_flutter_cupertino.js 正式开始，😝

let {
    DartClass,
    FlutterWidget
} = jsFlutterRequire("./js_flutter_basic_types.js");


class CupertinoActivityIndicator extends FlutterWidget {
    constructor ({
        key,
        animating,
        radius
    } = {}) {
        super();

        this.key = key;
        this.animating = animating;
        this.radius = radius;
    }
}

class CupertinoAlertDialog extends FlutterWidget {
    constructor ({
        key,
        title,
        content,
        actions,
        scrollController,
        actionScrollController
    } = {}) {
        super();

        this.key = key;
        this.title = title;
        this.content = content;
        this.actions = actions;
        this.scrollController = scrollController;
        this.actionScrollController = actionScrollController;
    }
}

class CupertinoButton extends FlutterWidget {
    constructor ({
        child,
        padding,
        color,
        disabledColor,
        minSize,
        pressedOpacity,
        borderRadius,
        onPressed
    } = {}) {
        super();

        this.child = child;
        this.padding = padding;
        this.color = color;
        this.disabledColor = disabledColor;
        this.minSize = minSize;
        this.pressedOpacity = pressedOpacity;
        this.borderRadius = borderRadius;
        this.onPressed = onPressed;
    }
}

class CupertinoDialog extends FlutterWidget {
    constructor ({
        key,
        child
    } = {}) {
        super();

        this.key = key;
        this.child = child;
    }
}

class CupertinoDialogAction extends FlutterWidget {
    constructor ({
        onPressed,
        isDefaultAction,
        isDestructiveAction,
        textStyle,
        child
    } = {}) {
        super();

        this.onPressed = onPressed;
        this.isDefaultAction = isDefaultAction;
        this.isDestructiveAction = isDestructiveAction;
        this.textStyle = textStyle;
        this.child = child;
    }
}

class CupertinoSlider extends FlutterWidget {
    constructor ({
        key,
        value,
        onChanged,
        onChangeStart,
        onChangeEnd,
        min,
        max,
        divisions,
        activeColor
    } = {}) {
        super();

        this.key = key;
        this.value = value;
        this.onChanged = onChanged;
        this.onChangeStart = onChangeStart;
        this.onChangeEnd = onChangeEnd;
        this.min = min;
        this.max = max;
        this.divisions = divisions;
        this.activeColor = activeColor;
    }
}

class CupertinoSwitch extends FlutterWidget {
    constructor ({
        key,
        value,
        onChanged,
        activeColor,
        dragStartBehavior
    } = {}) {
        super();

        this.key = key;
        this.value = value;
        this.onChanged = onChanged;
        this.activeColor = activeColor;
        this.dragStartBehavior = dragStartBehavior;
    }
}

class CupertinoPageTransition extends FlutterWidget {
    constructor ({
        key,
        primaryRouteAnimation,
        secondaryRouteAnimation,
        child,
        linearTransition
    } = {}) {
        super();

        this.key = key;
        this.primaryRouteAnimation = primaryRouteAnimation;
        this.secondaryRouteAnimation = secondaryRouteAnimation;
        this.child = child;
        this.linearTransition = linearTransition;
    }
}

class CupertinoFullscreenDialogTransition extends FlutterWidget {
    constructor ({
        key,
        animation,
        child
    } = {}) {
        super();

        this.key = key;
        this.animation = animation;
        this.child = child;
    }
}

class CupertinoNavigationBar extends FlutterWidget {
    constructor ({
        key,
        leading,
        automaticallyImplyLeading,
        automaticallyImplyMiddle,
        previousPageTitle,
        middle,
        trailing,
        border,
        backgroundColor,
        padding,
        actionsForegroundColor,
        transitionBetweenRoutes,
        heroTag
    } = {}) {
        super();

        this.key = key;
        this.leading = leading;
        this.automaticallyImplyLeading = automaticallyImplyLeading;
        this.automaticallyImplyMiddle = automaticallyImplyMiddle;
        this.previousPageTitle = previousPageTitle;
        this.middle = middle;
        this.trailing = trailing;
        this.border = border;
        this.backgroundColor = backgroundColor;
        this.padding = padding;
        this.actionsForegroundColor = actionsForegroundColor;
        this.transitionBetweenRoutes = transitionBetweenRoutes;
        this.heroTag = heroTag;
    }
}

class CupertinoTabBar extends FlutterWidget {
    constructor ({
        key,
        items,
        onTap,
        currentIndex,
        backgroundColor,
        activeColor,
        inactiveColor,
        iconSize,
        border
    } = {}) {
        super();

        this.key = key;
        this.items = items;
        this.onTap = onTap;
        this.currentIndex = currentIndex;
        this.backgroundColor = backgroundColor;
        this.activeColor = activeColor;
        this.inactiveColor = inactiveColor;
        this.iconSize = iconSize;
        this.border = border;
    }
}

class CupertinoPageScaffold extends FlutterWidget {
    constructor ({
        key,
        navigationBar,
        backgroundColor,
        resizeToAvoidBottomInset,
        child
    } = {}) {
        super();

        this.key = key;
        this.navigationBar = navigationBar;
        this.backgroundColor = backgroundColor;
        this.resizeToAvoidBottomInset = resizeToAvoidBottomInset;
        this.child = child;
    }
}

class CupertinoTabScaffold extends FlutterWidget {
    constructor ({
        key,
        tabBar,
        tabBuilder,
        backgroundColor,
        resizeToAvoidBottomInset
    } = {}) {
        super();

        this.key = key;
        this.tabBar = tabBar;
        this.tabBuilder = tabBuilder;
        this.backgroundColor = backgroundColor;
        this.resizeToAvoidBottomInset = resizeToAvoidBottomInset;

        // 本地创建的，供flutter使用
        this.children = [];
    }

    preBuild(jsWidget, buildContext) {
        if(this.tabBuilder){
            this.children = this.tabBuilder(buildContext);
            delete this.tabBuilder;
        }

        super.preBuild(jsWidget, buildContext);
    }
}

class CupertinoTabView extends FlutterWidget {
    constructor ({
        key,
        builder,
        navigatorKey,
        defaultTitle,
        routes,
        onGenerateRoute,
        onUnknownRoute,
        navigatorObservers
    } = {}) {
        super();

        this.key = key;
        this.builder = builder;
        this.navigatorKey = navigatorKey;
        this.defaultTitle = defaultTitle;
        this.routes = routes;
        this.onGenerateRoute = onGenerateRoute;
        this.onUnknownRoute = onUnknownRoute;
        this.navigatorObservers = navigatorObservers;
    }
}





module.exports = {
    CupertinoActivityIndicator,
    CupertinoAlertDialog,
    CupertinoButton,
    CupertinoDialog,
    CupertinoDialogAction,
    CupertinoSlider,
    CupertinoSwitch,
    CupertinoPageTransition,
    CupertinoFullscreenDialogTransition,
    CupertinoNavigationBar,
    CupertinoTabBar,
    CupertinoPageScaffold,
    CupertinoTabScaffold,
    CupertinoTabView
};
