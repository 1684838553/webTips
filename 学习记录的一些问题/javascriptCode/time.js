const getFormatDate = (data, number = 0, year = 0) => {
  if (data) {
    const y = `${data.getFullYear() + year}`;
    const m = `${data.getMonth() + 1}`;
    const d = `${data.getDate() + number}`;
    console.log(y, m, d);
    const time = `${y}-${m.length === 1 ? `0${m}` : m}-${
      d.length === 1 ? 0 + d : d
    }`;
    console.log(time);
    return time;
  } else {
    return "";
  }
};
minDate = new Date(getFormatDate(new Date()));
console.log(new Date(), minDate);
