import { AgentConfig } from "../config";
import { generateBriefing, generateMeetingResponse } from "../services/openai";
import { textToSpeech } from "../services/elevenlabs";
import { fetchNews } from "../services/news";
import path from "path";

export class BaseAgent {
  constructor(public config: AgentConfig) {}

  // 뉴스 기반 브리핑 실행
  async runBriefing(): Promise<{ text: string; audioPath: string }> {
    console.log(`[${this.config.name}] 브리핑 시작...`);

    const news = await fetchNews(this.config.keywords);
    const text = await generateBriefing(this.config.systemPrompt, news);
    const audioPath = await this.speak(text);

    return { text, audioPath };
  }

  // 미팅 메시지 응답
  async runMeeting(
    history: { role: "user" | "assistant"; content: string }[]
  ): Promise<{ text: string; audioPath: string }> {
    const text = await generateMeetingResponse(this.config.systemPrompt, history);
    const audioPath = await this.speak(text);
    return { text, audioPath };
  }

  // 텍스트를 음성으로 변환
  async speak(text: string): Promise<string> {
    const outputPath = path.resolve(
      "assets/audio",
      `${this.config.id}_${Date.now()}.mp3`
    );
    return textToSpeech(text, this.config.voiceId, outputPath);
  }
}
