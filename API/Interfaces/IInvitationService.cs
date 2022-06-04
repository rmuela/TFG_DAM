using Microsoft.EntityFrameworkCore.ChangeTracking;
using API.Entities;
public interface IInvitationService
{
    public IEnumerable<InvitationDTO> GetAll();

    public InvitationDTO GetById(int guid);

    public InvitationDTO Add(BaseInvitationDTO invitationDTO);

    public void Delete(int guid);

    public InvitationDTO Modify(BaseInvitationDTO invitationDTO, int guid);
    public InvitationDTO SearchPinCode(string pinCode,int id);
}