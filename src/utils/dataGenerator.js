let usingFilter = (arr) => {  
    return arr.filter(function(item,index){  
        return arr.indexOf(item) == index;  
    });  
} 

// arrayMaker generates the array with unique elements
const arrayMaker = (sendingData,str) => {
    let arr = []
    Object.keys(sendingData).forEach(key => {
      arr.push(sendingData[key][str])
    })
    return usingFilter(arr)
}

// valueMaker generates the value of Billed Quantity in every individual elements
const valueMaker = (sendingData,str,property) => {
    const s = []
    for(let i=0;i<arrayMaker(sendingData,str).length;i++){
        let qt = []
        Object.keys(sendingData).forEach(key => {
            if(sendingData[key][str] === arrayMaker(sendingData,str)[i]){
                qt.push(sendingData[key][property])
            }
        })
        const sumEntry = qt.reduce((acc, curr) => acc + ((typeof curr) === 'number' ? curr : parseFloat(curr.replace(/,/g,''))),0)
        s.push(sumEntry)
    }
    return s;
}

export {arrayMaker, valueMaker}