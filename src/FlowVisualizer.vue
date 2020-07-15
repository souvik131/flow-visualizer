<template>

<div >
  
    <div v-for="(dataPoint,idx) in drawData.dataPoints" :key="idx+'flow-visualizer'" >
         <svg  
         :viewBox=drawData.dataPoints[idx].viewBox
         :height=drawData.dataPoints[idx].height
         :width=drawData.dataPoints[idx].width
         >

          <path v-for="(arc,i) in drawData.dataPoints[idx].data.allArcs" 
          :key="i+'-arc'" 
          :fill=arc.fill 
          :stroke=arc.stroke 
          :stroke-width=arc.strokeWidth
          :ref=arc.ref
          :class=arc.class
          :d=arc.d
          v-on:mouseover=onMouseOverEdge
          v-on:mouseleave=onMouseLeaveEdge
          >
          </path>
           
          
          <circle  v-for="(node,j) in drawData.dataPoints[idx].data.allNodes"
          :key="j+'-node'"
          :cx=node.cx 
          :cy=node.cy 
          :r=node.r 
          :ref=node.ref 
          :class=node.class
          :height=node.height 
          :width=node.width 
          :fill=node.fill
          v-on:mouseover=onMouseOverNode
          v-on:mouseleave=onMouseLeaveNode>
          </circle>

          <text  v-for="(nodeText,k) in drawData.dataPoints[idx].data.allNodeTexts"
          :key="k+'-nodeText'" 
          :x=nodeText.x
          :y=nodeText.y
          :fill=nodeText.fill
          :ref=nodeText.ref
          :class=nodeText.class >
          {{nodeText.text}}
          </text>

          <rect  v-for="(arcTextBg,l) in drawData.dataPoints[idx].data.allArcTextBackgrounds"
          :key="l+'-arcTextBg'"
          :x=arcTextBg.x
          :y=arcTextBg.y
          :rx=arcTextBg.rx
          :height=arcTextBg.height 
          :width=arcTextBg.width
          :fill=arcTextBg.fill
          :stroke=arcTextBg.stroke 
          :stroke-width=arcTextBg.strokeWidth 
          :ref=arcTextBg.ref 
          :class=arcTextBg.class >
          </rect> 

          <text  v-for="(arcText,m) in drawData.dataPoints[idx].data.allArcTexts"
          :key="m+'-arcText'" 
          :x=arcText.x
          :y=arcText.y
          :fill=arcText.fill
          :ref=arcText.ref 
          :class=arcText.class >
          {{arcText.text}}
          
          </text>
        </svg>  
    </div> 
</div>

</template>

<script>
import {init} from "./services/Initializer"


