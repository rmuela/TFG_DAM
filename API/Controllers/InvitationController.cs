namespace API.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using API.Authorization;
using API.Helpers;
using API.Models.Users;

using API.Interfaces;

[ApiController]
[Route("[controller]")]
public class InvitationController : ControllerBase
{
    private IInvitationService _invitationService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;

    public InvitationController(IInvitationService invitationService, IMapper mapper, IOptions<AppSettings> appSettings)
    {
        _invitationService = invitationService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
    }

       
    [HttpPost]
    
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InvitationDTO))]
    public ActionResult<InvitationDTO> Post([FromBody] BaseInvitationDTO baseInvitationDTO)
    {

        return Ok(_invitationService.Add(baseInvitationDTO));
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InvitationDTO))]
    public ActionResult<InvitationDTO> Get()
    {
        return Ok(_invitationService.GetAll());
    }

    
    [HttpGet("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InvitationDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<InvitationDTO> Get(int Id)
    {
        InvitationDTO result = _invitationService.GetById(Id);

        if (result == null)
            return NotFound();

        return Ok(result);

    }
    

    [HttpDelete("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InvitationDTO))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<InvitationDTO> Delete(int Id)
    {
        InvitationDTO result = _invitationService.GetById(Id);

        if (result == null)
            return NotFound();

        _invitationService.Delete(Id);

        return Ok(result);

    }

    [HttpPut("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InvitationDTO))]
    public ActionResult<InvitationDTO> Put([FromBody] BaseInvitationDTO baseInvitationDTO, int Id)
    {

        return Ok(_invitationService.Modify(baseInvitationDTO, Id));
    }
    [HttpPost("pinCode")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InvitationDTO))]
    
    public InvitationDTO GetPinCode( PinCodeModel pinCodeModel)
    {
       return _invitationService.SearchPinCode(pinCodeModel.pinCode,pinCodeModel.IdWedding);
    }
}