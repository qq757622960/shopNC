/** 
 * @Author: YISHI 
 * @Date: 2018-08-31 21:29:32 
 * @Desc: 封装 Fetch 
 */

function fetchObject() {}
fetchObject.prototype = {
    // GET 请求
    fetchGet: function() {
        return this.commonFetch(url, params, 'GET', callback);
    },
    // POST 请求
    fetchPost: function() {
        return this.commonFetch(url, params, 'POST', callback);
    },
    // 将对象转换成 a=1&b=2 的形式
    obj2str: function (object, array = [], index = 0) {
        for (let key in object) {
            array[index++] = [key, object[key]];
        }        
    },
    // 通用异步请求函数
    commonFetch: function (url, params, method = "GET", callback) {
        var searchParams = this.obj2str(params),
            initObj = null;

        // 请求方式 get/post
        switch (method.toLowerCase()) {
            case 'get':
                url += `?${searchParams}`;
                initObj = {
                    method: method
                }
                break;
            case 'post':
                initObj = {
                    method: method,
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                    body: searchParams
                }
                break;
            default:
                throw new Error('暂不支持其他请求方式');
        }

        // 发送请求
        fetch(url, initObj)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('网络异常');
            })
            .then(data => {
                callback && callback(data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }
}

// 优化二
// var fetchObject = {
//     // GET 请求
//     fetchGet: function (url, params, callback) {
//         return this.commonFetch(url, params, 'GET', callback);
//     },
//     fetchPost: function (url, params, callback) {
//         return this.commonFetch(url, params, 'POST', callback);
//     },
//     // 将对象转换成 a=1&b=2 的形式
//     obj2str: function (object, array = [], index = 0) {
//         for (let key in object) {
//             array[index++] = [key, object[key]];
//         }
//     },
//     // 通用异步请求函数
//     commonFetch(url, params, method = "GET", callback) {
//         var searchParams = this.obj2str(params),
//             initObj = null;

//         // 请求方式 get/post
//         switch (method.toLowerCase()) {
//             case 'get':
//                 url += `?${searchParams}`;
//                 initObj = {
//                     method: method
//                 }
//                 break;
//             case 'post':
//                 initObj = {
//                     method: method,
//                     headers: new Headers({
//                         'Content-Type': 'application/x-www-form-urlencoded'
//                     }),
//                     body: searchParams
//                 }
//                 break;
//             default:
//                 throw new Error('暂不支持其他请求方式');
//         }

//         // 发送请求
//         fetch(url, initObj)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 throw new Error('网络异常');
//             })
//             .then(data => {
//                 callback && callback(data);
//             })
//             .catch(error => {
//                 console.log(error.message);
//             });
//     }
// };


// 优化一
// // GET 请求
// function fetchGet(url, params, callback) {
//     return commonFetch(url, params, 'GET', callback);
// }

// // POST 请求
// function fetchPost(url, params, callback) {
//     return commonFetch(url, params, 'POST', callback);
// }

// // 将对象转换成 a=1&b=2 的形式
// function obj2str(object, array=[], index=0) {
//     for (let key in object) {
//         array[index++] = [key, object[key]];
//     }

//     return new URLSearchParams(array).toString();
// }

// // 通用异步请求函数
// function commonFetch(url, params, method = "GET", callback) {
//     var searchParams = obj2str(params),
//         initObj = null;

//     // 请求方式 get/post
//     switch (method.toLowerCase()) {
//         case 'get':
//             url += `?${searchParams}`;
//             initObj = {
//                 method: method
//             }          
//             break;
//         case 'post':
//             initObj = {
//                 method: method,
//                 headers: new Headers({
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }),
//                 body: searchParams
//             }
//             break;
//         default:
//             throw new Error('暂不支持其他请求方式');
//     }

//     // 发送请求
//     fetch(url, initObj)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error('网络异常');
//         })
//         .then(data => {
//             callback && callback(data);
//         })
//         .catch(error => {
//             console.log(error.message);
//         });
// }