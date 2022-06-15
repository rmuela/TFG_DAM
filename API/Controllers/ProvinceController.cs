using API.Helpers;
using API.Interfaces;
using API.Models.Provinces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using API.Authorization;
namespace API.Controllers
{
   [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProvinceController: ControllerBase
    {
        private IProvinceService _provinceService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public ProvinceController(IProvinceService provinceService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _provinceService = provinceService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }        

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProvinceDTO))]
        public ActionResult<ProvinceDTO> Get()
        {
            return Ok(_provinceService.GetAll());
        }
    }
}
