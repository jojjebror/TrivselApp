import { Base } from './BaseDto';

export class PodcastEpisode extends Base {
    public episodeId: string;
    public title: string;
    public summary: string;
    public imageUrl: string;
    public episodeUrl: string;
    public published: Date;
}