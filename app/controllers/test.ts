function simpleStringState<T>(
  initial: T
): [()=>T, (v:T)=>void]{
  let val: T = initial;
  return [
    ()=>val,
    (v:T)=>{
      val=v
    }
  ]
}
interface Rank<T>{
  item: T,
  rank:number
}


function ranker<ANYTHING>(items:ANYTHING[],rank:(v:ANYTHING)=>number):ANYTHING[]{
  // create an object by iterating over the array,
  // separating 'item' (whatever that is//its a generic)
  // from the 'rank' which 

  const ranks:Rank<ANYTHING>[] = items.map((item)=>({
    item,
    rank: rank(item)
  }))

  // organiza el array k acabas de hacer por 'rank' number
  ranks.sort((a,b)=>a.rank - b.rank)

  // devuelve solo el componente no numerico del objeto entrado
  return ranks.map((rank) => rank.item)
}

interface objeto{
  nombre:string;
  vida:number;
}

const objetos: objeto[] = [
  {
    nombre: "cosa1",
    vida: 7
  },
  {
    nombre: "cosa2",
    vida: 6
  }
]

console.log(ranker(objetos,({vida})=>vida))