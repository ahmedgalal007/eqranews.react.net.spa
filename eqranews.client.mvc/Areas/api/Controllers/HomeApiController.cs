using eqranews.react.net.spa.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.client.mvc.Areas.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeApiController : ControllerBase
    {
        ApplicationDbContext _db;
        public HomeApiController(ApplicationDbContext db)
        {
            _db = db;
        }


    }
}
