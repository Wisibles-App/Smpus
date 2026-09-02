import axios from 'axios';

export const BASE_URL = 'https://smpus.wisibles.com/';
export const CLINT_SERVICE = "smpus";


export var api = axios.create({
    baseURL: `https://smpus.wisibles.com/`
  });

  export var medleyAPI = axios.create({
    baseURL: `https://smpus.wisibles.com/`
  }); 
  export var noBase = axios.create({
    baseURL: ''
  }); 
  









