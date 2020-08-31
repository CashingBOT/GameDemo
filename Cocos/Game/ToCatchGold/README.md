# 全民生活

### 引擎版本 2.4.0

接口文档 http://10.4.60.196:8080/doc.html
sit 预览 http://10.4.60.197/stall/

### 游戏项目结构简览

-   `GameCore.ts` 游戏中用到的通用方法
-   `service/`目录 => 存放服务全局的方法或数据
    -   `UserInfoService.ts` 用户相关数据
    -   `EventMapService.ts` 全局的事件列表
    -   `LocalStorageService.ts` 本地数据储存
-   `Game.d.ts` 定义一些接口 **_目前跟类相关的接口，基本都是放在当前类里面_**
-   `control/`目录=> 主要用于跟 View 目录里面的界面逻辑关联的业务逻辑(主用于逻辑分离)
    -   `ProtocolControl.ts`协议控制器 => 主要负责协议转发或协议逻辑处理
-   `Script/component/` 存放游戏中的一些组件
    -   `GameButton.ts` 按钮组件，建议所有按钮用此组件
    -   `ListView.ts` 列表组件 **(支持不同高度，优化 draw call，不支持左右滚动)** 用法参考=>`resources/Prefab/component/ListViewComponent.prefab`
    -   `Point.ts` 红点逻辑组件(挂到红点节点上)
    -   `ViewAnimation.ts` 界面打开动画效果组件(直接挂到界面根节点)
-   `Game/game-lib/`游戏的一些公用模块
    -   `Utils.ts` 通用方法类
