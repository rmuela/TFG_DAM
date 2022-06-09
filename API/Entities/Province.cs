using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Province
    {
        [Key]
        public int IdProvince { get; set; }
        public string ProvinceName { get; set; }
    }
}
