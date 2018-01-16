class conversionTime {
  public TimestampToYYYYMMDDFormat = (data: number):string => {
    let myDate = new Date(data);

    let yyyy = myDate.getFullYear();

    let mm = myDate.getMonth() + 1;
    let mmstring = mm < 10 ? '0' + mm : mm;

    let dd = myDate.getDate();
    let ddstring = dd < 10 ? '0' + dd : dd;

    return '' + yyyy + '-' + mmstring + '-' + ddstring;
  }

  public dateToYYYYMMDDString = (data: Date):string => {
    let yyyy = data.getFullYear();

    let mm = data.getMonth() + 1;
    let mmstring = mm < 10 ? '0' + mm : mm;

    let dd = data.getDate();
    let ddstring = dd < 10 ? '0' + dd : dd;

    return '' + yyyy + mmstring + ddstring;
  }
  
  public dateToYYYYMMDDFormat = (data: Date):string => {
    let yyyy = data.getFullYear();

    let mm = data.getMonth() + 1;
    let mmstring = mm < 10 ? '0' + mm : mm;

    let dd = data.getDate();
    let ddstring = dd < 10 ? '0' + dd : dd;

    return '' + yyyy + '-' + mmstring + '-' + ddstring;
  }
}

export default new conversionTime();
