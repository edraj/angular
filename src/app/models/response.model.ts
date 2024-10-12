

// general as much as possible
export const mapResponse = (data: any): any => {
  let _data = data.records?.length ? data.records[0] : null;

  return {..._data, ..._data?.attributes};
};

