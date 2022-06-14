using API.Entities;

public class BaseInvitationDTO
{
    public string coupleName { get; set; }
    public DateTime weddingDate { get; set; }
    public string placeConvite { get; set; }
    public string adressConvite { get; set; }
    public int cityIdProvince { get; set; }
    public int usuarioId { get; set; }
    public string hourDinnerConvite { get; set; }
    public string transportConvite { get; set; } 
    public string hourTransportConvite { get; set; } 
    public string boyPhone { get; set; } 
    public string girlPhone { get; set; } 
    public string pinCode { get; set; } 

    
}