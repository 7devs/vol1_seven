# 项目开发流程

- GitHub 创建项目仓库
- 获取 git 地址
- 进入工作目录
- 执行 `git clone git_project_url`
- **初始化项目**
    - `npm init`
- **安装需要的 npm 包**
    - `npm install <package name> --save`
    - [express](http://expressjs.com/)
    - body-parser
    - [ejs](https://github.com/tj/ejs) _（模版引擎）_
    - [mongoose](https://github.com/Automattic/mongoose) _（数据库支持）_
    - xml _（微信消息解析）_
    - express-xml-bodyparser _（微信消息解析）_
- **创建项目文件及结构**
    - lib
        - static/ _（静态文件）_
        - parsers/ _（微信消息解析）_
            - text-parser.js
            - voice-parser.js
            - event-parser.js
            - index.js
        - routers/
            - wxapi.js
            - xxx.js _（逻辑相关页面）_
        - models/
            - user.js
            - xxx.js
        - views/
            - xxx.ejs _（逻辑页面模版）_
        - config.js
        - wechat.js _（微信API封装，copy 之前项目中的文件）_
    - package.json _（npm init 自动创建）_
    - index.js _（入口文件）_
- **工作（代码维护）流程**
    1. `git pull` _（每天开始工作第一步，拉取最新代码）_
    1. 编辑代码
    1. `git status` _（查看代码修过状态）_
    1. `git add <file1> <file2>`
    1. `git commit -m '备注'` _（建议每修改一个文件都提交一次，本地仓库）_
    1. 重复 2～5
    1. `git push` _（提交到远程代码仓库）_
