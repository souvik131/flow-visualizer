import { getFlowFormatter } from "./FlowFormatter";
import { getChart} from "./Chart"


class Initializer{
    constructor(data,primaryColor,activeColor,inactiveColor){
        let rawData=getFlowFormatter(data).run().packagedOutput
        this.drawElements=getChart(rawData,primaryColor,activeColor,inactiveColor).draw()   
    }

    getViewElements(){
        return this.drawElements
    }
}

let initializerObject

let getNewInitializer =(data,primaryColor,activeColor,inactiveColor)=>{
    
    return new Initializer(data,primaryColor,activeColor,inactiveColor)
}
let getOrCreateViewElements=(data,primaryColor,activeColor,inactiveColor)=>{
    if(!initializerObject){
        initializerObject= new Initializer(data,primaryColor,activeColor,inactiveColor)
    }
    return initializerObject.getViewElements()
}

export let operations = {
    getNewInitializer:getNewInitializer,
    getOrCreateViewElements:getOrCreateViewElements

}


