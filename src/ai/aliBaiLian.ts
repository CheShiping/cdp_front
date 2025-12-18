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
 * @param options 配置选项，支持 signal 用于中断请求
 * @returns 流式响应
 */
export async function* streamChat(
  messages: { role: string; content: string }[],
  options?: { signal?: AbortSignal }
) {
  // 转换消息格式
  const formattedMessages = messages.map(msg => {
    if (msg.role === "system") {
      return new SystemMessage(msg.content);
    } else {
      return new HumanMessage(msg.content);
    }
  });

  // 调用模型并获取流式响应，传递 signal 用于中断请求
  const stream = await chatModel.stream(formattedMessages, {
    signal: options?.signal
  });

  // 逐个返回流式数据块
  for await (const chunk of stream) {
    // 检查是否已中断
    if (options?.signal?.aborted) {
      // 立即中断并返回
      return;
    }
    yield chunk;
  }
}