export type Message = {
  _id: string;
  
author: string;
  message: string;
  createdAt: string;
};


export type PostMessageRequest = {
  message: string;
  author: string;
};