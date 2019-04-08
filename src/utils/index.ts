import http from './http'
function formatNumber (n:number|string):string {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime (date:Date):string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
function formatDate (date:Date,mark:string='-'):string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const t1 = [year, month, day].map(formatNumber).join(mark)

  return `${t1}`
}
function showToast(tip:string,icon:string="none"){
  uni.showToast({
    title: tip,
    icon: icon,
    duration: 2000
  })
}
function showConfirm(tip:string){
  var msg = tip || '提交以后不能修改,确定要提交吗？'
  return new Promise((resolve,eject)=>{
    uni.showModal({
      title: '温馨提示',
      content: tip,
      success(res) {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          eject()
        }
      }
    })
  })
  
}
function isPhone(tel:string):boolean {
  var reg = /^1[2|3|4|5|6|7|8|9]\d{9}$/;
  if (reg.test(tel)) {
    return true;
  } else {
    return false;
  }
}

function uploadImg(count:number = 1) {
    return new Promise((resolve,reject)=>{
         uni.chooseImage({
             count: count,
             sizeType: ['original', 'compressed'],
             sourceType: ['album', 'camera'],
             success(res:any) {
              let imgs = res.tempFilePaths;
              uploadFile(imgs).then(data=>{
                  resolve(data)
              }).catch(err=>{
                  showToast(err)
              })

            },
            fail(err:any){
                reject(err)
            }
        })
    })
   
}
function uploadFile(imgs:string[] = []) { // 封装上传图片接口
  let self = this
  let index = 0 // 当前要上传第几个图片的索引
  let filePath = [] // 上传成功后的文件地址
  let token  = uni.getStorageSync('token');
  uni.showLoading({
    title: '上传图片中',
    mask: true
  })

  // return new Promise((resolve, reject) => {
  //   (function up() {
  //     uni.uploadFile({
  //       url: config.api.uploadImg,
  //       filePath: imgs[index],
  //       name: 'img',
  //       success: res => {
  //         const data = JSON.parse(res.data);
  //         console.log(data)
  //             if (data.code == 0) {
  //               filePath.push(data.data.src)
  //               index++
  //                 // 递归上传图片（微信上传接口不支持多个文件）
  //                 if (imgs.length > index) {
  //                   up()
  //                 } else {
  //                   uni.hideLoading()
  //                   resolve(filePath)
  //                 }
  //               } else {
  //                 uni.hideLoading()
  //                 reject('上传失败，请重试')
  //           } 
  //         },
  //         fail: err => {
  //           uni.hideLoading()
  //           reject('上传图片失败，请重试')
  //         }
  //       })
  //   })()
  // })
}
 function preImg(urls:string[],current:number = 0) void {
    uni.previewImage({
       urls: urls,
       current:urls[current],
       fail:function(){
        showToast('预览失败，请重新尝试')
       }
    })
 }

 function isFilled(obj,fail,success){
  if(isFilled){
    let arr = Object.keys(obj);
    let flag = 0;
    for(let i = 0;i<arr.length;i++){
      if(obj[arr[i]] == ''){
        fail();
        flag = 0;
        break; 
      } else{
        flag = 1
      }
    }
    if(flag){
      success();
    }
  } else{
    fail();
  }
}

function isEmail(email:string) 
{ 
var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; 

    return new Promise((resolve,reject)=>{
        if(reg.test(email)) { 
            resolve()
        } else{
            showToast('邮箱格式不正确');
            reject();
        } 
    })
}

function deepClone(obj:any){
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}    
function payment(res:any){
  return new Promise((resolve,reject)=>{
    uni.requestPayment({
      timeStamp: res.timestamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: res.signType,
      paySign: res.paySign,
      success(resp) {
        resolve(resp) 
      },
      fail(err) { 
        reject(err)
      }
    })
  })
}

export default {
  formatNumber,
  formatTime,
  showToast,
  isPhone,
  formatDate,
  uploadImg,
  isEmail,
  preImg,
  deepClone,
  payment,
  showConfirm,
}
