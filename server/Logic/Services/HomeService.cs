using Logic.Database;
using Logic.Models;
using Logic.Translators;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.ServiceModel.Syndication;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace Logic.Services
{
    public class HomeService
    {
        private readonly DatabaseContext _context;

        public HomeService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<ICollection<OfficeDto>> GetOffices()
        {
            var dbOffices = await _context.Offices.ToListAsync();

            return dbOffices.Select(OfficeTranslator.ToOfficeDto).ToList();
        }

        public ICollection<PodcastEpisodeDto> GetPodcast()
        {
            string podcastUrl = "http://exsitecpodden.libsyn.com/rss";

            var podcastEpisodes = new List<PodcastEpisodeDto>();

            using (var reader = XmlReader.Create(podcastUrl))
            {
                var id = 1;
                var podcastFeed = SyndicationFeed.Load(reader);

                foreach (var item in podcastFeed.Items.Take(3))
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

                    id++;
                }
            }

            return podcastEpisodes;
        }

        public ICollection<InstagramPostDto> GetInstagram()
        {
            string instagramUrl = "https://www.instagram.com/exsitec/?__a=1";

            var instagramPosts = new List<InstagramPostDto>();

            return instagramPosts;
        }
    }
}
