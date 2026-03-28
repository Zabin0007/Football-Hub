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

export const getMatchEvents = async (id: string) => {
  const res = await api.get(`/match/${id}/events`)
  return res.data
}

export const getMatchStats = async (id: string) => {
  const res = await api.get(`/match/${id}/stats`)
  return res.data
}

export const getMatchLineups = async (id: string) => {
  const res = await api.get(`/match/${id}/lineups`)
  return res.data
}