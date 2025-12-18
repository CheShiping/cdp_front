import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// 初始化 ChatOpenAI 客户端，配置为阿里百炼服务
const chatModel = new ChatOpenAI({
  
  configuration: {
    apiKey: import.meta.env.VITE_DASHSCOPE_API_KEY || "sk----", // 替换为实际 API Key
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  },
  model: "qwen3-max", // 指定使用的模型
});

/**
 * 封装流式调用方法
 * @param messages 对话消息数组
 * @returns 流式响应
 */
export async function* streamChat(messages: { role: string; content: string }[]) {
  // 转换消息格式
  const formattedMessages = messages.map(msg => {
    if (msg.role === "system") {
      return new SystemMessage(msg.content);
    } else {
      return new HumanMessage(msg.content);
    }
  });

  // 调用模型并获取流式响应
  const stream = await chatModel.stream(formattedMessages);

  // 逐个返回流式数据块
  for await (const chunk of stream) {
    yield chunk;
  }
}