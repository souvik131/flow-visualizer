import { flowFormatter } from "./FlowFormatter";
import { chart} from "./Chart"


class Initializer{
    constructor(){
        this.data={
            key:{}
        }
        this.data.key.startPoints=[]
        this.data.key.dataPoints=[]
    }

    setData(data,primaryColor,activeColor,inactiveColor){
        let temp=chart.setData(flowFormatter.setData(data).run().packagedOutput,primaryColor,activeColor,inactiveColor).draw()
        this.data.key.startPoints=temp.startPoints
        this.data.key.dataPoints=temp.dataPoints
        return this
    }
    getData(){
        return this.data.key
    }
}


export let init = new Initializer()


