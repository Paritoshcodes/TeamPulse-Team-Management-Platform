import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function fetchMembers() {
  const response = await api.get('/members');
  return response.data;
}

export async function fetchMemberById(memberId) {
  const response = await api.get(`/members/${memberId}`);
  return response.data;
}

export async function createMember(formData) {
  const response = await api.post('/members', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function fetchMemberStats() {
  const response = await api.get('/members/stats');
  return response.data;
}
