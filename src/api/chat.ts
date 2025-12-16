import { request } from "@/utils/request";

// 发送聊天消息
export const sendChatMessage = (data: { message: string }) => {
  return request<{ message: string }>('/chat/stream', 'post', data);
};