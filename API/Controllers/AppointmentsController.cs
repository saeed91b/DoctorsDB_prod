using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Appointments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppointmentsController : BaseApiController
    {   
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAppointments()
        {
            return HandleResult(await Mediator.Send(new List.Query {}));
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Create(Guid id, string dateString)
        {
            return HandleResult(await Mediator.Send(new Create.Command {DoctorId = id, DateString = dateString}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { DoctorId = id}));
        }
    }
}