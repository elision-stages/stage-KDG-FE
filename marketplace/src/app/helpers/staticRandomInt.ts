export default function staticRandomInt(): Function {
  const stored = Math.random()
  return (min: number = 0, max:number = 100, rounded:boolean = true) => {
    let randNum = min + stored * (max - min)
    if(rounded) randNum = Math.floor(randNum)
    return randNum
  }
}
