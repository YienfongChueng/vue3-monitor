// 找出一级菜单
export function handleLevel(list) {
    return list.filter(d => {
        d.label = d.menu_name
        d.children = []
        return d.father_id === 0
    })
}
// 将扁平数据树形化
export function createTree(menu,data) {
    menu.forEach(m => {
        data.forEach(d => {
            if(m.id === d.father_id) {
                m.children.push(d)
            }
        })
        if(m.children.length > 0) {
            createTree(m.children,data)
        }
    });
}

/**
 * 递归初始化路由
 */
const Modules = import.meta.glob("@/views/home/**/index.vue")
export function initRoutes(menus,destList) {
    menus.forEach(m => {
        const obj = {
            path:m.menu_url,
            name: m.name,
            component: Modules[`/src/views/home/${m.component}/index.vue`],
            meta: {title: m.menu_name, icon: m.icon}
        }
        if(destList instanceof Array){
            destList.push(obj)
        }else {
            if(!destList.children){
                destList.children = []
            }
            destList.children.push(obj)
        }

        if(m.children){
            initRoutes(m.children,obj);
        }
    })
    return destList
}