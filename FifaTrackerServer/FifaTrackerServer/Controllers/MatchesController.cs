using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FifaTrackerServer.Data;
using FifaTrackerServer.Models;
using System.Collections;

namespace FifaTrackerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MatchesController(ApplicationDbContext context)

        {
            _context = context;
        }

        // GET: api/Matches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Match>>> GetMatches()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:3000");

            return await _context.Matches.ToListAsync();
        }

        // GET: api/Matches/Scheduled
        [HttpGet("Scheduled")]
        public async Task<ActionResult<IEnumerable<Match>>> GetScheduledMatches()
        {
            var dateTime = DateTime.Now;
            var matches =  await _context.Matches.ToListAsync();
            var result =  matches.Where(x => dateTime.CompareTo(x.Date.ToDateTime(x.Time)) < 0).ToList();
            return result;
        }

        // GET: api/Matches/ScheduledForTeam
        [HttpGet("ScheduledForTeam/{teamId}")]
        public async Task<ActionResult<IEnumerable<Match>>> GetScheduledForTeamMatches(int teamID)
        {
            var dateTime = DateTime.Now;
            var matches = await _context.Matches.ToListAsync();
            var team = await _context.Team.FindAsync(teamID);
            //ToDo:error handling
            if(team == null)
            {
                return NotFound("team not found");
            }
            var matchesForTeam = matches.Where(p => team.Members.Any(x => x == p.Creator));

            var result = matchesForTeam.Where(x => dateTime.CompareTo(x.Date.ToDateTime(x.Time)) < 0).ToList();
            return result;
        }
        // GET: api/Matches/Previous
        [HttpGet("Previous")]
        public async Task<ActionResult<IEnumerable<Match>>> GetPreviousMatches()
        {
            var dateTime = DateTime.Now;
            var matches = await _context.Matches.ToListAsync();
            var result = matches.Where(x => dateTime.CompareTo(x.Date.ToDateTime(x.Time)) > 0).ToList();
            return result;
        }

        // GET: api/Matches/PreviousForTeam
        [HttpGet("PreviousForTeam/{teamId}")]
        public async Task<ActionResult<IEnumerable<Match>>> GetPreviousForTeamMatches(int teamID)
        {
            var dateTime = DateTime.Now;
            var matches = await _context.Matches.ToListAsync();
            var team = await _context.Team.FindAsync(teamID);
            if (team == null)
            {
                return NotFound("team not found");
            }

            //ToDO: error handling
            var matchesForTeam = matches.Where(p => team.Members.Any(x => x == p.Creator));

            var result = matchesForTeam.Where(x => dateTime.CompareTo(x.Date.ToDateTime(x.Time)) > 0).ToList();
            return result;
        }

        // GET: api/Matches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Match>> GetMatch(int id)
        {
            var match = await _context.Matches.FindAsync(id);

            if (match == null)
            {
                return NotFound();
            }

            return match;
        }

        // PUT: api/Matches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMatch(int id, Match match)
        {
            if (id != match.Id)
            {
                return BadRequest();
            }

            _context.Entry(match).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Matches
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Match>> PostMatch(Match match)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:3000");

            _context.Matches.Add(match);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatch", new { id = match.Id }, match);
        }

        // DELETE: api/Matches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatch(int id)
        {
            var match = await _context.Matches.FindAsync(id);
            if (match == null)
            {
                return NotFound();
            }

            _context.Matches.Remove(match);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MatchExists(int id)
        {
            return _context.Matches.Any(e => e.Id == id);
        }
    }
}
