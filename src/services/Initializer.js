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

let initializerObjects={}

let getNewInitializer =(data,primaryColor,activeColor,inactiveColor)=>{
    
    return new Initializer(data,primaryColor,activeColor,inactiveColor)
}
let getViewElements=(id,data,primaryColor,activeColor,inactiveColor)=>{
    initializerObjects[id]= new Initializer(data,primaryColor,activeColor,inactiveColor)
    return initializerObjects[id].getViewElements()
}

export let operations = {
    getNewInitializer:getNewInitializer,
    getViewElements:getViewElements

}


