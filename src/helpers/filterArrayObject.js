export const filterArray = (arrayObject, datoBusqueda) => {
  let filterData = [];
  arrayObject.forEach((object) => {
    for (const property in object) {
      if (typeof object[property] === "string") {
        if (
          object[property].toLowerCase().includes(datoBusqueda.toLowerCase())
        ) {
          filterData.push(object);
          break;
        }
      }
    }
  });
  return filterData;
};
