namespace API.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using API.Authorization;
using API.Helpers;
using API.Models.Users;
using API.Entities;
using API.Interfaces;
using API.Models;
[Authorize]
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
    [HttpPost("user")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InvitationDTO))]
    public ActionResult<InvitationDTO> GetByUser(VerifyEditInvitationModel  verifyEditInvitationModel)
    {
        return Ok(_invitationService.GetAllByUser(verifyEditInvitationModel.idUsuario));
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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InvitationEditDTO))]
    public ActionResult<InvitationDTO> Put([FromBody] InvitationEditDTO invitationEditDTO, int Id)
    {

        return Ok(_invitationService.Modify(invitationEditDTO, Id));
    }
    [HttpPost("pinCode")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PinCodeModel))]
    
    public int GetPinCode( PinCodeModel pinCodeModel)
    {
       return _invitationService.SearchPinCode(pinCodeModel.pinCode,pinCodeModel.IdWedding);
    }
    [HttpPost("editWedding")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PinCodeModel))]    
    public int GetIdWeddingToEdit(VerifyEditInvitationModel verifyEditInvitationModel)
    {
       return _invitationService.VerifyUserHadInvitation(verifyEditInvitationModel.idUsuario, verifyEditInvitationModel.pinCode);
    }


    
}