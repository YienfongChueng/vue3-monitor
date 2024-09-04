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

// throttle 与 debounce “合体”思路
// fn是我们需要包装的事件回调, delay是时间间隔的阈值
export function throttle(fn, delay) {
    // last为上一次触发回调的时间, timer是定时器
    let last = 0, timer = null
    // 将throttle处理结果当作函数返回
    
    return function () { 
      // 保留调用时的this上下文
      let context = this
      // 保留调用时传入的参数
      let args = arguments
      // 记录本次触发回调的时间
      let now = +new Date()
      
      // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
      if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
         clearTimeout(timer)
         timer = setTimeout(function () {
            last = now
            fn.apply(context, args)
          }, delay)
      } else {
          // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
          last = now
          fn.apply(context, args)
      }
    }
  }
  