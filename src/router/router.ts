interface routeInfo{
    name:string,
    path:string,
    requiresAuth:boolean
}
class Router{
    constructor(){
        
    }
    beforeEach(){
        return new Promise((resolve,reject)=>{
            resolve()
        })
    }
    push(to:routeInfo):void{
        this.callBack('navigateTo',to)
    }
}