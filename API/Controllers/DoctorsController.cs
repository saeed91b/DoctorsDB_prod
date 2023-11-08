using System.Web.Http;
using Application.Core;
using Application.Doctors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DoctorsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet] //api/doctors
        public async Task<IActionResult> GetDoctors([FromQuery] DoctorParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query {Params = param}));
        }

        [AllowAnonymous]
        [HttpGet("{id}")] //api/doctors/{id}
        public async Task<IActionResult> GetDoctor(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost("{id}/favorite")]
        public async Task<IActionResult> UpdateFavorite(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateFavorite.Command{Id = id}));
        }

        [HttpPost("{id}/rate")]
        public async Task<IActionResult> UpdateRating(Guid id, ushort score)
        {
            return HandleResult(await Mediator.Send(new UpdateRating.Command{Id = id, Score = score}));
        }
    }
}