export function getProductName(id,products){
  try{
    return products.data.filter((prod)=>prod._id==id)[0].name
  }catch(e){
    return false
  }
}
export function getProductEntity(id,products){
  console.log(id,products);
  try{
    return products.data.filter((prod)=>prod._id==id)[0]
  }catch(e){
    return false
  }
}
export function getCategoryName(id,categories){
  try{
    return categories.data.filter((cat)=>cat._id==id)[0]
  }catch(e){
    return false
  }
}
