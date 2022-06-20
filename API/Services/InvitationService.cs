using AutoMapper;
using BCrypt.Net;
using API.Authorization;
using API.Entities;
using API.Helpers;
using API.Models.Users;
using API.Interfaces;
using API.Context;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.Services
{
    public class InvitationService : IInvitationService
    {
        private WeddingContext _context;
        private IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;

        public InvitationService(WeddingContext context, IJwtUtils jwtUtils,IMapper mapper)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public IEnumerable<InvitationDTO> GetAll()
        {
                return _mapper.Map<IEnumerable<InvitationDTO>>(_context.Invitations.Select(x => x));        
        }

        public InvitationDTO GetById(int guid)
        {
            
            int idProvincia = _context.Invitations.Where(x => x.Id == guid).Select(x => x.city).Select(x => x.IdProvince).FirstOrDefault();
            
           
            InvitationDTO invitationUser =  _mapper.Map<InvitationDTO>(_context.Invitations.FirstOrDefault(x => x.Id == guid));               
            if (invitationUser == null) throw new KeyNotFoundException("Invitation not found");
            
            invitationUser.cityIdProvince = idProvincia;
            
            return invitationUser;
        }

        public InvitationDTO Add(BaseInvitationDTO baseInvitationDTO)
        {
            User idUser = _context.Users.FirstOrDefault(x => x.Id == baseInvitationDTO.usuarioId);
            Province idProvince = _context.provinces.FirstOrDefault(x => x.IdProvince == baseInvitationDTO.cityIdProvince);
            var _mappedItem = _mapper.Map<Invitation>(baseInvitationDTO);
            // hash pinCode
            _mappedItem.pinCode = BCrypt.Net.BCrypt.HashPassword(baseInvitationDTO.pinCode);
            _mappedItem.usuario = idUser;
            _mappedItem.city = idProvince;
           
            _context.Invitations.Add(_mappedItem);
            _context.SaveChanges();
            return _mapper.Map<InvitationDTO>(_mappedItem);
            
        }

        public void Delete(int guid)
        {
           Invitation invitation = _context.Invitations.FirstOrDefault(x => x.Id == guid);

            if (invitation == null)
                throw new ApplicationException($"Invitation with id {guid} not found");

            _context.Invitations.Remove(invitation);
            _context.SaveChanges();
        }

        public InvitationDTO Modify(InvitationEditDTO invitationEditDTO, int guid)
        {
            Province idProvince = _context.provinces.FirstOrDefault(x => x.IdProvince == invitationEditDTO.cityIdProvince);
            var _mappedItem = _mapper.Map<Invitation>(invitationEditDTO);
            _mappedItem.Id = guid;

            Invitation modifiedItem = _context.Invitations.FirstOrDefault(x => x.Id == guid);
            _mappedItem.pinCode = modifiedItem.pinCode;
            if(_mappedItem.city is null)
            {
                _mappedItem.city = new Province();
                _mappedItem.city.IdProvince = idProvince.IdProvince;
                _mappedItem.city.ProvinceName = idProvince.ProvinceName;
            }
            else
            {
                _mappedItem.city = idProvince;
               
            }
            
            _mappedItem.idCity = idProvince.IdProvince;


            _context.Entry(modifiedItem).CurrentValues.SetValues(_mappedItem);

            _context.SaveChanges();

            return _mapper.Map<InvitationDTO>(_mappedItem);
        }
       
        public int SearchPinCode(string Pincode,int Id)
        {
            InvitationDTO invitationDTO = GetById(Id);
            
           if (!BCrypt.Net.BCrypt.Verify( Pincode, invitationDTO.pinCode))
                 throw new AppException("PinCode  is incorrect"); 
            
            return invitationDTO.Id;
        }
        public int VerifyUserHadInvitation(int idUsuario,string pinCode)
        {
            
            
            var idInvitation = _context.Invitations.Where( x => x.usuario.Id.Equals(idUsuario)).Select(x => x.Id).FirstOrDefault();
            if(idInvitation == 0) 
                throw new AppException("The user is not the owner of any invitation");
            InvitationDTO invitationDTO = GetById(idInvitation);
            if (!BCrypt.Net.BCrypt.Verify(pinCode, invitationDTO.pinCode))
                 throw new AppException("PinCode  is incorrect"); 
            
            return invitationDTO.Id;
        }

        public IEnumerable<InvitationDTO> GetAllByUser(int idUsuario)
        {
            
            return _mapper.Map<IEnumerable<InvitationDTO>>(_context.Invitations.Where( x => x.usuario.Id.Equals(idUsuario)));        
        }

    }
}