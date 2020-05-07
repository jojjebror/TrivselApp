using Logic.Models;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Xml;
using System.Xml.Linq;

namespace Logic.Services
{
    public class PodcastService
    {
        public ICollection<PodcastEpisodeDto> GetPodcastFeed()
        {
            string podcastUrl = "http://exsitecpodden.libsyn.com/rss";

            var podcastEpisodes = new List<PodcastEpisodeDto>();

            using (var reader = XmlReader.Create(podcastUrl))
            {
                var id = 1;
                var podcastFeed = SyndicationFeed.Load(reader);

                foreach (var item in podcastFeed.Items)
                {
                    var summary = item.ElementExtensions.FirstOrDefault(e => e.OuterName == "summary")?
                        .GetObject<XElement>().Value;
                    var imageUrl = item.ElementExtensions.FirstOrDefault(i => i.OuterName == "image")?
                            .GetObject<XElement>().Attribute("href").Value;

                    var episode = new PodcastEpisodeDto
                    {
                        Id = id,
                        EpisodeId = item.Id,
                        Title = item.Title.Text,
                        Summary = summary,
                        ImageUrl = imageUrl,
                        EpisodeUrl = item.Links.Last().Uri.AbsoluteUri,
                        Published = item.PublishDate.DateTime
                    };
                    podcastEpisodes.Add(episode);

                    if (id == 3)
                        break;

                    id++;
                }
            }

            return podcastEpisodes;
        }
    }
}