export default {
  name: 'FlowVisualizer',
  props: {
    dataSet: {
      type: Array,
      required: true,
      default: () => []
    },
    primaryColor: {
      type: String,
      required: true,
      default: () => "#4f4f4f"
    },
    activeColor: {
      type: String,
      required: true,
      default: () => "#fcbf2d"
    },
    inactiveColor: {
      type: String,
      required: true,
      default: () => "#f4e642"
    }
  },
  computed:{
      drawData(){
        return init.setData(this.dataSet,this.primaryColor,this.activeColor,this.inactiveColor).getData()
      }
  },
  methods:{
    onMouseOverNode(event){
      event.target.setAttributeNS(null, 'r', event.target.getAttributeNS(null,'r')*1.5)
      let node=event.target.getAttribute("class").replace(/node-svg-|node-svg/gi,"").trim()
      let allArcs = this.$refs["arc-svg arc-svg-"+node]||[]
      let allArcTexts = this.$refs["arc-text-svg arc-text-svg-"+node]||[]
      let allArcTextBgs = this.$refs["arc-text-bg-svg arc-text-bg-svg-"+node]||[]
      for(let j=0;j<allArcs.length;j++){
        let lineWidth=allArcs[j].getAttributeNS(null, 'stroke-width')
        allArcs[j].setAttributeNS(null, 'stroke',this.activeColor);
        allArcs[j].setAttributeNS(null, 'stroke-width',lineWidth*2.5)
      }
      for(let j=0;j<allArcTexts.length;j++){
        allArcTexts[j].style.display="block"
      }
      for(let j=0;j<allArcTextBgs.length;j++){
        allArcTextBgs[j].style.display="block"
      }
    },
    onMouseLeaveNode(event){
      event.target.setAttributeNS(null, 'r', event.target.getAttributeNS(null,'r')/1.5)
      let node=event.target.getAttribute("class").replace(/node-svg-|node-svg/gi,"").trim()
      let allArcs = this.$refs["arc-svg arc-svg-"+node]||[]
      let allArcTexts = this.$refs["arc-text-svg arc-text-svg-"+node]||[]
      let allArcTextBgs = this.$refs["arc-text-bg-svg arc-text-bg-svg-"+node]||[]
      for(let j=0;j<allArcs.length;j++){
        let lineWidth=allArcs[j].getAttributeNS(null, 'stroke-width')
        allArcs[j].setAttributeNS(null, 'stroke',this.inactiveColor);
        allArcs[j].setAttributeNS(null, 'stroke-width',lineWidth/2.5)
      }
      for(let j=0;j<allArcTexts.length;j++){
        allArcTexts[j].style.display="none"
      }
      for(let j=0;j<allArcTextBgs.length;j++){
        allArcTextBgs[j].style.display="none"
      }
    },
    onMouseOverEdge(event){
            let el=event.target
						let lineWidth=el.getAttributeNS(null, 'stroke-width')
            el.setAttributeNS(null, 'stroke-width',lineWidth*2.5)
            el.setAttributeNS(null, 'stroke',this.activeColor);
            let nodeClasses = event.target.getAttribute("class")
						let node=event.target.getAttribute("class").replace(/arc-svg-/gi,"").split(/\s/gi)[1].trim()
            let allArcTexts = this.$refs["arc-text-svg arc-text-svg-"+node]||[]
            let allArcTextBgs = this.$refs["arc-text-bg-svg arc-text-bg-svg-"+node]||[]
            for(let j=0;j<allArcTexts.length;j++){
                if(nodeClasses.replace(/arc-svg/gi,"arc-text-svg")==allArcTexts[j].getAttribute("class")){
                  allArcTexts[j].style.display="block"
                }
            }
            for(let j=0;j<allArcTextBgs.length;j++){
              if(nodeClasses.replace(/arc-svg/gi,"arc-text-bg-svg")==allArcTextBgs[j].getAttribute("class")){
                allArcTextBgs[j].style.display="block"
              }
            }

    },
    onMouseLeaveEdge(event){
            let el=event.target
            let lineWidth=el.getAttributeNS(null, 'stroke-width')
            el.setAttributeNS(null, 'stroke-width',lineWidth/2.5)
            el.setAttributeNS(null, 'stroke',this.inactiveColor);
            let nodeClasses = event.target.getAttribute("class")
            let node=event.target.getAttribute("class").replace(/arc-svg-/gi,"").split(/\s/gi)[1].trim()
            let allArcTexts = this.$refs["arc-text-svg arc-text-svg-"+node]||[]
            let allArcTextBgs = this.$refs["arc-text-bg-svg arc-text-bg-svg-"+node]||[]
            for(let j=0;j<allArcTexts.length;j++){
              if(nodeClasses.replace(/arc-svg/gi,"arc-text-svg")==allArcTexts[j].getAttribute("class")){
                allArcTexts[j].style.display="none"
              }
            }
            for(let j=0;j<allArcTextBgs.length;j++){
              if(nodeClasses.replace(/arc-svg/gi,"arc-text-bg-svg")==allArcTextBgs[j].getAttribute("class")){
                allArcTextBgs[j].style.display="none"
              }
            }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.arc-text-svg,.arc-text-bg-svg{
  display: none;
}
</style>
