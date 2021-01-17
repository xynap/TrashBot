import { Snowflake, Timestamp } from "./common";

export interface CreateMessageRequest {
  content: string;
  nonce: number | string;
  tts: boolean;
  file: Buffer;
  embed: {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: Timestamp;
    color?: number;
    footer?: {
      text: string;
      icon_url?: string;
      proxy_icon_url?: string;
    };
    image?: {
      url?: string;
      proxy_url?: string;
      height?: number;
      width?: number;
    };
    thumbnail?: {
      url?: string;
      proxy_url?: string;
      height?: number;
      width?: number;
    };
    video?: {
      url?: string;
      height?: number;
      width?: number;
    };
    provider?: {
      name?: string;
      url?: string;
    };
    author?: {
      name?: string;
      url?: string;
      icon_url?: string;
      proxy_icon_url?: string;
    };
    fields?: {
      name: string;
      value: string;
      inline?: boolean;
    }[];
  };
  payload_json: string;
  allowed_mentions: {
    parse: ("roles" | "users" | "everyone")[];
    roles: Snowflake[];
    users: Snowflake[];
    replied_user: boolean;
  };
  message_reference: {
    message_id?: Snowflake;
    channel_id?: Snowflake;
    guild_id?: Snowflake;
  };
}

export interface ModifyChannelRequest {
  name: string;
  type: number;
  position: number | null;
  topic: string | null;
  nsfw: boolean | null;
  rate_limit_per_user: number | null;
  bitrate: number | null;
  user_limit: number | null;
  permission_overwrites:
    | {
        id: Snowflake;
        type: number;
        allow: string;
        deny: string;
      }[]
    | null;
  parent_id: Snowflake | null;
}
