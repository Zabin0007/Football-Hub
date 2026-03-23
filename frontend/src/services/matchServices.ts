import api from "../api/axios";
import { ApiMatch } from "../types/apiMatch";

export const getTodayMatches = async(): Promise<ApiMatch[]> => {
    const res = await api.get('/today');
    return res.data
};