export const exportResults = (res: any) => res?.data;

export const convertParams = (params: { [key: string]: any }) => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, JSON.stringify(value)])
  );
};

export type APIGetParams = {
  page?: number;
  take?: number;
};
