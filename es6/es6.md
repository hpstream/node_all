#### 1.Generator函数

**多角度分析**
> 语法上分析，Generator函数内部是一个状态机，封装了多个内部状态。
执行Generator函数会返回一个遍历对象，也就是说，Generatorg函数除
了状态机，还有一个遍历器对象生成函数。返回的遍历器对象，可以一次
遍历Generator函数内部的每一个状态 。

> 形式上，Generator函数是一个普通的函数，但是有两个特征。
一. function 命令与函数名之间有一个 * 号;
二. 函数体内部使用yield语句，定义不同的内部状态（yield语句在英语里的意思就是'产出'）

        
```apple js

function* Generator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var g = Generator();

``` 

#### promise 对象
>promise有两个特点

> 1.对象的状态不受外界影响。Promise对象代表一个异步操作，
有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）
和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，
任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，
它的英语意思就是“承诺”，表示其他手段无法改变

>（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。
Promise对象的状态改变，只有两种可能：从Pending变为Resolved
和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，
不会再变了，会一直保持这个结果。就算改变已经发生了，你再对
Promise对象添加回调函数，也会立即得到这个结果。（Event）完
全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
