
import { getDraw } from "./Draw";

class Chart{
	constructor(dataSet,primaryColor,activeColor,inactiveColor){
		this.primaryColor=primaryColor
		this.activeColor=activeColor
		this.inactiveColor=inactiveColor
		this.dataSet=dataSet
		this.ratio=0.6
	}
	clone (data){return JSON.parse(JSON.stringify(data))}
	sizeDecider(data){
		let maxSize=0
		let map={}
		data.forEach((el,i)=>{
			map[el[0].node]=i
		})
		data.forEach((el)=>{
			el.forEach((prop)=>{
				if(map[prop.prevNode]==undefined){
					map[prop.prevNode]=-1
				}
				if(map[prop.node]==undefined){
					map[prop.node]=-1
				}
				let size=map[prop.node]-map[prop.prevNode]
				if(size>maxSize){
					maxSize=size
				}
			})
        })
		return {
            width:(data.length+1)*100,
            height:(maxSize+1)*0.7*101
        }
	}
	draw(){
		let drawMap={}
		if(this.dataSet.traverse){
			Object.keys(this.dataSet.traverse).forEach((startPoint)=>{
				let data=this.dataSet.traverse[startPoint]
				let sizes = this.sizeDecider(data)
				let draw=getDraw(startPoint,sizes.width,sizes.height,this.ratio,this.primaryColor,this.activeColor,this.inactiveColor,data,startPoint)
				drawMap[startPoint]=draw.run()
			})
		}
		return drawMap
	}
}

export let getChart=(rawData,primaryColor,activeColor,inactiveColor)=>{
    return new  Chart(rawData,primaryColor,activeColor,inactiveColor)
}











