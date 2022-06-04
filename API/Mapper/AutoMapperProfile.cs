namespace API.Mapper;

using AutoMapper;
using API.Entities;
using API.Models.Users;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // User -> AuthenticateResponse
        CreateMap<User, AuthenticateResponse>();

        // RegisterRequest -> User
        CreateMap<RegisterRequest, User>();

        CreateMap<InvitationDTO, Invitation>();
        CreateMap<Invitation, InvitationDTO>();
        CreateMap<BaseInvitationDTO, Invitation>();
        CreateMap<Invitation, BaseInvitationDTO>();
        /*
        // UpdateRequest -> User
        CreateMap<UpdateRequest, User>()
            .ForAllMembers(x => x.Condition(
                (src, dest, prop) =>
                {
                    // ignore null & empty string properties
                    if (prop == null) return false;
                    if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                    return true;
                }
            ));*/
    }
}