const directives = import.meta.glob('./module/*.js',{eager:true})
// 批量注册全局自定义指令
export default {
    install(app,opts) {
        Object.keys(directives).forEach(path => {
            const name = path.replace(/\.\/module\/(.*)\.js/,'$1')
            /**
             * name:指令是使用export const xxx(name) = {...}导出
             * default:指令是使用export default {...}导出
             */
            const directiveModule = directives[path].name || directives[path].default 
            app.directive(name,directiveModule)
        })
    }
}