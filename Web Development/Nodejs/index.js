// function sum(a,b){
//     return a+b;
// }
// console.log(sum(6,7))


// const path =require("path");

// console.log(__dirname)
// console.log(path.join(__dirname,"index.js"))

const fs=require("fs");
function main(fileName){
    fs.readFile(fileName,"utf-8",function(err,data){
        let total=0;
        for(let i=0;i<data.length;i++){
            if(data[i]==" "){
                total++;
            }
        }
        console.log(total+1);
    })
   

}
main(a.txt);