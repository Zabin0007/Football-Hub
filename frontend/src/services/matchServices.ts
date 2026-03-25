import api from "../api/axios";
import { ApiMatch } from "../types/apiMatch";
import { ApiMAtchDetail } from "../types/apiMatchDetail";

export const getTodayMatches = async(): Promise<ApiMatch[]> => {
    const res = await api.get('/today');
    return res.data
};

export const getMatchById = async(id : string): Promise<ApiMAtchDetail> => {
    const res = await api.get(`/match/${id}`)
    return res.data
}