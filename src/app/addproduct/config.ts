export const dataProcesingDelete = (id:any) => {
  return {
    table_name: 'products',
    row_ids: id,
    action: 'delete',
  };
};
