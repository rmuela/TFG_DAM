using API.Context;
using API.Entities;
using API.Interfaces;
using API.Models.Provinces;
using AutoMapper;

namespace API.Services
{
    public class ProvinceService:IProvinceService
    {
        private WeddingContext _context;
        private IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;

        public ProvinceService(WeddingContext context, IJwtUtils jwtUtils, IMapper mapper)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public IEnumerable<Province> GetAll()
        {
            return _mapper.Map<IEnumerable<Province>>(_context.provinces.Select(x => x).ToList());
        }

       /* public IEnumerable<Province> GetAll()
        {
            return _context.Users;
        }*/
    }
}
