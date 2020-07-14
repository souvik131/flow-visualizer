

import { flowProcessor } from "./FlowProcessor";

class FlowFormatter{
	setData(journeys){
		this.packagedOutput={}
		this.workData=this.clone(journeys).filter(el=>el.from!=el.to)
		return this
	}
	clone(data){ return JSON.parse(JSON.stringify(data))}
	restructureData(){
		if(this.packagedOutput.traverse){
			Object.keys(this.packagedOutput.traverse)
				.forEach((startPoint)=>{
				let sortedTraversal=this.packagedOutput.traverse[startPoint].sort((a,b)=>b.length-a.length)
				let longestTraversal=sortedTraversal[0]
				let allNodesInLongestTraversal=longestTraversal.map(el=>el.node)
				let toBeAdded=[]
				for(let i=0;i<sortedTraversal.length;i++){
					let el=sortedTraversal[i]
					if(i!=0){
						el.forEach(prop=>{
							if(!allNodesInLongestTraversal.includes(prop.node)&&!toBeAdded.map(el=>el.node).includes(prop.node)){
								toBeAdded.push(prop)
							}
						})
					}
				}
				toBeAdded.forEach((el)=>{
					let lookUpNode=el.node
					let indicesShortlisted=[]
					for(let i=0;i<sortedTraversal.length;i++){
						let data=sortedTraversal[i]
						let existingNodes=data.map(prop=>prop.node)
						let index=existingNodes.indexOf(lookUpNode)
						if(index>0){
							indicesShortlisted.push(index)
						}
					}
					if(indicesShortlisted.length>0){
	
						let sortedIndices=indicesShortlisted.sort()
						let minIndex =sortedIndices[0]
						sortedTraversal[0].splice(minIndex, 0, el);
					}
					else{
						sortedTraversal[0].push(el);
					}
				});

				let traversalContainer=new Array(longestTraversal.length);
				sortedTraversal.forEach((el,i)=>{
					if(i==0){
						let prevNode=startPoint
						el.map((prop,j)=>{
							prop.prevNode=prevNode
							traversalContainer[j]=[prop]
							prevNode=prop.node

						})
					}
					else{
						
						let prevPropNode=startPoint
						el.map((prop)=>{
							for(let i=0;i<traversalContainer.length;i++){
								let container = traversalContainer[i]
								let currentNode=container[0].node
								if(currentNode==prop.node){
									let available=false
									for(let j=0;j<container.length;j++){
										let value=container[j]
										if(value.prevNode==prevPropNode){
											available=true
											break
										}
									}
									if(!available){
										prop.prevNode=prevPropNode
										container.push(prop)
									}
									break
								}
							}
							prevPropNode=prop.node
						})
					}
				})
				this.packagedOutput.traverse[startPoint]=traversalContainer
			})
		}
	
	}
	run(){
		let endNodes={}
		let startNodes={}
		let clubbedNodes={}
		this.workData.forEach(el=>{
			endNodes[el.to]=true
			startNodes[el.from]=true
			if(!clubbedNodes[el.from]){
				clubbedNodes[el.from]=[]
			}
			clubbedNodes[el.from].push(el)
		})
		endNodes=Object.keys(endNodes)
		startNodes=Object.keys(startNodes)
		let startingPoints=startNodes.filter(el=>!endNodes.includes(el))
		if(startingPoints.length==0&&startNodes.length>0){
			startingPoints=[startNodes[0]]
		}
		startingPoints
		.forEach((startPoint)=>{
			let processor = flowProcessor.setData(startPoint,clubbedNodes)
			this.packagedOutput=processor.start().dataSet
		})
		console.log(this.packagedOutput)
		this.restructureData()
		return this
	}
}
export let flowFormatter = new  FlowFormatter()