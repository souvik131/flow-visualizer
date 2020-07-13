# flow-visualizer

A Vue component that intuitively represents Flow in Vue. It is an alternative to Sankey Charts.


## Installation

```js
npm i flow-visualizer
```

### Flow Diagram

![alt text](https://raw.githubusercontent.com/souvik131/flow-visualizer/master/flow.png)


### Browser

Include the script file, then install the component with `Vue.use(FlowVisualizer);` e.g.:

```html
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/flow-visualizer/dist/flow-visualizer.min.js"></script>
<script type="text/javascript">
  Vue.use(FlowVisualizer);
</script>
```

### Module

```js
import FlowVisualizer from 'flow-visualizer';
```

## Usage

Once installed, it can be used in a template as simply as:

Use this template where you want to represent the flow.

```html
<flow-visualizer 
   :dataSet=dataSet
   primarColor=#4f4f4f
   activeColor=#fcbf2d
   inactiveColor=#f4e642>
   </flow-visualizer>
```

Add data for depeneding dataSet in script.

```js
export default {
  ...
  data() {
    return {
      dataSet:[
          {"from":"otp","to":"otp","weight":5},
          {"from":"dob","to":"otp","weight":8},
          {"from":"mobileDob","to":"otp","weight":8},
          {"from":"mobileDob","to":"mobileDob","weight":10},
          {"from":"mobileDob","to":"dob","weight":10},
          {"from":"otp","to":"reviewSubmit","weight":10},
          {"from":"confirm","to":"reviewSubmit","weight":2},
          {"from":"otp","to":"review","weight":4},
          {"from":"offers","to":"review","weight":1},
          {"from":"otp","to":"offers","weight":1},
          {"from":"confirm","to":"confirm","weight":2},
          {"from":"review","to":"confirm","weight":3}]
    }
  }
}
```
