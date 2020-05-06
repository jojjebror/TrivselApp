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
                var podcastFeed = SyndicationFeed.Load(reader);

                foreach (var item in podcastFeed.Items)
                {
                    //var el = item.ElementExtensions.FirstOrDefault(e => e.OuterName == "summary").GetObject<XElement>().Value;

                    var episode = new PodcastEpisodeDto
                    {
                        Id = item.Id,
                        Title = item.Title.Text,
                        Summary = item.Summary.Text,
                        ImageUrl = item.ElementExtensions.FirstOrDefault(i => i.OuterName == "image")
                            .GetObject<XElement>().Attribute("href").Value,
                        EpisodeUrl = item.Links.Last().Uri.AbsoluteUri,
                        Published = item.PublishDate.DateTime
                    };
                    podcastEpisodes.Add(episode);
                }
            }

            return podcastEpisodes;
        }
    }
}
