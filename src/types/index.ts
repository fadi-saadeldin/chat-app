
interface Message {
  id: number;
  message: string;
  author: string;
  created_at: string;
}

interface ApiResponse {
  messages: Message[];
}