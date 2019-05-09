export function setOutlet(roomNumber,unit,state){
	return{
		type: 'SET_OUTLET_REQ',
		roomNumber,unit,state
	}
}
