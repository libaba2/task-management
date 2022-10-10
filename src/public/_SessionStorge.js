// Storage封装
const STORAGE_name = 'mall'

export default {
    setItem(params) {
        let obj = {
            name: '',
            value: '',
        }
        let options = {}
        Object.assign(options, obj, params)
        window.sessionStorage.setItem(options.name, JSON.stringify(options.value))
    },
    // 获取某一个模块下面的属性user下面的userName
    getItem(name) {
        let val = sessionStorage.getItem(name)
        if (!val) {
            return false
        } else {
            try {
                val = JSON.parse(item);
            } catch (error) {
                //如果不行就不是json的字符串，就直接返回
                val = val;
            }
            return val
        }
    },
    removeItem(name) {
        const val = sessionStorage.getItem(name)
        if (val == null) {
            return false
        } else {
            sessionStorage.removeItem(name);
            return true
        }
    },
    clear() {
        sessionStorage.clear()
    }
}