using API.Entities;
using API.Models.Provinces;

namespace API.Interfaces
{
    public interface IProvinceService
    {
        public IEnumerable<Province> GetAll();
    }
}
