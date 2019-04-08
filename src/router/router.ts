interface RouteInfo{
    name:string,
    path:string,
    requiresAuth:boolean
}
export class Router{
    constructor(){
        
    }
    beforeEach(navType:string,to:RouteInfo){
        return new Promise((resolve,reject)=>{
            resolve()
        })
    }
    push(to:RouteInfo):void{
        this.beforeEach('navigateTo',to)
    }
    redirectTo(to:RouteInfo):void{
        this.beforeEach('redirectTo',to)
    }
    reLanch(to:RouteInfo):void{
        this.beforeEach('reLanch',to)
    }
    switchTab(to:RouteInfo):void{
        this.beforeEach('switchTab',to)
    }
}