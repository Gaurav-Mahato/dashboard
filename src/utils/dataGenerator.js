let usingFilter = (arr) => {  
    return arr.filter(function(item,index){  
        return arr.indexOf(item) == index;  
    });  
} 
const arrayMaker = (sendingData,str) => {
    let arr = []
    Object.keys(sendingData).forEach(key => {
      arr.push(sendingData[key][str])
    })
    console.log(usingFilter(arr))
    return usingFilter(arr)
}
const valueMaker = (sendingData,str) => {
    const s = []
    for(let i=0;i<arrayMaker(sendingData,str).length;i++){
        let qt = []
        Object.keys(sendingData).forEach(key => {
            if(sendingData[key][str] === arrayMaker(sendingData,str)[i]){
                qt.push(sendingData[key]['Billed Quantity'])
            }
        })
        const sumEntry = qt.reduce((acc, curr) => acc + curr)
        s.push(sumEntry)
    }
    return s;
}

export {arrayMaker, valueMaker}