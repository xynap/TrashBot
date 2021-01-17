export type Snowflake = string;

export type Timestamp = string;

export type Channel = {
  id: Snowflake;
  type: number;
  guild_id?: Snowflake;
  position?: number;
  permission_overwrites?: {
    id: Snowflake;
    type: number;
    allow: string;
    deny: string;
  }[];
  name?: string;
  topic?: string | null;
  nsfw?: boolean;
  last_message_id?: Snowflake | null;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: User[];
  icon?: string | null;
  owner_id?: Snowflake;
  application_id?: Snowflake;
  parent_id?: Snowflake | null;
  last_pin_timestamp?: Timestamp | null;
};

export type Emoji = {
  id: Snowflake | null;
  name: string | null;
  roles?: Snowflake[];
  user?: User;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
};

export type Guild = {
  id: Snowflake;
  name: string;
  icon: string | null;
  icon_hash?: string | null;
  splash: string | null;
  discovery_splash: string | null;
  owner?: boolean;
  owner_id: Snowflake;
  permissions?: string;
  region: string;
  afk_channel_id: Snowflake | null;
  afk_timeout: number;
  widget_enabled?: boolean;
  widget_channel_id?: Snowflake | null;
  verification_level: number;
  default_message_notifications: number;
  explicit_content_filter: number;
  roles: Role[];
  emojis: Emoji[];
  features:
    | "INVITE_SPLASH"
    | "VIP_REGIONS"
    | "VANITY_URL"
    | "VERIFIED"
    | "PARTNERED"
    | "COMMUNITY"
    | "COMMERCE"
    | "NEWS"
    | "DISCOVERABLE"
    | "FEATURABLE"
    | "ANIMATED_ICON"
    | "BANNER"
    | "WELCOME_SCREEN_ENABLED"[];
  mfa_level: Number;
  application_id: Snowflake | null;
  system_channel_id: Snowflake | null;
  system_channel_flags: Number;
  rules_channel_id: Snowflake | null;
  joined_at?: Timestamp;
  large?: boolean;
  unavailable: boolean;
  member_count?: number;
  voice_states?: {
    channel_id: Snowflake | null;
    user_id: Snowflake;
    member?: {
      user?: User;
      nick: string | null;
      roles: Snowflake[];
      joined_at: Timestamp;
      premium_since?: Timestamp | null;
      deaf: boolean;
      mute: boolean;
      pending?: boolean;
    };
    session_id: string;
    deaf: boolean;
    mute: boolean;
    self_deaf: boolean;
    self_mute: boolean;
    self_stream?: boolean;
    self_video: boolean;
    suppress: boolean;
  }[];
  members?: Member[];
  channels?: Channel[];
  presences?: Presence[];
  max_presences?: number | null;
  max_members?: number;
  vanity_url_code: string | null;
  description: string | null;
  banner: string | null;
  premium_tier: number;
  premium_subscription_count?: number;
  preferred_locale: string;
  public_updates_channel_id: Snowflake | null;
  max_video_channel_users?: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
};

export type Member = {
  user?: User;
  nick: string | null;
  roles: Snowflake[];
  joined_at: Timestamp;
  premium_since?: Timestamp | null;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
};

export type Message = {
  id: Snowflake;
  channel_id: Snowflake;
  guild_id?: Snowflake;
  author: User;
  member?: Member;
  content: string;
  timestamp: Timestamp;
  edited_timestamp: Timestamp | null;
  tts: boolean;
  mention_everyone: boolean;
  mentions: (User & Member)[];
  mention_roles: Snowflake[];
  mention_channels?: {
    id: Snowflake;
    guild_id: Snowflake;
    type: number;
    name: string;
  }[];
  attachments: {
    id: Snowflake;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    height: number | null;
    width: number | null;
  }[];
  embeds: {
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
  }[];
  reactions?: {
    count: number;
    me: boolean;
    emoji: Emoji[];
  };
  nonce?: number | string;
  pinned: boolean;
  webhook_id?: Snowflake;
  type: number;
  activity?: {
    type: number;
    party_id?: string;
  };
  application?: {
    id: Snowflake;
    cover_image?: string;
    description: string;
    icon: string | null;
    name: string;
  };
  message_reference?: {
    message_id?: Snowflake;
    channel_id?: Snowflake;
    guild_id?: Snowflake;
  };
  flags?: number;
  stickers: {
    id: Snowflake;
    pack_id: Snowflake;
    name: string;
    description: string;
    tags?: string;
    asset: string;
    preview_asset: string | null;
    format_type: number;
  };
  referenced_message?: Message | null;
};

export type Presence = {
  user: User;
  guild_id: Snowflake;
  status: "idle" | "dnd" | "online" | "offline";
  activities: {
    name: string;
    type: number;
    url?: string | null;
    created_at: number;
    timestamps?: {
      start?: number;
      end?: number;
    };
    application_id?: Snowflake;
    details?: string | null;
    state?: string | null;
    emoji?: Emoji | null;
    party?: {
      id?: string;
      size?: [number, number];
    };
    assets?: {
      large_image?: Snowflake;
      large_text?: string;
      small_image?: Snowflake;
      small_text?: string;
    };
    secrets?: {
      join?: string;
      spectate?: string;
      match?: string;
    };
    instance?: boolean;
    flags?: number;
  }[];
  client_status: {
    desktop?: string;
    mobile?: string;
    web?: string;
  };
};

export type Role = {
  id: Snowflake;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: {
    bot_id?: Snowflake;
    integration_id?: Snowflake;
    premium_subscriber?: null;
  };
};

export interface User {
  id: Snowflake;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}
