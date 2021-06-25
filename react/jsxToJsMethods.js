// type 用于标记节点类型 比如 ul div ...
// config 以对象形式传入，组件所有属性都会以键值对的形式存储在config对象中
// children 以对象形式传入，记录钻进标签之间的嵌套关系
//  React.createElement对jsx进行数据处理、清洗
export function createElement(type, config, children) {
    // propName 变量用于储存后面需要用到的元素属性
    let propName; 
    // props 变量用于储存元素属性的键值对集合
    const props = {}; 
    // key、ref、self、source 均为 React 元素的属性，此处不必深究
    let key = null;
    let ref = null; 
    let self = null; 
    let source = null; 
    // config 对象中存储的是元素的属性
    if (config != null) { 
      // 进来之后做的第一件事，是依次对 ref、key、self 和 source 属性赋值
      if (hasValidRef(config)) {
        ref = config.ref;
      }
      // 此处将 key 值字符串化
      if (hasValidKey(config)) {
        key = '' + config.key; 
      }
      self = config.__self === undefined ? null : config.__self;
      source = config.__source === undefined ? null : config.__source;
      // 接着就是要把 config 里面的属性都一个一个挪到 props 这个之前声明好的对象里面
      for (propName in config) {
        if (
          // 筛选出可以提进 props 对象里的属性
          hasOwnProperty.call(config, propName) &&
          !RESERVED_PROPS.hasOwnProperty(propName) 
        ) {
          props[propName] = config[propName]; 
        }
      }
    }
    // childrenLength 指的是当前元素的子元素的个数，减去的 2 是 type 和 config 两个参数占用的长度
    const childrenLength = arguments.length - 2; 
    // 如果抛去type和config，就只剩下一个参数，一般意味着文本节点出现了
    if (childrenLength === 1) { 
      // 直接把这个参数的值赋给props.children
      props.children = children; 
      // 处理嵌套多个子元素的情况
    } else if (childrenLength > 1) { 
      // 声明一个子元素数组
      const childArray = Array(childrenLength); 
      // 把子元素推进数组里
      for (let i = 0; i < childrenLength; i++) { 
        childArray[i] = arguments[i + 2];
      }
      // 最后把这个数组赋值给props.children
      props.children = childArray; 
    } 
    // 处理 defaultProps
    if (type && type.defaultProps) {
      const defaultProps = type.defaultProps;
      for (propName in defaultProps) { 
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }
    // 最后返回一个调用ReactElement执行方法，并传入刚才处理过的参数
    return ReactElement(
      type,
      key,
      ref,
      self,
      source,
      ReactCurrentOwner.current,
      props,
    );
  }

// 调用React.createElement()之后调用ReactElement()
//  ReactElement是符合虚拟dom规范的js对象
const ReactElement = function(type, key, ref, self, source, owner, props) {
    const element = {
      // REACT_ELEMENT_TYPE是一个常量，用来标识该对象是一个ReactElement
      $$typeof: REACT_ELEMENT_TYPE,
      // 内置属性赋值
      type: type,
      key: key,
      ref: ref,
      props: props,
      // 记录创造该元素的组件
      _owner: owner,
    };
    if (__DEV__) {
      // 这里是一些针对 __DEV__ 环境下的处理，对于大家理解主要逻辑意义不大，此处我直接省略掉，以免混淆视听
    }
    return element;
  };

// ReactDOM.render()方法将虚拟节点变成真实节点挂载在html上
ReactDOM.render(
  // 需要渲染的元素（ReactElement）
  element,
  // 元素挂在的目标容器（一个真实的dom）
  container,
  // 回调函数，可选参数，可用来处理渲染结束后的逻辑
  [callback]
)

// dom节点如下
{/* <body>
  <div id="root"></div>
</body>

const App = <p>hello world</p>

const rootElement = document.getElementById('root')
ReactDOM.render(<App/>,rootElement)

生成 => 
<body>
  <div id="root"> <p>hello world</p></div>
</body> */}


