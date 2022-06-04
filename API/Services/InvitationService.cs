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
            InvitationDTO invitationUser =  _mapper.Map<InvitationDTO>(_context.Invitations.FirstOrDefault(x => x.Id == guid));               
            if (invitationUser == null) throw new KeyNotFoundException("Invitation not found");
            return invitationUser;
        }

        public InvitationDTO Add(BaseInvitationDTO baseInvitationDTO)
        {
            var _mappedItem = _mapper.Map<Invitation>(baseInvitationDTO);
            // hash pinCode
            _mappedItem.pinCode = BCrypt.Net.BCrypt.HashPassword(baseInvitationDTO.pinCode);
            
            
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

        public InvitationDTO Modify(BaseInvitationDTO invitationDTO, int guid)
        {
            var _mappedItem = _mapper.Map<Invitation>(invitationDTO);
            _mappedItem.Id = guid;

            Invitation modifiedItem = _context.Invitations.FirstOrDefault(x => x.Id == guid);

            if (modifiedItem == null || !BCrypt.Net.BCrypt.Verify(invitationDTO.pinCode, modifiedItem.pinCode))
                throw new AppException("PinCode  is incorrect");            

            _context.Entry(modifiedItem).CurrentValues.SetValues(_mappedItem);

            _context.SaveChanges();

            return _mapper.Map<InvitationDTO>(_mappedItem);
        }
       
        public InvitationDTO SearchPinCode(string Pincode,int Id)
        {
            InvitationDTO invitationDTO = GetById(Id);
            
           if (!BCrypt.Net.BCrypt.Verify( Pincode, invitationDTO.pinCode))
                throw new AppException("PinCode  is incorrect"); 
            
            return invitationDTO;
        }

    }
}