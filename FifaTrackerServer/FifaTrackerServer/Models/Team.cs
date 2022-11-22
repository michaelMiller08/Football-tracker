namespace FifaTrackerServer.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string TeamName { get; set; }

        public List<string>Members { get; set; }
    }
}
