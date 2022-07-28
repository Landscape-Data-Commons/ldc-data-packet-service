import {Request, Response} from 'express'

/**
 * iterates over request query object if present, 
 * determines if objectkeys are within the model of the parent
 * table, or the child table. returns object with keys to filter
 * by.
 * 
 * @param {object} req The request query object.
 * @param {object} modelObject The model attributes object.
 * @return {object} object to use with sequelize where clause
 */

export const whereConstruct = (req:any, modelObject:any): object =>{
  let obj:any = {}
  for(const [key,value] of Object.entries(req)){
    // key type check could be implemented here
    if(req){ 
      switch(modelObject.hasOwnProperty(key)){
        // check if key is present in current model.
        // returns the ones present, skips the ones missing
        case true:
         obj[key] = value
         break 
        case false:
          
          break
      }
    } else {
      obj = {}
    }
  }
  return obj
}


export const pairUp = (list:any[])=>{
  let output:any[] = []
  list.forEach((val,index)=>{
    if(index<(list.length-1)&&(index%2)===0){
      output.push([val,list[index+1]])
    }
  })
  return output
}

export const coordPair = (list:any[]) =>{
  let pairList = ''
  let subPairs = ''
  let startPoint = ''
  for(let i = 0; i<list.length; i++){
    if(list.length>0 && list.length<=1){
      for(let j in list[i]){
        subPairs+=list[i][j]
      }
      pairList+=`${subPairs} `
      subPairs = ''
    } else {
      if (i<1){
        for (let j in list[i]){
          if(j==list[i].indexOf(list[i][list[i].length-1])){
            subPairs+=`${list[i][j]} `
          } else {
            subPairs+=`${list[i][j]} `
          }
        }
        startPoint+=`${subPairs} `
        subPairs = ''
      }
      if (i==list.indexOf(list[list.length-1])){
        for(let j in list[i]){

          if(j==list[i].indexOf(list[i][list[i].length-1])){
            subPairs+=`${list[i][j]} `
          } else {
            subPairs+=`${list[i][j]} `
          }                
        }
        pairList+=`${subPairs}`
        subPairs = ''
      } else {
        for(let j in list[i]){
          if(j==list[i].indexOf(list[i][list[i].length-1])){
            subPairs+=`${list[i][j]} `
          } else {
            subPairs+=`${list[i][j]} `
          } 
        }
        pairList+=`${subPairs}, `
        subPairs = '' 
        // paramList+=`"${tmpData[i]}", `
      }
    }
    
  }
  return pairList
}
