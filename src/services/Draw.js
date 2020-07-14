class Draw{
	setData(id,width,height,ratio,primaryColor,activeColor,inactiveColor,data,startPoint){
		this.element = {
            data:{}
        }
		this.element.id = id;
		this.element.height=height+"px"
		this.element.width=width+200+"px"
		this.width = width;
		this.height = height;
		this.nodeMap = {}
		this.data = data
		this.ratio = ratio
		this.startPoint=startPoint
		this.primaryColor=primaryColor
		this.activeColor=activeColor
		this.inactiveColor=inactiveColor
		return this
	}

	
	
	
	
	polarToCartesian(centerX, centerY, radius, angleInDegrees) { 
      let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
		return {
			x: centerX + (radius * Math.cos(angleInRadians)),
			y: centerY + (radius * Math.sin(angleInRadians))
		};
	}
	describeArc(x, y, radius, startAngle, endAngle){
		let start = this.polarToCartesian(x, y, radius, endAngle);
		let end = this.polarToCartesian(x, y, radius, startAngle);
		let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
		let d = [
			"M", start.x, start.y, 
			"A", radius+20, radius, 0, largeArcFlag, 0, end.x, end.y
		].join(" ");
		return d;       
	}
	initiateNodes(){
		this.paddingBlocks = this.ratio*10*2
		this.nodeBlocks = (1-this.ratio)*10
		this.moduleBlocks = 2*this.paddingBlocks+this.nodeBlocks
		this.arcBlocks = this.moduleBlocks/2
		this.count = this.data.length+1
		this.totalBlocks = this.moduleBlocks*this.count
		this.blockSize = this.width/this.totalBlocks

		this.eachNodeWidth = this.nodeBlocks*this.blockSize
		this.eachNodeXPadding = this.paddingBlocks*this.blockSize
		this.eachNodeHeight = this.eachNodeWidth
		this.eachNodeYPadding = this.height/3
		for(let i=0;i<this.count;i++){
			if(i==0){
				this.buildANode(i,this.startPoint)
			}
			else{
				this.buildANode(i,this.data[i-1][0].node)
			}
		}
	}
	drawConnectingNodes(){
		this.element.data.allArcs=[]
		this.element.data.allArcTexts=[]
		this.element.data.allArcTextBackgrounds=[]
		this.data.forEach((el)=>{
			el.forEach(prop=>{
				try{
					let fromX=this.nodeMap[prop.prevNode].x
					let fromY=this.nodeMap[prop.prevNode].y
					let fromPos=this.nodeMap[prop.prevNode].pos
					let toPos=this.nodeMap[prop.node].pos
					let diff = (toPos-fromPos)
					let distance=diff*this.arcBlocks*this.blockSize
					if(distance<0){
						fromX=this.nodeMap[prop.node].x
						fromY=this.nodeMap[prop.node].y
						distance=-distance
					}
					let lineWidth = prop.weight>7?7:prop.weight ;
                    lineWidth = lineWidth<4?4:lineWidth;
                    

                    let el = {}
                    el["type"] = 'path';
					el["fill"] = 'none'
					el["stroke"]=this.inactiveColor
					el["strokeWidth"]=lineWidth;
					el["class"]= "arc-svg arc-svg-"+prop.prevNode+" arc-svg-next-"+prop.node;
					el["ref"]= "arc-svg arc-svg-"+prop.prevNode
					if(diff==1){
						el["d"]=`M${fromX},${fromY} L${fromX+distance*2},${fromY}`;
					}
					else{
						el["d"]=this.describeArc(fromX+distance, fromY,distance,  270,90);
					}
					this.element.data.allArcs.push(el)


					let textString=prop.weight.toString()+" Visits from "+prop.prevNode+" to "+prop.node

					let textBg = {}
					textBg["type"]='rect'; 
					textBg['x']=fromX+distance-30;  
					textBg['y']=fromY-distance*0.7-10;
					textBg['rx']=5;
					textBg['height']="30";  
					textBg['width']=textString.length.toString()*7.5+10;
					textBg['fill']="#ffffffba";
					textBg['stroke']="#ccc";
					textBg['strokeWidth']=1;
					textBg['class']="arc-text-bg-svg arc-text-bg-svg-"+prop.prevNode+" arc-text-bg-svg-next-"+prop.node; 
					textBg['ref']="arc-text-bg-svg arc-text-bg-svg-"+prop.prevNode;
					this.element.data.allArcTextBackgrounds.push(textBg)



					let text = {}
					text["type"]='text';   
					text['x']=fromX+distance-20;
					text['y']=fromY-distance*0.7+10;
					text['fill']=this.primaryColor;   
					text['class']="arc-text-svg arc-text-svg-"+prop.prevNode+" arc-text-svg-next-"+prop.node; 
					text['ref']="arc-text-svg arc-text-svg-"+prop.prevNode;
					text["text"]=textString
					this.element.data.allArcTexts.push(text)

				}
				catch(e){
					console.log(e )
				}
			})
		})

		this.element.data.allArcs=this.element.data.allArcs.reverse()
		this.element.data.allArcTextBackgrounds=this.element.data.allArcTextBackgrounds.reverse()
		this.element.data.allArcTexts=this.element.data.allArcTexts.reverse()
	}
	drawNodes(){
		this.element.data.allNodes=[]
		this.element.data.allNodeTexts=[]
		for(let i=0;i<this.count;i++){
			let index=i
			let node=this.startPoint
			if(i!=0){

				node=this.data[i-1][0].node
			}
			
			let width = this.eachNodeWidth
			let height = this.eachNodeHeight
			let y = this.eachNodeYPadding*2
			let x =this.eachNodeXPadding+index*(this.eachNodeXPadding*2+this.eachNodeWidth)


			let el = {}
			el["type"] = 'circle';
			el['cx']=x+this.eachNodeWidth/2;
			el['cy']=y;
			el['r']=this.eachNodeWidth;
			el['class']="node-svg node-svg-"+node;
			el['ref']="node-svg node-svg-"+node;
			el['height']=height.toString();
			el['width']=width.toString();
			el['fill']=this.primaryColor;
			this.element.data.allNodes.push(el)	


			let text = {}
			text["type"]='text';  
			text['class']="text-svg text-svg-"+node; 
			text['ref']="text-svg text-svg-"+node; 
			text['x']=x-node.length*6*0.5;
			text['y']=y+this.eachNodeHeight+25;
			text['fill']=this.primaryColor;
			text["text"]=  node
			this.element.data.allNodeTexts.push(text)

		}
	}
	buildANode(index,node){
		let y = this.eachNodeYPadding*2
		let x =this.eachNodeXPadding+index*(this.eachNodeXPadding*2+this.eachNodeWidth)

		this.nodeMap[node]={}
		this.nodeMap[node].x=x+this.eachNodeWidth/2
		this.nodeMap[node].y=y
		this.nodeMap[node].pos=index

	}
	run(){
        this.initiateNodes()
        this.drawConnectingNodes()
        this.drawNodes()
        return this.element
	}
}


export let draw =new  Draw()
