/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    })
    return time_str
}

/**
 * 10000 => "10,000"
 * @param {number} num
 * @param {number} decimal
 */
export function toThousandFilter(num, decimal = 2) {
    // 没值就没值，不做特别处理
    if (num === undefined || num === null || num === '') {
        return ''
    } else {
        return (+num || 0).toFixed(decimal).replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
    // 没值处理为0返回
    // return (+num || 0).toFixed(decimal).replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
};

export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    if (source == null) {
        return null
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

// 深拷贝兼容所有数据类型的完整版
function isObject(value) {
    const valueType = typeof value
    // 值不能为null，并且为对象或者函数类型
    return (value !== null) && (valueType === 'object' || valueType === 'function')
}

export function deepClone2(originValue, wMap = new WeakMap()) {
    // 1.判断传入的是否是一个函数类型
    if (typeof originValue === 'function') {
        // 将函数直接返回即可
        return originValue
    }
    // 2.判断传入的是否是一个Map类型
    if (originValue instanceof Map) {
        return new Map([...originValue])
    }
    // 3.判断传入的是否是一个Set类型
    if (originValue instanceof Set) {
        return new Set([...originValue])
    }
    // 4.判断传入的值是否是一个Symbol类型
    if (typeof originValue === 'symbol') {
        // 返回一个新的Symbol，并且将其描述传递过去
        return Symbol(originValue.description)
    }
    // 5.判断传入的值是否是一个undefined
    if (typeof originValue === 'undefined') {
        return undefined
    }
    // 6.判断传入的是否是对象类型，如果不是，说明是普通类型的值，直接返回即可
    if (!isObject(originValue)) {
        return originValue
    }
    // 循环引用处理：判断wMap中是否存在原对象，如果存在就取出原对象对应的新对象返回
    if (wMap.has(originValue)) {
        return wMap.get(originValue)
    }
    // 7.定义一个变量，如果传入的是数组就定义为一个数组
    const newValue = Array.isArray(originValue) ? [] : {}
    // 循环引用处理：将原对象作为key，新对象作为value，存入wMap中
    wMap.set(originValue, newValue)
    // 8.循环遍历，如果是对象，就取出key和值存放到空对象中，如果是数组，就去除下标和元素放到空数组中
    // 注意：for...in遍历对象会将其继承的属性也遍历出来，所以需要加hasOwnProperty进行判断是否是自身的属性
    for (const key in originValue) {
        if (originValue.hasOwnProperty(key)) {
            // 递归调用deepClone，如果对象属性值中还包含对象，就会再次进行拷贝处理
            newValue[key] = deepClone2(originValue[key], wMap)
        }
    }
    // 9.对key为Symbol类型的情况进行处理
    // 拿到所有为Symbol类型的key
    const symbolKeys = Object.getOwnPropertySymbols(originValue)
    // for...of遍历取出所有的key，存放到新对象中
    for (const sKey of symbolKeys) {
        newValue[sKey] = deepClone2(originValue[sKey], wMap)
    }
    // 10.深拷贝完成，将得到新对象返回
    return newValue
}

export function editObject(formData, row) {
    let o = {id: row.id}
    for (let key in formData) {
        o[key] = row[key]
    }
    return o
}

/* 表格分页序号 */
export function indexMethod(index, listQuery) {
    return (listQuery.current - 1) * listQuery.size + index + 1;
}

/* 下拉选择详情由value显示label */
export function selectChange(value, options, valKey, labelKey) {
    const index = options.findIndex(function (item) {
        if (valKey) {
            return item[valKey] == value
        } else {
            return item['value'] == value
        }
    })
    return (index !== -1) ? (options[index]['label'] || options[index][labelKey]) : ''
}

/**
 * Remove class from element
 * @param {number} value
 */
export function turnNumber(value) {
    return isNaN(Number(value)) ? 0 : Number(value);
}

/**
 * Remove class from element
 * @param {number} value
 */
export function tableMaxHeight(value) {
    return window.innerHeight - turnNumber(value);
}

export function _find(data, code) {
    const array = data.find(item => item.code === code)
    return !!array ? this.itemFormat(array.children) : []
}