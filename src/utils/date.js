import dayjs from 'dayjs';
export const fmt = (iso) => (iso ? dayjs(iso).format('DD/MM/YYYY') : '');
export const parseInput = (str) => str ? dayjs(str, 'DD-MM-YYYY').format('YYYY-MM-DD') : '';