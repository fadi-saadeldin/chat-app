/**
 * API Service for chat application
 * Handles all HTTP requests to the backend
 */

import type { Message, PostMessageRequest } from '@/types';

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN || 'super-secret-doodle-token';


interface ErrorResponse {
  error: string;
}

interface InternalServerError {
  error: {
    message: string;
    createdAt: string;
  };
}

/** Union of every error shape the API can return. */
type ApiErrorBody = ErrorResponse | InternalServerError;

/** Narrows to InternalServerError when error is an object, not a string. */
function isInternalServerError(body: any): body is InternalServerError {
  return (
    body &&
    typeof body.error === 'object' &&
    typeof body.error.message === 'string'
  );
}

export class ApiError extends Error {
  status: number;
  createdAt?: string;

  constructor(message: string, status: number, createdAt?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.createdAt = createdAt;
  }
}

async function throwApiError(response: Response): Promise<never> {
  let message = response.statusText || 'An unexpected error occurred';
  let createdAt: string | undefined;

  try {
    const body: ApiErrorBody = await response.json();

    if (isInternalServerError(body)) {
      message = body.error.message;
      createdAt = body.error.createdAt;
    } else if (body.error) {
      message = body.error;
    }
  } catch {
    // body wasn't valid JSON — keep the status-text fallback
  }

  throw new ApiError(message, response.status, createdAt);
}

/**
 * API Service class
 */
export class ChatApiService {
  private static headers = {
    'Authorization': `Bearer ${AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  };

  private static async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: this.headers,
        ...options,
      });

      if (!response.ok) {
        await throwApiError(response);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;

      throw new ApiError(
        'Unable to connect to the server. Please check your connection.',
        0
      );
    }
  }

  /**
   * Fetch all messages from the API.
   * @returns Promise<Message[]>
   * @throws ApiError
   */

  static async getMessages(): Promise<Message[]> {
    return this.request<Message[]>('/messages', {
      method: 'GET',
    });
  }

  /**
 * Post a new message to the API.
 * @param message - The message text
 * @param author  - The author name
 * @returns Promise<Message>
 * @throws ApiError
 */
  static async postMessage(postMessageRequest: PostMessageRequest): Promise<Message> {
    const { message, author } = postMessageRequest;
    return this.request<Message>('/messages', {
      method: 'POST',
      body: JSON.stringify({ message, author }),
      cache: 'no-store',
    });
  }
}
