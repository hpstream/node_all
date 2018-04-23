function greet(person:string){
    console.log("Hello, " + person);
}

interface Person {
    name: string;
    age?: number;  //可选属性
    [propName: string]: any; //添加任意属性 
    readonly id: Number;
}

let tom: Person = {
    id:12345,
    name: 'Tom',
    age:12
};


