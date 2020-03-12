import axios from 'axios';
import queryString from 'queryString';



//创建取消请求令牌
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

//可以把这个HTTP写在某一个单独的组件内，也可以提取出来放在一个js文件内，
//然后export default HTTP，在其他组件内，通过import这个js文件进行使用
var HTTP = axios.create({
    // baseURL: 'https://www.easy-mock.com/mock/5c1767c06ccaa7461ef01ee9/example/', //基本url都一样
    // timeout: 1000, //单位是ms，请求超过这个时间就取消，即请求超时
    responseType: 'json', //后端返回的数据类型
    header: { //自定义请求头
        'custom-header': 'xiao', //Request Headers里面就多了一个custom-header:xiao，后端可以拿到这个数据
        'content-type': 'application/x-www-form-urlencoded' //设置这个，那么经过transformRequest处理之后的数据格式就变为了  miaov=ketang&username=leo，只支持POST请求方式
    },
    params: { //查询字符串，传给后端的数据，不管是get还是post请求，这条数据都会附在url后面，发送给后端
        // bookId: '123'
    },
    transformRequest: [function (data) { //数组格式，用于转换发送数据格式，只适合PUT、POST、PATCH，data是传递给后端的数据，transformRequest类似一个中间件，发送数据，经过它来转换，需要reture出来，否则就是undefined，但是不能直接是return data，因为这样返回的是[object object]，
        //安装queryString来处理查询字符串，格式化成一个字符串
        // data.age = 30; //发送请求之前可以再次添加数据
        return queryString.stringify(data);
    }],
    transformResponse: [function (data) { //数组格式，用于处理返回的数据格式，data是后端发送回来的数据
        // data.abc = 'miaov' //对返回数据做进一步处理，请求此类地址的返回值都拥有abc这个属性，值是miaov
       
       return data;
    }],
    cancelToken: source.token //主动取消请求
})

export default HTTP