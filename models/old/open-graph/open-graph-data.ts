// For more details, check out:
// https://ogp.me/
// https://developers.facebook.com/docs/sharing/webmasters/

// TODO: Add more types.

export type AudioType = "audio/mpeg";
export type ImageType = "image/jpeg" | "image/gif" | "image/png";
export type VideoType = "application/x-shockwave-flash" | "video/mp4";

export interface OpenGraphData {
  ogTitle?: string | string[];
  ogDescription?: string | string[];
  ogType?:
    | "article"
    | "book"
    | "music.album"
    | "music.playlist"
    | "music.radio_station"
    | "music.song"
    | "profile"
    | "video.episode"
    | "video.movie"
    | "video.other"
    | "video.tv_show"
    | "website";

  ogArticleAuthor?: string | string[];
  ogArticleExpirationTime?: string | string[];
  ogArticleModifiedTime?: string | string[];
  ogArticlePublishedTime?: string | string[];
  ogArticleSection?: string | string[];
  ogArticleTag?: string | string[];

  ogAudio?: string | string[];
  ogAudioSecureUrl?: string | string[];
  ogAudioType?: AudioType | AudioType[];

  ogBookAuthor?: string | string[];
  ogBookIsbn?: string | string[];
  ogBookReleaseDate?: string | string[];
  ogBookTag?: string | string[];

  ogDeterminer?: string | string[];

  ogImage?: string | string[];
  ogImageAlt?: string | string[];
  ogImageHeight?: string | string[];
  ogImageSecureUrl?: string | string[];
  ogImageType?: ImageType | ImageType[];
  ogImageUrl?: string | string[];
  ogImageWidth?: string | string[];

  ogLocale?: string | string[];
  ogLocaleAlternate?: string | string[];

  ogProfileFirstName?: string | string[];
  ogProfileGender?: string | string[];
  ogProfileLastName?: string | string[];
  ogProfileUsername?: string | string[];

  ogSiteName?: string | string[];

  ogUrl?: string | string[];

  ogVideo?: string | string[];
  ogVideoActor?: string | string[];
  ogVideoActorRole?: string | string[];
  ogVideoDirector?: string | string[];
  ogVideoDuration?: string | string[];
  ogVideoHeight?: string | string[];
  ogVideoReleaseDate?: string | string[];
  ogVideoSecureUrl?: string | string[];
  ogVideoSeries?: string | string[];
  ogVideoTag?: string | string[];
  ogVideoType?: VideoType | VideoType[];
  ogVideoUrl?: string | string[];
  ogVideoWidth?: string | string[];
  ogVideoWriter?: string | string[];
}
