using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmarterBalanced.SpanishEnglishDemarcation.Web.Models;

namespace SmarterBalanced.SpanishEnglishDemarcation.Web.Controllers
{
    public class FrameIndicatorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
