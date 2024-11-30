[G6](https://g6.antv.vision/zh/examples/net/dagreFlow#basicDagre)

```
// "@antv/g6": "^3.4.0"     npm install insert-css


import React,{ useRef , useEffect} from 'react'
import G6  from '@antv/g6'
import { insertCss } from 'insert-css';

// 提示的样式
insertCss(`
.g6-tooltip {
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background-color: #000;
    padding: 2px 8px;
    text-align: center;
}
`);

export default function DagreDemo():JSX.Element{
    const ref = useRef(null)
    let graph:any = null

    useEffect(()=>{
        if(!graph){
        const container =document.getElementById('content')

        const width =(container as HTMLElement).scrollWidth
        // const height = (container as HTMLElement).scrollHeight || 500
        const height = 500
        
        const data = {
            nodes:[
                {
                    id:'1',
                    label:'开始',
                    conf:[
                        {
                            label: 'conf',
                            value: 'pai_graph.conf',
                        },
                        {
                            label: 'dot',
                            value: 'pai_graph.dot',
                        },
                        {
                            label: 'init',
                            value: 'init.rc',
                        },
                    ]
                },
                {
                    id:'2',
                    label:'审核1',
                    conf: [
                        {
                          label: 'conf',
                          value: 'pai_graph.conf',
                        },
                        {
                          label: 'dot',
                          value: 'pai_graph.dot',
                        },
                        {
                          label: 'init',
                          value: 'init.rc',
                        },
                      ],
                },
                {
                    id:'3',
                    label:'审核2',
                    conf: [
                        {
                          label: 'conf',
                          value: 'pai_graph.conf',
                        },
                        {
                          label: 'dot',
                          value: 'pai_graph.dot',
                        },
                        {
                          label: 'init',
                          value: 'init.rc',
                        },
                    ],
                },
                {
                    id:'4',
                    label:'合规',
                    conf: [
                        {
                          label: 'conf',
                          value: 'pai_graph.conf',
                        },
                        {
                          label: 'dot',
                          value: 'pai_graph.dot',
                        },
                        {
                          label: 'init',
                          value: 'init.rc',
                        },
                    ],
                },
                {
                    id:'5',
                    label:'结束',
                    conf: [
                        {
                          label: 'conf',
                          value: 'pai_graph.conf',
                        },
                        {
                          label: 'dot',
                          value: 'pai_graph.dot',
                        },
                        {
                          label: 'init',
                          value: 'init.rc',
                        },
                    ],
                },
            ],
            edges:[
                {
                    source:'1',
                    target:'2',
                },
                {
                    source:'1',
                    target:'3'
                },
                {
                    source:'2',
                    target:'4',
                },
                {
                    source:'3',
                    target:'4'
                },
                {
                    source:'4',
                    target:'5'
                },
            ],
        }

       // eslint-disable-next-line react-hooks/exhaustive-deps
       graph = new G6.Graph({
            container:container!,
            width,
            height,
            // 使边连入节点的中心
            linkCenter:true,
            layout: {
                // 布局类型
                type: 'dagre', 
                nodesepFunc: (d:any) => {
                  if (d.id === '3') {
                    return 550;
                  }
                  return 100;
                },
                // 每层级之间间距
                ranksep: 70,
                // 节点之间间距
                nodesep:100,
                // 是否保留布局连线的控制点
                controlPoints: true,
              },
            defaultNode:{
                type:'rect',
                style:{
                    stroke:'#5B8FF9',
                    fill:'#c6e5ff',
                    lineWidth:3, 
                },
                // label: 'node-label',
                labelCfg: {
                    position: 'center',
                    offset: 10,
                    style: {
                        fill: '#666',
                    },
                },
            },
            defaultEdge:{
                type:'polyline',
                style:{
                    radius:20,
                    // offset:45,
                    // 边不带箭头
                    endArrow:false,
                    lineWidth:2,
                    stroke:'#c2c8d5'
                }
            },
            nodeStateStyles:{
                selected:{
                    stroke:{
                        stroke:'#d9d9d9',
                        fill:'#5394ef'
                    }
                }
            },
            modes:{
                // 支持的behavior
                default:[
                    // 拖拽画布
                    // 'drag-canvas',
                    // 缩放画布
                    'zoom-canvas',
                    // 点击选中节点，再次点击节点或点击 Canvas 取消选中状态；
                    // 'click-select',
                    {
                        type:'tooltip',
                        formatText(model:any):string{
                            const cfg = model.conf
                            const text:string[] = []
                            cfg?.forEach((row:any)=>{
                                text.push(row.label + ':' + row.value + '<br>')
                            })
                            return text.join('\n')
                        },
                    }
                ]
            },
            // 是否开启画布自适应。开启后图自动适配画布大小。
            fitView:true,
        })

        graph.data(data)
        graph.render()

        // if(typeof window !== undefined){
        //     window.onresize = ()=>{
        //         if(!graph || graph.get('destroyed')) return
        //         if(!container || !container.scrollHeight || !container.scrollWidth) return 
        //         graph.changeSize(container.scrollWidth as number)
        //     }
        // } 
    }
},[ref])



    return <div ref={ref} id="content"></div>
}
```
