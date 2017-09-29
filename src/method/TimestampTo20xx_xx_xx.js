const TimestampTo20xx_xx_xx = (Timestamp) => {
	let _Array = "",
		myDate=new Date(Timestamp);
	_Array = myDate.getFullYear() + '-' + chackMonth(myDate.getMonth()) + '-' + chackDate(myDate.getDate());
	return _Array;
}
export default TimestampTo20xx_xx_xx

function chackMonth(value) {
	let _string = '';
	if (value < 9) {
		_string = '0' + (value+1)
		return _string
	}else {
		_string = (value+1)
		return _string
	}
}
function chackDate(value) {
	let _string = '';
	if (value < 10) {
		_string = '0' + value;
		return _string
	}else {
		_string = value
		return _string
	}
}

