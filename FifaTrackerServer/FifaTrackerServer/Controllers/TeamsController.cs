using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FifaTrackerServer.Data;
using FifaTrackerServer.Models;
using FifaTrackerServer.Migrations;
using Newtonsoft.Json;
using System.Text.Json.Nodes;

namespace FifaTrackerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Teams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeam()
        {
            return await _context.Team.ToListAsync();
        }

        // GET: api/Teams/ForPlayer
        [HttpGet("ForPlayer/{email}")]
        public async Task<ActionResult<Team>> GetTeamForPlayer(string email)
        {
           var teams =  await _context.Team.ToListAsync();
            var team = teams.Where(t => t.Members.Contains(email)).First();

            if (team == null)
            {
                return NotFound("Cannot find team for " + email);
            }

            return team;
        }

        // GET: api/Teams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
            var team = await _context.Team.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            return team;
        }

        // PUT: api/Teams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeam(int id, Team team)
        {
            if (id != team.Id)
            {
                return BadRequest();
            }

            _context.Entry(team).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
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

        // POST: api/Teams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Team>> PostTeam(Team team)
        {
            if(team == null)
            {
                return BadRequest("Invalid team");
            }

            _context.Team.Add(team);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeam", new { id = team.Id }, team);
        }

        // DELETE: api/Teams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await _context.Team.FindAsync(id);
            if (team == null)
            {
                return NotFound();
            }

            _context.Team.Remove(team);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //addmember
        [HttpPut("AddMember/{teamId}")]
        public async Task<ActionResult>PutAddMember(int teamId, [FromBody]string newMember)
        {
            var team = await _context.Team.FindAsync(teamId);
            if (team == null)
            {
                return NotFound();
            }


            if (team.Members.Contains(newMember))
            {
                return BadRequest(newMember + " is already in the team!");
            }
            team.Members.Add(newMember);
            _context.Update(team);
            await _context.SaveChangesAsync();

            return NoContent();

        }

        [HttpDelete("DeleteMember/{teamId}")]
        public async Task<ActionResult> DeleteMember(int teamId, [FromBody] string member)
        {
            var team = await _context.Team.FindAsync(teamId);
            if (team == null)
            {
                return NotFound();
            }

            if(team.Members.Contains(member))
            {
                return BadRequest(member + " is not in the team");
            }


            team.Members.Remove(member);
            _context.Update(team);
            await _context.SaveChangesAsync();

            return NoContent();

        }



        private bool TeamExists(int id)
        {
            return _context.Team.Any(e => e.Id == id);
        }
    }
}
