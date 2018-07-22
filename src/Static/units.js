var units = [
    {
        "name": "lb",
        "id": "7f2acc2fba4df5c7c3e4b2d1e47dd745"
    },
    {
        "name": "each",
        "id": "20b7d9f573b4fbb1192a1248d003b220"
    }
]
export default function getUnitName(unitId){
  return units.filter((unit)=>{
    return unitId==unit.id
  })[0].name
}
