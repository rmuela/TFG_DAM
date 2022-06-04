using API.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public class InvitationProfile : Profile
{
    public InvitationProfile()
    {
        CreateMap<InvitationDTO, Invitation>();
        CreateMap<Invitation, InvitationDTO>();
        CreateMap<BaseInvitationDTO, Invitation>();
        CreateMap<Invitation, BaseInvitationDTO>();
        /*CreateMap<InvitationDTO, EntityEntry<Invitation>>(); 
        CreateMap<EntityEntry<Invitation>, InvitationDTO>();
        CreateMap<BaseInvitationDTO, EntityEntry<Invitation>>();
        CreateMap<EntityEntry<Invitation>, BaseInvitationDTO>();*/

    }
}