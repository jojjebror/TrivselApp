using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.ServiceModel.Syndication;
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
            try
            {
                string podcastUrl = "http://exsitecpodden.libsyn.com/rss";

                using (var reader = XmlReader.Create(podcastUrl))
                {
                    var id = 1;
                    var podcastFeed = SyndicationFeed.Load(reader);

                    var podcastEpisodes = new List<PodcastEpisodeDto>();

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

                    return podcastEpisodes;
                }          
            } catch (Exception e)
            {
                e.Message.ToString();
            }

            return null;
        }

        public async Task<OfficeDto> UpdateOffice(int id, OfficeDto office)
        {
            var dbOffice = await _context.Offices.FindAsync(id);

            dbOffice.Name = office.Name;
            dbOffice.Adress = office.Adress;
            dbOffice.SwishNumber = office.SwishNumber;
            dbOffice.Info = office.Info;

            await _context.SaveChangesAsync();

            return OfficeTranslator.ToOfficeDto(dbOffice);
        }

        public async Task<OfficeDto> CreateOffice(OfficeDto office)
        {
            var newOffice = new Office()
            {
                Name = office.Name,
                Adress = office.Adress,
                SwishNumber = office.SwishNumber
            };

            _context.Offices.Add(newOffice);

            await _context.SaveChangesAsync();

            return OfficeTranslator.ToOfficeDto(newOffice);

        }
    }
}
