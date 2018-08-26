import Base from '../../base/base.js'

const template = `
    
    
`;
const templateObj =  {
     templateUrl:"",
    data:function(){
        return {
            dd:'bar'
        }
    },
    methods:{

    },
    mounted() {
        // console.log(1);
        var instances =  CKEDITOR.replace( 'editor' );
        console.log(instances);
        // var s1 = unescape(s);
    }
};




export default templateObj;  


