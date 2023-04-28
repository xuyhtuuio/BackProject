
export const textMenu = [{
    name: "后台面板",
    icon: "help",
    child: [
        {
            name: "主控台",
            icon: "home-filled",
            frontpath: "/home/index"
        },
        {
            name: "关于",
            icon: "home-filled",
            frontpath: "/home/about"
        }
    ]
},
    {
        path: "/back",
        name: "前台面板",
        icon: "shopping-bag",
        child: [
            {
                name: "组件",
                icon: "shopping-cart-full",
                frontpath: "/home/goods/list"
            }
        ]
    }]
