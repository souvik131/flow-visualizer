class FlowProcessor{

	constructor(startPoint,clubbedNodes){

		this.dataSet={
				trees:{},
				traverse:{},
				restructured:{}
		}
		this.startPoint=startPoint
		this.clubbedNodes=clubbedNodes

		this.dataSet.trees[startPoint]={}
		this.dataSet.trees[startPoint].next={}
		this.dataSet.traverse[startPoint]=[]
		this.dataSet.restructured[startPoint]=[]
	}




	clone(data){return JSON.parse(JSON.stringify(data))}

	saveDatapoints(traverse){
		if(traverse.length>0){
			let lastNode=this.startPoint
			traverse=traverse.map(el=>{
				this.dataSet.restructured[this.startPoint].push({
					from:lastNode,
					to:el.node,
					weight:el.weight
				})
				lastNode=el.node
				return el
			})
			this.dataSet.traverse[this.startPoint].push(traverse)
		}
	}

	start(){
		this.recursivelyCompute({},this.startPoint,[this.startPoint],[],this.dataSet.trees[this.startPoint].next)
		return this
	}

	recursivelyCompute(currentNode,node,pathArray,traverse,currentTree){
		if(this.clubbedNodes[node]){
			currentNode[node]=this.clone(this.clubbedNodes[node])
			currentNode[node].next={}
			this.clubbedNodes[node].forEach(nextnode=>{
				if(!pathArray.includes(nextnode.to)){
					let tempArray=this.clone(pathArray)
					tempArray.push(nextnode.to)
					let tempTraverse=this.clone(traverse)
					tempTraverse.push({weight:nextnode.weight,node:nextnode.to})
					currentTree[nextnode.to]={
						weight: nextnode.weight,
						next:{}
					}
					this.recursivelyCompute(currentNode[node].next,nextnode.to,tempArray,tempTraverse,currentTree[nextnode.to].next)
					
				}
				else{
					this.saveDatapoints(traverse)
				}
			})
		}
		else{
			this.saveDatapoints(traverse)		
		}			
	}
}

export let getFlowProcessor=(startPoint,clubbedNodes)=>{
    return new  FlowProcessor(startPoint,clubbedNodes)
}