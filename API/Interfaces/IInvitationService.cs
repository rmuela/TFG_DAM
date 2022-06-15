using Microsoft.EntityFrameworkCore.ChangeTracking;
using API.Entities;
public interface IInvitationService
{
    public IEnumerable<InvitationDTO> GetAll();

    public InvitationDTO GetById(int guid);

    public InvitationDTO Add(BaseInvitationDTO invitationDTO);

    public void Delete(int guid);

    public InvitationDTO Modify(InvitationEditDTO invitationEditDTO, int guid);
    public int SearchPinCode(string pinCode,int id);
    public int VerifyUserHadInvitation(int idUsuario, string pinCode);
}