/**
 * Created by admin on 2017/12/19.
 * 将时间YYYYMMDDHHMMSS格式化为2017.11.15 10:11格式
 */
export function formatDate (dateString) {
  if (!dateString) {
    return ''
  }
  let o = {
    Y: dateString.substring(0, 4),
    M: dateString.substring(4, 6),
    d: dateString.substring(6, 8),
    h: dateString.substring(8, 10),
    m: dateString.substring(10, 12)
  }
  let newDate = o.Y + '.' + o.M + '.' + o.d + ' ' + o.h + ':' + o.m
  return newDate
}

/**
 * Created by admin on 2017/12/28.
 * 去除空格
 */
export function trim (str) {
  let newstr = str.replace(/^\s*|\s*$/, '')
  return newstr
}

/**
 * Created by admin on 2017/12/28.
 * 将时间YYYYMMDDHHMMSS格式化为2017-11-15 10:11:17格式
 */
export function formatDateNew (dateString) {
  if (!dateString) {
    return ''
  }
  let o = {
    Y: dateString.substring(0, 4),
    M: dateString.substring(4, 6),
    d: dateString.substring(6, 8),
    h: dateString.substring(8, 10),
    m: dateString.substring(10, 12),
    s: dateString.substring(12, 14)
  }
  let newDate = o.Y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s
  return newDate
}

/**
 * Created by admin on 2018/1/8.
 * 向整数金额添加逗号分隔符
 * 将var str = '32672437647';格式化为32,672,437,647格式
 */
export function addComma (str) {
  if (str.length > 3) {
    var mod = str.length % 3
    var output = (mod > 0 ? (str.substring(0, mod)) : '')
    for (var i = 0; i < Math.floor(str.length / 3); i++) {
      if ((mod === 0) && (i === 0)) {
        output += str.substring(mod + 3 * i, mod + 3 * i + 3)
      } else {
        output += ',' + str.substring(mod + 3 * i, mod + 3 * i + 3)
      }
    }
    return (output)
  } else {
    return str
  }
}

/**
 * Created by admin on 2018/1/8.
 * 向金额去除逗号分隔符
 * 将32,672,437,647格式化为格式var str = '32672437647';
 */
export function removeComma (str) {
  return str.replace(/,/g, '')
}

/**
 * Created by admin on 2018/1/9.
 * KB转换MB,GB的方法
 */
export function conver (limit) {
  var size = ''
  if (limit < 0.1 * 1024) { // 如果小于0.1KB转化成B
    size = limit.toFixed(2) + 'B'
  } else if (limit < 0.1 * 1024 * 1024) { // 如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + 'KB'
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
  } else { // 其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  }
  var sizestr = size + ''
  var len = sizestr.indexOf('.')
  var dec = sizestr.substr(len + 1, 2)
  if (dec === '00') { // 当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
}
