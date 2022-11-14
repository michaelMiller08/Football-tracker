namespace FifaTrackerServer.Models
{
    public class Match
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public string Creator { get; set; }
        public string Opponent { get; set; }
        public int CreatorScore { get; set; }
        public int OpponentScore { get; set; }
    }
}
