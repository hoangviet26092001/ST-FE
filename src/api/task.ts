import axios from "../axios";
import { APIGetParams, convertParams, exportResults } from "../utils/api";
import { TASKS } from "../utils/routers";

export const getTaskList = async (params: APIGetParams) =>
  exportResults(
    await axios.get(TASKS.LIST, {
      params: convertParams({
        page: params?.page ?? 1,
        take: params?.take ?? 50,
      }),
    })
  );
export const addTaskList = async (title: string) =>
  exportResults(await axios.post(TASKS.LIST, { title, status: "TODO" }));

export const deleteTask = async (id: string) =>
  exportResults(await axios.delete(`${TASKS.LIST}/${id}`));

export const editTask = async (
  id: string,
  payload: { title: string; status: string }
) => exportResults(await axios.put(`${TASKS.LIST}/${id}`, payload));
