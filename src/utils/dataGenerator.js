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

// valueMaker generates the value of 'property' in every individual elements
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

// weightedMeanMaker generates the weighted mean value of 'property' 
const weightedMeanMaker = (sendingData, str, property) => {
    const s = []
    for(let i=0;i<arrayMaker(sendingData,str).length;i++){
        let qt = []
        let prop = []
        Object.keys(sendingData).forEach(key => {
            if(sendingData[key][str] === arrayMaker(sendingData,str)[i]){
                qt.push(sendingData[key]['Billed Quantity'])
                prop.push(sendingData[key][property])
            }
        })
        let sumEntry = 0
        for(let j=0;j<qt.length;j++){
            sumEntry+= qt[j] * prop[j]
        }
        const sumOfQuantity = qt.reduce((acc,curr) => acc + curr)
        s.push(sumEntry/sumOfQuantity)
    }
    return s;
}


const meanMaker = (sendingData, str, property) => {
    const s = []
    for(let i=0;i<arrayMaker(sendingData,str).length;i++){
        let qt = []
        Object.keys(sendingData).forEach(key => {
            if(sendingData[key][str] === arrayMaker(sendingData,str)[i]){
                qt.push(sendingData[key][property])
            }
        })
        const sumEntry = qt.reduce((acc, curr) => acc + ((typeof curr) === 'number' ? curr : parseFloat(curr.replace(/,/g,''))),0)
        s.push(sumEntry/qt.length)
    }
    return s;
}
export {arrayMaker, valueMaker, weightedMeanMaker, meanMaker}